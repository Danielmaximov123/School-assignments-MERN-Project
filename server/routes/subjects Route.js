const express = require('express')
const router = express.Router()
const subjectBL = require('../BL/subjectBL')
const usersBL = require('../BL/usersBL')
const missionBL = require('../BL/missionsBL')

router.route('/').get(async (req , res) => {
    let data = await subjectBL.getSubjects()
    res.send(data)
})

router.route('/:id').get(async (req , res) => {
    let id = req.params.id
    let data = await subjectBL.getSubject(id)
    res.send(data)
})

router.route('/').post(async (req ,res) => {
    let data = await subjectBL.getAddNewSubject(req.body)
    res.send(data)
})

router.route('/:id').put(async (req ,res) => {
    let id = req.params.id
    await subjectBL.updateSubject(id , req.body)
    let data = await subjectBL.getSubject(id)
    res.send(data)
})

router.route('/:id').delete(async (req ,res) => {
    let id = req.params.id
    await usersBL.removeSubjectUser(id)
    let allMissions = await missionBL.getMissions()
    let filterMission = allMissions.filter(i => i.subject.includes(id))
    filterMission.map(async item => {
        await missionBL.deleteMission(item._id)
    })
    let data = await subjectBL.deleteSubject(id)
    res.send(data)
})

module.exports = router