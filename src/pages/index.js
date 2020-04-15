import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import { Container } from "../components/layoutComponents"
import SEO from "../components/seo"

import CountryChart from './CountryChart'

const IndexPage = () => <Layout>
    <Container>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
        {/* <h1>COVID 19</h1> */}
        <CountryChart country='Russia' />
        <CountryChart country='USA' />
        <CountryChart country='Italy' />
        <CountryChart country='Spain' />
        <CountryChart country='Brazil' />
        <CountryChart country='Israel' />
        {/* <p>Welcome to your new Gatsby site.</p> */}
        {/* <p>Now go build something great.</p> */}
        {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    <Image />
    </div> */}
        {/* <Link to="/page-2/">Go to page 2</Link> */}
    </Container>
</Layout>


export default IndexPage
