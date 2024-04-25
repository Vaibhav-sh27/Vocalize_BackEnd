const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const todo = require('../models/Todo');
require('dotenv').config()

router.get('/mail',async (req, res)=>{
    let transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
          user: process.env.user,
          pass: process.env.pass
        }
  });

  const mailOptions = {
    from: 'vaibhav.sharma2_cs21@gla.ac.in',
    to: "vaibhavshrotriyas@gmail.com",
    subject: 'Task Completion Reminder',
    text: `The task  is due for completion at jj.`
};
await new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.json({err: error})
            reject(error);
        } else {
            console.log('Email sent:', info.response);
            res.json({msg:info})
            resolve(info);
        }
    });
})
})

module.exports=router;