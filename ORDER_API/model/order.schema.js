const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    orderNumber: String,
    customerName: String,
    customer_id: String,
    orderDate: Date,
    status: String,
    items: [{
        productName: String,
        productId: String,
        quantity: Number
    }]
},
{
  collection: 'orders'
}
)


module.exports = model('orders', orderSchema);