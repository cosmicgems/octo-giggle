import Layout from '../../../components/Layout'
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import BlogRead from '../../../components/crud/BlogRead';

const Blogs = () => {
    return(
    <Layout>
    <Admin>
    <div className='container'>
        <div className='row'>
        <div className='col-sm-12'>
            <h2>Manage Blogs.</h2>
        </div>
            
            <div className='col-sm-12  pt-5 pb-5'>
                <BlogRead />
            </div>
        </div>
    </div></Admin>
    </Layout>
    )
    };

export default Blogs;