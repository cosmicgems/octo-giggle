import Head from "next/head";
import React from "react";
import Link from "next/link";
import Layout from '../../components/Layout'
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";
import { API, DOMAIN, APP_NAME } from "../../config";
import { useRouter } from "next/router";

const Blogs = ({blogs, categories, tags, totalBlogs, blogsLimit, blogSkip}) => {
    const router = useRouter();
    const head = () => (
        <Head>
            <title>Curated Lifestyle Blog | {APP_NAME} </title>
            <meta name="description" content="All of the best lifestyle products and services" /> 
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={`Latest lifestyle products and services | ${APP_NAME}`} />
            <meta property="og:description" content="All of the best lifestyle products and services" /> 
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            
            <meta property="og:image" content={`${DOMAIN}/static/images/cosmic-logo.png`} />
            <meta property="og:image:secure_url"  content={`${DOMAIN}/static/images/cosmic-logo.png`} />
            <meta property="og:image:type" content='images/png' />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    )

    const [limit, setLimit] =useState(blogsLimit);
    const [skip, setSkip] =useState(0);
    const [size, setSize] =useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] =useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs])
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-md fw-bold" style={{borderColor: '#22A39F', color: 'white', backgroundColor: '#22A39F'}}>
                    Load more
                </button>
            )
            );
    };


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return            (
                <article key={i} style={{backgroundColor: '#EEEEEE', borderColor: '#434242', marginBlockEnd: '0',paddingBlockEnd: '0'}}>
                <Card blog={blog} />
                <hr style={{paddingBlock: '0', marginBlock: '0'}} />
            </article>
            ) 
        })
    }

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link className="btn btn-dark btn-sm mx-1 mt-3" href={`/blogs/categories/${c.slug}`} key={i}> {c.name} </Link>
        ))
    }
    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link className="btn btn-outline-dark btn-sm mx-1 mt-1 mb-3" href={`/blogs/tags/${t.slug}`} key={i}> {t.name} </Link>
        ))
    }
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
            <Card blog={blog} />

            </article>
        ))
    }
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="">
                        <header>
                            <div className="col-md-12 " style={{background: '#EEEEEE', paddingBlock: '3vh 1vh'}}>
                                <h1 className="display-4 fw-bold text-center " style={{fontFamily: 'Great Vibes'}}>
                                    All Articles
                                </h1>
                            </div>
                            <section className="text-center">
                                {showAllCategories()}
                                <div style={{paddingInline: '17.5vw'}}>
                                    <hr style={{paddingInline: '17.5vw'}} />
                                </div>
                                {showAllTags()}
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid ">
                            {showAllBlogs()}
                    </div>
                    <div className="container-fluid">
                            {showLoadedBlogs()}
                    </div>
                    <div className=" text-center py-4" style={{background: '#EEEEEE'}}>
                            {loadMoreButton()}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
            
    )
}

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 5;
    return (listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs, 
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    }));
};

export default Blogs;