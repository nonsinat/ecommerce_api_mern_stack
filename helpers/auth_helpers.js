const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const hashPassword = async function(password){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password,salt)
        return hashedPass
    } catch (error) {
        console.log(`Hashedpassword error: ${error}`);
    }
}

const comparePassword = async function(password,hashedpassword){
    try {
        const isMatched = await bcrypt.compare(password,hashedpassword) 
        return isMatched;
    } catch (error) {
        console.log(`Compared hashedpassword error ${error}`);
    }
}

const createJWT = (payload)=>{
    try {
        const token = jwt.sign(payload,process.env.JWT_KEY,{expiresIn: process.env.LIFTTIME});
        return token;
    } catch (error) {
        console.log(`Generate token is Error ${error}`);
    }
}

module.exports = {hashPassword,comparePassword,createJWT}