const transporter = require('./smtpMailer')

exports.submitMissionEmail = (user , admin , mission ,student) => {
    return new Promise((resolve , reject) => {
      const day =
      student.submitDate.getDate() < 10 ? `0${student.submitDate.getDate()}` : student.submitDate.getDate();
    const month =
    student.submitDate.getMonth() < 10 ? `0${student.submitDate.getMonth() + 1}` : student.submitDate.getMonth() + 1;
    const hour =
      student.submitDate.getHours() < 10 ? `0${student.submitDate.getHours()}` : student.submitDate.getHours();
    const minutes =
      student.submitDate.getMinutes() < 10 ? `0${student.submitDate.getMinutes()}` : student.submitDate.getMinutes();
        let mailOptions = {
            from: '"מטלות בית" <No-Reply@Matalot.com>', 
            to: admin.email, 
            subject: `${user.fName} ${user.lName} הגיש את המטלה ${mission.title} !`, 
            html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2; direction: rtl;">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <h2>שלום - ${admin.fName}</h2>
              </div>
              <p>שם המטלה : ${mission.title}</p>
              <p>שם התלמיד : ${user.fName} ${user.lName}</p>
              <p>הערות התלמיד : ${student.note}</p>
              <p>תאריך הגשה : ${day}/${month}/${student.submitDate.getFullYear()} , ${hour}:${minutes}</p>
              <p>כולל ציון : ${mission.grade ? 'כן' : 'לא'}</p>
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
