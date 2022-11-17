const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()
require('./db')

// Routers
const missionsRoute = require('./routes/mission Route')
const signInRoute = require('./routes/sign-in Route')
const usersRoute = require('./routes/users Route')
const variousRoute = require('./routes/various Route')
const SubjectsRoute = require('./routes/subjects Route')

const port = 8080 || process.env.PORT

app.use(cors())
app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
app.use(express.json())
app.use('/uploads' ,express.static('uploads'))

// App Routers
app.use('/missions' , missionsRoute)
app.use('/sign-in' , signInRoute)
app.use('/users' , usersRoute)
app.use('/various' , variousRoute)
app.use('/subjects' , SubjectsRoute)

app.listen(port , () => {
    console.log(`The server is running in http://localhost:${port}`);
})