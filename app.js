// Routing using express
var express = require('express');
var path = require('path');
var app = express();

const PORT = 8080;

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

app.get('/:filename', (req, res) => {
    const filePath = path.join(__dirname, req.params.filename + '.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).sendFile(path.join(__dirname, '404.html'));
        }
    });
});

// Catch-all route to handle any undefined routes
app.get('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});