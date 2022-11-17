const subjectSchema = require('../models/subjectSchema')

exports.getSubjects = () => {
    return new Promise((resolve , reject) => {
        subjectSchema.find({} , (err , data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getSubject = (id) => {
    return new Promise((resolve , reject) => {
        subjectSchema.findById(id , (err ,data) => {
            if(err) {
                reject(err)
            } else {
                resolve(data)
            }
        })
    })
}

exports.getAddNewSubject = (data) => {
    return new Promise(async (resolve , reject) => {
        const dataTitle = await subjectSchema.findOne({title : data.title})
        if(dataTitle) {
            resolve({success : false , message : 'הנושא כבר קיים במערכת...'})
        } else {
        const newSubject = new subjectSchema({
                title : data.title,
                description : data.description
              });
        
              newSubject.save((err) => {
                if(err) {
                    reject(err)
                } else {
                    resolve({success : true , newSubject})
                }
              });
        }
    })
}

exports.deleteSubject = (id) => {
    return new Promise((resolve , reject) => {
        subjectSchema.findByIdAndDelete(id , (err) => {
            if(err) {
                reject(err)
            } else {
                resolve('deleted!!')
            }
        })
    })
}