const mongoose = require('mongoose');

const revieSchema = new mongoose.Schema({

    },
    {timestamps : true}
);

module.exports = mongoose.model('Review' , revieSchema);