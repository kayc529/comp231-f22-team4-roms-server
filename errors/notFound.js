const { StatusCodes } = require('http-status-codes');
const CustomAPIError = require('./customApiError');

//not found error is thrown when the data is not found in the database
class NotFoundError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
