import React, { useEffect } from "react";
import * as d3 from "d3";

const SimpleLineGraph = ({ data, className = "line-graph" }) => {
    const layout = {
        width: 250,
        height: 150,
        margin: { top: 20, right: 20, bottom: 20, left: 40 }
    };

    const xAxis = React.createRef();
    const yAxis = React.createRef();

    const graphDetails = {
        xScale: d3.scaleLinear().range([0, layout.width]),
        yScale: d3.scaleLinear().range([layout.height, 0]),
        lineGenerator: d3.line().defined(d => typeof d.y === "number"),
        shapeGenerator: d3.area().defined(d => typeof d.y === "number")
    };

    graphDetails.xScale.domain([0, 20]);
    graphDetails.yScale.domain([60, 90]);

    graphDetails.lineGenerator.x(d => graphDetails.xScale(d.x));
    graphDetails.lineGenerator.y(d => graphDetails.yScale(d.y));
    // graphDetails.lineGenerator.curve(d3.curveCatmullRom.alpha(0.5));

    graphDetails.shapeGenerator.x(d => graphDetails.xScale(d.x));
    graphDetails.shapeGenerator.y0(d => graphDetails.yScale(0));
    graphDetails.shapeGenerator.y1(d => graphDetails.yScale(d.y));
    // graphDetails.shapeGenerator.curve(d3.curveCatmullRom.alpha(0.5));

    const parsedData = data.map(set =>
        set.map(d => ({
            x: d.x,
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
                key={`graph-line-${key}-${d[0].slug}`}
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
                key={`graph-area-${key}-${d[0].slug}`}
                className={`chartarea area_${d[0].slug} ${selected}`}
            />
        );
    });

    useEffect(() => {
        const axis_x = d3
            .axisBottom()
            .ticks(6)
            .scale(graphDetails.xScale);
        if (xAxis.current) {
            d3.select(xAxis.current).call(axis_x);
        }
        const axis_y = d3
            .axisLeft()
            .ticks(6)
            .scale(graphDetails.yScale);
        if (yAxis.current) {
            d3.select(yAxis.current).call(axis_y);
        }
    }, []);

    return (
        <div
            id="career-graph"
            className={`${className}__wrapper graph__generic graph--${className}`}
        >
            <svg
                viewBox={`0 0 ${layout.width +
                    layout.margin.left +
                    layout.margin.right} ${layout.height +
                    layout.margin.top +
                    layout.margin.bottom}`}
                preserveAspectRatio="none"
                className={`${className}`}
            >
                <g
                    ref={xAxis}
                    transform={`translate(${layout.margin.left},${layout.margin
                        .top + layout.height})`}
                    className="x axis axis--x"
                />
                <g
                    ref={yAxis}
                    transform={`translate(${layout.margin.left},${
                        layout.margin.top
                    })`}
                    className="y axis axis--y"
                />
                <g
                    className="lines"
                    transform={`translate(${layout.margin.left},${
                        layout.margin.top
                    })`}
                >
                    {linesMarkup}
                </g>
                <g
                    className="areas"
                    transform={`translate(${layout.margin.left},${
                        layout.margin.top
                    })`}
                >
                    {areas}
                </g>
            </svg>
        </div>
    );
};

export default SimpleLineGraph;
