require('dotenv').config();
const mongoose = require('mongoose');


module.exports = async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    return mongoose;
} 

///mongoose.connect(process.env.MONGO_URI, {
   /// useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("DB is geconnnect")).catch(err => console.error(err));
    