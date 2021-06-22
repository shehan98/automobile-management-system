import React from 'react'
import '../../../App.css'
import { Button } from './ButtonHome'
import './heroSection.css';
import Background from '../../../images/background.png'
import Logo from '../../../images/logo1.png'

function HeroSection() {
    return (
    <div className='background' style={{ backgroundImage: `url(${Background})` }}>
    <div className='hero-container'>
        <img className='logo' src={Logo} alt='company logo'/>
        <h1>JPN</h1>
        <h2>Automobiles</h2>
        <h3>Find your perfect new guy with Drive</h3>
        <p>We are the destination for cars in Sri Lanka</p>
        <p>Fine out what makes us different</p>
        <div className='hero-btns'>
        <Button
            className='btns'
            buttonStyle='btn3--primary'
            buttonSize='btn3--large'
            onClick={console.log('hey')}
        >
            GET STARTED <i class="fas fa-sign-in-alt" />
        </Button>
        </div>
    </div>
    </div>
    );
}

export default HeroSection;
