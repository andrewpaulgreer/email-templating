const nodemailer = require('nodemailer'),
creds = requore("./creds"),
transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: creds.user,
        pass:creds.pass
    },
}),
//grabbing email templates
EmailTemplate = require ('email-templates').EmailTemplate,
path = require("path)",
Promise = require('bluebird');

function sendEmail(obj){
    return transporter.sendMAil(obj)
}

// create array of objcts for users 
let users = [
    {

    }
];

//loading templates
function loadTemplate(templateName, contexts){
 let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
 return Promise.all()
}