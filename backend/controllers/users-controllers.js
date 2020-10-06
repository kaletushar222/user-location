const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')
const User = require('../models/user');
const HttpError = require('../models/http-error');
const user = require('../models/user');

const DUMMY_USERS = [
    {
        id: "u1",
        name : "Tushar Kale",
        email : "kaletushar222@gmail.com",
        password : "tushar"
    },
    {
        id: "u2",
        name : "Akshay Kale",
        email : "akshay@gmail.com",
        password : "akshay"
    }
]

const getUsers = (req, res, next)=> {
    res.json({ users : DUMMY_USERS});
}

const signup = async (req, res, next)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError('Invalid inputes passed check data', 422))
    }
    const { name, email, password} = req.body
    
    let existingUser 
    try{
        existingUser = User.findOne({email: email})
    }
    catch(err){
        const error = new HttpError('Signup failed, Please try again later', 500)
        return next(error)
    }
    console.log("existingUser : ", existingUser)
    if(existingUser){
        const error = new HttpError('User exists already, Please login instead', 422)
        return next(error)
    }
    
    const createdUser = new user({
        name,
        email,
        image:"https://source.unsplash.com/random",
        password,
        places
    })

    try{
        await createdUser.save()
    }
    catch (err){
        console.log(err)
        const error = new HttpError(
            'Creating user failed, Please try again.',
            500
        );
        return next(error);
    }

    res.status(201).json({user : createdUser.toObject({ getters: true})})
}

const login = (req, res, next)=> {
    const { email, password } = req.body;
    const identified_user = DUMMY_USERS.find(user => user.email == email)
    if(!identified_user || identified_user.password !== password){
        return next(new HttpError("User not found", 401))
    }
    
    res.json({message: 'Logged in'})
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;