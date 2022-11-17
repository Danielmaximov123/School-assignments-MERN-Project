const transporter = require('./smtpMailer')

exports.sendWelcomeMail = (data) => {
    return new Promise((resolve , reject) => {
        let mailOptions = {
            from: '"מטלות בית" <No-Reply@Matalot.com>', 
            to: data.to, 
            subject: `${data.fullName} ברוכים הבאים למטלות בית`, 
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; direction: rtl;">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <h2>${data.fullName} - ברוכים הבאים</h2>
              </div>
              <p style="font-size:1.1em">הי,</p>
              <p>אנו שמחים שהצטרפת למערכת של מטלות בית, לסיום ההרשמה והפעלת החשבון אנא לחץ על הכפתור הירוק</p>
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
                resolve(`${data.fullName} Please verify your account by email`, info.messageId, info.response)
            }
            });
    })
    
}
