const { sendMissionEmail } = require('../mails/new-Mission-emailBL')
const missionsSchema = require('../models/missionsSchema')
const { getUser } = require('./usersBL')
const fs = require('fs')

exports.getMissions = () => {
    return new Promise((resolve , reject) => {
        missionsSchema.find({} , (err , data) => {
            if(err) {
                reject(err)
            } else {
                let dataSort = data.sort((a , b) => new Date(a.deadlineDate) - new Date(b.deadlineDate))
                resolve(dataSort)
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

exports.addMission = (data , files) => {
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
                files
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

exports.removeFileFromMission = (data) => {
    return new Promise(async (resolve , reject) => {
        let getMissionToUpdate = await this.getMission(data.missionId)
        let files = getMissionToUpdate.files
        let getFile = files.find(file => file.id === data.fileId)

        fs.unlink(getFile.path , err => {
            if(err) {
                reject(err)
            } else {
                let filterFile = files.filter(i => i.id !== data.fileId)
                missionsSchema.findByIdAndUpdate(data.missionId , {
                    files : filterFile
                }, (err) => {
                    if(err) {
                        reject(err)
                    }
                })
                resolve(getMissionToUpdate)
            }
        })
    })
}

exports.updateMission = (id,obj) => {
    return new Promise((resolve, reject) => {
        missionsSchema.findByIdAndUpdate(id, 
            obj , (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve('Updated !!')
                }
            })
    })
}

exports.addFileToMission = (id , obj) => {
    return new Promise(async (resolve , reject) => {
        let getMissionToUpdate = await this.getMission(id)
        let files = getMissionToUpdate.files
        files.push(obj)

        missionsSchema.findByIdAndUpdate(id, 
            {files : files} , (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve('Updated !!')
                }
            })
    })
}