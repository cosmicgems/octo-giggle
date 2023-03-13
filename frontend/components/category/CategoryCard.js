import React from "react";

const CategoryCard = () => {
    return (
        <React.Fragment>
            <div style={{
                height: '15vh',
                width:'100%',
            }}>
                        <Link style={{textDecoration: 'none'}}  href={`/blogs/${blog.slug}`}>
                            <Image style={{height:'30vh',  objectFit: 'cover', position:'absolute', zIndex: '-1'}} className="img-fluid"   width={1920} height={1080}  src={`${API}/blog/photo/${blog.slug}`}  alt="pic"/>
                            
                            <div style={{background: 'rgba(34, 34, 34, .25)', height: '30vh'}}>
                            <h6 style={{ color: '#EEEEEE', paddingBlockStart: '20vh', textAlign: 'center'}}>{blog.title}</h6>
                            
                            </div>
                            <p style={{position:'absolute', color:'#222222'}}>{(blog.excerptmobile)} <Link style={{textDecoration: 'underline', fontStyle: 'italic', borderColor: '#22A39F', color: '#22A39F'}} className="fw-bold  pt-2" href={`/blogs/${blog.slug}`} >
                                        Read more
                                    </Link> </p>
                                    
                            
                            
                        </Link>

            </div>
        </React.Fragment>
    )
}