var mongoose = require('mongoose');


//Create a new User model (email -required,trim,type is string and min length)

var User = mongoose.model('User', {
    email: {
        type: String,
        required:true,
        minlength: 1,
        trim: true
    }
});

// var newUser = new User({
//     email: ' test@gmail.com'
// });
//
// newUser.save().then((doc) => {
//     console.log('New User', doc);
//
// }, (e) => {
//     console.log('unable to connect', e);
// });

module.exports = {User};