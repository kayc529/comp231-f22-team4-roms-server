const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./customApiError');

//Unauthorized error is thrown when the request from client side
//requires authorization but the user attempts to send the request
//without giving any information (aka token/cookie) for authorization
class UnauthorizedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
