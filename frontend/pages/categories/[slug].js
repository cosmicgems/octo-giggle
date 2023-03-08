import Head from "next/head";
import React from "react";
import Link from "next/link";
import Layout from '../../components/Layout';
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME } from "../../config";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from 'html-react-parser';
import moment from 'moment';
import Card from "../../components/blog/Card";

const Category = ({category, blogs, query}) => {
    const head = () => (
        <Head>
            <title>{category.name} | {APP_NAME} </title>
            <meta name="description" content={`The best products and services for a successful lifestyle on ${category.name}`} /> 
            <link rel="canonical" href={`${DOMAIN}/catgories/${query.slug}`} />
            <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
            <meta property="og:description" content={`The best products and services for a successful lifestyle on ${category.name}`} /> 
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            
            <meta property="og:image" content={`${DOMAIN}/static/images/cosmic-logo.png`} />
            <meta property="og:image:secure_url"  content={`${DOMAIN}/static/images/cosmic-logo.png`} />
            <meta property="og:image:type" content='images/png' />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    )
    return (
        <React.Fragment>
        {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                            <h1 className="display-4 fw-bold">{category.name}</h1>
                            {blogs.map((b, i) => (
                                <div className="pb-5">
                                    <Card key={i} blog={b} />
                                    <hr />
                                </div>
                                
                            ) )}
                            </div>
                        </header>

                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Category.getInitialProps = ({query}) => {
    return singleCategory(query.slug).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {category: data.category, blogs: data.blogs, query};
        }
    });
};

export default Category;