import React, { useState } from 'react';
import NextNProgress from 'nextjs-progressbar';
import{ useRouter } from "next/router";
import {Router} from 'next/router';
import {APP_NAME} from '../config';
import  {isAuth, signout} from '../actions/auth';
import Search from './blog/Search';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
import Link from 'next/link';
import Subscribe from './Subscribe';


Router.onRouteChangeStart = url => NProgress.load()
Router.onRouteChangeComplete = url => NProgress.stop()
Router.onRouteChangeError = url => NProgress.stop()

function Header(args) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar className='navbar'style={{position: "sticky", zIndex: '1'} } sticky='top' expand='md' container='fluid' dark={true} >
        <NavbarBrand className='' style={{fontSize:'2rem', fontFamily: 'Italiana', fontWeight:'bolder'}} href="/">{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse className='justify-content-end' isOpen={isOpen} navbar>
          <Nav className="nav gap-1 "  navbar>

          
          <NavItem>
                <NavLink href="/blogs" style={{textDecoration:'none', color:'#F3EFE0', fontWeight: 'bold'}}>Blogs</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/blogs/categories" style={{textDecoration:'none', color:'#F3EFE0', fontWeight: 'bold'}}>Categories</NavLink>
            </NavItem>

            {!isAuth() && 
            <React.Fragment>
            <NavItem className=''>
                <NavLink href="/signup" style={{textDecoration:'none', color:'#F3EFE0', fontWeight: 'bold'}}>Signup</NavLink>
            </NavItem>
            <NavItem>
            <NavLink href="/signin" style={{textDecoration:'none', color:'#F3EFE0', fontWeight: 'bold'}}>Signin</NavLink>
            </NavItem>
            </React.Fragment>}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
              <NavLink href='/user' style={{textDecoration:'none', color:'#F3EFE0', fontWeight: 'bold'}}>
                {`${isAuth().name}'s Dashboard`}
              </NavLink>
            </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
              <NavLink href='/admin' style={{textDecoration:'none', color:'#F3EFE0', fontWeight: 'bold'}}>
                {`${isAuth().name}'s Dashboard`}
              </NavLink>
            </NavItem>
            )}
            {isAuth() && (
              <NavItem>
              <NavLink style={{cursor: 'pointer'}} onClick={() => signout(() => router.replace(`/signin`))}>
                Signout
              </NavLink>
            </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      <NextNProgress  startPosition={0.3} stopDelayMs={200} height={2.5} showOnShallow={false} />
      <Subscribe />
      <Search />
      
    </React.Fragment>
  );
};

export default Header;