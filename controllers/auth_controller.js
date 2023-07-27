const { StatusCodes } = require('http-status-codes');

const Usermodel = require('../models/user_model')
const {hashPassword,comparePassword,createJWT} = require('../helpers/auth_helpers');
const BadRequestError = require('../middleware/bad_request');

const register = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        const existUser = await Usermodel.findOne({name:name,email:email})
        if(existUser){
            res.status(StatusCodes.BAD_REQUEST).json({message:"User already exist"})
        }else{
            let user = await Usermodel(req.body);
            const hashedPass = await hashPassword(password)
            const token = createJWT({id:user._id,name:user.name});
            user.token = token
            user.password = hashedPass
            user.decryptPassword = password
            user = await user.save()
            res.status(StatusCodes.CREATED).json({
                sucess: "Registration is successfully",
                token: token,
                userinfo:{name:user.name,email:user.email,address:user.address}
            })
        }
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error)
    }
}

const login = async(req,res)=>{
    const {email,password} = req.body;
    const user = await Usermodel.findOne({ email:email });
    if(!user){
        res.status(StatusCodes.BAD_REQUEST).json({message: "Already exist user"})
    }else{
        // we can compare plain text with hashed password in model 
        const isPasswordCorrect = await comparePassword(password,user.password);
        console.log(isPasswordCorrect);
        if(isPasswordCorrect){
            res.status(StatusCodes.OK).json({
                message:"Successfully",  
                token:user.token,
                userinfo:{ 
                    name:user.name,
                    email:user.email,
                }
            })
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({message:"Invalid Credentials"})
        }
    }
}

const forgetPassword = async (req,res)=> {
    const {email,newPassword,answer} = req.body;

    if(!email){
        res.status(StatusCodes.BAD_REQUEST).json({message: "Email is required"})
    }
    
    if(!newPassword){
        res.status(StatusCodes.BAD_REQUEST).json({message: "Password is required"})
    }

    if(!answer){
        res.status(StatusCodes.BAD_REQUEST).json({message: "question is required"})
    }

    const user = await Usermodel.findOne({email,answer})

    if(!user){
        res.status(StatusCodes.NOT_FOUND).json({success:false,message:"Wrong Email or Answer"})
    }

    const hashed = await hashPassword(newPassword)
    await Usermodel.findByIdAndUpdate(user._id,{password: hashed})
    res.status(StatusCodes.OK).json({
        success:true,
        message:"Password Reset Already"
    })
}

module.exports ={register,login,forgetPassword}