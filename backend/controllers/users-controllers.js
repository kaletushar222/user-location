const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error');

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

const signup = (req, res, next)=> {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors)
        throw  new HttpError('Invalid inputes passed check data', 422)
    }
    const { name, email, password} = req.body
    
    const hasUser = DUMMY_USERS.find(u=> u.email == email)
    if(hasUser){
        throw new HttpError('user already exists', 422)
    }

    const createdUser = {
        id: uuidv4(),
        name, 
        email, 
        password
    };

    DUMMY_USERS.push(createdUser)
    res.status(201).json({user : createdUser})
}

const login = (req, res, next)=> {
    const { email, password } = req.body;
    const identified_user = DUMMY_USERS.find(user => user.email == email)
    if(!identified_user || identified_user.password !== password){
        throw new HttpError("User not found", 401)
    }
    
    res.json({message: 'Logged in'})
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;