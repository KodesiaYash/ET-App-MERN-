// importing modules and frameworks
const express = require('express') ;
// for getting cross domain data 
const cors = require('cors') ;
// for connecting mongoDB to nodeJS
const mongoose = require('mongoose') ;
// enviornment variable files 
require('dotenv').config() ;

// ---------- Connecting the database --------- 
// Connection string from Mongo DB 
const app = express() ;
const port = process.env.PORT || 5000 ;

app.use(cors()) ;
app.use(express.json()) ;

const uri = process.env.ATLAS_URI ;

// connecting MongoDB 
mongoose.connect(uri , { useNewUrlParser : true , useCreateIndex : true , useUnifiedTopology : true } ) ;
const connection = mongoose.connection ;
connection.once('open' , () => {
    console.log("MongoDB database connected successfully") ;
})
// Creating routes to the data ---------------------
const exerciseRouter = require('./routes/exercises') ;
const userRouter = require('./routes/users') ;

app.use('/exercises' , exerciseRouter ) ;
app.use('/users' , userRouter ) ;



app.listen(port,() => 
    {console.log(`Server is running on port : ${port}`)}) ;