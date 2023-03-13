import React from "react";
import Layout from "../../../components/Layout";
import Link from "next/link";
import { useState } from "react";
import { listBlogsWithCategoriesAndTags } from "../../../actions/blog";
import Image from "next/image";
import { API } from "../../../config";

const Categories = ({blogs, categories, tags, totalBlogs, blogsLimit, blogSkip}) => {

    
    const [limit, setLimit] =useState(blogsLimit);
    const [skip, setSkip] =useState(0);
    const [size, setSize] =useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] =useState([]);

  
        const showBlogCategories = () => {
            return(
                
            categories?.map((c, i) => {
                return (
                    <div style={{
                        height: '15vh',
                        width:'100%',
                        marginBlock: '0 3vh',
                        backgroundColor: '#EEEEEE',
                        paddingBlockStart: '3vh'
                    }}>
                                <Link style={{textDecoration: 'none'}} href={`/blogs/categories/${c.slug}`} >
                                    <Image style={{height:'15vh',  objectFit: 'cover', position:'absolute'}} className="img-fluid"   width={1920} height={1080}  src={'/static/images/featured-placeholder.jpg'}  alt="pic"/>
                                    
                                    <div style={{background: 'rgba(34, 34, 34, .25)', height: '15vh' , position:'relative'}}>
                                    <h6 style={{ color: '#EEEEEE', paddingBlock: '5vh', textAlign: 'center', fontSize: '4.5vh'}}>{c.name}</h6>
                                    
                                    </div>
                                            
                                    
                                    
                                </Link>
        
                    </div>
                )
                
            })
            )
        }
   
    return (
        <Layout>
            <React.Fragment style={{}}>
            <div style={{ minHeight:'100vh', background: '#EEEEEE'}} >
                
            <h1 className="display-4 fw-bold text-center pt-4" style={{fontFamily: 'Great Vibes'}}>
                                    All Categories
                                </h1>
                <div>
                    {showBlogCategories()}
                </div>
            </div>
                
            </React.Fragment>
        </Layout>
    );
};



Categories.getInitialProps = () => {
    let skip = 0;
    let limit = 50;
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

export default Categories;