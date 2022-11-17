const mongoose = require('mongoose');
require('dotenv').config()

let db = process.env.MONGODB
mongoose.connect(db).then(() => {
    console.log("MongoDB is connected");
}).catch((err) => {
    console.log(`MongoDB not Connected ${err}`);
})