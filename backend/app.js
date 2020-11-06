const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes')
const usersRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error')

const app = express()

app.use(bodyParser.json());

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);


app.use((req, res, next) =>{
    const error = new HttpError('Could not find this route', 404)
    throw error;
})

app.use((error, req, res, next)=>{
    if(res.headerSent){
        return next(error)
    }
    res.status(error.code || 500)
    res.json({message : error.message || "Unknown error occured"})
});

mongoose
.connect('mongodb+srv://tushar:tushar@cluster0.5cwgq.mongodb.net/userlocation?retryWrites=true&w=majority')
.then(()=>{
    console.log("listi")
    app.listen(5000);
})
.catch(err => {
    console.log(err)
})

