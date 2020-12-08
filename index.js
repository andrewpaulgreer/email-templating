const nodemailer = require('nodemailer'),

transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "andrewgreer2015@gmail.com",
        pass:"Fenderdg2@"
    },
}),
//grabbing email templates
EmailTemplate = require('email-templates').EmailTemplate,
path = require("path"),
Promise = require('bluebird');

function sendEmail(obj){
    return transporter.sendMail(obj)
}

// create array of objcts for users 
let users = [
    {   
     
    },

];

//loading templates
function loadTemplate(templateName, contexts){
 let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
 return Promise.all(contexts.map((context)=> {
     return new Promise((resolve, reject)=> {
         template.render(context, (err, result)=> {
            if(err) reject(err);
            // using sendmail func setup
            else resolve({
                email: result,
                context,
            })
        })
     })
 }))
}

loadTemplate('welcome-email', users).then((results)=> {
    return Promise.all(results.map((result)=> {
        sendEmail({
            to: result.context.email,
            from: "Me !!!",
            subject: result.email.subject,
            html: result.email.html,
            text: result.email.text
        })
    }))
}).then(()=>{
    console.log("yay!")
})