const { StatusCodes } = require("http-status-codes");

const errorHandler =  (err, req, res, next) => {
    console.error(err)
    const statusCode = res.statusCode === StatusCodes.OK ? StatusCodes.INTERNAL_SERVER_ERROR : res.statusCode 
}
module.exports = errorHandler