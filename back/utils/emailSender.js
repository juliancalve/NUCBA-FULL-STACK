const nodemailer = require("nodemailer");

  const mailSender = async (email , token) => {
    return new Promise( (res, rej) => {
      try{
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: 'pepitopepe1994pepe@gmail.com', // generated ethereal user
            pass: 'pass1357', // generated ethereal password
          },
        });
  
        // const emailOptions = EMAIL_TYPE({ token, type });
        // send mail with defined transport object
        transporter.sendMail({
          from: '"El Templo" <foo@example.com>', // sender address
          to: email, // list of receivers
          text: "El templo", // plain text body
          html: `<div style="background-color: red"><h3>Holis</h3> Para activar tu cuenta clickea  <a href="http://localhost:3100/api/activate/${token}">aca</a></div>`,
          subject: 'Activa tu cuenta'
        //   ...emailOptions
        }, (error, response) => {
          if( error ){
              console.log('error', error);
            rej(error);
          } else {
            res(true);
          }
        });
      } catch( error ){
        console.log('error2', error);
        throw new Error(error);
      }
    });
  }
  
  module.exports = {mailSender};