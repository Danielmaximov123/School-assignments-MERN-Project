const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    title : {type: String},
    description : {type: String},
})


module.exports = mongoose.model('Subjects' , subjectSchema)