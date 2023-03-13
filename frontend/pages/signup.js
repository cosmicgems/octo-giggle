import Link from 'next/link';
import React from 'react'
import Layout from '../components/Layout';
import SignupComponent
 from '../components/auth/SignupComponent';
const Signup = () => {
    return (
        <Layout>
        <div style={{backgroundColor: '#EEEEEE', paddingBlock: '5vh 17vh'}}>
            <h2 style={{}} className='text-center fw-bold'>Signup Now</h2>
            <h3 className='text-center ' style={{fontFamily: 'Great Vibes'}}>Curate A Life Worth Living</h3>
            <div className='row' >
                <div className='col-8 offset-2 col-md-8 offset-md-2'>
                    <SignupComponent />
                </div>

            </div>
        </div>

        </Layout>
    );
};

export default Signup;