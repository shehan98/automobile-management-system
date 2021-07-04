import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'
import Paypal from './Paypal'
import axios from 'axios'
import {GlobalState} from '../../../GlobalState'
import Button from '@material-ui/core/Button';
import './payment.css'

function PaymentMenu() {

    const state = useContext(GlobalState)
    const [token] = state.token
    const [image1, setImages] = useState(false)
    const [image2, setImages2] = useState(false)
    const history = useHistory()

    const [show, setShow] = useState(true);

    const [setShowSuccess] = useState(false)

    const [amount, setAmount] = useState('')

    const [method, setMethod] = useState({
        method:''
    })

    const handleMethod = e =>{
        const {name, value} = e.target;
        setMethod({...method, [name]:value})
    }
    
    const handleAmount = e =>{
        const {name, value} = e.target;
        setAmount(value)
    }

    const paymentSubmit = async e =>{
        e.preventDefault()
        try {
            await axios.post('/api/payment', {...amount}, {...method})

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const transactionSuccess = async(payment) => {
        console.log(payment)
        const {paymentID, address} = payment;

        await axios.post('/api/payment', {paymentID, address}, {
            headers: {Authorization: token}
        })

        alert("You have successfully paid.")
    }

    /*
    const transactionSuccess = (data) => {

        console.log(data)

        let variables = {
            paymentData: data
        }

        axios.post('api/payment/paypal', variables)
            .then(response => {
                if (response.data.success) {
                    setShowSuccess(true)
                } else {
                    alert("Failed to pay")
                }
            })
    }
    */

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

            setImages(res.data)

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

            setImages2(res.data)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }


    const handleDelete = async () => {
        try {
            await axios.post('/api/delete', {public_id: image1.public_id}, {
                headers: {Authorization: token}
            })
            setImages(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleDelete2 = async () => {
        try {
            await axios.post('/api/delete', {public_id: image2.public_id}, {
                headers: {Authorization: token}
            })
            setImages2(false)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            
            if(!image1){
                return alert("No image Upload")
            } else {
            await axios.post('/api/bankpayment', amount, image1, image2, {
                    headers: {Authorization: token}
                })
            }
            setImages(false)
            setImages2(false)
            history.push("/menu")
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

return (
    <div>
        Payment
        <div className="wrapper">
            <div className="paypal">
                <label htmlFor="Paypal" className="radio-label">
                    <span>Paypal</span>
                </label>
                <input
                className="radio-input"
                type="radio"
                name="method"
                value="Paypal"
                onClick={()=>setShow(true)}
                onChange={handleMethod}
                checked
            />
            </div>
            
            <div className="bank">
                <label htmlFor="bank" className="radio-label">
                    <span>Bank</span>
                </label>
                <input
                className="radio-input"
                type="radio"
                name="method"
                value="Bank"
                onClick={()=>setShow(false)}
                onChange={handleAmount}
                />
            </div>
        </div>
        {
            show?
            <div className="paypal-payment">
                <h1>paypal payment</h1>
                <div>
                    <form onSubmit={paymentSubmit}>
                        <input 
                        type="text"
                        name="amount" 
                        required 
                        placeholder="Amount"
                        value={amount.amount}
                        onChange={handleAmount}
                        />
                        <Button variant="contained" color="primary" type="submit">Confirm</Button>
                    </form>
                </div>

                <Paypal
                    toPay={amount}
                    onSuccess={transactionSuccess}
                    transactionError={transactionError}
                    transactionCancelled={transactionCancelled}
                />
            </div>
            : 
            <div className="bank-payment">
                <h1>bank payment</h1>
                <form onSubmit={handleSubmit}>
                    <div className="amount">
                        <input 
                        type="text"
                        name="amount" 
                        required 
                        placeholder="Amount"
                        value={amount}
                        onChange={handleAmount}
                        />
                    </div>
                    <div className="front-side">
                        <label htmlFor="front-side">Front Side</label>
                        <div className="upload">
                            <input type="file" name="file" id="file_up" onChange={handleUpload}/>
                            {
                            <div id="file_img" style={styleUpload}>
                                <img src={image1 ? image1.url : ''} alt="" />
                                <span onClick={handleDelete}>X</span>
                            </div>
                            }
                        </div>
                    </div>

                    <div className="back-side">
                        <label htmlFor="back-side">back Side</label>
                        <div className="upload">
                            <input type="file" name="file" id="file_up" onChange={handleUpload2}/>
                            {
                            <div id="file_img" style={styleUpload2}>
                                <img src={image2 ? image2.url : ''} alt="" />
                                <span onClick={handleDelete2}>X</span>
                            </div>
                            }
                        </div>
                    </div>

                    <Button variant="contained" color="primary" type="submit">Send</Button>
                </form>
            </div>
        }

    </div>
)
}

export default PaymentMenu