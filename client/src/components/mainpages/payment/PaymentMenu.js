import React, {useState, useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useHistory} from 'react-router-dom'
import Paypal from './Paypal'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Button from '@material-ui/core/Button';
import './payment.css'

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


function PaymentMenu() {

    const state = useContext(GlobalState)
    const [token] = state.token
    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const history = useHistory()

    const [show, setShow] = useState(false);

    const [amount, setAmount] = useState('')

    const [method, setMethod] = useState('Bank Payment')

    const params = useParams()
    const [vehicles] = state.VehiclesAPI.vehicles
    const [selectedVehicle, setSelectedVehicle] = useState([])

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const paypalMethod = "Paypal";
    const bankMethod = "Bank Payment";
  
    const handleClosePaypal = () => {
        setAnchorEl(null);
        setShow(true)
        setMethod("Paypal")
        console.log(method)
    };

    const handleCloseBank = () => {
        setAnchorEl(null);
        setShow(false)
        setMethod("Bank Payment")
        console.log(method)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    useEffect(() =>{
        if(params){
            vehicles.forEach(vehicle => {
                if(vehicle._id === params.id){
                    setSelectedVehicle(vehicle)
                }
                console.log(selectedVehicle)
            })
        }
    }, [params, vehicles])
    
    const handleAmount = e =>{
        const {name, value} = e.target;
        setAmount(value)
    }

    const transactionSuccess = async(payment) => {
        console.log(payment)
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {paymentID, address, selectedVehicle, amount, method}, {
            headers: {Authorization: token}
        })

        alert("You have successfully paid.")
    }

    const transactionError = () => {
        console.log('Paypal error')
    }

    const transactionCancelled = () => {
        console.log('Transaction cancelled')
    }

    const styleUpload = {
        display: image1 ? "block" : "none"
    }

    const styleUpload2 = {
        display: image2 ? "block" : "none"
    }

    const handleUpload = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if(!file){
                return alert("File not exist.")
            }
            if(file.size > 1920 * 1080){
                return alert("Size too large!")
            }
            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                return alert("File format is incorrect.")
            }

            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setImage1(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleUpload2 = async e =>{
        e.preventDefault()
        try {
            const file = e.target.files[0]
            if(!file){
                return alert("File not exist.")
            }
            if(file.size > 1920 * 1080){
                return alert("Size too large!")
            }
            if(file.type !== 'image/jpeg' && file.type !== 'image/png'){
                return alert("File format is incorrect.")
            }

            let formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })

            setImage2(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const handleDelete = async () => {
        try {
            await axios.post('/api/delete', {public_id: image1.public_id}, {
                headers: {Authorization: token}
            })
            setImage1(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDelete2 = async () => {
        try {
            await axios.post('/api/delete', {public_id: image2.public_id}, {
                headers: {Authorization: token}
            })
            setImage2(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            
            if(!image1){
                return alert("Please upload both images")
            }
            else if(!image2){
                return alert("Please upload both images")
            }
            else {
            await axios.post('/api/payment', {amount, image1, image2, selectedVehicle, method}, {
                    headers: {Authorization: token}
                })
            }
            setImage1(false)
            setImage2(false)
            window.alert("Payment Doduments Submited Successfully");
            history.push("/menu")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

return (
    <div>
        <div className="payment-header">PAYMENT MENU</div>

        <div className="wrapper">
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Select Payment Method
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleCloseBank} name="method" value="Bank Payment">Bank Payment</MenuItem>
                <MenuItem onClick={handleClosePaypal} name="method" value="Paypal">Paypal</MenuItem>
            </Menu>
        </div>

        {
            show?
            <div className="paypal-payment">
                <h1 className="payment-h1">PAYPAL</h1>
                <div>
                    <form>
                        <input 
                        className="payment-amount"
                        type="text"
                        name="amount" 
                        required 
                        placeholder="Amount(US$)"
                        value={amount.amount}
                        onChange={handleAmount}
                        />
                    </form>
                </div>

                <div className ="payment-paypal">
                    <Paypal
                        toPay={amount}
                        onSuccess={transactionSuccess}
                        transactionError={transactionError}
                        transactionCancelled={transactionCancelled}
                    />
                </div>
            </div>
            : 
            <div className="bank-payment">
                <h1 className="payment-h1">bANK PAYMENT</h1>
                <form className="bank-form" onSubmit={handleSubmit}>
                    <div className="amount">
                        <input 
                        className="payment-amount"
                        type="text"
                        name="amount" 
                        required 
                        placeholder="Amount(LKR)"
                        value={amount}
                        onChange={handleAmount}
                        />
                    </div>
                    <div className="front-side">
                        <label htmlFor="front-side" className="front-side-label">Front Side</label>
                        <div className="upload">
                            <input type="file" name="file1" id="file_up" onChange={handleUpload}/>
                            {
                            <div id="file_img" style={styleUpload}>
                                <img src={image1 ? image1.url : ''} alt="" />
                                <span onClick={handleDelete}>X</span>
                            </div>
                            }
                        </div>
                    </div>

                    <div className="back-side">
                        <label htmlFor="back-side" className="front-side-label">back Side</label>
                        <div className="upload">
                            <input type="file" name="file2" id="file_up" onChange={handleUpload2}/>
                            {
                            <div id="file_img" style={styleUpload2}>
                                <img src={image2 ? image2.url : ''} alt="" />
                                <span onClick={handleDelete2}>X</span>
                            </div>
                            }
                        </div>
                    </div>
                    <div className="bank-send-btn">
                        <Button variant="contained" color="primary" type="submit" style={{maxWidth: '150px', maxHeight: '50px', minWidth: '150px', minHeight: '50px'}}>Send</Button>
                    </div>
                </form>
            </div>
        }

    </div>
)
}

export default PaymentMenu