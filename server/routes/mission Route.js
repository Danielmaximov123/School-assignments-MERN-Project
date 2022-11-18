const express = require('express')
const router = express.Router()
const upload = require('../helper-teacher');
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

router.route('/upload-mission').post(upload.array('file' , 5) , async(req ,res) => {
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

router.route('/remove-file/:id').put(async (req , res) => {
    let data = await missionBL.removeFileFromMission(req.body)
    res.send(data)
})


module.exports = router