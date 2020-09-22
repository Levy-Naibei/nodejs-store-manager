const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// express instance
const app = express();

// loging req, res to the terminal
app.use(morgan('dev'));

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
    console.log(`Server running at port ${port}`);
});

module.exports = app;