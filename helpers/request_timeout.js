const { StatusCodes } = require("http-status-codes");

const timeout = (req, res, next) => {
    if (!req.timedout) {
      console.log("Requesting....");
      next();
    } else {
      return res.status(StatusCodes.REQUEST_TIMEOUT).json({ error: 'Request timeout' });
    } 
}

module.exports = timeout;