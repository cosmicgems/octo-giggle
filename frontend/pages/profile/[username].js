import Head from "next/head";
import React, { useEffect } from "react";
import Link from "next/link";
import Layout from '../../components/Layout'
import { userPublicProfile } from "../../actions/user";
import { API, DOMAIN, APP_NAME } from "../../config";
import moment from 'moment'
import ContactForm from "../../components/form/ContactForm";

const UserProfile = ({user, blogs, query}) => {
    const head = () => (
        <Head>
            <title>{blog.title} | {APP_NAME} </title>
            <meta name="description" content={`Blogs by ${user.username}`} /> 
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:title" content={`${user.username} | ${APP_NAME}`} />
            <meta property="og:description" content={`Blogs by ${user.username}`} /> 
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`} />
            <meta property="og:site_name" content={`${APP_NAME}`} />
            
            <meta property="og:image" content={`${DOMAIN}/static/images/cosmic-logo.png`} />
            <meta property="og:image:secure_url"  content={`${DOMAIN}/static/images/cosmic-logo.png`} />
            <meta property="og:image:type" content='images/png' />
            <meta property="fb:app_id" content={`${APP_NAME}`} />
        </Head>
    )

        const showUserBlogs = () => {
            return blogs.map((blog, i) => {
                return (
                    <div>
                        <Link className="lead" style={{textDecoration: 'none'}} href={`/blogs/${blog.slug}`}>
                            {blog.title}
                        </Link>
                    </div>
                )
            })
        }
    return (
        <React.Fragment>
        <Head/>
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5>{user.name}</h5>
                                    <Link href={`${user.profile}`}>View Profile</Link>
                                    <p className="text-muted">Joined {moment(user.createdAt).fromNow()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>
                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title bg-info p-4">Recent blogs by {user.name}</h5>
                                <br/>
                                {showUserBlogs()}
                            </div>
                        </div>
                            
                        </div>
                        <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                            <h5 className="card-title bg-dark p-4" style={{color: '#EEEEEE'}}>Message {user.name}</h5>
                            <br/>
                            <ContactForm authorEmail={user.email} />
                            </div>
                        </div>
                        </div>

                    </div>

                </div>
            </Layout>
        </React.Fragment>
    )
};

UserProfile.getInitialProps = ({query}) => {
    return userPublicProfile(query.username).then(data => {
        if(data.error) {
        } else {
            return {user: data.user, createdAt: data.user.createdAt, blogs: data.blogs}
        }
    })
}

export default UserProfile;