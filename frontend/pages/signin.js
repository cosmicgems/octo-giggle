import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';
import { useRouter } from 'next/router';

const Signin = () => {
    const router = useRouter();
    const showRedirectMessage = () => {
        if(router.query.message) {
            return <div className='alert alert-danger'>{router.query.message}</div>
        } else {
            return;
        }
    };
    return (
        <Layout>
        <div style={{backgroundColor: '#EEEEEE', paddingBlock: '5vh 24vh'}}>
            <h2 className='text-center '>Signin </h2>
            <h3 className='text-center ' style={{fontFamily: 'Great Vibes',color:'#22A39F'}}>Curate A Life Worth Living</h3>
            <div className='row'>
                <div className='col-8 offset-2 col-md-8 offset-md-2'>
                    {showRedirectMessage()}
                </div>

            </div>
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