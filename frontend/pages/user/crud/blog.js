import Layout from '../../../components/Layout'
import Link from 'next/link';
import Private from '../../../components/auth/Private';
import BlogCreate from '../../../components/crud/BlogCreate';

const CreateBlog = () => {
    return(
    <Layout>
    <Private>
    <div className='container-fluid' style={{background: '#EEEEEE'}}>
        <div className='row'>
        <div className='col-sm-12' >
            <h2 style={{textAlign: 'center', marginBlock: '3vh'}} >Create a new blog.</h2>
        </div>
            
            <div className='col-sm-12  '>
                <BlogCreate />
            </div>
        </div>
    </div></Private>
    </Layout>
    )
    };

export default CreateBlog;