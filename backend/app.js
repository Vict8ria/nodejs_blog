const http = require('http');
const fs = require('fs');
const port = 80;

const requestHandler = (request, response) => {

    let url = request.url;

    if(url === '/'){
        url = '/index.html';
    }

    let path = '../build' + url;

    if (!fs.existsSync(path)) {
        return;
    }

    fs.readFile(path, function (err, fileContent) {
        response.writeHeader(200, {"Content-Type": getContentType(url)});
        response.write(fileContent);
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

function getContentType(url){
    let extentions = {
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'png': 'image/png',
        'svg': 'image/svg+xml',
        'html': 'text/html',
        'css': 'text/css',
        'js': 'text/javascript',
    };

    for(let ext of Object.keys(extentions)){
        let reg = new RegExp("\." + ext + "$");
        if(reg.test(url)) return extentions[ext];
    }

    return null;
}