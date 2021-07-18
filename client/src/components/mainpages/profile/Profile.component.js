import React, {useContext, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'
import './profile.css'
import Button from '@material-ui/core/Button';
import background from "../../../images/background1.jpg"
import axios from 'axios';

function Profile() {
    
    const params = useParams()
    const state = useContext(GlobalState)
    const users = state.UserAPI.users
    const [currentUser, setcurrentUser] = useState({})
    const [token] = state.token


    const [onEditProfile, setOnEditProfile] = useState(false)

    useEffect(() =>{
        if(params){

            let userData = localStorage.getItem('user')
            let user = JSON.parse(userData)
            
            setcurrentUser(user)
        }
        
    }, [])

    //const handleChangeUpdate = () => setOnEditProfile(onEditProfile)
    
    const handleChangeInput = e =>{
        const {name, value} = e.target
        setcurrentUser({...currentUser, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault(e)
        try {
            await axios.put(`/user/profile/${currentUser._id}`, {...currentUser}, {headers: {Authorization: token}})
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div >
            <div className='profile-detail'>
                <form className="profile-form" onSubmit={handleSubmit}>
                <h1>Profile</h1>
                <div className='profile-row'>
                    <label className="profile-label">NIC: </label>
                    <p className="profile-value">{currentUser.nic}</p>
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Email: </label>
                    <p className="profile-value">{currentUser.email}</p>
                </div>
                <div className='profile-row'>
                    <label className="profile-label">First Name: </label>
                    {onEditProfile?
                    <input type="text" name="firstName" value={currentUser.firstName} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.firstName}</p>
                    }
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Last Name: </label>
                    {onEditProfile?
                    <input type="text" name="lastName" value={currentUser.lastName} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.lastName}</p>
                    }
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Contact Number: </label>
                    {onEditProfile?
                    <input type="text" name="contactNumber" value={currentUser.contactNumber} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.contactNumber}</p>
                    }
                </div>
                <div className='profile-row'>
                    <label className="profile-label">Address: </label>
                    {onEditProfile?
                    <input type="text" name="address" value={currentUser.address} onChange={handleChangeInput}/>
                    :
                    <p className="profile-value">{currentUser.address}</p>
                    }
                </div>

                {onEditProfile?
                <Button variant="contained" color="primary" type="submit" onClick={() => {setOnEditProfile(false)}, {handleSubmit} } className="profile-update">Submit</Button>
                :
                <Button variant="contained" color="primary" onClick={() =>{setOnEditProfile(true)}} className="profile-update">Update</Button>
                }
                
                </form>
            </div>
        </div>
    )
}

export default Profile