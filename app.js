const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));

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