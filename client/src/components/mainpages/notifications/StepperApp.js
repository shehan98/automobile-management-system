import React, {useState, useContext} from 'react'
import './stepperApp.css'

import Stepper from './Stepper'

import Button from '@material-ui/core/Button';
import { GlobalState } from '../../../GlobalState';
import axios from 'axios';

import Dashboard from '../dashboard/Dashboard';

function StepperApp() {
    const [currentStep, addStepNumber] = useState('')
    const state = useContext(GlobalState)
    const [customers] = state.UserAPI.customers
    const [customer, setCustomer] = useState('')

    const handleAddStepNumber=(e)=>{
        const value = e.target.value
        addStepNumber(value)
    }

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setCustomer({...customer, [name]:value})
    }

    const stepsArray = [
        "Initial Payment Approval",
        "Auction Process",
        "Vehicle Release",
        "Full Payment Appproval",
        "Delivery to Sri Lanka",
        "Arrive to harbour",
        "All Processes Completed"
    ];

    const formSubmit = e => {
        e.preventDefault();
        try {
            if(currentStep == 1){
                axios.post('http://localhost:5000/api/notification/setStep', {currentStep, ...customer})
            }
            else{
                const url = customer.customer
                axios.put('http://localhost:5000/api/notification/updateStep/'+ url, {currentStep, url})

            }

            addStepNumber('')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div>
            <div><Dashboard /></div>
            <div className="stepper-admin">
                <div className="stepper-container-horizontal">
                    <Stepper steps={stepsArray} currentStepNumber={currentStep} />
                </div>
                <div>
                    <form onSubmit={formSubmit}>

                    <div className="form-group"> 
                        <label className="not-label">Customer </label>
                        <select
                            name="customer"
                            required
                            className="not-form-control"
                            value={customers.email}
                            onChange={handleChangeInput}>
                            <option value="">Please select a customer</option>
                            {
                                customers.map(user => (
                                    <option value={user.email} key={user._id}>
                                        {user.email}
                                    </option>
                                ))
                            }
                        </select>
                    </div>

                        <div >
                            <label className="not-label" style={{margin:"70px 70px 70px 70px"}}>Step Number</label>
                            <input className="stepper-input" type="number" value={currentStep} onChange={handleAddStepNumber} min="0" max="8"/>
                        </div>
                        <div className="stepper-btn">
                            <Button type="submit" variant="contained" color="secondary">Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StepperApp