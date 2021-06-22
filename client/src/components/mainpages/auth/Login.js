import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './auth.css'
import background from "../../../images/background1.jpg"
import Logo from '../../../images/logo1.png'

function Login() {
    const [user, setUser] = useState({
        email:'', password: ''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const loginSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/login', {...user})

            localStorage.setItem('firstLogin', true)
            
            window.location.href = "/menu";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div className="background" style ={{backgroundImage: `url(${background})`}}>
        <div className="form-container">
        <div className="form-content-left">
            <img className='form-img' src={Logo} alt='company logo'/>
        </div>
        <div className="form-content-right">
            <form className="form" onSubmit={loginSubmit}>
                <h1>Log In</h1>
                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Email</label>
                <input className='form-input' type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Password</label>
                <input className='form-input' type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />
                </div>

                <button className="form-input-btn" type="submit">Login</button>
                <div className="form-input-extra">
                    <span>Don't have you an account?  </span>
                    <Link to="/register">Register</Link>
                </div> 
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login