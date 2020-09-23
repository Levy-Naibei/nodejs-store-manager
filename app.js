const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db-conn/db');

// app instance
const app = express();

//load configs from .env file
dotenv.config({path: './.env'});

// loging req to the terminal
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}

// log db connection
connectDB();

/**
 * parsing the body of incoming req because 
 * it may not be in the format thats readable in node 
 * also handle cors policy; so that other web pages/clients can access API
 */
 app.use(express.urlencoded({ extended: false}));
 app.use(express.json());
 app.use(cors());


// define routes
app.use('/products', require('./api/routes/products'));
app.use('/orders', require('./api/routes/orders'));

// Error handling
app.use((error, req, res) => {
    res.status(error.status || 500);
    res.send(error.message);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode at port ${port}`);
});

module.exports = app;