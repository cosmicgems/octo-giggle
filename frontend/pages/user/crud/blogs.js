import Layout from '../../../components/Layout'
import Link from 'next/link';
import Private from '../../../components/auth/Private';
import BlogRead from '../../../components/crud/BlogRead';
import { isAuth } from '../../../actions/auth';




const Blog = () => {
    const username = isAuth() && isAuth().username;
    return(
    <Layout>
        <Private>
            <div className='container'>
                <div className='row'>
                    <div className='col-sm-12'>
                        <h2>Manage Blogs.</h2>
                    </div>
                    
                    <div className='col-sm-12  pt-5 pb-5'>
                        <BlogRead username={username} />
                    </div>
                </div>
            </div>
        </Private>
    </Layout>
    )
    };

export default Blog;