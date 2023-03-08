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
                <button onClick={loadMore} className="btn btn-info btn-lg">
                    Load more
                </button>
            )
            );
    };


    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return            (
                <article key={i}>
                <Card blog={blog} />
                <hr />
            </article>
            ) 
        })
    }

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <Link className="btn btn-info mx-1 mt-3" href={`/categories/${c.slug}`} key={i}> {c.name} </Link>
        ))
    }
    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link className="btn btn-outline-info mx-1 mt-3" href={`/tags/${t.slug}`} key={i}> {t.name} </Link>
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
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 fw-bold text-center">
                                    Programming blogs and tutorials
                                </h1>
                            </div>
                            <section>
                                {showAllCategories()}
                                <hr />
                                {showAllTags()}
                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">
                            Show all blogs.
                            {showAllBlogs()}
                    </div>
                    <div className="container-fluid">
                            Show all loaded blogs.
                            {showLoadedBlogs()}
                    </div>
                    <div className=" text-center py-5">
                    <hr/>
                            {loadMoreButton()}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
            
    )
}

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 2;
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