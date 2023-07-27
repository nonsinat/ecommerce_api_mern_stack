const { StatusCodes } = require('http-status-codes')
const userModel = require('../models/user_model')

const isAdmin = async (req,res,next)=>{
  try {
    const user = await userModel.findById(req.user.userId)
    console.log(user.role);
    if(user.role !==1){
      res.status(StatusCodes.UNAUTHORIZED).send({
        success:false,
        message: 'Unauthorized Access'
      })
    }else {
      next()
      console.log("next()");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {isAdmin}