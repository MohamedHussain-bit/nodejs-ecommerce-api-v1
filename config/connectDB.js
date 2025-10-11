const mongoose = require('mongoose');

const connectBD = async () => {
    //try{
        await mongoose.connect(process.env.BD_URI);
    // }catch(err){
    //     console.log(err);
    // };
};

module.exports = connectBD;