const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.contactForm = (req, res) => {
    const {email, name, message} = req.body
    // console.log(req.body);

    const emailData = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `Contact form - ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender message: ${message}</p>
        <hr/>
        <p>This email may contain sensitive information.</p>
        <p>http://pearlbox.co</p>`
    };
    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
};exports.contactBlogAuthorForm = (req, res) => {
    const {authorEmail, email, name, message} = req.body
    // console.log(req.body);
    let mailList = [authorEmail, process.env.EMAIL_TO]
    const emailData = {
        to: mailList,
        from: email,
        subject: `Someone messaged you from ${process.env.APP_NAME}`,
        text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
        html: `
        <h4>Email received from:</h4>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Message: ${message}</p>
        <hr/>
        <p>This email may contain sensitive information.</p>
        <p>http://pearlbox.co</p>`
    };
    sgMail.send(emailData).then(sent => {
        return res.json({
            success: true
        });
    });
};