import Link from 'next/link'
import { API } from "../../config";
import parse from 'html-react-parser';
import moment from 'moment'
import Image from 'next/image';

const Card = ({blog}) => {
    const showBlogCategories = blog => {
        return(
            
        blog?.categories?.map((c, i) => {
            return <Link className='btn btn-info mx-1 mt-3' key={i} href={`/categories/${c.slug}`}>{c.name}</Link>
            
        })
        )
    }
    const showBlogTags = blog => {
        return (
            
        blog?.tags?.map((t, i) => {
            return <Link className='btn btn-outline-info mx-1 mt-3' key={i} href={`/tags/${t.slug}`}>{t.name}</Link>
        })
        )
    }
    return (
        <div className="lead pb-4">
                    <header>
                        <Link href={`/blogs/${blog.slug}`} >
                            <h2 className="display-4 py-3 fw-bold">
                                {blog.title}
                            </h2>
                        </Link>
                    </header>
                    <section>
                        <p className="mark ml-1 py-2" >
                            Written by {blog.postedBy?.name} | Published {moment(blog.updatedAt).fromNow()}
                        </p>
                    </section>
                    <section>
                        <p>{showBlogCategories(blog)}
                        {showBlogTags(blog)}
                        <br/>
                        <br />
                        </p>
                    </section>
                    <div className="row">
                        <div className="col-md-4">
                            <Image height={1500} width={1500} className='img-fluid img featured-img' style={{maxHeight: 'auto', width: '100%'}} src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                        </div>
                        <div className="col-md-8">
                            <section>
                            <div className="pb-3">
                            <h2>{blog.title}</h2>
                                {parse(blog.excerpt)}
                            </div>
                                
                                <Link className="btn btn-success pt-2" href={`/blogs/${blog.slug}`} >
                                    Read more
                                </Link>
                            </section>
                        </div>

                    </div>
                </div>
    )
}

export default Card;