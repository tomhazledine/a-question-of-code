import React, { useState } from "react";

import careerData from "../../data/career";

import LineGraph from "./LineGraph";

const CareerGraph = () => {
    const [careers, setCareers] = useState([
        {
            sortKey: 1,
            slug: "dev",
            title: "Developer",
            active: true,
            data: careerData.map(d => ({ x: d.date, y: d.developer }))
        },
        {
            sortKey: 2,
            slug: "pod",
            title: "Podcaster",
            active: false,
            data: careerData.map(d => ({ x: d.date, y: d.podcaster }))
        },
        {
            sortKey: 3,
            slug: "des",
            title: "Designer",
            active: false,
            data: careerData.map(d => ({ x: d.date, y: d.designer }))
        },
        {
            sortKey: 4,
            slug: "mus",
            title: "Musician",
            active: false,
            data: careerData.map(d => ({ x: d.date, y: d.musician }))
        },
        {
            sortKey: 5,
            slug: "art",
            title: "Artist",
            active: false,
            data: careerData.map(d => ({ x: d.date, y: d.artist }))
        },
        {
            sortKey: 6,
            slug: "lego",
            title: "Lego Master Builder",
            active: false,
            data: careerData.map(d => ({ x: d.date, y: d.lego }))
        }
    ]);

    const handleCheckboxChange = careerKey => {
        const target = careers.find(item => item.slug === careerKey);
        const updated = { ...target, active: !target.active };
        const otherCareers = [...careers].filter(
            item => item.slug !== careerKey
        );
        const newCareers = [...otherCareers, updated];
        setCareers(
            newCareers.sort((a, b) => {
                if (a.sortKey < b.sortKey) {
                    return -1;
                }
                if (a.sortKey > b.sortKey) {
                    return 1;
                }
                return 0;
            })
        );
    };

    const checkboxes = careers.map((career, key) => (
        <div key={`career_${key}`} className="homeGraphSelector checkWrapper">
            <label htmlFor={career.slug} className="visibleLabel selectorTitle">
                {career.title}
            </label>
            <div className={`check ${career.slug}`}>
                <input
                    type="checkbox"
                    className="homegraphcheckbox"
                    value={career.slug}
                    id={career.slug}
                    name={career.slug}
                    checked={career.active}
                    onChange={() => handleCheckboxChange(career.slug)}
                />
                <label htmlFor={career.slug} className="symLabel" />
            </div>
        </div>
    ));

    return (
        <React.Fragment>
            <LineGraph
                data={careers.map(d =>
                    d.data.map(dp => ({
                        ...dp,
                        active: d.active,
                        slug: d.slug
                    }))
                )}
                className="home-graph__svg"
            />

            <div className="homeGraphSelectors">{checkboxes}</div>

            <span className="caption">
                <em>fig #1:</em>{" "}
                <strong>my career aspirations over time</strong>
            </span>
        </React.Fragment>
    );
};

export default CareerGraph;
