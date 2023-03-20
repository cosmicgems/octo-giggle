import Link from 'next/link'
import { API } from "../../config";
import parse from 'html-react-parser';
import moment from 'moment'
import Image from 'next/image';

const Card = ({blog}) => {
    const showBlogCategories = blog => {
        return(
            
        blog?.categories?.map((c, i) => {
            return <Link className='btn btn-dark btn-sm mx-1 mt-3' key={i} href={`/blogs/categories/${c.slug}`}>{c.name}</Link>
            
        })
        )
    }
    const showBlogTags = blog => {
        return (
            
        blog?.tags?.map((t, i) => {
            return <Link className='btn btn-outline-dark btn-sm mx-1 mt-3' key={i} href={`/blogs/tags/${t.slug}`}>{t.name}</Link>
        })
        )
    }
    return (
        <div className="lead ">
                    
                    <section>
                    </section>
                    <section>
                    </section>
                    <div className="row pt-3" style={{background: '#EEEEEE',  paddingBlockEnd:'3vh'}}>
                        <div className='col-12' style={{marginBlock:'3vh'}}>
                            <header>
                                <Link style={{textDecoration: 'none', color: '#22A39F'}} href={`/blogs/${blog.slug}`} >
                                    <h2 className="display-6 py-3 fw-bold">
                                        {blog.title}
                                    </h2>
                                </Link>
                            </header>
                        </div>
                        <div className="col-md-5">
                        <div >
                            <img height={1500} width={1500} className='img-fluid img featured-img' style={{maxHeight: 'auto', width: '100%', objectFit:'cover'}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                        </div>
                            
                        <p>{showBlogCategories(blog)}
                        {showBlogTags(blog)}
                        </p>
                        </div>
                        <div className="col-md-7">
                            <section>
                            <div className="pb-3">
                                    
                                <p className=" ml-1 py-2 fw-bold" style={{background: '#F3EFE0', paddingInlineStart: '1vw'}} >
                                <Link href={`/profile/${blog.postedBy.username}`}> Written by {blog.postedBy?.username} </Link>| Published {moment(blog.updatedAt).fromNow()}
                                </p>
                                {parse(blog.excerpt)}
                            </div>
                                
                                <Link style={{textDecoration: 'underline', fontStyle: 'italic', borderColor: '#22A39F', color: '#22A39F'}} className="fw-bold btn btn-outline pt-2" href={`/blogs/${blog.slug}`} >
                                    Read more
                                </Link>
                            </section>
                        </div>

                    </div>
                </div>
    )
}

export default Card;