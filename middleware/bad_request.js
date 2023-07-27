const { StatusCodes } = require("http-status-codes");

class BadRequestError extends Error{
    constructor(message){
        super(message),
        this.name = "Bad Request Error",
        this.statusCode = StatusCodes.BAD_REQUEST
    };
}



module.exports = BadRequestError