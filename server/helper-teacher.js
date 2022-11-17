const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null , 'uploads/teachers')
    },
    filename : (req , file , cb) => {
        let fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null , `${Date.now()}-${fileName}`)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'application/msword' || file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.mimetype === 'application/pdf') {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const upload = multer({
    dest : 'uploads/teachers',
    limits : {
        fileSize : 1025 * 1024 * 2
    },
    fileFilter,
    storage,
})

module.exports = upload