import React, { Component } from 'react'
import "./contact.css"
import background from "../../../images/background1.jpg"
import Button from '@material-ui/core/Button';

import axios from 'axios'
import { Link } from 'react-router-dom';

var topic = {
    color: '#4BB543',
    fontSize: '40px',
    fontFamily: 'Palatino'
};

export default class Contact extends Component {

    state={
        fullName:'',
        email:'',
        hotline:'',
        message:'',
        sent:false

    }

    handlefullName=(e)=>{
        this.setState({
            fullName:e.target.value
        })
    }

    handleEmail=(e)=>{
        this.setState({
            email:e.target.value
        })
    }

    handleHotline=(e)=>{
        this.setState({
            hotline:e.target.value
        })
    }

    handleMessage=(e)=>{
        this.setState({
            message:e.target.value
        })
    }

    formSubmit =(e) =>{
        e.preventDefault();

        let data = {
            fullName:this.state.fullName,
            email:this.state.email,
            hotline:this.state.hotline,
            message:this.state.message
        }

        axios.post('/api/form', data)
        .then(res=>{
            this.setState({
                sent:true,
            },this.resetForm())
        }).catch(()=>{
            console.log('message not sent');
        })
    }

    resetForm=()=>{
        this.setState({
            fullName:'',
            email:'',
            hotline:'',
            message:''
        })

        setTimeout(()=>{
            this.setState({
                sent:false
            })
        },3000)
    }

    render() {
    return (
        <div className="background-contact" style ={{backgroundImage: `url(${background})`}}>
        <div className="container">
                <form onSubmit={this.formSubmit}>
                    <div style={topic}>Inquiries</div>
                    <div className="singleItem">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" className="fullName" placeholder="ex: Shehan Tharuka"
                        value={this.state.fullName} onChange={this.handlefullName} required />
                    </div>

                    <div className="singleItem">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="email" placeholder="ex: shehan123@hmail.com"
                        value={this.state.email} onChange={this.handleEmail} required />
                    </div>

                    <div className="singleItem">
                        <label htmlFor="hotline">Contact Number</label>
                        <input type="number" name="hotline" className="hotline" placeholder="07********"
                        value={this.state.hotline} onChange={this.handleHotline} required />
                    </div>

                    <div className="textArea singleItem">
                        <label htmlFor="message">Message</label>
                        <textarea name="message" className="message" cols="30" rows="8" placeholder="I want to know about..."
                        value={this.state.message} onChange={this.handleMessage} required ></textarea>
                    </div>

                    <div className="btn-message">
                        <Button variant="contained" color="primary" type="submit">Send</Button>
                    </div>
                    <div className={this.state.sent ? 'msg msgAppear':'msg'}>
                        Message has been sent..!
                    </div>
                </form>
                <div>
                    <label className="appointment-label">If you need to meet with us, please schedule it today.</label>
                    <Link to="/calender" className="appointment-btn">
                        <Button variant="contained" color="primary" href="#contained-buttons">ADD APPOINTMENT</Button>
                    </Link>
                </div>
            </div>
            </div>
    )
    }
}
