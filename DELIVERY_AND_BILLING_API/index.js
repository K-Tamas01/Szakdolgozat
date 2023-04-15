const express = require('express');

const app = express();

app.listen(5004, () => {
    console.log('Delivery and Billing API started on port 5004');
});