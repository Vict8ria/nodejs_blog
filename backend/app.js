const http = require('http');
const fs = require('fs');
const port = 80;

const Router = require('./src/Services/Router');
const HeaderTypes = require('./src/Custom/HeaderTypes');

const requestHandler = (request, response) => {

    let url = request.url;

    let headerTypes = new HeaderTypes;
    let type = headerTypes.checkHeaderType(url);

    if (type === null){
        let router = new Router(request, response);
        router.getPath();

        return;
    }

    let path = '../build' + url;

    fs.readFile(path, function (err, content) {
        response.writeHeader(200, {"Content-Type": headerTypes.getContentType(url)});
        response.write(content);
        response.end();
    });
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
});