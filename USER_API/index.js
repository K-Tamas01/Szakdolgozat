const express = require('express');
const cors = require('cors');
const connectDB = require('./plugin/database/db');
require('dotenv').config();

const app = express();
const userController = require('./Controller/user/user.controller')
const orderController = require('./Controller/order/order.controller')

app.use(express.json())

connectDB()

app.use(cors())
app.use("/api/user", userController)
app.use("/api/user/order", orderController)

app.listen(process.env.PORT, () => {
    console.log('User API started on port ' + process.env.PORT);
});