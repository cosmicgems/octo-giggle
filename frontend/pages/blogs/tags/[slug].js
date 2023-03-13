import Head from "next/head";
import React from "react";
import Link from "next/link";
import Layout from '../../../components/Layout';
import { singleTag } from "../../../actions/tag";
import { API, DOMAIN, APP_NAME } from "../../../config";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from 'html-react-parser';
import moment from 'moment';
import Card from "../../../components/blog/Card";

const Tag = ({tag, blogs}) => {
    return (
        <React.Fragment>
            <Layout>
                <main>
                    <div className="container-fluid text-center">
                        <header>
                            <div className="col-md-12 pt-3">
                            <h1 className="display-4 fw-bold">{tag.name}</h1>
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

Tag.getInitialProps = ({query}) => {
    return singleTag(query.slug).then(data => {
        if(data.error) {
            console.log(data.error)
        } else {
            return {tag: data.tag, blogs: data.blogs};
        }
    });
};

export default Tag;