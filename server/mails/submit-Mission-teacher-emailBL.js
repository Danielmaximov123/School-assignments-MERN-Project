const transporter = require('./smtpMailer')
require('dotenv').config()

exports.submitMissionTeacherEmail = (user , mission , student) => {
    return new Promise((resolve , reject) => {
        let mailOptions = {
            from: `"משימות הבית שלי" <No-Reply@${process.env.host}>`, 
            to: user.email, 
            subject: `${user.fName} ${user.lName} יש ציון למטלה!`, 
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; direction: rtl;">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <h2>שלום - ${user.fName}</h2>
              </div>
              <p>שם המטלה : ${mission.title}</p>
              <p> הערות : ${student.teacherNote}</p>
              <p> ציון : ${student.grade}</p>
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
