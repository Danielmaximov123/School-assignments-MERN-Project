const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null , './uploads/students')
    },
    filename : (req , file , cb) => {
        let fileName = Buffer.from(file.originalname, 'latin1').toString('utf8')
        cb(null , `${Date.now()}-${fileName}`)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype.includes('zip') || file.mimetype.includes('pdf')) {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const upload = multer({
    dest : './uploads/students',
    limits : {
        fileSize : 1025 * 1024 * 10
    },
    fileFilter,
    storage,
})

module.exports = upload