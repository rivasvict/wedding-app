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
      html: 'Para familia: ' + this.familyName + '<br><br>' +
            'Estimados amigos y familiares, nos complace anunciar que nos unimos en sagrado matrimonio. ' +
            'Sería un honor para nosotros contar con su presencia en este día tan especial, ' +
            'por favor presione el siguiente link: ' + this.invitationUrl + ' para confirmar ' +
            'su asistencia y la de sus acompañantes<br><br>' +
            '<b>IMPORTANTE: Favor confirmar asistencia antes del 15 de Octubre del 2017. De lo contrario no podrá hacerlo mediante esta invitación</b><br><br>' +
            '<b>Gracias!</b><br><b>Cathy & Victor.</b>'
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
