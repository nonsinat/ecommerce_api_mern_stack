const mongoose = require('mongoose')
const bcrypt= require('bcrypt')

const UserSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,'Token must be required']
    },
    name:{
        type: String, 
        required: [true,'Name must be Null Safety'],
        trim: true
    },
    email:{
        type: String,
        required:[true,'Email must be Null Safety'],
        match:[/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,"Please provide valid email"],
        unique: true
    },
    password:{
        type: String,
        required: [true,'Password must be Null Safety'],
        unique: true
    },
    decryptPassword:{
        type:String,
        required:[false]
    },
    phone:{
        type: Number,
        required:[false],
    },
    role:{
        type: Number,
        required:[false],
        default:0
    },
    answer:{
        type:String,
        required:[false]
    },
    address:{
        type:String, 
        required:[false]
    }
},{timestamps:true})


module.exports = mongoose.model('user_db',UserSchema)