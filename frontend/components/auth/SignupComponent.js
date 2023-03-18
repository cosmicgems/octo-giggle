import React from "react";
import { useState, useEffect } from "react";
import { preSignup, isAuth } from "../../actions/auth";
import { useRouter } from "next/router";

const SignupComponent = () =>{
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true
    })

    const {name, email, password, error, loading, message, showForm} = values;
    const router = useRouter()
    useEffect(() => {
        isAuth() && router.push(`/`)
    }, [])


    const handleSubmit = (e) =>{
        e.preventDefault()
        // console.table({name, email, password, error, loading, message, showForm})
        setValues({...values, loading: true, error: false})
        const user = {name, email, password}
        
        preSignup(user)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                setValues({...values, name:', email: ', password: '', loading: false, message: data.message,
            showForm: false });
            }
        });
        
    };

    const handleChange = name => e =>{
        setValues({...values, error: false, [name]: e.target.value});
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div>:'');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div>:'');

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit} style={{background: '#EEEEEE'}}>
            <div className="form-group mb-3">
                <input value={name} onChange={handleChange('name')} type='text' className="form-control" placeholder="Type your name" />
            </div>
                <div className="form-group mb-3">
                    <input value={email} onChange={handleChange('email')} type='email' className="form-control" placeholder="Type your email" />
                </div>
                <div className="form-group mb-3">
                    <input value={password} onChange={handleChange('password')} type='password' className="form-control" placeholder="Type your password" />
                </div>
                    <div className="d-grid">
                        <button className="btn btn-md" style={{background: '#22A39F', color:'#EEEEEE', fontWeight: 'bolder', textShadow: '2px 0 #323232'}}>Signup Now</button>
                    </div>
            </form>
        )
    }


    return (
        <React.Fragment>
        {showError()}
        {showLoading()}
        {showMessage()}
            {showForm && signupForm()}
        </React.Fragment>
        
    )
};

export default SignupComponent;