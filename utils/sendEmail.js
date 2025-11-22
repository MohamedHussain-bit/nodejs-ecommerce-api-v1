const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create transporter (service that with send email)
    const transporter = nodemailer.createTransport({
        host : process.env.EMAIL_HOST,
        port : process.env.EMAIL_PORT,
        secure : true,
        auth : {
            user : process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASSWORD
        }
    });
    // Define email options (like from , to , subject , text)
    const options = {
        from : 'E-shop App <godzela.1242006.gmail.com',
        to : options.email,
        subject : options.subject,
        text : options.message,
    };
    // Send Email
    await transporter.sendMail(options);
};

module.exports = sendEmail;