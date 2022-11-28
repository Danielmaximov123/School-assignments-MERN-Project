const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
    title : {type: String},
    description : {type: String},
    deadlineDate : { type : String , default : null },
    grade : { type : Boolean },
    subject : { type : String },
    students : [
        {
            studentId : { type : String },
            subjectId : [{ type : String }],
            completed : { type : Boolean , default : false },
            note : { type : String , default : null },
            submitDate : { type : Date , default : null },
            teacherNote : { type : String , default : null },
            grade : { type : Number , default : null },
            files : [{ fileName : { type : String } , path : { type : String } , type : { type : String } }],
        }
    ],
    files : [{ fileName : { type : String } , path : { type : String } }],
    datePublication : { type : Date , default : new Date() }
})


module.exports = mongoose.model('missions' , missionSchema)