const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Name is required'],
    },
    slug:{
        type:String,
        required:[true,'Slug is required'],
    },
    description:{
        type:String,
        required:[true,'Description is required']
    },
    price:{
        type:Number,
        required:[true,'Price is required']
    },
    category:{
        type: mongoose.ObjectId,
        ref:'category',
        required:[true,'Category is required']
    },
    quantity:{
        type:Number,
        required:[true,'Quantity is required']
    },
    photo:{
        data: Buffer,
        contentType : String
    },
    shipping:{
        type:Boolean,
        default:true,
    }
},{timestamps:true});

module.exports = mongoose.model('product',productSchema)