import Layout from '../../components/Layout'
import Link from 'next/link';
import Private from '../../components/auth/Private';

const UserIndex = () => {
    return(
    <Layout>
        <Private>User Dashboard</Private>
    </Layout>
    )
    };

export default UserIndex;