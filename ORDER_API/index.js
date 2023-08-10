const express = require('express');
const cors = require('cors');
const connectDB = require('./plugin/database/db');
const orderController = require('./controller/order/order.controller')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/order', orderController)

app.listen(process.env.PORT, () => {
    console.log('Order API started on port ' + process.env.PORT);
});