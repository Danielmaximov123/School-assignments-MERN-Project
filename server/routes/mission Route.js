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
    let url = []
    for (let i = 0; i < req.files.length; i++) {
        url.push(req.files[i].path.replace("\\" , '/').replace("\\" , '/'))
    }
    let resp = await missionBL.addMission(data , url)
    res.send(resp)
})

router.route('/:id').delete(async (req ,res) => {
    let id = req.params.id
    let data = await missionBL.deleteMission(id)
    res.send(data)
})


module.exports = router