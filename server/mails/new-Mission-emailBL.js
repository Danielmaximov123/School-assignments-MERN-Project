const transporter = require('./smtpMailer')

exports.sendMissionEmail = (user , data) => {
    return new Promise((resolve , reject) => {
        let mailOptions = {
            from: '"מטלות בית" <No-Reply@Matalot.com>', 
            to: user.email, 
            subject: `${user.fName} ${user.lName} יש לך מטלה חדשה !`, 
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; direction: rtl;">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <h2>מטלה בנושא - ${data.title}</h2>
              </div>
              <p>תיאור המטלה : ${data.description}</p>
              <p>תאריך הגשה : ${data.deadlineDate !== null ? data.deadlineDate.replace('T' , ' ') : 'אין'}</p>
              <p>כולל ציון : ${data.grade ? 'כן' : 'לא'}</p>
              <p>כל המידע מופיע לך במערכת...</p>
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
