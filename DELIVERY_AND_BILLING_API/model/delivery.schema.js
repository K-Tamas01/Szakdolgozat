const { Schema, model } = require('mongoose');

const deliverySchema = new Schema({
    deliveryNumber: String,
    customerName: String,
    customerId: String,
    delivery_date: Date,
    status: String,
    items: [{
        productCode: String,
        productName: String,
        quantity: Number
    }],
    deliveryAddress: String
},
{
  collection: 'delivery'
}
)


module.exports = model('delivery', deliverySchema);