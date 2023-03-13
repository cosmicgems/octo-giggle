import { DOMAIN, API } from "../config";
import Image from "next/image";
import React from "react"
import moment from 'moment'
import Link from "next/link";
import {useMediaQuery} from 'react-responsive';
import parse from 'html-react-parser';
import { smartTrim } from "../../backend/helpers/blog";

const FeaturedCard = ({blog}) => {
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
    

    return (
        <React.Fragment>
        
       
            <div style={{ height:'65vh'}}>
                <Image style={{height:'65vh', objectFit: 'cover', position:'absolute', zIndex: '-1'}} className="img-fluid"   width={1920} height={1080} src={`${API}/blog/photo/${blog.slug}`}  alt="pic"/>
                
                {isMobile &&
                    <div style={{position:'absolute', color: '#EEEEEE', paddingBlockStart: '30vh'}}>
                    <header>
                        <Link href={`/blogs/${blog?.slug}`} style={{textDecoration: 'none'}} >
                            <h2 className="display-5 pt-3 fw-bold" style={{marginInlineStart: '3vw'}}>
                                {blog?.title}
                            </h2>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', marginInlineStart: '3vw', marginBlockEnd: '0', paddingBlockEnd: '0'}} >
                                Written by {blog?.postedBy?.name} | Published {moment(blog?.updatedAt).fromNow()}
                                
                            </p>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', paddingInline: '3vw 0', marginBlock: '0', paddingBlockStart: '0'}}>
                            {blog.excerptmobile} <span style={{textDecoration: 'underline', fontStyle: 'italic'}}>read more</span>
                            </p>
                            
                        </Link>
                    </header>
                </div> 
                }

                {isTablet && !isLaptop &&
                    <div style={{position:'absolute', color: '#EEEEEE', paddingBlockStart: '35vh'}}>
                    <header>
                        <Link href={`/blogs/${blog?.slug}`}  style={{textDecoration: 'none'}}  >
                            <h2 className="display-5 pt-3 fw-bold" style={{marginInlineStart: '3vw'}}>
                                {blog?.title}
                            </h2>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', marginInlineStart: '3vw', marginBlockEnd: '0', paddingBlockEnd: '0'}} >
                                Written by {blog?.postedBy?.name} | Published {moment(blog?.updatedAt).fromNow()}
                                
                            </p>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', paddingInline: '3vw ', marginBlock: '0', paddingBlock: '0'}}>
                            {parse(blog.excerpt)}<span style={{textDecoration: 'underline', fontStyle: 'italic'}}>read more</span>
                            </p>
                           
                            
                        </Link>
                    </header>
                </div> 
                }
                {isLaptop && !isDesktop &&
                    <div style={{position:'absolute', color: '#EEEEEE', paddingBlock: '25vh'}}>
                    <header>
                        <Link href={`/blogs/${blog?.slug}`} style={{textDecoration: 'none'}} >
                            <h4 className="display-7 pt-3 fw-bold" style={{marginInlineStart: '3vw', textDecoration: 'underline'}}>
                                {blog?.title}
                            </h4>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', marginInlineStart: '3vw', marginBlockEnd: '0', paddingBlockEnd: '0'}} >
                                Written by {blog?.postedBy?.name} | Published {moment(blog?.updatedAt).fromNow()}
                                
                            </p>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', paddingInline: '3vw 10vw', marginBlock: '0', paddingBlock: '0'}}>
                            {parse(blog.excerpt)} <span style={{textDecoration: 'underline', fontStyle: 'italic'}}>read more</span>
                            </p>
                            
                        </Link>
                    </header>
                </div> 
                }
                {isDesktop &&
                    <div style={{position:'absolute', color: '#EEEEEE', paddingBlock: '35vh'}}>
                    <header>
                        <Link href={`/blogs/${blog?.slug}`} style={{textDecoration: 'none'}}>
                            <h2 className="display-7 pt-3 fw-bold" style={{marginInlineStart: '3vw', textDecoration: 'underline'}}>
                                {blog?.title}
                            </h2>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', marginInlineStart: '3vw', marginBlockEnd: '0', paddingBlockEnd: '0'}} >
                                Written by {blog?.postedBy?.name} | Published {moment(blog?.updatedAt).fromNow()}
                                
                            </p>
                            <p style={{color: '#EEEEEE', fontSize: '1rem', paddingInline: '3vw 35vw', marginBlock: '0', paddingBlock: '0'}}>
                            {parse(blog.excerpt)} <span style={{textDecoration: 'underline'}}>read more</span>
                            </p>
                            
                        </Link>
                    </header>
                </div> 
                }
                


                <section>
                    
                </section>
                <div style={{background: 'rgba(34, 34, 34, .5)', height: '65vh'}}>

                </div>
            </div>
        </React.Fragment>
    )
}

export default FeaturedCard;