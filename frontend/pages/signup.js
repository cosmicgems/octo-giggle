import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import SignupComponent
 from '../components/auth/SignupComponent';
const Signup = () => {
    return (
        <Layout>
            <h2 className='text-center p-2'>Signup Page</h2>
            <div className='row'>
                <div className='col-8 offset-2 col-md-8 offset-md-2'>
                    <SignupComponent />
                </div>

            </div>

        </Layout>
    );
};

export default Signup;