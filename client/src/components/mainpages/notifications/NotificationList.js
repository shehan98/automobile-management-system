import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './notification.css'
import {format} from "timeago.js"

import Stepper from './Stepper'
import './stepperApp.css'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
    },
    },
}));

const CreateNotification = props => (
    <div className="not-list-element">
    <tr>
        <td className="not-title">{props.notification.title}</td>
        <td className="not-date">{format(props.notification.createdAt)}</td>
    </tr>
    <tr>
        <td className="not-msg">{props.notification.message}</td>
    </tr>
    <tr>
        <td><a href={props.notification.document1.url} download="image_1.jpg"><embed src={props.notification.document1.url} onclick='this.src="full_size.png"' width="300" height="200" className="not-img"/></a></td>
        <td><a href={props.notification.document2.url} download="image_2.jpg"><embed src={props.notification.document2.url} onclick='this.src="full_size.gif"' width="300" height="200" className="not-img-2"/></a></td>
        <td><a href={props.notification.document3.url} download="image_3.jpg"><embed src={props.notification.document3.url} onclick='this.src="full_size.gif"' width="300" height="200" className="not-img-3"/></a></td>
        <td><a href={props.notification.document4.url} download="image_4.jpg"><embed src={props.notification.document4.url} onclick='this.src="full_size.gif"' width="300" height="200" className="not-img-4"/></a></td>
    </tr>
    <tr>
        <td>
            {(Object.keys(props.notification.document5).length === 0) ? "" :
                <a href={props.notification.document5.url} download="your_doc.pdf"><div className={useStyles.root}><Button color="primary" variant="outlined">Download Documents</Button></div></a>
            }
            
        </td>
    </tr>
    </div>
)

const AllNotificationList = () => {
    const params = useParams()
    const [currentUser, setcurrentUser] = useState({})
    const [notifications, setNotifications] = useState([])
    const [cStep, setcStep] = useState('')

    useEffect(() =>{
        if(params){

            let userData = localStorage.getItem('user')
            let user = JSON.parse(userData)
            
            setcurrentUser(user)
        }

        axios.get('http://localhost:5000/api/notification/getAll')
            .then(response => {
                setNotifications(response.data);
                
            })
            .catch((error) => {
                console.log(error);
            })

            console.log(currentUser.email)
            axios.get(`http://localhost:5000/api/notification/getStep/${currentUser.email}`)
            
            .then(response => {
                console.log("step", response)
                //setNotificationStep(response.data);
                let step = response
                setcStep(step)
                console.log(step)
            })
            .catch((error) => {
                console.log(error);
            })
        
        
    }, [])

    const notificationList = () => {
        return notifications.map(currentnotification => {
            if(currentUser.email === currentnotification.customer){
                return <CreateNotification notification={currentnotification} key={currentnotification._id}/>;
            }
        })
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/notification/getStep')
            .then(response => {
                response.data.forEach(d => {
                    if(currentUser.email === d.customer){
                        setcStep(d.step)
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
    }, []);

    console.log(cStep)

    const stepsArray = [
        "Initial Payment Approval",
        "Auction Process",
        "Vehicle Release",
        "Full Payment Appproval",
        "Delivery to Sri Lanka",
        "Arrive to harbour",
        "All Processes Completed"
    ];

    return (
        <div>

            <div className="stepper-container-horizontal">
                <Stepper steps={stepsArray} currentStepNumber={cStep} />
            </div>

            <h3 className="not-list-header">Notifications</h3>
            <hr/>
                <div>
                    <table>
                    <tbody>
                        {notificationList() }
                    </tbody>
                    </table>
                </div>
        </div>
            )
    
}

export default AllNotificationList;