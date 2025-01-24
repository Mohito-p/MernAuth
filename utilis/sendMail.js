const nodemailer = require('nodemailer');

const sendMail = async (otp, email) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL, 
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        
        const mailOptions = {
            from: process.env.EMAIL, 
            to: email, 
            subject: 'Reset Password OTP',
            html: `<div><strong>Your OTP is:</strong> ${otp}</div>`, // HTML body
        };
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error.message);
        throw new Error('Failed to send email'); // Optional: rethrow the error for higher-level handling
    }
};


module.exports = sendMail;
