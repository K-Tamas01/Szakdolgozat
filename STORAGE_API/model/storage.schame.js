const { Schema, model } = require('mongoose');

const storageSchema = new Schema({
    productName: String,
    productCode: String,
    description: String,
    quantity: Number,
    unitPrice: Number,
    category: String,
    supplier: String
},
{
  collection: 'storage'
}
)


module.exports = model('storage', storageSchema);