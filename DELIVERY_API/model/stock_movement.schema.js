const { Schema, model } = require('mongoose');

const stockMovementSchema = new Schema({
    movementType: String,
    productCode: String,
    productName: String,
    quantity: Number,
    movementDate: Date,
    sourceLocation: String,
    destinationLocation: String,
    order_id: String
},
{
  collection: 'stockMovements'
}
)


module.exports = model('stockMovements', stockMovementSchema);