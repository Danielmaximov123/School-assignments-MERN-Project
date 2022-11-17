const express = require('express')
const router = express.Router()
const signInBL = require('../BL/signInBL')

router.route("/").post( async (req, res) => {
    const data = {email : req.body.email.toLowerCase() , password : req.body.password}
    let userData = await signInBL.signInUser(data)
    res.send(userData)
  });

module.exports = router