const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    Uname: String,
    password: String,
},
{
  collection: 'users'
}
)


module.exports = model('users', userSchema);