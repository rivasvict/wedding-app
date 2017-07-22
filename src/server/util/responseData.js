'use-strict'
const moment = require('moment');

class ResponseDataFormatter {
  constructor() {
  }

  getFormatResponse(data) {
    return {
      data,
      date: this.getServerDate(),
      status: 200
    }
  }

  getServerDate() {
    return moment().valueOf();
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

  error(res, error) {
    res.status(500).send(error.stack);
  }
}

module.exports = ResponseDataFormatter;
