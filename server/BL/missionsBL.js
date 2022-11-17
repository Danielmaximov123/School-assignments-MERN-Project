const { sendMissionEmail } = require('../mails/new-Mission-emailBL')
const missionsSchema = require('../models/missionsSchema')
const { getUser } = require('./usersBL')

exports.getMissions = () => {
    return new Promise((resolve , reject) => {
        missionsSchema.find({} , (err , data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getMission = (id) => {
    return new Promise((resolve , reject) => {
        missionsSchema.findById(id , (err ,data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.addMission = (data , url) => {
    return new Promise(async (resolve , reject) => {
        const checkMission = await missionsSchema.findOne({title : data.title , subject : data.subject})
        if(checkMission) {
            resolve({success : false , message : 'המשימה כבר קיימת לנושא לימוד...'})
        } else {
            let newMission = new missionsSchema({
                title: data.title,
                description: data.description,
                deadlineDate: data.deadlineDate,
                grade: data.grade,
                subject: data.subject,
                students: data.students,
                files : url
            })

            newMission.save(async (err) => {
                if(err) {
                    reject(err)
                } else {
                    let students = newMission.students
                    for (let i = 0; i < students.length; i++) {
                        let user = await getUser(students[i].studentId)
                        await sendMissionEmail(user , newMission)
                    }
                    resolve({success : true , mission : newMission})
                }
            })
        }

    })
}

exports.deleteMission = (id) => {
    return new Promise((resolve , reject) => {
        missionsSchema.findByIdAndDelete(id , (err) => {
            if(err) {
                reject(err)
            } else {
                resolve('deleted!!')
            }
        })
    })
}