const mongoose = require('mongoose');
require('dotenv').config({ path : '.env' })

mongoose.connect(process.env.MongoDB).then(() => {
    console.log("MongoDB is connected");
}).catch((err) => {
    console.log(`MongoDB not Connected ${err}`);
})