import React, { useEffect, useState } from "react";
import * as d3 from "d3";
import moment from "moment";

const LineGraph = ({ data, className = "line-graph" }) => {
    const layout = {
        width: 600,
        height: 200,
        margin: { top: 0, right: 20, bottom: 30, left: 20 }
    };

    const xAxis = React.createRef();

    const graphDetails = {
        xScale: d3.scaleTime().range([0, layout.width]),
        yScale: d3.scaleLinear().range([layout.height, 0]),
        lineGenerator: d3.line().defined(d => typeof d.y === "number"),
        shapeGenerator: d3.area().defined(d => typeof d.y === "number")
    };

    graphDetails.xScale.domain([
        moment("1984-01-01", "YYYY-MM-DD").format("x"),
        moment("2019-12-01", "YYYY-MM-DD").format("x")
    ]);
    graphDetails.yScale.domain([0, 100]);

    graphDetails.lineGenerator.x(d => graphDetails.xScale(d.x));
    graphDetails.lineGenerator.y(d => graphDetails.yScale(d.y));
    graphDetails.lineGenerator.curve(d3.curveCatmullRom.alpha(0.5));

    graphDetails.shapeGenerator.x(d => graphDetails.xScale(d.x));
    graphDetails.shapeGenerator.y0(d => graphDetails.yScale(0));
    graphDetails.shapeGenerator.y1(d => graphDetails.yScale(d.y));
    graphDetails.shapeGenerator.curve(d3.curveCatmullRom.alpha(0.5));

    const parsedData = data.map(set =>
        set.map(d => ({
            x: moment(d.x, "YYYY-MM-DD").format("x"),
            y: d.y,
            active: d.active,
            slug: d.slug
        }))
    );

    const linesMarkup = parsedData.map((d, key) => {
        const path = graphDetails.lineGenerator(d);
        return (
            <path
                className={`line line_${d[0].slug} ${
                    d[0].active ? "selected" : ""
                }`}
                key={`graph-line-${d[0].slug}`}
                d={path}
            />
        );
    });

    let areas = parsedData.map((d, key) => {
        const shape = graphDetails.shapeGenerator(d);
        const selected = d[0].active ? "selected" : "";
        if (d[0].slug === "happiness") return;
        return (
            <path
                d={shape}
                key={`graph-area-${d[0].slug}`}
                className={`chartarea area_${d[0].slug} ${selected}`}
            />
        );
    });

    useEffect(() => {
        const axis = d3
            .axisBottom()
            .ticks(8)
            .tickFormat(d => moment(d, "x").format("YYYY"))
            .scale(graphDetails.xScale);
        if (xAxis.current) {
            d3.select(xAxis.current).call(axis);
        }
    }, []);

    return (
        <div id="career-graph" className="homeGraph">
            <svg
                viewBox={`0 0 ${layout.width} ${layout.height +
                    layout.margin.bottom}`}
                preserveAspectRatio="none"
                className={`${className}`}
            >
                <g
                    ref={xAxis}
                    transform={`translate(${0},${layout.height})`}
                    className="x axis axis--x"
                />
                <g className="lines">{linesMarkup}</g>
                <g className="areas">{areas}</g>
            </svg>
        </div>
    );
};

export default LineGraph;
