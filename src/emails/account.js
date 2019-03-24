const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'haint@fdr.vn',
        subject: 'Thanks for your joining!',
        text: `The fist word I want to thank to ${name} because join with us. Please let me know if you have any question`
    })

}

const sendCancelMail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'info@yeutre.vn',
        subject: 'Cancel email and have a question!',
        text:`Could you please let me know why you want to cancel you account! ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelMail
}