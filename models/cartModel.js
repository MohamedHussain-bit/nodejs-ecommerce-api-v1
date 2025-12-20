const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    cartItems : [{
        product : {
            type : mongoose.Schema.ObjectId,
            ref : 'Product'
        },
        quantity :{
            type : Number,
            default : 1
        },
        color : String,
        price : Number
    }],
    totalCartPrice : Number,
    totalCartPriceAfterDiscount : Number,
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'User'
    }
} , 
{
    timestamps : true,
    toJSON : {virtuals : true},
    toObject : {virtuals : true}
});

cartSchema.pre(/^find/ , function(next){
    this.populate({path : 'cartItems.product' , select : 'title -_id'});
    next()
});

module.exports = mongoose.model('Cart' , cartSchema);