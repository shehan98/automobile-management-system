import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
    <div className='footer-container'>
        <section className='footer-subscription'>
        <p className='footer-subscription-heading'>
            JPN Automobiles
        </p>
        </section>
        <div class='footer-links'>
        <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
            <h2>About Us</h2>
            <p>We are car selling company in the local market that imports and sells cars at vehicle auction in various countries</p>
            </div>
            <div class='footer-link-items'>
            <h2>Contact Us</h2>
            <Link to='/'>Contact Box</Link>
            <Link to='/'>Hotline</Link>
            <Link to='/'>Email</Link>
            </div>
        </div>
        <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
            <h2>Opening Hours</h2>
            <p>Mon-Sun: 09.00am - 18.00pm</p>
            <p>Poya days are closed</p>
            </div>
            <div class='footer-link-items'>
            <h2>Social Media</h2>
            <Link to='/'>Instagram</Link>
            <Link to='/'>Facebook</Link>
            <Link to='/'>Youtube</Link>
            <Link to='/'>Twitter</Link>
            </div>
        </div>
        </div>
        <section class='social-media'>
        <div class='social-media-wrap'>
            <div class='footer-logo'>
            <Link to='/' className='social-logo'>
                ST-Solutions
                <i class="fab fa-stripe-s" />
            </Link>
            </div>
            <small class='website-rights'>ST-Solutions © 2021</small>
            <div class='social-icons'>
            <Link
                class='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
            >
                <i class='fab fa-facebook-f' />
            </Link>
            <Link
                class='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
            >
                <i class='fab fa-instagram' />
            </Link>
            <Link
                class='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
            >
                <i class='fab fa-youtube' />
            </Link>
            <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
            >
                <i class='fab fa-twitter' />
            </Link>
            <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
            >
                <i class='fab fa-linkedin' />
            </Link>
            </div>
        </div>
        </section>
    </div>
    );
}

export default Footer;
