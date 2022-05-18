const mongoose = require("mongoose");

// conect.to Copass -  prot  ://---------------/creating Database in Compass
const conectionStr = 'mongodb://localhost:27017/TestDB';


// ------- DATABASE Settings --------:

function starDataBase() {

    try {
        mongoose.connect(conectionStr, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('>>> Database conected to Compass')
    } catch (err) {
        console.error('>>> DataBase Not Working:' + err.message);
    };

    const db = mongoose.connection;

    db.on('error', err => {
        console.error('>>> Database error:' + err.message);
    });
    db.on('open', () => {
        console.log('>>> Database conected');
    });
};

module.exports = starDataBase;