const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();

//importation

const productRoutes = require('./api/routes/products');

const orderRoutes = require('./api/routes/orders');

//Connect the mongoose to the database

mongoose.connect('mongodb+srv://netninja:test1234@cluster-confession.j2cgo9o.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true, // This option is used to opt-in to the new MongoDB driver's connection string parser.
    useUnifiedTopology: true, // This option is used to opt-in to the new MongoDB driver's topology engine.
});


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//create a middleware which should handle the request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((req, res, next) =>{
    res.header('Acces-Control-Allow-Origin','*' );
    res.header('Acces-Control-Allow-Origin', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method ==='OPTIONS'){
        res.header('Acces-Control-Allow-Methods', 'PUT, DELETE, GET, PATCH, POST');
        return res.status(200).json({});
    }
    next();
})

//Routes which handle the request

app.use((req, res, next) =>{
    const error = new Error('Not found');
    error.status= 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
        
    });
});


module.exports =app;