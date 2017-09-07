'use-strict'
const moment = require('moment');

class ResponseDataFormatter {
  constructor() {
    this.limitConfirmationDate = 1508130000000;
  }

  getFormatResponse(data) {
    return {
      data,
      date: this.getServerDate(),
      status: 200
    };
  }

  getServerDate() {
    return moment().valueOf();
  }

  isDateGreaterThanConfirmationLimit() {
    return this.getServerDate() < this.limitConfirmationDate;
  }

  byMiddleware(next, res, data) {
    res.data = data;
    next();
  }

  afterGetRoute(req, res, next) {
    if (req.method === 'GET') {
      res.status(200).send(this.getFormatResponse(res.data));
    }
  }

  applyConfirmationDateRestriction(req, res, next) {
    if (req.method === 'POST') {
      if (this.isDateGreaterThanConfirmationLimit()) {
        next();
      } else {
        res.status(400).send(this.getFormatResponse({
          message: 'You are out of time for this confirmation',
          outOfDate: true
        }));
      }
    }
  }

  error(res, error) {
    res.status(500).send(error.stack);
  }
}

module.exports = ResponseDataFormatter;
