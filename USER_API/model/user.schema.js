const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    address: String,
    city: String,
    mobile: String,
    zipCode: String
},
{
  collection: 'users'
}
)


module.exports = model('users', userSchema);