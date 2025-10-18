const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Brand name required'],
        unique : [true , 'Brand name must be unique'],
        minlength : [5 , 'Too short brand name'],
        maxlength : [35 , 'Too long brand name'],
    },
    slug : {
        type : String,
        lowercase : true,
    },
    image : String,
} , {timestamps : true});

module.exports = mongoose.model('Brand' , brandSchema);