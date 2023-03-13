import Layout from '../../../components/Layout'
import Link from 'next/link';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';
import Tag from '../../../components/crud/Tag';

const CategoryTag = () => {

    const handleChange = name => e =>{
        // console.log(e.target.value);
        const value = name === 'photo' ? e.target.files[0] : e.target.value
        formData.set(name, value)
        setValues({...values, [name]: value, formData, error: ''});
    };
    
    return(
    <Layout>
    <Admin>
    <div className='container-fluid'>
        <div className='row'>
        <div className='col-sm-12'>
            <h2>Manage Categories and Tags</h2>
        </div>
            
            <div className='col-sm-12 col-md-6 pt-5 pb-5'>
                <Category/>
            </div>
            <div className='col-sm-12 col-md-6 pt-5 pb-5'>
                <Tag />
            </div>
        </div>
    </div></Admin>
    </Layout>
    )
    };

export default CategoryTag;