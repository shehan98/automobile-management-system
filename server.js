require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Routes
app.use('/user', require('./routes/userRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/api', require('./routes/upload'))
app.use('/api', require('./routes/vehicleRouter'))
app.use('/api/conversations', require('./routes/conversation'))
app.use('/api/messages', require('./routes/messages'))
app.use('/api', require('./routes/PaymentRouter'))

app.use('/api/appointments', require('./routes/appointmentRouter'))
app.use('/api/slots', require('./routes/slotRouter'))

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})

app.get('/', (req, res) => {
    res.json({msg: "Welocome my website"})
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})

//email
app.get('/api', ()=>{
    resizeBy.send('Get Inquiries form')
})

app.post('/api/form', (req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail' ,
        port:465,
        auth:{
            user:'tharukakgas@gmail.com',
            pass:'shehantest0000'
        }
    });

    let mailOptions={
        from:data.email,
        to:'tharukakgas@gmail.com',
        subject:`JPN inquiry from ${data.fullName}`,
        html:`
            <h1 style="color:blue">Inquiries - JPN Automobiles</h1>
            <h3>Personal Informations</h3>
            <ul>
                <li>Full Name: ${data.fullName}</li>
                <li>Email: ${data.email}</li>
                <li>Hotline: ${data.hotline}</li>
            </ul>

            <h3>Message</h3>
            <p>${data.message}</p>
        `
    };

    smtpTransport.sendMail(mailOptions, (error, response)=>{
        if(error){
            res.send(error)
            console.log("bug")
        }
        else{
            res.send('Success')
            console.log(response)
            console.log("success")
        }
    })

    smtpTransport.close();

})

app.post('/api/requestprice', (req,res)=>{
    let data = req.body
    let smtpTransport = nodemailer.createTransport({
        service:'Gmail' ,
        port:465,
        auth:{
            user:'tharukakgas@gmail.com',
            pass:'shehantest0000'
        }
    });

    let mailOptions={
        from:data.email,
        to:'tharukakgas@gmail.com',
        subject:`JPN Price Request from ${data.email}`,
        html:`
            <h1 style="color:blue">Price Request - JPN Automobiles</h1>
            <h3>Customer</h3>
            <ul>
                <li>Email: ${data.email}</li>
            </ul>
            <br/>

            <h3>Vehicle Information</h3>
            <ul>
                <li>Vehicle ID: ${data.vehicle_id}</li>
                <li>Brand: ${data.brand}</li>
                <li>Model: ${data.model}</li>
                <li>Color: ${data.color}</li>
                <li>Grade: ${data.grade}</li>
                <li>Transmission: ${data.gear}</li>
                <li>Year of Manufacture: ${data.manu_yr}</li>
                <li>Cylinder Capacity: ${data.cylinder_cap} cc</li>
            </ul>
        `
    };

    smtpTransport.sendMail(mailOptions, (error, response)=>{
        if(error){
            res.send(error)
            console.log("bug")
        }
        else{
            res.send('Success')
            console.log(response)
            console.log("success")
        }
    })

    smtpTransport.close();

})