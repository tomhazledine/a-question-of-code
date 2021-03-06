import React from "react";
import { Link } from "gatsby";
import { css } from "emotion";
import moment from "moment";

const EpisodeSummary = ({ episode }) => (
    <Link key={episode.id} to={episode.fields.slug} className="excerpt">
        <h2
            css={css`
                font-weight: bold;
            `}
        >
            {episode.frontmatter.number}: {episode.frontmatter.title}
        </h2>
        <span
            className="test_subtitle"
            css={css`
                color: #bbb;
                font-style: italic;
            `}
        >
            — {moment(episode.frontmatter.date, "YYYYMMDD").format("Do MMM, Y")}
        </span>
    </Link>
);

export default EpisodeSummary;
