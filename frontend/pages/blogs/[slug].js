import Head from "next/head";
import React, { useEffect } from "react";
import Link from "next/link";
import Layout from '../../components/Layout'
import { useState } from "react";
import { singleBlog, listRelated } from "../../actions/blog";
import { API, DOMAIN, APP_NAME } from "../../config";
import { useRouter } from "next/router";
import Image from "next/image";
import parse from 'html-react-parser';
import moment from 'moment'
import SmallCard from "../../components/blog/SmallCard";

const SingleBlog = ({blog, query}) => {
    const router = useRouter();
    const [related, setRelated] =useState([]);
    const loadRelated = () => {
        listRelated({blog}).then(data => {
            if(data.error) {
                console.log(data.error)
            } else {
                setRelated(data);
            }
        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME} </title>
            <meta name="description" content={blog.mdesc} /> 
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`} />
            <meta property="og:description" content={blog.mdesc} /> 
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            
            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url"  content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content='images/png' />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    )

    const showBlogCategories = blog => {
        return(
            
        blog.categories.map((c, i) => {
            return <Link className='btn btn-info mx-1 mt-3' key={i} href={`/categories/${c.slug}`}>{c.name}</Link>
            
        })
        )
    }
    const showBlogTags = blog => {
        return (
            
        blog.tags.map((t, i) => {
            return <Link className='btn btn-outline-info mx-1 mt-3' key={i} href={`/tags/${t.slug}`}>{t.name}</Link>
        })
        )
    };

    const showRelatedBlogs = () => {
        return related?.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                {/* <div className="row">

                </div> */}
                    <SmallCard blog={blog} />
                </article>

            </div>
        ));
    };
    return (
        <React.Fragment>
        {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section>
                                <div className="row featured-row">
                                <Image height={500} width={250}  style={{ marginTop: '-30px' }} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                                </div>
                            </section>
                            <section>
                            <div className="container">
                                <h1 className="display-2 pt-3 pb-2 text-center fw-bold">{blog.title}</h1>
                                <p className="mark lead mt-3">
                                Written by {blog.postedBy?.name} | Published {moment(blog.updatedAt).fromNow()}
                                </p>

                                <div className="pb-3">
                                    {showBlogCategories(blog)}
                                    {showBlogTags(blog)}
                                    <br/>
                                    <br />
                            </div>
                            
                                </div>
                            </section>
                        </div>
                        <div className="container">
                            <section>
                                <div className="col-md-12 lead">
                                    {parse(blog.body)}
                                </div>
                                <div className="container pb-5">
                                    <h4 className="text-center py-5 h2">Related Blogs</h4>
                                    <hr />
                                    <p className="lead">Show related Blogs.</p>
                                    <hr />
                                    <div className="row">
                                        {showRelatedBlogs()}
                                    </div>
                                    
                                </div>

                                <div className="container pb-5">
                                    {/* <h4 className="text-center py-5 h2">Related Blogs</h4> */}
                                    <hr />
                                    <p className="lead">Show comments.</p>
                                </div>
                               
                            </section>

                        </div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    )
}

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug).then(data =>{
        if(data.error) {
            console.log(data.error);
        } else {
            return { blog: data, query};
        }
    })
}

export default SingleBlog;