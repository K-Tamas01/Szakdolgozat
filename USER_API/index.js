const express = require('express');

const app = express();

app.listen(5001, () => {
    console.log('User API started on port 5001');
});