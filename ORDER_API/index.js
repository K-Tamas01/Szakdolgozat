const express = require('express');
const cors = require('cors');
const connectDB = require('./plugin/database/db');
require('dotenv').config();

const app = express();
app.use(express.json())
app.use(cors())

connectDB()

app.get("/api/order/teszt", (req, res) => {
    res.send("Order is working")
})

app.listen(process.env.PORT, () => {
    console.log('Order API started on port ' + process.env.PORT);
});