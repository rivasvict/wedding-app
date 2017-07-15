'use-strict'

const axios = require('axios');
const API = '/api/';
const api = axios.create({
  baseURL: API,
  headers: {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
});
const querystring = require('querystring');

class Connection {
  constructor(endpointsBase) {
    this.endpointBase = endpointsBase;
  }

  get(address, data) {
    return new Promise((resolve, reject) => {
      api.get(`${this.endpointBase}${address}`)
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
  }

  post(address, data) {
    return new Promise((resolve, reject) => {
      api.post(`${this.endpointBase}${address}`, querystring.stringify(data))
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }

  put(address, data) {
    return new Promise((resolve, reject) => {
      api.put(`${CONNECTION_STRING}${this.endpointBase}${address}`)
        .then(response => resolve(response))
        .catch(error => reject(error));
    });
  }
}

module.exports = Connection;
