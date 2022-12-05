const express = require('express')
const router = express.Router()
const usersBL = require('../BL/usersBL');
const missionBL = require('../BL/missionsBL')
const upload = require('../uploads/profile-picture/helper-profile');
const { createRandomBytes } = require('../mails/cryptoForMails');
const { sendWelcomeMail } = require('../mails/Welcome-EmailBL');


router.route('/').get(async (req,res) => {
    let users = await usersBL.getUsers();
    res.json(users)
})

router.route('/:id').get(async (req ,res) => {
    let id = req.params.id
    let data = await usersBL.getUser(id)
    res.send(data)
})

router.route('/:id').put(async (req , res) => {
    let id = req.params.id
    await usersBL.updateUser(id , req.body)
    let obj = await usersBL.getUser(id)
    res.send(obj)
})

router.route('/upload-profile-picture/:id').put(upload.single('file') ,async (req,res) => {
    let url = req.file.path.replace("\\" , '/')?.replace("\\" , '/')
    var profilePic = url
    let id = req.params.id;
        await usersBL.updateUser(id,{profilePic , profilePicPath : req.file.path.replace("\\" , '/')?.replace("\\" , '/')});
        let obj = await usersBL.getUser(id)
        let user = { _id : obj._id , fName : obj.fName , lName : obj.lName, city : obj.city  , email : obj.email , phoneNumber:  obj.phoneNumber , profilePic : obj.profilePic , profilePicPath : obj.profilePicPath , gender : obj.gender , userType : obj.userType , activated : obj.activated , subjects : obj.subjects }
        res.json(user)
    })

router.route('/delete-profile-picture/:id').delete(async (req , res) => {
    let id = req.params.id
    await usersBL.deleteUserProfile(id)
    let obj = await usersBL.getUser(id)
    let user = { _id : obj._id , fName : obj.fName , lName : obj.lName, city : obj.city  , email : obj.email , phoneNumber:  obj.phoneNumber , profilePic : obj.profilePic , profilePicPath : obj.profilePicPath , gender : obj.gender , userType : obj.userType , activated : obj.activated , subjects : obj.subjects }
    res.send(user)
})

    router.route('/').post(async(req ,res) => {
        let data = await usersBL.createNewUser(req.body)
        if(!data.success) {
            res.send({ success : data.success , message : data.message})
        } else {
        let randomBytes = await createRandomBytes()
        await sendWelcomeMail({
            to : data.newUser.email, 
            fullName : `${data.newUser.fName} ${data.newUser.lName}` , 
            url : `${process.env.siteURL}/verify-account?token=${randomBytes}&id=${data.newUser.id}`
        }) 
        let obj = await usersBL.getUser(data.newUser._id)
        let user = { _id : obj._id , fName : obj.fName , lName : obj.lName, city : obj.city  , email : obj.email , phoneNumber:  obj.phoneNumber , profilePic : obj.profilePic , profilePicPath : obj.profilePicPath , gender : obj.gender , userType : obj.userType , activated : obj.activated , subjects : obj.subjects }
            res.send({success : data.success , user })
        }   
    })

router.route('/:id').delete(async (req ,res) => {
    let id = req.params.id
        await missionBL.deleteStudentFromMissions(id)
        let data = await usersBL.deleteUser(id)
        res.send(data)
    })

router.route('/verify/:id').put(async (req,res) => {
    let id = req.params.id;
    await usersBL.activateUser(id,req.body);
    let obj = await usersBL.getUser(id)
    let user = { _id : obj._id , fName : obj.fName , lName : obj.lName, city : obj.city  , email : obj.email , phoneNumber:  obj.phoneNumber , profilePic : obj.profilePic , profilePicPath : obj.profilePicPath , gender : obj.gender , userType : obj.userType , activated : obj.activated , subjects : obj.subjects }
    res.send(user)
})

router.route('/change-password/:id').put(async (req , res) => {
    let id = req.params.id;
    let updatePassword = await usersBL.updatePassword(id , req.body)
    res.send(updatePassword)
})

router.route('/forgot-password').post(async (req , res) => {
    let email = req.body.email
    let data = await usersBL.forgotPassword(email)
    res.send(data)
})

router.route('/userType/:id').put(async (req,res) => {
    let obj = req.body;
    let check = req.body.userType;
    let id = req.params.id;
    const admin = /admin.*/i;
    const teacher = /teacher.*/i;
    const student = /student.*/i;
    if(!admin.test(check.toLowerCase()) && !teacher.test(check.toLowerCase()) && !student.test(check.toLowerCase())) {
        res.send("One of the values admin/teacher/student does not exist !")
    }
    else if(admin.test(check.toLowerCase()) || teacher.test(check.toLowerCase()) || student.test(check.toLowerCase())) {
       let data = await usersBL.userType(id,obj);
       res.send(data)
    }
    })



module.exports = router