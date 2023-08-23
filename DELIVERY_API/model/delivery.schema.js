const { Schema, model } = require('mongoose');

const deliverySchema = new Schema({
    deliveryNumber: String,
    customerFirstName: String,
    customerLastName: String,
    customerId: String,
    delivery_date: Date,
    status: String,
    items: [{
        productCode: String,
        productName: String,
        quantity: Number
    }],
    city: String,
    deliveryAddress: String
},
{
  collection: 'delivery'
}
)


module.exports = model('delivery', deliverySchema);