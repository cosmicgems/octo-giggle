import React from 'react'
import { useState, useEffect } from "react";
import Layout from '../../../../components/Layout';
import { forgotPassword, resetPassword } from '../../../../actions/auth';
import { useRouter } from 'next/router';


const ResetPassword = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true 
    });

    const {showForm, name, newPassword, error, message} = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            resetPasswordLink: router.query.id
        }).then(data => {
            if(data.error) {
                setValues({...values, error: data.error, showForm: false, newPassword: ''});
            } else {
                setValues({...values, message: data.message, showForm: false, newPassword: '', error: false});
            }
            
        });
    };

    const showError = () => (
        error ? <div className='alert alert-danger'>{error}</div> : ''
    )

    const showMessage = () => (
        message ? <div className='alert alert-success'>{message}</div> : ''
    )

    const passwordResetForm = () => (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <div className='form-group pt-5'>
                    <input type="password" onChange={e => setValues({...values, newPassword: e.target.value})} className='form-control' value={newPassword} placeholder="Type your email." required />
                </div>
                <div>
                    <button type='submit' className='btn btn-dark'>Change My Password</button>
                </div>
            </form>
        </div>
    );

    return (
        <Layout>
            <div className='container'>
                <h2>Reset Password</h2>
                <hr/>
                {showError()}
                {showMessage()}
                {passwordResetForm()}
            </div>
        </Layout>
    );

};

export default ResetPassword;