const express = require('express');
const cors = require('cors');
const connectDB = require('./plugin/database/db');
require('dotenv').config();

const storageController = require('./controller/storage/storage.controller')

const app = express();
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/storage/', storageController)

app.listen(process.env.PORT, () => {
    console.log('Storage API started on port ' + process.env.PORT);
});