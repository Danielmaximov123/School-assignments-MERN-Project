const express = require('express')
const router = express.Router()
const cities = require('../models/cities.json')

router.route('/cities').get( async (req, res) => {
    let data = cities.map((item , index) => {return { id : Number(index * 10) , label : item.name , enName : item.english_name }})
    res.send(data)
  });


module.exports = router