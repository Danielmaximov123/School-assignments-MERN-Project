const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: process.env.smtpHost,
    port: process.env.smtpPort,
    auth: {
        user: process.env.smtpUser,
        pass: process.env.smtpPass
    }
})

module.exports = { transporter }