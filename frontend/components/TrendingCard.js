import React from "react";
import Image from "next/image";
import {useMediaQuery} from 'react-responsive';
import Link from "next/link";
import { API } from "../config";
import parse from 'html-react-parser';

const TrendingCard = ({blog}) => {
    const isMobile = useMediaQuery({
        query: '(max-width: 431px)'
    })
    const isTablet = useMediaQuery({
        query: '(min-width: 446px)'
    })
    const isLaptop = useMediaQuery({
        query: '(min-width: 1200px)'
    })
    const isDesktop = useMediaQuery({
        query: '(min-width: 1920px)'
    })

    
    const showAllCategories = () => {
        return blog.categories.map((c, i) => (
            <Link className="btn btn-dark btn-sm mx-1 mt-3" href={`/blogs/categories/${c.slug}`} key={i}> {c.name} </Link>
        ))
    }
    const showAllTags = () => {
        return blog.tags.map((t, i) => (
            <Link className="btn btn-outline-dark btn-sm mx-1 mt-3" href={`/blogs/tags/${t.slug}`} key={i}> {t.name} </Link>
        ))
    }

    
    return (
        <React.Fragment>
              
              {isMobile && 
                        <div className="" >
                        <Link style={{textDecoration: 'none'}}  href={`/blogs/${blog.slug}`}>
                            <img style={{height:'30vh',  objectFit: 'cover', position:'absolute', zIndex: '-1'}} className="img-fluid"   width={1920} height={1080}  src={`${API}/blog/photo/${blog.slug}`}  alt="pic"/>
                            
                            <div style={{background: 'rgba(34, 34, 34, .5)', height: '30vh'}}>
                            <h6 style={{ color: '#22A39F', fontSize:'1.6rem', textDecoration:'underline', fontWeight:'bold', paddingBlockStart: '20vh', textAlign: 'center', paddingInline:'6vw'}}>{blog.title}</h6>
                            
                            </div>
                            <div style={{ paddingBlock: '3vh', textAlign: 'center', backgroundColor: '#EEEEEE'}}>
                                <p style={{ color:'#222222', paddingInline:'6vw',}}>{(parse(blog.excerptmobile))}  </p>
                            
                                <Link style={{textDecoration: 'underline', fontStyle: 'italic', borderColor: '#22A39F', color: '#22A39F'}} className="fw-bold btn btn-sm  pt-2" href={`/blogs/${blog.slug}`} >
                                        Read more
                                    </Link>
                            </div>
                            
                            
                                    
                            
                            
                        </Link>
                            
                        </div>
                    }
                    {isTablet && !isLaptop &&
                        <div  >
                            <img style={{height:'35vh',  objectFit: 'cover', position:'absolute', zIndex: '-1'}} className="img-fluid"   width={1920} height={1080} src={`${API}/blog/photo/${blog.slug}`}   alt="pic"/>
                            
                            <div style={{background: 'rgba(34, 34, 34, .65)', height: '35vh'}}>
                            <Link href={`/blogs/${blog.slug}`} style={{textDecoration: 'none'}}>
                                <div style={{paddingInline:'3vw'}}>
                                        <h5 style={{ color: '#22A39F', fontWeight:'bold', textDecoration: 'underline', fontSize:'2.5rem', paddingBlockStart: '15vh', textAlign: 'center'}}>{blog.title}</h5>
                                    <p style={{ color:'#EEEEEE'}}> {parse(blog.excerpt)}</p>
                                </div>
                            </Link>
                            
                            
                                
                            </div>
                            <div className="row py-2"  style={{paddingInline: '6vw', backgroundColor:'#EEEEEE'}}>
                                    <div className="col-6">
                                        {showAllCategories()}
                                    </div>
                                    <div className="col-6">
                                        {showAllTags()}
                                    </div>
                                <hr style={{marginBlock: '2vh'}} />
                                   
                                </div> 
                                
            <div style={{paddingInline: '6vw', backgroundColor:'#EEEEEE'}} >
            </div>
                        </div>
                    }
                    {isLaptop && !isDesktop &&
                        <div style={{height:'55vh', marginBlockStart:'5vh'}}>
                            <img style={{height:'45vh',  objectFit: 'cover', position:'absolute', zIndex: '-1'}} className="img-fluid"   width={1920} height={1080} src={`${API}/blog/photo/${blog.slug}`}   alt="pic"/>
                            
                            <div style={{background: 'rgba(34, 34, 34, .65)', height: '45vh'}}>
                            <div style={{paddingInline:'3vw'}}>
                                <h5 style={{ color: '#22A39F', fontWeight:'bold', textDecoration: 'underline', fontSize:'1.5rem', paddingBlockStart: '20vh', textAlign: 'center'}}>{blog.title}</h5>
                            <p style={{ color:'#EEEEEE'}}> {parse(blog.excerpt)}</p>
                            </div>
                            
                                
                            </div>
                            <div className="row py-2"  style={{paddingInline: '6vw'}}>
                                    <div className="col-6">
                                        {showAllCategories()}
                                    </div>
                                    <div className="col-6">
                                        {showAllTags()}
                                    </div>
                                   
                                </div> 
                                
            <div style={{paddingInline: '6vw'}} >
                <hr/>
            </div>
                        </div>
                    }
                    {isDesktop && 
                        <div style={{height:'55vh', marginBlockStart:'5vh'}}>
                            <img style={{height:'45vh',  objectFit: 'cover', position:'absolute', zIndex: '-1'}} className="img-fluid"   width={1920} height={1080} src={`${API}/blog/photo/${blog.slug}`}   alt="pic"/>
                            
                            <div style={{background: 'rgba(34, 34, 34, .65)', height: '45vh'}}>
                            <Link  href={`/blogs/${blog.slug}`} style={{ textDecoration: 'none'}}>
                                <h5 style={{paddingInline:'3vw', color: '#22A39F', fontWeight:'bold', textDecoration: 'underline', fontSize:'1.5rem', paddingBlockStart: '32.5vh', textAlign: 'center'}}>{blog.title}</h5>
                            <p style={{paddingInline:'3vw', color:'#EEEEEE', textDecoration: 'none'}}> {parse(blog.excerpt)}</p>
                            </Link>
                            
                                
                            </div>
                            <div className="row py-2"  style={{paddingInline: '6vw'}}>
                                    <div className="col-6">
                                        {showAllCategories()}
                                    </div>
                                    <div className="col-6">
                                        {showAllTags()}
                                    </div>
                                   
                                </div> 
                                
            <div style={{paddingInline: '6vw'}} >
                <hr/>
            </div>
                        </div>
                    }
                    
               
        </React.Fragment>
            
            
            
       
    )
}

export default TrendingCard;