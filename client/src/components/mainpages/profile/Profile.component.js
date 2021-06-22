import React, {useContext, useState, useEffect, Component} from 'react'
import {useParams, Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'

function Profile() {
    
    const params = useParams()
    const state = useContext(GlobalState)
    const users = state.UserAPI.users
    const [userProfile, setUserProfile] = useState([])

    useEffect(() =>{
        if(params){
            
            setUserProfile(users)
            
        }
    }, [params, users])
    
    
    console.log(userProfile)
    return (
        <div>
            <div className='detail'>
                <div className='row'>
                    <label>First Name: </label>
                    <p>{users.firstName}</p>
                </div>
                <div className='row'>
                    <label>Last Name: </label>
                    <p>{users.lastName}</p>
                </div>
                <div className='row'>
                    <label>NIC: </label>
                    <p>{users.nic}</p>
                </div>
            </div>
        </div>
    )
}

export default Profile