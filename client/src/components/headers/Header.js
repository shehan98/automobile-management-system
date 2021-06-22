import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import Logo from '../../images/logo1.png'

import { Button } from './Button';
import { Link } from 'react-router-dom';
import './header.css';

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.UserAPI.isLogged
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin
    const [favourite] = state.UserAPI.favourite

    const logoutUser = async () =>{
        if(window.confirm('Are you sure you want to Log out')){
            await axios.get('/user/logout')
            localStorage.clear()
            setIsAdmin(false)
            setIsLogged(false)
        }
        
    }



    const adminRouter = () =>{
        return(
            <>
                <li className='nav-item'><Link to="/dashboard" className='nav-links-admin'>Dashboard</Link></li>
                <li className='nav-item'><Link to="/category" className='nav-links-admin'>Create Category</Link></li>
                <li className='nav-item'><Link to="/create_vehicle" className='nav-links-admin'>Create Vehicle</Link></li>
                <li className='nav-item'><Link to="/add_message" className='nav-links-admin'>Add message</Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li className='nav-item'><Link to="/" className='btn2' onClick={logoutUser}>Logout</Link></li>
            </>
        )
    }


    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    return (
        <header>
            <nav className='navbar'>
            <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                <img className='nav-img' src={Logo} alt='company logo'/>
                <span>JPN AUTOMOBILES</span>
            
            </Link>
            <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
            </div>
            <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
                <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                HOME
                </Link>
            </li>
            <li className='nav-item'>
                <Link
                to='/about-us'
                className='nav-links'
                onClick={closeMobileMenu}
                >
                ABOUT US 
                </Link>
            </li>
            <li className='nav-item'>
                {
                    isAdmin ? "" : (
                        <Link
                        to='/contact-us'
                        className='nav-links'
                        onClick={closeMobileMenu}
                        >
                        CONTACT US
                        </Link>
                    )
                }
                
            </li>
            <li className='nav-item'>
                <Link
                to='/register'
                className='nav-links'
                onClick={closeMobileMenu}
                >
                SIGN UP
                </Link>
            </li>
            <li>
                <Link
                to='/login'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
                >
                LOGIN
                </Link>
            </li>
            </ul>

            {isAdmin && adminRouter()}

            <div className="navbar-icon-set">
                <div className="fav-icon">
                {
                    isAdmin ? "" : (
                        <span>{favourite.length}</span>
                    )
                }
                {
                    isAdmin ? "" : (
                        <Link to='/fav' className='navbar-icon'>
                        <i class="fas fa-heart-circle" />
                        </Link>
                        )
                }
                </div>
                
                <Link to='/notifications' className='navbar-icon'>
                    <i class="fas fa-bell"/>
                </Link>
                <Link to='/profile' className='navbar-icon'>
                    <i class="fas fa-user-circle"/>
                </Link>
            </div>

            {
                isLogged ? loggedRouter() : <Button />
            }

        </nav>
        </header>
    )
}

export default Header
