const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'Category name required'],
        unique : [true , 'Category name must be unique'],
        minlength : [5 , 'Too short category name'],
        maxlength : [35 , 'Too long category name'],
    },
    slug : {
        type : String,
        lowercase : true,
    },
    image : String,
} , {timestamps : true});

const setImageURL = (document) => {
    if(document.image){
    const imageURL = `${process.env.BASE_URL}/categories/${document.image}`;
    document.image = imageURL;
    };
};

CategorySchema.post('init' , (document) => {
    setImageURL(document);
});

CategorySchema.post('save' , (document) => {
    setImageURL(document);
});

module.exports = mongoose.model('Category' , CategorySchema);