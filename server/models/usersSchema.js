const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    fName : { type : String },
    lName : { type : String },
    email : { type : String , unique : true , lowercase : true},
    phoneNumber : { type : String },
    gender : { type : Number },
    city : { type : Number , default : null },
    profilePic : { type : String , default : null },
    profilePicPath : { type : String , default : null },
    password : { type : String , default : '-'},
    activated : { type : Boolean , default : false},
    subjects : [{ type : String }],
    userType : { type : String},
    date: {type: String},
})

userSchema.pre('save' , async function (next)  {
    const user = this;
    if(user.isModified('password')) {
        const hash = await bcrypt.hash(user.password, 8);
        user.password = hash
    }
    next()
})

userSchema.methods.comparePassword = async function (password)  {
    const result = await bcrypt.compareSync(password, this.password)
    return result
}

module.exports = mongoose.model('User' , userSchema)