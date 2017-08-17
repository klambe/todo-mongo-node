const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');


//Create a new User model (email -required,trim,type is string and min length)


var UserSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});

//this method overridees toJSON and only returns values to the application
UserSchema.methods.toJSON = function(){
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret').toString();

    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    // })
        // .then((token) => {
        // return token;
    });
};

UserSchema.statics.findByToken = function (token){
    var User = this;
    var decoded;

    try {
        decoded = jwt.verify(token, 'secret');

    }catch (e){
        return Promise.reject();
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'

    });

};

var User = mongoose.model('User', UserSchema);


module.exports = {User};