import Link from 'next/link'
import parse from 'html-react-parser';
import React, {useState} from 'react';
import { listSearch } from '../../actions/blog';
import {useMediaQuery} from 'react-responsive';




const Search = () => {
    const isMobile = useMediaQuery({
        query: '(max-width: 431px)'
    })
    const isTablet = useMediaQuery({
        query: '(min-width: 446px)'
    })
    const isLaptop = useMediaQuery({
        query: '(min-width: 1200px)'
    })
    const isDesktop = useMediaQuery({
        query: '(min-width: 1920px)'
    })
  
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const {search, results, searched, message} = values;

    const searchSubmit = e => {
        e.preventDefault()
        listSearch({search}).then(data => {
            setValues({...values, results: data, search:'', searched: true, message: `${data.length} blogs found`})
        })
    }

    const handleChange = e => {
        setValues({...values, search: e.target.value, searched: false, results: []})
    }

    const searchedBlogs = (results = []) => {
        return(
            <div className='jumbotron bg-white p-5' >
                {message && <p className='pt-4 text-muted font-italic' >{message}</p>}
                {results.map((blog, i) => {
                    return (
                        <div>
                        <Link  key={i} style={{color: '#181818'}} href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                    </div>
                    )
                    
                })}
            </div>
        )
    }
    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className='row ' style={{paddingInline: '17.5vw'}}>
                
                <div className='col-9 '>

                    <input type='search' className='form-control  form-control-sm' placeholder='Search for blogs' onChange={handleChange} />

                </div>
                
                <div className='col-3 d-grid'>

                    <button className='btn btn-block btn-outline-light btn-sm' type='submit'>Search</button>

                </div>
            </div>
        </form>
    );

return (
    <div className='container-fluid' style={{background: '#434242', fontFamily:'Italiana'}}>

        {isMobile &&
        <React.Fragment>
            <div className='py-2'>
                {searchForm()}
            </div>
            <div>
                {searched && <div style={{ marginTop: ''}}>{searchedBlogs(results)}</div>}
            </div>
        </React.Fragment>
            
        }

        {isTablet && !isLaptop &&
        <React.Fragment>
            <div className='py-3'>
                {searchForm()}
                
            </div>
            <div>
                {searched && <div style={{ marginTop: '-120px'}}>{searchedBlogs(results)}</div>}
            </div>
            
        </React.Fragment>
            
        }

        {isLaptop && 
        <React.Fragment>
            <div className='py-2'>
                {searchForm()}
                
            </div>
            <div>
                {searched && <div style={{ marginTop: '-120px'}}>{searchedBlogs(results)}</div>}
            </div>
            
        </React.Fragment>
            
        }
        
    </div>
)
};

export default Search;