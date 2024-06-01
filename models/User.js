const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    firstName: { 
        type: String,
        required: true
    }, 
    lastName: { 
        type: String, 
        required: true,
        unique: false
    },
    userName: { 
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    password: { 
        type: String 
        , required: true
    },
    isActive:{
        type: Boolean,
        default: true
    },
    dateCreated: { 
        type: Date
        , default: Date.now()
    }
});

userSchema.pre("save", async function(next) {
    try{
        if (typeof this.role === 'string') {
            const roleDoc = await Role.findOne({ name: this.role }).exec();
            if (roleDoc) {
                this.role = roleDoc._id;
            } else {
                throw new Error('Role not found');
            }
        }
        next();
    }
    catch (err){
        next(err);
    }
});

userSchema.pre("save", async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    catch(err){
        next(err);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;