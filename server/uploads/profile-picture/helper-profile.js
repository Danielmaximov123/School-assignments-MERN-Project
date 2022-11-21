const multer = require('multer')

const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        cb(null , './uploads/profile-picture')
    },
    filename : (req , file , cb) => {
        let id = req.params.id
        cb(null , `${Date.now()}-${id}-${file.originalname}`)
    }
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null , true)
    } else {
        cb(null , false)
    }
}

const upload = multer({
    dest : './uploads/profile-picture',
    limits : {
        fileSize : 1025 * 1024 * 2
    },
    fileFilter,
    storage,
})

module.exports = upload