const userSchema = require('../models/usersSchema')
const fs = require('fs')
const { sendResetPassword } = require('../mails/forgot-passwordBL')
const jwt = require("jsonwebtoken");
require('dotenv').config()

exports.getUsers = () => {
    return new Promise((resolve , reject) => {
        userSchema.find({} , (err , data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getUser = (id) => {
    return new Promise((resolve , reject) => {
        userSchema.findById(id , (err ,data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getAdmin = (id) => {
    return new Promise((resolve , reject) => {
        userSchema.findOne({userType : 'admin'} , (err ,data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.createNewUser = (data) => {
    return new Promise(async (resolve , reject) => {    
        const userEmail = await userSchema.findOne({email : data.email})
        const userPhone = await userSchema.findOne({phoneNumber : data.phoneNumber})
        if(userEmail && userPhone) {
            resolve({success : false , message : 'דוא"ל ומספר טלפון זה כבר קיימים...'})
        } else if(userEmail || userPhone) {
            resolve(userEmail ? {success : false , message : 'האימייל הזה כבר קיים...'} : userPhone ? {success : false , message : 'מספר הטלפון הזה כבר קיים...'} : null)
        } else {
        let date = new Date;
        const newUser = new userSchema({
                fName : data.fName,
                lName : data.lName,
                email : data.email,
                phoneNumber : data.phoneNumber,
                userType : data.userType,
                gender : data.gender,
                subjects : data.subjects,
                date : [date.getDate() <= 9 ? "0" + date.getDate() : date.getDate(),
                ((date.getMonth() + 1) < 10 ? '0' : '')+ (date.getMonth() + 1),
                date.getFullYear()].join('/')+' '+
               [date.getHours() <= 9 ? "0" + date.getHours() : date.getHours(),
                date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes()].join(':'),
              });
        
              newUser.save((err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve({success : true , newUser})
                }
              });
        }
        })
}
 
exports.updateUser = (id,obj) => {
    return new Promise((resolve, reject) => {
        userSchema.findByIdAndUpdate(id, 
            { fName : obj.fName , lName : obj.lName , city : obj.city  , email : obj.email , phoneNumber:  obj.phoneNumber , profilePic : obj.profilePic , profilePicPath : obj.profilePicPath , gender : obj.gender , userType : obj.userType , activated : obj.activated , subjects : obj.subjects }, (err) => {
                if(err) {
                    reject(err);
                }
                else {

                    resolve('Updated !!')
                }
            })
    })
}

exports.removeSubjectUser = (id) => {
    return new Promise(async (resolve , reject) => {
        let getAllUsers = await this.getUsers()
        let getUsersWithSubject = getAllUsers.filter(i => i.subjects.includes(id))
        getUsersWithSubject.map(user => {
            let filter = user.subjects.filter(i => i !== id)
            user.subjects = filter
            this.updateUser(user._id , user)
        })
        resolve('ok')
    })
}

exports.activateUser = (id , activated) => {
    return new Promise((resolve , reject) => {
        userSchema.findByIdAndUpdate(id, 
            activated, (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve('The Activation is changed !')
                }
            })
    })
}

exports.updatePassword = (id , obj) => {
    return new Promise(async (resolve , reject) => {
        const user = await userSchema.findById(id)
        let password = obj.password
        const isSamePassword = await user?.comparePassword(password)
        if( isSamePassword ) {
            resolve({success : false , message : 'הסיסמה החדשה חייבת להיות שונה'} )
        } 
        if(password.trim().length < 8 ||  password.trim().length > 36) {
            resolve({success : false , message : 'הסיסמה חייבת להיות באורך 8 עד 36 תווים...'})
        } else {
            user.password = password.trim()
            await user.save((err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({success : true , message : 'הסיסמה שונתה בהצלחה !'})
                }
            })
        }
    })
}

exports.forgotPassword = (email) => {
    return new Promise(async (resolve , reject) => {
        const userEmail = await userSchema.findOne({email : email})
        if(!userEmail) {
            resolve({ success : false , message : 'דוא"ל לא קיים !' })
        } else {
            const JWT_SECRET = "GWSGDRG";
            const token = jwt.sign(
                {},
                JWT_SECRET , 
                {
                  expiresIn : '2h'
                }
              );
            await sendResetPassword({
                to : userEmail.email, 
                fullName : `${userEmail.fName} ${userEmail.lName}` , 
                url : `${process.env.siteURL}}:3000/reset-password?token=${token}&id=${userEmail._id}`
            })
            resolve({ success : true , message : 'נשלח דוא"ל לאיפוס סיסמה !' })
        }
    })
}

exports.userType = (id , userType) => {
    return new Promise((resolve , reject) => {
        userSchema.findByIdAndUpdate(id, 
            userType, (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve('Successfully changed user type !')
                }
            })
    })
}

exports.deleteUser = (id) => {
    return new Promise(async (resolve , reject) => {
        let getUser = await this.getUser(id)
        if(getUser.profilePic !== null) {
            await this.deleteUserProfile(id)
        }
        userSchema.findByIdAndDelete(id , (err) => {
            if(err) {
                reject(err)
            } else {
                resolve('deleted!!')
            }
        })
    })
}

exports.deleteUserProfile = (id) => {
    return new Promise(async (resolve , reject) => {
        let userData = await userSchema.findById(id)
        let filePath = userData.profilePicPath
        fs.unlink(filePath, err => {
            if (err) {
              reject(reject)
            } else {
                userSchema.findByIdAndUpdate(id, 
                    { profilePic : null , profilePicPath : null } , (err) => {
                        if(err) {
                            reject(err);
                        }
                        else {
                            resolve('Profile Pic is Deleted 1')
                        }
                    })
            }
          })
    })
}