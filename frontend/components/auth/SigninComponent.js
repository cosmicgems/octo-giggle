import React from "react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { signin, authenticate,  isAuth } from "../../actions/auth";

const SigninComponent = () =>{
    const [values, setValues] = useState({
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
        const user = { email, password}
        
        signin(user)
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error, loading: false})
            } else {
                //save user token to cookie
                //save user info to db
                //authenticate user
                authenticate(data, () => {
                    if(isAuth() && isAuth().role === 1) {
                        router.push(`/admin`);
                    }else {
                        router.push(`/user`)
                    }
                });
                
            }
        });
        
    };

    const handleChange = name => e =>{
        setValues({...values, error: false, [name]: e.target.value});
    };

    const showLoading = () => (loading ? <div className="alert alert-info">Loading...</div>:'');
    const showError = () => (error ? <div className="alert alert-danger">{error}</div>:'');
    const showMessage = () => (message ? <div className="alert alert-info">{message}</div>:'');

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
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
            {showForm && signinForm()}
        </React.Fragment>
        
    )
};

export default SigninComponent;