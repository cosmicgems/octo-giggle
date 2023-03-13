import Layout from '../../components/Layout'
import Link from 'next/link';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
    return(
    <Layout>
    <Admin>
    <div className='container-fluid'>
        <div className='row'>
        <div className='col-sm-12 pt-3'>
            <h2>Admin Dashboard</h2>
        </div>
            
            <div className='col-sm-12 col-md-4 pt-3 pb-5'>
                <ul className='list-group'>
                    <li className='list-group-item'><Link href='/admin/crud/category-tag'>Create Category</Link></li>
                    <li className='list-group-item'><Link href='/admin/crud/category-tag'>Create Tag</Link></li>
                    <li className='list-group-item'><Link href='/admin/crud/blog'>Create Blog</Link></li>
                    <li className='list-group-item'><Link href='/admin/crud/blogs'>Update/Delete Blogs</Link></li>
                </ul>
            </div>
            <div className='col-sm-12 col-md-8 pt-5 pb-5'>
                
            </div>
        </div>
    </div></Admin>
    </Layout>
    )
    };

export default AdminIndex;