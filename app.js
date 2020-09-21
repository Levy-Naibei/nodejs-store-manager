const express = require('express');

const app = express();

app.use((req, res) => {
    res.status(200).json({
        message: 'Welcome to store manager'
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running at port ${port}`);
});

module.exports = app;