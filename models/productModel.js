const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true , 'title product required'],
        trim : true,
        minlength : [3 , 'Too short title product'],
        maxlength : [30 , 'Too long title product'],
    },
    slug : {
        type : String,
        required : [true , 'Slug product is required'],
        lowercase : true,
    },
    description : {
        type : String,
        required : [true , 'Product description is required'],
        minlength : [100 , 'Too short description'],
    },
    quantity : {
        type : Number,
        required : [true , 'Product quantity is required'],
    },
    sold : {
        type : Number,
        default : 0,
    },
    price : {
        type : Number,
        trim : true,
        required : [true , 'Product price is required'],
        max : [100000 , 'Too long roduct price'],
    },
    priceAfterDiscount : {
        type : Number,
    },
    colors : [String],
    imageCover : {
        type : String,
        required : [true , 'Product image cover is required'],
    },
    images : [String],
    category : {
        type : mongoose.Schema.ObjectId,
        ref : 'Category',
        required : [true , 'Product must be belong to category'],
    },
    subCategories : [{
        type : mongoose.Schema.ObjectId,
        ref : 'SubCategory',
    }],
    brand : {
        type : mongoose.Schema.ObjectId,
        ref : 'Brand',
    },
    ratingsAverage : {
        type : Number,
        min : [1 , 'Rating must be above or equale 1.0'],
        max : [5 , 'Rating must be below or equale 5.0'],
    },
    ratingsQuantity : {
        type : Number,
        default : 0,
    }
} , {timestamps : true});

// mongoose middleWare query
productSchema.pre(/^find/ ,function(next){
    this.populate({path : 'category' , select : 'name -_id'});
    next();
});

module.exports = mongoose.model('Product' , productSchema)