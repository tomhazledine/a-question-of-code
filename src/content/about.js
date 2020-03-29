import React from "react";
import { graphql } from "gatsby";
import Header from "../components/Header";
import Footer from "../components/Footer";

import "../scss/main.scss";

const About = ({ data }) => (
    <div>
        <Header title={data.site.siteMetadata.title} />
        <div className="wrapper">
            <h1 className="title--page">About Us</h1>
            <p>
                Minim consequat aliqua anim reprehenderit aliquip. Laboris
                labore ut commodo nisi ex. Occaecat enim deserunt eu laboris
                enim adipisicing duis amet sint tempor.
            </p>
        </div>
        <Footer />
    </div>
);

export default About;

export const query = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`;
