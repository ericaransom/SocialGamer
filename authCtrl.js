const Users = require("../models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authCtrl = {
    register: async (req,res)=>{
        try {
            const {fullname, username, email, password, gender} = req.body;
            
            const newUsername = username.toLowerCase().replace(/ /g,'');
            const user_name = await Users.findOne({username: newUsername})
            if (user_name) return res.status(400).json({msg: 'this username already exists'})
            
            const Email = await Users.findOne({email: email})
            if (Email) return res.status(400).json({msg: 'this email already exists'})

            if (password.length < 6) return res.status(400).json({msg: "password must be at least 6 characters"})

            const passwordHash = await bcrypt.hash(password,13);

            const newUser = new Users({
                fullname, username:newUsername, email, password:passwordHash, gender
            })
          
            await newUser.save(); //save the new user to the database

            const access_token= await createAccessToken({ id: newUser._id });
            const refresh_token= createRefreshToken({ id: newUser._id });
            console.log({access_token, refresh_token});

            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path:"/api/refresh_token",
                maxAge: 24*30*60*60*1000
            })

            res.json({
                msg:"registered sucessfully",
                access_token,
                user:{
                ...newUser._doc,
                password: ''
                }
            })
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    login: async (req,res)=>{
        try {
            
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },
    logout: async (req,res)=>{
        try {
            
        } catch (err) {
            res.status(500).json({msg: err.message})
    
        }
    },
    generateAccessToken: async (req,res)=>{
        try {
            
        } catch (err) {
            res.status(500).json({msg: err.message})
        }
    },

}
 
const createAccessToken = ( payload) =>{
    return jwt.sign(payload, process.env.ACCESSTOKENSECRET, {expiresIn: "1d"})
}

const createRefreshToken = ( payload) =>{
    return jwt.sign(payload, process.env.REFRESHTOKENSECRET, {expiresIn: "30d"})
}
module.exports = authCtrl