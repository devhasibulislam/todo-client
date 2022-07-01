import React, { useRef } from 'react';
import '../styles/nav.css';
import CustomLink from './CustomLink';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const navRef = useRef();
    const showNavbar = () => {
        navRef.current.classList.toggle('responsive_nav');
    };

    return (
        <header>
            <CustomLink to={'/'}><h3>Todo app logo</h3></CustomLink>
            <nav ref={navRef}>
                <CustomLink onClick={showNavbar} to={'/completeTasks'}>Completed tasks</CustomLink>
                <CustomLink onClick={showNavbar} to={'/myTasks'}>My tasks</CustomLink>
                <CustomLink onClick={showNavbar} to={'/todo'}>Todo</CustomLink>
                <CustomLink onClick={showNavbar} to={'/calender'}>Calender</CustomLink>
                <button className='nav-btn close-nav-btn' onClick={showNavbar}><FaTimes /></button>
            </nav>
            <button className='nav-btn' onClick={showNavbar}><FaBars /></button>
        </header>
    );
};

export default Navbar;
