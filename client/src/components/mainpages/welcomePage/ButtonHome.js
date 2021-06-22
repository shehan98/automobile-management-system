import React from 'react';
import './buttonHome.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn3--primary', 'btn3--outline', 'btn3--test'];

const SIZES = ['btn3--medium', 'btn3--large'];

export const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
    <Link to='/menu' className='btn3-mobile'>
        <button
        className={`btn3 ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
        >
        {children}
        </button>
    </Link>
    );
};