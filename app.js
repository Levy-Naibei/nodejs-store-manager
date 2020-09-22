const express = require('express');

const app = express();

// define routes
app.use('/products', require('./api/routes/products'));
app.use('/orders', require('./api/routes/orders'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

module.exports = app;