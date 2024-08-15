// Routing using express
var express = require('express');
var path = require('path');
var app = express();

var fs = require('fs');

const PORT = 8080;

// Serve static files in public directory
app.use(express.static(path.join(__dirname, 'public')));

// Default root page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Dynamic routing - send to 404 middleware if filename is index or not existing
app.get('/:filename', (req, res, next) => {
    const filename = req.params.filename;
    if (filename == 'index') return next();

    const filePath = path.join(__dirname, filename + '.html');
    if (fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) return next();
        else res.sendFile(filePath);
    }));
});

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});