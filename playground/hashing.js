const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');

var password = '123abc'

 bcrypt.genSalt(10, (err, salt)=>{
    bcrypt.hash(password, salt, (err, hash)=>{
        password = hash;
        console.log('kevin pass:', password);
     });
});
console.log(newpass);
console.log('kevin pass:', password);

var hashedPassword = '$2a$10$9LHqfow4HwvMG.KlGz9eSeJCWdtKFb6LCHKxTBCbhR/ZRAHyeiua2';

bcrypt.compare(password, hashedPassword, (err, res)=>{
   console.log(res);
});

//
//
// var data = {
//     id: 10
// };
//
// var token = jwt.sign(data, 'secretSaltValue');
//
// console.log(token);
//
// var decoded = jwt.verify(token, 'secretSaltValue');
//
// console.log(decoded);


// var message = 'I am user number three';
//
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data = {
//     id: 4
// };
//
// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) +'somesecret').toString()
// }
//
//
//
//
// var resultHash = SHA256(JSON.stringify(token.data)+'somesecret').toString();
//
// if(resultHash === token.hash){
//     console.log('data was not changed');
// }else {
//     console.log('dont trust data changed');
// }
//
// token.data.id = 5;
// token.hash  = SHA256(JSON.stringify(token.data)).toString();
//
// console.log('****Data was changed***');
//
//
// if(resultHash === token.hash){
//     console.log('data was not changed');
// }else {
//     console.log('dont trust data changed');
// }