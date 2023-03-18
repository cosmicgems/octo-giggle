import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getCookie, isAuth, updateUser } from "../../actions/auth";
import { getProfile, updateProfile } from "../../actions/user";
import React from "react";
import Image from "next/image";
import { API } from "../../config";




const ProfileUpdate = () => {
    const router = useRouter();
    const [values, setValues] = useState({
        username: '',
        username_for_photo: '',
        name: '',
        email: '',
        about: '',
        password: '',
        error: false,
        success: false,
        loading: false,
        photo: '',
        userData: ''
    });

    const token = getCookie('token');
    const {
        username,
        username_for_photo,
        name,
        email,
        about,
        password,
        error,
        success,
        loading,
        photo,
        userData
    } = values;
    
    const init = () => {
        getProfile(token).then(data => {
            if(data.error) {
                setValues({...values, 
                    error:data.error})
            } else {
                setValues({
                    ...values,
                    username_for_photo: data.username,
                    username: data.username, 
                    name:data.name, 
                    email: data.email, 
                    about: data.about
                });
            }
        });
    };

    useEffect(()=> {
        init();
        setValues({ ...values, userData: new FormData() });
    }, []);

    const handleChange = name => e => {
            // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        let userFormData = new FormData;
        userFormData.set(name, value);
        console.log(...userData); // SEE THE FORMDATA IN CONSOLE
        setValues({ ...values, [name]: value, userData: userFormData, usererror: false, success: false });
    }

    const handleSubmit = e => {
        e.preventDefault();
 
        setValues({ ...values, loading: true });
        updateProfile(token, userData).then(data => {
            if (data.error) {
                console.log('data.error', data.error);
                setValues({ ...values, error: data.error, loading: false });
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        username: data.username,
                        name: data.name,
                        email: data.email,
                        about: data.about,
                        password: '',
                        success: true,
                        loading: false
                    });
                });
            }
        });
    };

    const profileUpdateForm = () => (
        <form onSubmit={handleSubmit} style={{paddingInline: '7vw'}}>
        <div className="form-group mb-3">
            <label className="text-muted">Profile Photo</label>
            <input type='file' accept="image/*" className="form-control" onChange={handleChange('photo')} />
        </div>
            <div className="form-group mb-3">
                <label className="text-muted">Username</label>
                <input type='text' className="form-control" value={username} onChange={handleChange('username')} />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Name</label>
                <input type='text' className="form-control" value={name} onChange={handleChange('name')} />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Email</label>
                <input type='email' className="form-control" value={email} onChange={handleChange('email')} />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">About</label>
                <textarea type='text' className="form-control" value={about} onChange={handleChange('about')} />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Password</label>
                <input type='text' className="form-control" value={password} onChange={handleChange('password')} />
            </div>
            <div className="">
                {showError()}
                {showSuccess()}
                {showLoading()}
            </div>
            <div className="d-grid mb-5">
            <button type="submit" className="btn btn-dark" disabled={!username || !name || !email}>Submit</button>
            </div>
        </form>
    )
 
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}} >
            {error}
        </div>
    );
 
    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' :'none'}}>
            Profile updated
        </div>
    );
 
    const showLoading = () => (
        <div className="alert alert-info" style={{display: loading ? '' : 'none'}}>
            Loading...  
        </div>
    );
    return(
        <React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-md-4 pt-5">
                        <img src={`${API}/user/photo/${username}`} width={250}  height={250}
                        className='img  img-thumbnail'
                        style={{maxHeight: 'auto', maxWidth: '100%'}}
                        alt='User Profile' />
                    </div>
                    <div className="col-md-8 pt-4">
                        {profileUpdateForm()}
                    </div>
                </div>

            </div>
        </React.Fragment>
    )

}

export default ProfileUpdate;