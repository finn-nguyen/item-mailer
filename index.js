const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const readLastLines = require('read-last-lines');
require('xoauth2');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.USER_EMAIL,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRECT,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: process.env.ACCESS_TOKEN
    }
});

var mailOptions = {
  from: 'Tuong Nguyen',
  to: process.env.RECEIVER,
  subject: 'Sending Email using Node.js',
  text: 'Hello WOrld'
};

const job = schedule.scheduleJob('53 * * * *', function() {
  const lastLine = readLastLines.read('test.txt', 1)
    .then((line) => {
      const content = {...mailOptions, text: line };
      transporter.sendMail(content, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('----------------------------')
          console.log('Email sent: ' + info.response);
        }
      });
    });
})

