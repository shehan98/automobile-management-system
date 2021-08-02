import React, {useState, useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import axios from 'axios'
import Logo from '../../images/logo1.png'

import { Button } from './Button';
import { Link } from 'react-router-dom';
import './header.css';

import LogoutConfirmDialog from './logoutConfirmDialog';

function Header() {
    const state = useContext(GlobalState)
    const [isLogged, setIsLogged] = state.UserAPI.isLogged
    const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin
    const [favourite] = state.UserAPI.favourite

    const [confirmDialog, setConfirmDialog] = useState({isOpen:false})

    const logoutUser = async () =>{
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

            await axios.get('/user/logout')
            localStorage.clear()
            setIsAdmin(false)
            setIsLogged(false)
        
        
    }



    const adminRouter = () =>{
        return(
            <>
                <li className='nav-item'><Link to="/appointment-list" className='nav-links-admin'>DASHBOARD</Link></li>
                <li className='nav-item'><Link to="/category" className='nav-links-admin'>CREATE CATEGORY</Link></li>
                <li className='nav-item'><Link to="/create_vehicle" className='nav-links-admin'>CREATE VEHICLE</Link></li>
                <li className='nav-item'><Link to="/create-notification" className='nav-links-admin'>CREATE NOTIFICATION </Link></li>
            </>
        )
    }

    const loggedRouter = () =>{
        return(
            <>
                <li className='nav-item'><Link to="/" className='btn2' onClick={() => {setConfirmDialog({
                    isOpen: true,
                    onConfirm: () => {logoutUser()}
                })
                }}>Logout</Link></li>
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

            {isLogged?
            <div className="navbar-icon-set">
                <Link to='/messenger' className='navbar-icon'>
                    <i class="fas fa-comments"/>
                </Link>
                {/* <div className="fav-icon">
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
                </div> */}
                {isAdmin ? "" : (
                <Link to='/notifications' className='navbar-icon'>
                    <i class="fas fa-bell"/>
                </Link>
                )}
                <Link to='/profile' className='navbar-icon'>
                    <i class="fas fa-user-circle"/>
                </Link>
            </div>
            : "" }

            {
                isLogged ? loggedRouter() : <Button />
            }

        </nav>

        <LogoutConfirmDialog 
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
        />

        </header>
    )
}

export default Header
