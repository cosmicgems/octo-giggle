import Layout from '../../components/Layout'
import Link from 'next/link';
import Private from '../../components/auth/Private';

const UserIndex = () => {
    return(
    <Layout>
        <Private><div className='container-fluid'>
        <div className='row'>
        <div className='col-sm-12 pt-3'>
            <h2>User Dashboard</h2>
        </div>
            
            <div className='col-sm-12 col-md-4 pt-3 pb-5'>
                <ul className='list-group'>
                    <li className='list-group-item'><Link href='/user/crud/create'>Create Blog</Link></li>
                    <li className='list-group-item'><Link href='/user/crud/blogs'>Update/Delete Blogs</Link></li>
                    <li className='list-group-item'><Link href='/user/update'>Update Profile</Link></li>
                </ul>
            </div>
            <div className='col-sm-12 col-md-8 pt-5 pb-5'>
                
            </div>
        </div>
    </div></Private>
    </Layout>
    )
    };

export default UserIndex;