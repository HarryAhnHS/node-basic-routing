var http = require('http');
var fs = require('fs');

const PORT = 8080;

const server = http.createServer(function(req, res) {
    const q =  req.url == '/' ? '/index' : req.url;
    const filename = '.' + q + '.html';

    fs.readFile(filename, (err, data) => {
        if (err) {
            fs.readFile('./404.html', (err404, data404) => {
                if (err404) {
                    res.writeHead(500, {'Content-Type': 'text/html'});
                    res.end('500 Internal Server Error');
                }
                else {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.write(data404);
                    res.end();
                }
            });
        }
        else {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        };
    });    
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
})