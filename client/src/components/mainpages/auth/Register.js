import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import './auth.css'
import background from "../../../images/background1.jpg"
import Logo from '../../../images/logo1.png'

function Register() {
    const [user, setUser] = useState({
        firstName:'', lastName:'', nic:'', email:'', contactNumber:'', address:'', password: '', password2:''
    })

    const onChangeInput = e =>{
        const {name, value} = e.target;
        setUser({...user, [name]:value})
    }

    const registerSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/user/register', {...user})

            //.then(response => this.useState({userId: response.data._id}))

            localStorage.setItem('firstLogin', true)

            
            window.location.href = "/";
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
            <form className="form" onSubmit={registerSubmit}>
                <h1>Sign Up</h1>
                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input className='form-input' type="text" name="firstName" required
                placeholder="Shehan" value={user.firstName} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Last Name</label>
                <input className='form-input' type="text" name="lastName" required
                placeholder="Tharuka" value={user.lastName} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">NIC</label>
                <input className='form-input' type="text" name="nic" required
                placeholder="123456789V" value={user.nic} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Email</label>
                <input className='form-input' type="email" name="email" required
                placeholder="shehan@gmail.com" value={user.email} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Contact Number</label>
                <input className='form-input' type="text" name="contactNumber" required
                placeholder="07********" value={user.contactNumber} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Address</label>
                <input className='form-input' type="text" name="address" required
                placeholder="No.30, Marata road, tangalle." value={user.address} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Password</label>
                <input className='form-input' type="password" name="password" required autoComplete="on"
                placeholder="Enter your password" value={user.password} onChange={onChangeInput} />
                </div>

                <div className='form-inputs'>
                <label htmlFor="firstName" className="form-label">Confirm Password</label>
                <input className='form-input' type="password" name="password2" required
                placeholder="Reenter your password" value={user.password2} onChange={onChangeInput} />
                </div>

                <button className="form-input-btn" type="submit">Sign up</button>
                
                <div className="form-input-extra">
                    <span>Have you an account?  </span>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Register