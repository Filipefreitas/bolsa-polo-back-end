const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: 
    { 
        type: String,
        required: true
    }, 
    lastName: 
    { 
        type: String, 
        required: true,
        unique: false
    },
    userName: 
    { 
        type: String,
        required: true,
        unique: true
    },
    email: 
    { 
        type: String, 
        required: true,
        unique: true
    },
    role:
    {
        type: String,
        enum: ["admin", "business partner", "approver"],
        required: true
    },
    password: 
    { 
        type: String 
        , required: true
    },
    isActive:
    {
        type: Boolean,
        default: true
    },
    dateCreated: 
    { 
        type: Date
        , default: Date.now()
    }
});

userSchema.pre("save", function(next)
{
    bcrypt.genSalt(10)
    .then((salt)=>
    {
        bcrypt.hash(this.password, salt)
        .then((encryptedPassword)=>
        {
            this.password = encryptedPassword;
            next();
        })
        .catch(err=>console.log(`Error occured when hashing ${err}`));        
    })
    .catch(err=>console.log(`Error occured when salting ${err}`));
});

const User = mongoose.model('User', userSchema);

module.exports = User;