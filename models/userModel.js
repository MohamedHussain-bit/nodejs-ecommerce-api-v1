const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        trim : true,
        required : [true , 'User name is required']
    },
    slug : {
        type : String,
        lowercase : true,
    },
    email : {
        type : String,
        required : [true , 'Email must be required'],
        unique : true,
        lowercase : true
    },
    phone : String,
    profileImage : String,

    password : {
        type : String,
        required : [true , 'Password must be required'],
        minLength : [6 , 'Too short password']
    },
    role : {
        type : String,
        enum : ['user' , 'admin'],
        default : 'user'
    },
    active : {
        type : Boolean,
        default : true
    }
} , {timestamps : true});

UserSchema.post('init' , (document) => {
    if(document.profileImage){
        const imageURL = `${process.env.BASE_URL}/users/${document.profileImage}`;
        document.profileImage = imageURL;
    };
});

UserSchema.post('save' , (document) => {
    if(document.profileImage){
        const imageURL = `${process.env.BASE_URL}/users/${document.profileImage}`;
        document.profileImage = imageURL;
    };
});

module.exports = mongoose.model('User' , UserSchema);