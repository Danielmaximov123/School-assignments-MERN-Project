const transporter = require('./smtpMailer')

exports.sendResetPassword = (user) => {
    return new Promise((resolve , reject) => {
        let mailOptions = {
            from: '"מטלות בית" <No-Reply@Matalot.com>', 
            to: user.email, 
            subject: `${user.fName} ${user.lName} - איפוס סיסמה !`, 
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; direction: rtl;">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <h2>איפוס סיסמה</h2>
              </div>
              <p style="font-size:1.1em">הי ${user.fname} ${user.lName},</p>
              <p>לאיפוס סיסמה, אנא לחץ על הכפתור הירוק</p>
              <h2 style="background: #2ba522;margin: 0 auto;width: max-content;padding: 0 10px;border-radius: 4px;"><a style="color: #fff;" href=${data.url} target="_blank">כפתור ירוק</a></h2>
              <hr style="border:none;border-top:1px solid #eee" />
            </div>
          </div>
            `
        };
    
        transporter.transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error)
            } else {
                resolve(`${user.fName} ${user.lName} נשלח מייל עם משימה`, info.messageId, info.response)
            }
            });
    })
    
}
