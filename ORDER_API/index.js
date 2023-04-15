const express = require('express');

const app = express();

app.listen(5003, () => {
    console.log('Order API started on port 5003');
});