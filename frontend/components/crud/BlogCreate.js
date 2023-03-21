import Link from "next/link";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";
import { QuillFormats, QuillModules } from "../../helpers/quill";
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false, loading: () => <p>Loading ...</p>, });
import { Editor } from '@tinymce/tinymce-react';


const CreateBlog = () => {
    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        console.log(editorRef.current.getContent());
      }
    };
    const router = useRouter();
    const token = getCookie('token')
    const blogFromLS = () => {
        if(typeof window === 'undefined') {
            return false
        }

        if(localStorage.getItem('blog')) {
            return JSON.parse(localStorage.getItem('blog'));
        } else {
            return false;
        }
    }

    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);

    const [checked, setChecked] = useState([]);
    const [checkedTag, setCheckedTag] = useState([]);

    const [body, setBody] = useState(blogFromLS());
    const [values, setValues] = useState({
        error: '',
        sizeError: '',
        success: '',
        formData: '',
        title: '',
        hidePublishButton: false
    });
    const {error, sizeError, success, formData, title, hidePublishButton} = values;

    useEffect(() => {
        setValues({...values, formData: new FormData()})
        initCategories()
        initTags()
    }, [router]);

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
                setValues({...values, error: data.error});
            } else {
                setTags(data);
            }
        });
    };

    const publishBlog = (e) => {
        e.preventDefault()
        // console.log('Ready to publish blog.');
        createBlog(formData, token).then(data => {
            if(data.error) {
                setValues({ ...values, error:data.error})
            } else {
                setValues({...values, title: '', error:'', success: `A new blog titled '${data.title}' was just successfully created.`})
                setBody('')
                setCategories([])
                setTags([])
            }
        })
    };

    const handleChange = name => e =>{
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''});
    };
    const handleBody =  e =>{
        // console.log(e);
        setBody(e)
        formData.set('body', e)
        if(typeof window != 'undefined') {
            localStorage.setItem('blog', JSON.stringify(e))
        }
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

    const handleTagToggle = (t) => () => {
        setValues({...values, error: ''});
        const clickedTag = checked.indexOf(t)
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

    const showCategories = () => {
        return (
            categories &&
            categories.map((c, i) => (
                <li key={i} className="list-unstyled">
                    <input onChange={handleToggle(c._id)}  type="checkbox" className="mr-2" />
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
                    <input onChange={handleTagToggle(t._id)}   type="checkbox" className="mr-2" />
                    <label className="form-check-label">{t.name}</label>
                </li>
            ))
        );
    };
    const showError = () => (
        <div className="alert alert-danger" style={{display: error ? '' : 'none'}}>
        {error}
        </div>
    )
    const showSuccess = () => (
        <div className="alert alert-success" style={{display: success ? '' : 'none'}}>
        {success}
        </div>
    )
    const createBlogForm = () => {
        return (
            <form onSubmit={publishBlog}>
                <div className="">
                    <label className="text-muted">Title</label>
                    <input className="form-control" value={title} onChange={handleChange('title')}></input>
                </div>
                <div className="">
                    <ReactQuill
                    className=""
                        modules={QuillModules}
                        formats={QuillFormats}
                        value={body}
                        placeholder="Write something amazing!"
                        onChange={handleBody}
                    />
                </div>
                <div className="d-grid py-3">
                    <button type="submit" className="btn btn-primary">Publish</button>
                </div>
            </form>
        )
    };

    const createTinyBlogForm = () => {
        return (
            
            <form onSubmit={publishBlog}>
            <div className="">
                <label className="text-muted">Title</label>
                <input className="form-control" value={title} onChange={handleChange('title')}></input>
            </div>
                <Editor
                        apiKey='spykjr9inft77vo8vdvtjutbm9v8uq9wrpzmzsv27j8b4mil'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        value={body}
                        onEditorChange={handleBody}
                        init={{
                        height: 500,
                        menubar: true,
                        skin: 'oxide-dark', 
                        selector: 'textarea#file-picker',
  plugins: 'image code',
  toolbar: 'undo redo | link image | code',
  /* enable title field in the Image dialog*/
  image_title: true,
  /* enable automatic uploads of images represented by blob or data URIs*/
  automatic_uploads: true,
  /*
    URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
    images_upload_url: 'postAcceptor.php',
    here we add custom filepicker only to Image dialog
  */
  file_picker_types: 'image',
  /* and here's our custom image picker*/
  file_picker_callback: function (cb, value, meta) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

    input.onchange = function () {
      var file = this.files[0];

      var reader = new FileReader();
      reader.onload = function () {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        var id = 'blobid' + (new Date()).getTime();
        var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
        var base64 = reader.result.split(',')[1];
        var blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    };

    input.click();
  },
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                        }}
                      />
                      <button type="submit" onClick={log}>Log editor content</button>
            </form>

        )
    }
    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-8">
                {/* {createBlogForm()}  */}

                {createTinyBlogForm()}







                {showError()}
                {showSuccess()}       
            </div>
            <div className="col-md-4">
                <div className="">
                    <div className="form-group pb-2">
                    <h5>Featured Image</h5>
                    <hr/>
                    <small className="text-muted ">Max size: 2.5mb</small>
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
    
};

export default CreateBlog;