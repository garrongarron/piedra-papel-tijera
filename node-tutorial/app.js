const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const viewerRoutes = require('./api/routes/viewers')

const uri = "mongodb://admin:secret@mongo:27017/myDatabase";

mongoose.connect(
    uri,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
);
mongoose.Promise = global.Promise;


app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/viewers', viewerRoutes);


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message // 'Not found'
        }
    });
});

module.exports = app;