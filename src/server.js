'use strict';
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const express = require('express');


const internalError = require('./error-handlers/500');
const externalError = require('./error-handlers/404');
const foodRoute = require('./routes/food.route');
const clothesRoute = require('./routes/clothes.route');

const app = express();
app.use(express.json());
app.use(foodRoute);
app.use(clothesRoute);

app.use('*', externalError);
app.use(internalError);
function start(port) {
    app.listen(port, () => {
        console.log(`listen in port ${port}`);
    })
}

module.exports = {
    app: app,
    start: start
};

