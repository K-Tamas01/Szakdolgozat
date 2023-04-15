const express = require('express');

const app = express();

app.listen(5002, () => {
    console.log('Storage API started on port 5002');
});