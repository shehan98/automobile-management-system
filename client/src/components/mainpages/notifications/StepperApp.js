// import React, { Component } from 'react'
// import './stepperApp.css'

// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css'

// import Stepper from './Stepper'

// const options = [
//     '1', '2', '3'
// ];
// const defaultOption = options[0];

// export default class StepperApp extends Component {

//     state = {addStepNumber: ''}

//     handleAddStepNumber=(e)=>{
//         this.setState({
//             addStepNumber:e.target.value
//         })
//     }

//     formSubmit =(e) =>{
//         e.preventDefault();
//     }




//     /*
//     constructor(){
//         super();
//         this.state = {
//             currentStep: 1
//         }
//     }

//     handleClick = (clickType) => {
//         const {currentStep} = this.state;
//         let newStep = currentStep;
//         clickType === "next" ? newStep++ : newStep--;

//         this.setState({
//             currentStep: newStep
//         });
//     }
//     */

//     render() {

//         const stepsArray = [
//             "create an application",
//             "Add personal data",
//             "Add payment",
//             "Submit application",
//             "Submit application"
//         ];

//         const {currentStep} = this.state
//         console.log(currentStep)
    

//         return (
//             <div>
//                 <div className="stepper-container-horizontal">
//                     <Stepper steps={stepsArray} currentStepNumber={this.state.addStepNumber} />
//                 </div>

//                 <div className="buttons-container">
//                     <button onClick={() => this.handleClick()}>Previous</button>
//                     <button onClick={() => this.handleClick("next")}>Next</button>
//                 </div>

//                 <div>
//                     <form onSubmit={this.formSubmit}>
//                         <input type="number" value={this.state.addStepNumber} onChange={this.handleAddStepNumber} />
//                         <button type="submit">Submit</button>
//                     </form>
//                 </div>
                
//                 <div>
                
// <               Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />;
//                 </div>
//             </div>
//         );
//     }
// }

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
    
    // const [oldCustomer, setOldCustomer] = useState([])


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

    // useEffect(() =>{
    //     if(params){
    //         customers.forEach(currentCustomer => {
    //             if(currentCustomer.email === params.email) setOldCustomer(currentCustomer)
    //         })
    //     }
    // }, [params, customers])

    const formSubmit = e => {
        e.preventDefault();
        try {
            if(currentStep == 1){
                axios.post('http://localhost:5000/api/notification/setStep', {currentStep, ...customer})
            }
            else{
                const url = customer.customer
                axios.put('http://localhost:5000/api/notification/updateStep/'+ url, {currentStep, url})

                // axios.get('http://localhost:5000/api/notification/getStep')
                //     .then(response => {
                        
                //         response.data.forEach(uStep => {
                //             if(customers.email === uStep.customer){
                //                 console.log(currentStep)
                                
                //             }
                //         })
                //     })
                //axios.post(`http://localhost:5000/api/notification/setStep`, {currentStep, ...customer})
            }

            addStepNumber('')
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    return (
        <div>
            <div><Dashboard /></div>
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
    );
}

export default StepperApp