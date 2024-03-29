import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import withRouter from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { QuillFormats, QuillModules } from "../../helpers/quill";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p>, });
import { API } from "../../config";
import Image from "next/image";

const BlogUpdate = () => {
    const router = useRouter();
    const [body, setBody] = useState('');

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]); // categories
    const [checkedTag, setCheckedTag] = useState([]); // tags

    const [values, setValues] = useState({
        title: '',
        error: '',
        success: '',
        formData: '',
        title: '',
        body: ''
    });


    const {title, error, success, formData} = values;
    const token = getCookie('token');

    useEffect(() => {
        setValues({ ...values});
        initBlog();
        initCategories();
        initTags();
    }, [router]);



    const initBlog = () => {
        if (router.query.slug) {
            singleBlog(router.query.slug).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setValues({ ...values, title: data.title });
                    setBody(data.body);
                    setCategoriesArray(data.categories);
                    setTagsArray(data.tags);
                    setValues({ ...values, formData: new FormData(), title: data.title });
                }
            });
        }
    };

    const setCategoriesArray = blogCategories => {
        let ca = [];
        blogCategories.map((c, i) => {
            ca.push(c._id);
        });
        setChecked(ca);
    };

    const setTagsArray = blogTags => {
        let ta = [];
        blogTags.map((t, i) => {
            ta.push(t._id);
        });
        setCheckedTag(ta);
    };


    const initCategories = () => {
        getCategories().then(data => {
            if(data.error) {
                setValues({...values, error});
            } else {
                setCategories(data);
            }
        });
    };

    const initTags = () => {
        getTags().then(data => {
            if(data.error) {
                setValues({...values, error});
            } else {
                setTags(data);
            }
        });
    };


    const handleBody = (e)  => {
        setBody(e);
        formData.set('body', e);
    };

    const editBlog = (e) => {
        e.preventDefault();
        updateBlog(formData, token, router.query.slug).then(data => {
            if(data.error) {
                console.log(data.error);
                setValues({...values, error: data.error})
            } else {
                setValues({...values, title: '', success:`Blog titled "${data.title}" is successfully updated.`});
                if(isAuth() && isAuth().role === 1) {
                    router.push(`/admin`)
                } else if(isAuth() && isAuth().role === 0) {
                    router.push(`/user`)
                }
            }
        })
    };

    const handleToggle = (c) => () => {
        setValues({...values, error: ''});
        const clickedCategory = checked.indexOf(c)
        const all = [...checked]

        if(clickedCategory === -1) {
            all.push(c)
        } else {
            all.splice(clickedCategory, 1)
        }
        console.log(all);
        setChecked(all)
        formData.set('categories', all);
    };

    const handleTagsToggle = (t) => () => {
        setValues({...values, error: ''});
        const clickedTag = checkedTag.indexOf(t)
        const all = [...checkedTag]

        if(clickedTag === -1) {
            all.push(t)
        } else {
            all.splice(clickedTag, 1)
        }
        console.log(all);
        setCheckedTag(all)
        formData.set('tags', all);
    };

    const findOutCategory = c => {
        const result = checked.indexOf(c);
        if (result != -1 ) {
            return true;
        } else {
            return false;
        }
    };


    const findOutTag = t => {
        const result = checkedTag.indexOf(t);
        if (result != -1 ) {
            return true;
        } else {
            return false;
        }
    };


    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)} checked={findOutCategory(c._id)}  type="checkbox" className="mr-2" />
                    <label className="form-check-label">{c.name}</label>
                </li>
            ))
        );
    };

    const showTags = () => {
        return (
            tags &&
            tags.map((t, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleTagsToggle(t._id)}   checked={findOutTag(t._id)}  type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };

    const handleChange = name => (e )=>{
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''});
    };

    const showError = () => {
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
            {error}
        </div>
    }
    const showSuccess = () => {
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
            {success}
        </div>
    }

    
    const updateBlogForm = () => {
        return (
            <form onSubmit={editBlog}>
                <div className="">
                    <label className="text-muted">Title</label>
                    <input className="form-control" value={title} onChange={handleChange('title')}></input>
                </div>
                <div className="">
                    <ReactQuill
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing!"
                        onChange={handleBody}
                    />
                </div>
                <div className="d-grid py-3">
                    <button type="submit" className="btn btn-primary">UPDATE</button>
                </div>
            </form>
        )
    };


    return (
        <div className="container-fluid">

            <div className="row">

                <div className="col-md-8">
                    <div className="pt-3">
                        {showSuccess()}
                        {showError()}
                    </div>  
                    {updateBlogForm()}
                    {body && (
                        <Image src={`${API}/blog/photo/${router.query.slug}`} width={1000} height={1000} alt={title} style={{width: '100%'}} /> 
                    )}
                    

                </div>


                <div className="col-md-4">
    <div className="">
    <div className="form-group pb-2">
    <h5>Featured Image</h5>
    <hr/>
    <small className="text-muted ">Max size: 1mb</small>
    <label className="btn btn-outline-info col-12">Upload Featured Image
    <input onChange={handleChange('photo')} type='file' accept="image/*"  hidden/>
    </label>
    </div>

    </div>
    <h5>Categories</h5>
    <hr />
    <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showCategories()}</ul>
    <h5>Tags</h5>
    <hr />
    <ul style={{ maxHeight: '200px', overflowY: 'scroll' }}>{showTags()}</ul>
    </div>
            
            </div>
        
        </div>
        );
}

export default BlogUpdate;