const express = require('express');
const cors = require('cors');
const connectDB = require('./plugin/database/db');
const deliveryController = require('./controller/delivery/delivery.controller')
const movementsController = require('./controller/movements/movements.controller')
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())

connectDB()

// app.use('/api/delivery', deliveryController)
// app.use('/api/movements', movementsController)

app.listen(process.env.PORT, () => {
    console.log('Delivery and Billing API started on port ' + process.env.PORT);
});