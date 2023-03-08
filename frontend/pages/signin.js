import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
    return (
        <Layout>
            <h2 className='text-center p-2'>Signin Page</h2>
            <div className='row'>
                <div className='col-8 offset-2 col-md-8 offset-md-2'>
                    <SigninComponent />
                </div>

            </div>

        </Layout>
    );
};

export default Signin;