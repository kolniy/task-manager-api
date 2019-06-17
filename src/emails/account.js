const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kolaniyi3@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to our app,${name}. Let me know how you get along and we hope you'll have a great experience`,
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'kolaniyi3@gmail.com',
        subject: 'Cancelation mail',
        text: `We noticed you canceled you registration from our app, ${name}. would you mind telling us why u left and what we could have done ti keep you`,
        html: `<h1 style = color:#C6D2ED; font-size:30%; font-family:Helvetica; text-align:center;>You left Us<br> We noticed you canceled you registration from our app, ${name}. would you mind telling us why u left and what we could have done ti keep you</h1><br>`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}