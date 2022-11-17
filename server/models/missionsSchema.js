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
            subjectId : { type : String },
            completed : { type : Boolean , default : false },
            grade : { type : Number , default : null },
            files : [{ type : String }],
        }
    ],
    files : [{ fileName : { type : String } , url : { type : String } }],
    datePublication : { type : Date , default : new Date() }
})


module.exports = mongoose.model('missions' , missionSchema)