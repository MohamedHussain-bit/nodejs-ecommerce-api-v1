const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
        title : {
            type : String,
        },
        ratings : {
            type : Number,
            min : [1 , 'Min ratings value is 1.0'],
            max : [5 , 'Min ratings value is 5.0'],
            required : [true , 'Ratings must be required'],
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User',
            required : [true , 'Review must belong to user'],
        },
        product : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            require : [true , 'Review must belong to product'],
        },
    },
    {timestamps : true}
);

reviewSchema.pre(/^find/ , function(next){
    this.populate({path : 'user' , select : 'name'});
    next();
});

reviewSchema.statics.calcAverageRatingsAndQuantity = async function(productId){
    const result = await this.aggregate([
        // stage 1 : get all reviews in specific product
        {
            $match : {product : productId}
        },
        // stage 2 : calculate ratings average quantity
        {
            $group : {
                _id : '$product',
                avgRatings : {$avg : '$ratings'},
                ratingsQuantity : {$sum : 1}
        }
    }
    ])
    console.log(result);
}

reviewSchema.post('save' , async function() {
    await this.constructor.calcAverageRatingsAndQuantity(this.product);
});

module.exports = mongoose.model('Review' , reviewSchema);