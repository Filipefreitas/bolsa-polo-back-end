//import express
const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config({ path: 'config/keys.env' });
const voucherController = require("./controllers/VoucherController.js");
const studentController = require("./controllers/StudentController.js");
const userController = require("./controllers/UserController.js");
const generalController = require("./controllers/GeneralController.js");

//create the express app object
const app = express();
app.use(express.json());

const corsOptionsDelegate = function (req, callback) 
{
    const whitelist =  ['http://localhost:3000', 'http://127.0.0.1:3000']
    let  corsOptions;
    if (whitelist.indexOf(req.header('Origin')) !== -1) 
    {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } 
    else 
    {
        corsOptions = { origin: false } // disable CORS for this request
    }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//middleware
app.use(cors(corsOptionsDelegate))

app.use("/vouchers", voucherController);
app.use("/students", studentController);
app.use("/users", userController);
app.use("/", generalController);


app.listen(process.env.PORT,()=>{
    console.log(`the rest API is up and running on PORT ${process.env.PORT}`);

    mongoose.connect(process.env.MONGO_DB_QUERY_STRING)
   .then(()=>{
        console.log('Connected to MongoDB')
   })
   .catch(err=>{
        console.log(`Error ${err}`);
   })
})
