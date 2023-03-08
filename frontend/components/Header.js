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


Router.onRouteChangeStart = url => NProgress.load()
Router.onRouteChangeComplete = url => NProgress.stop()
Router.onRouteChangeError = url => NProgress.stop()

function Header(args) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.Fragment>
      <Navbar color='' expand='md' container='fluid' light={true} >
        <NavbarBrand className='fw-bold' href="/">{APP_NAME}</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>

          
            <NavItem>
                <Link href="/blogs">Blogs</Link>
            </NavItem>

            {!isAuth() && 
            <React.Fragment>
            <NavItem>
                <Link href="/signup">Signup</Link>
            </NavItem>
            <NavItem>
            <Link href="/signin">Signin</Link>
            </NavItem>
            </React.Fragment>}
            {isAuth() && (
              <NavItem>
              <NavLink style={{cursor: 'pointer'}} onClick={() => signout(() => router.replace(`/signin`))}>
                Signout
              </NavLink>
            </NavItem>
            )}
            {isAuth() && isAuth().role === 0 && (
              <NavItem>
              <Link href='/user'>
                {`${isAuth().name}'s Dashboard`}
              </Link>
            </NavItem>
            )}
            {isAuth() && isAuth().role === 1 && (
              <NavItem>
              <Link href='/admin'>
                {`${isAuth().name}'s Dashboard`}
              </Link>
            </NavItem>
            )}
          </Nav>
          <NavbarText>Simple Text</NavbarText>
        </Collapse>
      </Navbar>
      <NextNProgress  startPosition={0.3} stopDelayMs={200} height={5} showOnShallow={false} />
      <Search />
    </React.Fragment>
  );
};

export default Header;