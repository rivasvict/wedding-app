'use strict'

const nodemailer = require('nodemailer');
const bunyan = require('bunyan');
const dotenv = require('dotenv').config();

class Email {
  constructor({ to, familyName, invitationUrl }) {
    this.to = to;
    this.familyName = familyName;
    this.invitationUrl = invitationUrl;
    this.defineCofiguration();
    this.defineConnectionParameters();
    this.configureMessage();
    this.defineTransporter();
  }

  defineCofiguration() {
    this.configuration = {
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      },
      logger: bunyan.createLogger({
        name: 'nodemailer'
      }),
      debug: process.env.ENVIRONMENT === 'DEVELOPMENT'
    }
  }

  defineConnectionParameters() {
    this.connectionParameters = {
      from: 'Pangalink <no-reply@pangalink.net>',
      headers: {
        'X-Laziness-level': 1000 // just an example header, no need to use this
      }
    }
  }

  configureMessage() {
    this.messageConfiguration = {
      to: this.to,
      from: '"Cathy y Victor" <cathyvictorinvitacionboda@gmail.com>',
      subject: 'Invitacion - Nos casamos!',
      html: 'Para familia: ' + this.familyName + '<br>' +
            'nos complace anunciarles que nos casamos y en union de nuestras familias' +
            'queremos nos complaceria que nos acompa;aras en estos dias tan especiales ' +
            'por favor pincha aqui: ' + this.invitationUrl + ' para confirmar' +
            'tu asistencia y la de tus acompa;antes<br>' +
            '<b>Gracias!</b><br><b>Flia. Rivas Pulgar</b>'
    }
  }

  defineTransporter() {
    this.transporter = nodemailer.createTransport(this.configuration, this.connectionParameters);
  }

  send() {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail(this.messageConfiguration, (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      })
    });
  }
}

module.exports = Email;
