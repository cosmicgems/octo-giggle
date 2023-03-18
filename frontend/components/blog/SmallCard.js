import Link from 'next/link'
import { API } from "../../config";
import parse from 'html-react-parser';
import moment from 'moment'
import Image from 'next/image';

const SmallCard = ({blog}) => {
    return (
        <div className='card '>
            <section>
                
                <div className='p-5' >

                <Image height={150} width={150} style={{ maxHeight: 'auto', width: '100%'}} className=' img img-fluid' src={`${API}/blog/photo/${blog.slug}`} alt={blog.title} />
                
                </div>
                
            </section>

            <div className='card-body'>
                <section>
                    <Link href={`/blogs/${blog.slug}`}>
                        <h5 className='card-title'>{blog.title}</h5>
                    </Link>
                    <p className='card-text'>{parse(blog.excerpt)}</p>
                </section>
            </div>

            <div className='card-body'>
                <div className=''>
                    Posted {moment(blog.updatedAt).fromNow()} by <Link href={`/profile/${blog.postedBy.username}`}>{blog.postedBy?.username} </Link>
                </div>
                
            </div>
        </div>

    )
}

export default SmallCard;