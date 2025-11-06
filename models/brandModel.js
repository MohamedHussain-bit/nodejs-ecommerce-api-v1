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

const setImageURL = (document) => {
    if(document.image){
    const imageURL = `${process.env.BASE_URL}/brands/${document.image}`;
    document.image = imageURL;
    };
};

brandSchema.post('init' , (document) => {
    setImageURL(document);
});

brandSchema.post('save' , (document) => {
    setImageURL(document);
});

module.exports = mongoose.model('Brand' , brandSchema);