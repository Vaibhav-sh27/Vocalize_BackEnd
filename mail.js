let nodemailer = require('nodemailer');
let cron = require('node-cron');
const todo = require('./models/Todo');
require('dotenv').config()


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



async function checkTaskCompletionTime() {

    let tasks = await todo.find({});
    tasks.forEach( async task => {
        const currentTime = new Date().toLocaleString();
        const completionTime = new Date(task.dueDate).toLocaleString();

        if ((currentTime >= completionTime) && !task.isComp) {
            await sendEmail(task);
            let time= new Date();
            await todo.findByIdAndUpdate(task._id, {dueDate: new Date(time.getTime() + 30*60000)});
        }
    });
}


 async function sendEmail(task) {

    const mailOptions = {
        from: 'vaibhav.sharma2_cs21@gla.ac.in',
        to: task.owner,
        subject: 'Task Completion Reminder',
        html: `<h1>The task "${task.task}" is due for completion.</h1> <h2> Please mark the task as Completed or else you will get this reminder in every 30 minutes.</h2>
                <h3>- Team Voclise.</h3>`
    };

    // const mailOptions = {
    //     from: 'vaibhav.sharma2_cs21@gla.ac.in',
    //     to: "vaibhavshrotriyas@gmail.com",
    //     subject: 'Task Completion Reminder',
    //     text: `The task  is due for completion at jj.`
    // };
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    })
}

console.log("Mail Service Started");
cron.schedule('* * * * *', () => {
    
    checkTaskCompletionTime();
});

