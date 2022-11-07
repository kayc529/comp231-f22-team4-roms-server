const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./customApiError');

//bad request error is thrown when the data received from the client side is invalid/incorrect
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
