const express = require('express');
const httpProxy = require('http-proxy');

const app = express();

app.listen(5000, () => {
    console.log('REST API gateway started on port 5000');
});