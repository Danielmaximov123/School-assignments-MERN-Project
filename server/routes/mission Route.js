const express = require('express')
const router = express.Router()
const uploadTeachers = require('../uploads/teachers/helper-teacher');
const uploadStudents = require('../uploads/students/helper-students');
const missionBL = require('../BL/missionsBL')

router.route('/').get(async (req , res) => {
    let data = await missionBL.getMissions()
    res.send(data)
})

router.route('/:id').get(async (req , res) => {
    let id = req.params.id
    let data = await missionBL.getMission(id)
    res.send(data)
})

router.route('/upload-mission').post(uploadTeachers.array('file' , 5) , async(req ,res) => {
    let data = JSON.parse(req.body.missionInfo)
    let files = []
    for (let i = 0; i < req.files.length; i++) {
        let file = req.files[i]
        let fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
        let path = file.path.replace("\\" , '/').replace("\\" , '/')
        files.push({ fileName , path })
    }
    let resp = await missionBL.addMission(data , files)
    res.send(resp)
})

router.route('/:id').delete(async (req ,res) => {
    let id = req.params.id
    let data = await missionBL.deleteMission(id)
    res.send(data)
})

router.route('/:id').put(async (req ,res) => {
    let id = req.params.id
    await missionBL.updateMission(id , req.body)
    let data = await missionBL.getMission(id)
    res.send(data)
})

router.route('/add-file/:id').put(uploadTeachers.single('file') , async (req , res) => {
    let fileName = Buffer.from(req.file.originalname, 'latin1').toString('utf8')
    console.log(fileName);
    let path = req.file.path.replace("\\" , '/').replace("\\" , '/')
    await missionBL.addFileToMission(req.params.id , { fileName , path })
    let data = await missionBL.getMission(req.params.id)
    res.send(data)
})

router.route('/remove-file/:id').put(async (req , res) => {
    let data = await missionBL.removeFileFromMission(req.body)
    res.send(data)
})

router.route('/submit-mission/:id').put(uploadStudents.array('file' , 5) , async(req ,res) => {
    let data = JSON.parse(req.body.missionInfo)
    let files = []
    for (let i = 0; i < req.files.length; i++) {
        let file = req.files[i]
        let fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
        let type = req.files[i].mimetype.includes('pdf') ? 'pdf' : 'zip'
        let path = file.path.replace("\\" , '/').replace("\\" , '/')
        files.push({ fileName , path , type })
    }
    await missionBL.submitMissionStudent(req.params.id , data.missionStudentId , { note : data.note , files : files })
    let mission = await missionBL.getMission(req.params.id)
    res.send(mission)
})


module.exports = router