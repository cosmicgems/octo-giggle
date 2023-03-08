import React from 'react'
import Header from './Header';
const Layout = (props) => {
    return (
        <React.Fragment>
            <Header />
            {props.children}
            <p>footer</p>
        </React.Fragment>
    );
};

export default Layout;