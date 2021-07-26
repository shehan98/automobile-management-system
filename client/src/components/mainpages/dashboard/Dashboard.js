import React from 'react'
import { Link } from 'react-router-dom'
import './dashboard.css'
import { Button } from '@material-ui/core'

function Dashboard() {

    return (

        <div>
            <div className="dashboard-line">
                <div className="dashboard-btn">
                    <Link to='/appointment-list'>
                        <Button variant="contained" color="default" to="/appointment-list">APPOINTMENT LIST</Button>
                    </Link>
                </div>
                <div className="dashboard-btn">
                    <Link to='/payment-list'>
                        <Button variant="contained" color="default" to="/payment-list">PAYMENT LIST</Button>
                    </Link>
                </div>
                <div className="dashboard-btn">
                    <Link to='/not-step'>
                        <Button variant="contained" color="primary">STEP UPDATER</Button>
                    </Link>
                </div>
                <div className="dashboard-btn">
                    <Link to='/calender'>
                        <Button variant="outlined" color="secondary">CALENDAR</Button>
                    </Link>
                </div>
            </div>
        </div>
        
    )
}

export default Dashboard