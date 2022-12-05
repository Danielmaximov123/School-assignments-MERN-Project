const { sendMissionEmail } = require('../mails/new-Mission-emailBL')
const missionsSchema = require('../models/missionsSchema')
const { getUser, getUsers } = require('./usersBL')
const fs = require('fs')
const { submitMissionEmail } = require('../mails/submit-Mission-emailBL')
const { submitMissionTeacherEmail } = require('../mails/submit-Mission-teacher-emailBL')
require('dotenv').config()

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
            console.log(data);
            let newMission = new missionsSchema({
                title: data.title,
                description: data.description,
                deadlineDate: data.deadlineDate,
                url : data.url,
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
    return new Promise(async(resolve , reject) => {
        let getMission = await this.getMission(id) 
        if(getMission.files.length > 0) {
            getMission.files.map(i => {
                fs.unlink(i.path, err => { err && reject(err) })
            })
        }
        getMission.students.map(i => {
            return i.files.map(j => {
                fs.unlink(j.path, err => { err && reject(err) })
            })
        })

        missionsSchema.findByIdAndDelete(id , (err) => {
            if(err) {
                reject(err)
            } else {
                resolve('deleted!!')
            }
        })
    })
}

exports.deleteStudentFromMissions = (id) => {
    return new Promise(async (resolve , reject) => {
        let getAllMissions = await this.getMissions()
        let getUserMissions = getAllMissions.map(i => {
            let missions = [i]
            return missions
          }).map(item => item[0]).filter((i) => {return i !== undefined})
        
        for (let i = 0; i < getUserMissions.length; i++) {
            const mission = getUserMissions[i];
            for (let j = 0; j < mission.students.length; j++) {
                const student = mission.students[j];
                if(student.files.length !== 0) {
                    for (let k = 0; k < student.files.length; k++) {
                        const file = student.files[k];
                        fs.unlink(file.path , err => {
                            if(err) {
                                reject(err)
                            } 
                        })
                    }
                }
            }
        let filterById = mission.students.filter(i => i.studentId !== id)
        mission.students = filterById
        missionsSchema.findByIdAndUpdate(mission._id, 
            mission , (err) => {
                if(err) {
                    reject(err);
                }
            })
        }
        resolve('deleted !');
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

exports.submitMissionStudent = (id , student , data) => {
    return new Promise(async(resolve , reject) => {
        let getMission = await this.getMission(id)
        let getStudent = getMission.students.find(i => i.studentId === student)
        let getAllStudents = getMission.students
        getStudent.note = data.note
        getStudent.completed = true
        getStudent.files = data.files
        getStudent.submitDate = new Date(Date.now())

        missionsSchema.findByIdAndUpdate(id , {
            students : getAllStudents
        } , async (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    let user = await getUser(student)
                    let users = await getUsers()
                    let admin = users.filter(i => i.userType !== 'student')
                    for (let i = 0; i < admin.length; i++) {
                        const userAdmin = admin[i];
                        await submitMissionEmail(user , userAdmin , getMission ,getStudent)
                    }
                    resolve('Updated !!')
                }
            })
    })
}

exports.submitMissionTeacher = (id , student , data) => {
    return new Promise(async(resolve , reject) => {
        let getMission = await this.getMission(id)
        let getStudent = getMission.students.find(i => i.studentId === student)
        let getAllStudents = getMission.students
        getStudent.teacherNote = !data.teacherNote ? getStudent.teacherNote : data.teacherNote
        getStudent.grade = data.grade

        missionsSchema.findByIdAndUpdate(id , {
            students : getAllStudents
        } , async (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    let user = await getUser(student)
                    await submitMissionTeacherEmail(user , getMission , getStudent)
                    resolve('Updated !!')
                }
            })
    })
}

exports.removeFileFromStudent = (id , student , data) => {
    return new Promise(async(resolve , reject) => {
        let getMission = await this.getMission(id)
        let getStudent = getMission.students.find(i => i.studentId === student)
        let getAllStudents = getMission.students
        getStudent.files = getStudent.files.filter(i => i.id !== data._id)

        missionsSchema.findByIdAndUpdate(id , {
            students : getAllStudents
        } , (err) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve('Updated !!')
                }
            })
    })
}

exports.addStudentToMission = (data) => {
    return new Promise(async(resolve , reject) => {
        let getMissions = await this.getMissions()
        let missionBySubject = getMissions.filter(i => data.subjects.includes(i.subject))
        for (let i = 0; i < missionBySubject.length; i++) {
            const mission = missionBySubject[i];
            let students = mission.students
            let getStudent = students.find(i => i.studentId === data.studentId)
            if(!getStudent) {
                    students.push({studentId : data.studentId})
                    missionsSchema.findByIdAndUpdate(mission._id, 
                        {students : students} , (err) => {
                            if(err) {
                                reject(err);
                            }
                        })
                    }
                }
                resolve('Updated !!')
    })
}

exports.deleteStudentFromMission = (data) => {
    return new Promise(async (resolve , reject) => {
        let getMissions = await this.getMissions()
        let missionBySubject = getMissions.filter(i => !data.subjects.includes(i.subject))
        for (let i = 0; i < missionBySubject.length; i++) {
            let mission = missionBySubject[i]
            let students = mission.students
            let filter = students.filter(student => student.studentId !== data.studentId)
            students = filter
            missionsSchema.findByIdAndUpdate(mission._id, 
                    {students : students} , (err) => {
                        if(err) {
                            reject(err);
                        }
                    })
                    resolve('Updated !!')
        }
    })
}



