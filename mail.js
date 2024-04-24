let nodemailer = require('nodemailer');
let cron = require('node-cron');
const todo = require('./models/Todo');
require('dotenv').config()


  let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.user,
          pass: process.env.pass
        }
  });



async function checkTaskCompletionTime() {

    let tasks = await todo.find({});
    tasks.forEach( async task => {
        const currentTime = new Date().toLocaleString();
        const completionTime = new Date(task.dueDate).toLocaleString();

        if ((currentTime >= completionTime) && !task.isComp) {
            sendEmail(task);
            let time= new Date();
            await todo.findByIdAndUpdate(task._id, {dueDate: new Date(time.getTime() + 30*60000)});
        }
    });
}


 function sendEmail(task) {

    // const mailOptions = {
    //     from: 'vaibhav.sharma2_cs21@gla.ac.in',
    //     to: task.owner,
    //     subject: 'Task Completion Reminder',
    //     text: `The task "${task.task}" is due for completion .`
    // };

    const mailOptions = {
        from: 'vaibhav.sharma2_cs21@gla.ac.in',
        to: "vaibhavshrotriyas@gmail.com",
        subject: 'Task Completion Reminder',
        text: `The task  is due for completion at jj.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

console.log(process.env.user);
cron.schedule('* * * * *', () => {
    
    checkTaskCompletionTime();
});

