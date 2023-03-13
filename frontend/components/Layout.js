import React from 'react'
import Footer from './Footer';
import Header from './Header';
const Layout = (props) => {
    return (
        <React.Fragment>
        <div style={{backgroundAttachment: 'fixed', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize:'cover', minHeight:'100vh', position: 'absolute'}}>
            <video autoPlay muted loop className="video" playsInline={true}  >  
                <source src="/static/images/shimmer-long.mp4" />
            </video>
        </div>
            
            <div className='body' style={{fontFamily:'Martel Sans'}}>
                <Header />
                <div>
                    {props.children}
                </div>
            
                <Footer/>
            </div>
            
        </React.Fragment>
    );
};

export default Layout;