import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
    return (
        <Layout>
        <div style={{backgroundColor: '#EEEEEE', paddingBlock: '5vh 17vh'}}>
            <h2 className='text-center '>Signin </h2>
            <div className='row'>
                <div className='col-8 offset-2 col-md-8 offset-md-2'>
                    <SigninComponent />
                </div>

            </div>
        </div>
        </Layout>
    );
};

export default Signin;