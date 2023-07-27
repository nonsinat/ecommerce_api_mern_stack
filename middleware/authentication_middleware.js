const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user_model')

const authHeader = async (req, res, next) => {
  // check header
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer')) {
    // throw new UnauthenticatedError('Authentication invalid')
    res.status(StatusCodes.NON_AUTHORITATIVE_INFORMATION).json({message:"Authentication invalid"})
  }

  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_KEY) 
    // attach the user to the job routes
    req.user = { userId: payload.id, name: payload.name }
    console.log(`Userinfo: ${payload.id}, ${payload.name}`);
    
    next() // this next() function is for when above function is completed it will next to bottom function as well
  } catch (error) {
    // throw new UnauthenticatedError('Authentication invalid')
    res.status(StatusCodes.EXPECTATION_FAILED).json({message:`Exception Failed ${error}`})
  }
}

module.exports = {authHeader}
