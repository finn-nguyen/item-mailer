const nodemailer = require('nodemailer');
const schedule = require('node-schedule');
const readLastLines = require('read-last-lines');
require('dotenv').config();

var transporter = nodemailer.createTransport({
  service: "Gmail",
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.PASS
    }
});

var mailOptions = {
  from: `Tuong Nguyen <${process.env.USER_EMAIL}>`,
  to: process.env.RECEIVER,
  subject: 'Sending Email using Node.js',
  text: 'Hello WOrld'
};

const job = schedule.scheduleJob('40 * * * *', function() {
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

