import React, { Component } from 'react'
import background from "../../../images/background1.jpg"
import Button from '@material-ui/core/Button';


var topic = {
    color: 'rgb(255, 102, 0)',
    fontSize: '40px',
    fontFamily: 'Palatino'
};

export default class RequestPrice extends Component {

    state={
        fullName:'',
        email:'',
        sent:false
    }

    render() {
        return (
            <div className="background-contact" style ={{backgroundImage: `url(${background})`}}>
            <div className="container">
                <form >
                    <div style={topic}>Request the price</div>
                    <div className="singleItem">
                        <label htmlFor="fullName">Full Name</label>
                        <input type="text" name="fullName" className="fullName" placeholder="ex: Shehan Tharuka"
                        required />
                    </div>

                    <div className="singleItem">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className="email" placeholder="ex: shehan123@hmail.com"
                        required />
                    </div>

                    <div className="btn-message">
                        <Button variant="contained" color="primary" type="submit">Send</Button>
                    </div>
                    <div className={this.state.sent ? 'msg msgAppear':'msg'}>
                        Message has been sent..!
                    </div>
                </form>
            </div>
            </div>
        )
    }
}

