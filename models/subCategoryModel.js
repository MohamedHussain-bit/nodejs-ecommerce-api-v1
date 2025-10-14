const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true , 'SubCategory name must be required'],
        unique : [true , 'SubCategory name must be unique'],
        minlength : [5 , 'To short subCategoy name'],
        maxlength : [35 , 'To long subCategory name']
    },
    slug : {
        type : String,
        lowercase : true
    },
    category : {
        type : mongoose.Schema.ObjectId,
        ref : 'Category',
        required : [true , 'SubCategory must be belong to parent Category']
    }
} , {timestamps : true});

module.exports = mongoose.model('SubCategory' , subCategorySchema);