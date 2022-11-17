const jwt = require("jsonwebtoken");
const userSchema = require('../models/usersSchema')

exports.signInUser = (data) => {
    return new Promise(async (resolve , reject) => {
        if (!data.email.trim() || !data.password.trim()) {
            return resolve({ success : false , message : 'דוא"ל/סיסמא חסרים...' })
        }
        const user = await userSchema.findOne({ email : data.email });
        if (!user) {
          return resolve({ success : false , message : 'המשתמש לא נמצא' })
        }
        const isMatched = await user.comparePassword(data.password);
        if (!isMatched) {
          return resolve({ success : false , message : 'דוא"ל/סיסמה לא נכונים...' });
        } else {
        const JWT_SECRET = "FRKLMKLGDHLQWLMERGEFGHRGWSGDRG";
        const token = jwt.sign({ fName : user.fName , lName : user.lName , userId: user._id , phoneNumber : user.phoneNumber , activated : user.activated , gender : user.gender  , profilePic : user.profilePic , userType : user.userType , email : user.email  }, JWT_SECRET);
        return resolve({success : true , token})
      }
      })
}
