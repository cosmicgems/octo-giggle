import React from "react";
import { useState, useEffect } from "react";
import { signup, isAuth } from "../../actions/auth";
import { useRouter } from "next/router";

const SignupComponent = () =>{
    const [values, setValues] = useState({
        name: 'ryan',
        email: 'ryan@gmail.com',
        password: 'sixsix',
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
        
        signup(user)
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
            <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <input value={name} onChange={handleChange('name')} type='text' className="form-control" placeholder="Type your name." />
            </div>
                <div className="form-group mb-3">
                    <input value={email} onChange={handleChange('email')} type='email' className="form-control" placeholder="Type your email." />
                </div>
                <div className="form-group mb-3">
                    <input value={password} onChange={handleChange('password')} type='password' className="form-control" placeholder="Type your password." />
                </div>
                    <div className="d-grid">
                        <button className="btn btn-primary">Signup Now</button>
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