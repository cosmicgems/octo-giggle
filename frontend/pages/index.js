import Layout from '../components/Layout'
import Link from 'next/link';
import FeaturedCard from '../components/FeaturedCard';
import TrendingCard from '../components/TrendingCard';
import {useMediaQuery} from 'react-responsive';
import { featuredBlog, listBlogsWithCategoriesAndTags, singleBlog } from '../actions/blog';
import {subscribeForm} from "../actions/subscribe";
import { useState } from 'react';
import Blogs from './blogs';
import Image from 'next/image';
import { animated, useTransition, useSpring } from '@react-spring/web'

const Index = ({blogs, categories, tags, totalBlogs, blogsLimit, blogSkip}) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        sent: false,
        buttonText: 'Subscribe',
        success: false,
        error: false
    });

    const { name, email, sent, buttonText, success, error} = values;

    const clickSubmit = (e) => {
        e.preventDefault();
        setValues({...values, buttonText: 'Sending...'})
        subscribeForm({ name, email}).then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({...values, sent:true, name:'',email: '',  buttonText:'Sent', success: data.success})
            }
        })
    };

    
    const handleChange = name => e =>{
        setValues({...values, [name]: e.target.value, error: false, success: false, buttonText: 'Send Message'});
    };

    const showSuccessMessage = () => success && (<div className="alert alert-info">Thank you for contacting us.</div>)
    const showErrorMessage = () => (
    <div className="alert alert-danger" style={{display: error ? '': 'none'}}>
        {error}
    </div>
    )

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

    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
            <TrendingCard blog={blog} />

            </article>
        ))
    }

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn  btn-md fw-bold" style={{borderColor: '#22A39F', color:'#22A39F'}} >
                    Load more
                </button>
            )
            );
    };


    const showTrending = () => {
        return (
            blogs.map((blog, i) => {
                return (
                    <TrendingCard blog={blog} />
                )
            })
        )
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
    };

    const [isToggled] = useState(true);
    const fade = useSpring({
        opacity: isToggled ? 1: 0
    });


    return(
        <Layout >
        {isMobile &&
        <div className='' >
            <div style={{height: '50vh'}} >
                
                <div>
                <form style={{padding: '7vh 17.5vw 6vh'}}>
                <h2 style={{textAlign:'center', fontSize: '2rem', fontWeight: 'bold'}}>
                    Pearl Box
                </h2>
                <p style={{textAlign:'center'}}>
                    Curate A Lifestyle Worth Living
                </p>
                    <input style={{textAlign:'center'}} type='name' className='form-control mb-2' placeholder='Your Name' />
                    <input style={{textAlign:'center'}} type='email' className='form-control' placeholder='Your Email' />
                    <div className='d-grid pt-2 ' >
                    <button type='submit' className='btn btn-sm btn-outline-dark'>Subscribe</button>
                    </div>
                </form>
                    

                </div>
            </div>
            <div style={{backgroundColor:'#222222'}}>
                <h2 style={{textAlign:'center', paddingBlock:'3vh 1vh', fontWeight:'bold',  marginBlockEnd: '0', color: '#F3EFE0'}}>Latest Post</h2>
            
            </div>
        {showTrending()}
            {showLoadedBlogs()}
            
            <div className=" text-center py-5" style={{background: '#EEEEEE'}}>
                <hr />
                {loadMoreButton()}
            </div>
        </div>
        }
        {isTablet && !isLaptop &&
            <div >
            <div >
                <div style={{paddingBlock: '7vh'}}>
                    
                <form onSubmit={clickSubmit} style={{padding: '5vh 25vw 6vh'}}>
                <h2 style={{textAlign:'center', fontSize: '4rem', fontWeight: 'bold'}}>
                    Pearl Box
                </h2>
                <p style={{textAlign:'center'}}>
                    Curate A Lifestyle Worth Living
                </p>
                    <input style={{textAlign:'center'}} type='name' value={name} className='form-control mb-2' placeholder='Your Name'  onChange={handleChange('name')} required />
                    <input style={{textAlign:'center'}} type='email' value={email} className='form-control' placeholder='Your Email'  onChange={handleChange('email')} required  />
                    <div className='d-grid pt-2 ' >
                    <button type='submit' className='btn btn-sm btn-outline-dark'> Subscribe </button>
                    </div>
                </form>
                </div>
            </div>
            <div style={{backgroundColor: '#222222'}}>
        <h2 style={{textAlign:'center', paddingBlock:'3vh 2vh', color:'#F3EFE0', marginBlockEnd:'0'}}>Latest Post</h2>
            </div>

            {showTrending()}
            {showLoadedBlogs()}
            
            <div className=" text-center py-2" style={{backgroundColor: '#EEEEEE'}}>
                {loadMoreButton()}
            </div>
        </div>
        }
        {isLaptop && !isDesktop &&
            <div >
            <div >
                <video autoPlay muted loop className="video-laptop" playsInline={true} style={{position: 'absolute'}} >
                    <source src="/static/images/pearl-shimmer.mp4" />
                </video>
                <animated.div style={{paddingBlock: '7vh'}}>
                    
                <form style={{padding: '5vh 25vw 6vh'}}>
                <h2 style={{textAlign:'center'}}>
                    Pearl Box
                </h2>
                <p style={{textAlign:'center'}}>
                    Curate A Lifestyle Worth Living
                </p>
                    <input style={{textAlign:'center'}} type='name' className='form-control mb-2' placeholder='Your Name' />
                    <input style={{textAlign:'center'}} type='email' className='form-control' placeholder='Your Email' />
                    <div className='d-grid pt-2 ' >
                    <button className='btn btn-sm btn-dark fw-bold' style={{fontSize: '1rem'}}> Subscribe </button>
                    </div>
                </form>
                </animated.div>
            </div>
        <h2 style={{textAlign:'center', paddingBlockStart:'12vh'}}>Latest Lifestyle Post</h2>
            {showTrending()}
            {showLoadedBlogs()}
            
            <div className=" text-center py-2">
                {loadMoreButton()}
            </div>
        </div>
        }
        {isDesktop &&
            <div >
            <div >
                <video autoPlay muted loop className="video-desktop" playsInline={true} style={{position: 'absolute'}} >
                    <source src="/static/images/pearl-shimmer.mp4" />
                </video>
                <div style={{paddingBlock: '7vh'}}>
                    
                <form style={{padding: '5vh 25vw 6vh'}}>
                <h2 style={{textAlign:'center', fontSize: '6rem'}}>
                    Pearl Box
                </h2>
                <p style={{textAlign:'center'}}>
                    Curate A Lifestyle Worth Living
                </p>
                    <input style={{textAlign:'center'}} type='name' className='form-control mb-2' placeholder='Your Name' />
                    <input style={{textAlign:'center'}} type='email' className='form-control' placeholder='Your Email' />
                    <div className='d-grid pt-2 ' >
                    <button className='btn btn-sm btn-dark fw-bold' style={{fontSize: '1.25rem'}}> Subscribe </button>
                    </div>
                </form>
                </div>
            </div>
        <h2 style={{textAlign:'center', paddingBlockStart:'12vh'}}>Latest Lifestyle Post</h2>
            {showTrending()}
            {showLoadedBlogs()}
            
            <div className=" text-center py-2">
                {loadMoreButton()}
            </div>
        </div>
        }
        
            
        </Layout>
    )
    };

    Index.getInitialProps = () => {
        let skip = 0;
        let limit = 3;
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

export default Index;