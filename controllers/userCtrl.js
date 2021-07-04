const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) =>{
        try {
            const {firstName, lastName, nic, email, contactNumber, address, password, password2} = req.body;

            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "The email already exists."})

            if(password.length < 6) 
                return res.status(400).json({msg: "Password is at least 6 characters long."})

            if(password !== password2) 
                return res.status(400).json({msg: "Password and Confirm password must be match."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new Users({
                firstName, lastName, nic, email, contactNumber, address, password: passwordHash
            })

            // Save mongodb
            await newUser.save()

            // Then create jsonwebtoken to authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token'
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            // If login success , create access token and refresh token
            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/user/refresh_token',
                
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg: "Please Login or Register"})

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) =>{
                if(err) return res.status(400).json({msg: "Please Login or Register"})

                const accesstoken = createAccessToken({id: user.id})

                res.json({accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }

        //res.json({rf_token})
    },

    getUser: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})

            res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getUserId: async (req, res) =>{
        try {
            const userId = await Users.findById(req.params.id)
            res.json(userId)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   // req.params.id /user/infor/:id

   
    updateUser: async (req, res) =>{
        try {
            const {firstName, lastName, contactNumber, address} = req.body;
            await Users.findOneAndUpdate({_id: req.params.id}, {
                firstName, lastName, contactNumber, address
            })
            res.json({msg: "User updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    addFavourite: async (req, res) =>{
        try {
            const user = await Users.findById(req.user.id)
            if(!user) return res.status(400).json({msg: "User does not exist."})

            await Users.findOneAndUpdate({_id: req.user.id}, {
                favourite: req.body.favourite
            })

            return res.json({msg: "Added to wish list"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}

const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl