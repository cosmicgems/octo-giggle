import Layout from '../../../components/Layout'
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import BlogCreate from '../../../components/crud/BlogCreate';

const Blog = () => {
    return(
    <Layout>
    <Admin>
    <div className='container-fluid'>
        <div className='row'>
        <div className='col-sm-12'>
            <h2>Create a new blog.</h2>
        </div>
            
            <div className='col-sm-12  pt-5 pb-5'>
                <BlogCreate />
            </div>
        </div>
    </div></Admin>
    </Layout>
    )
    };

export default Blog;