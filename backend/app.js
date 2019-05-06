const http = require('http');
const fs = require('fs');
const port = 80;

const requestHandler = (request, response) => {

    let url = request.url;
    let jsonData = null;

    if(url === '/api/data/update') {

        response.writeHeader(200, {"Content-Type": 'application/json'});

        var data = '';

        request.on('data', function(chunk) {
            data += chunk.toString();
        });

        request.on('end', function(err) {

            if(response.statusCode === 200 && JSON.parse(data) && !err){
                response.write(data);

                fs.writeFile("../backend/data/index.json", data, function(err) {
                    if(err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                });
            } else {
                response.write('Error: File has not saved');
            }

            response.end();
        });

        return;
    }

    switch(url) {
        case '/':
            url = '/index.html';
            jsonData = './data/index.json';
            break;
        case '/admin':
            url = '/admin/index.html';
            break;
        case '/api/data/index':
            url = '/../backend/data/index.json';
            break;
    }

    let path = '../build' + url;

    if (!fs.existsSync(path)) {
        return;
    }

    fs.readFile(path, function (err, content) {
        response.writeHeader(200, {"Content-Type": getContentType(url)});
        if(getContentType(url) === 'text/html' && jsonData !== null) {
            content = prepareTemplate(jsonData, path);
        }
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
        'json': 'application/json'
    };

    for(let ext of Object.keys(extentions)){
        let reg = new RegExp("\." + ext + "$");
        if(reg.test(url)) return extentions[ext];
    }

    return null;
}

function prepareTemplate(json, html) {
    let json_str = fs.readFileSync(json, 'utf8');
    let json_obj = JSON.parse(json_str);

    let link = html; //тут данные из build/index.html (если для главной)
    let code = fs.readFileSync(link, 'utf8');

    let regexp = /{!([^{!]+)!}/;

    while(code.match(regexp)!== null)  {

        let match = code.match(regexp);
        let temp = match[0];
        let path = match[1];
        path = path.split('.');

        let obj = json_obj;
        for(let path_item of path) {
            obj = obj[path_item];
        }
        code = code.replace(temp, obj);
    }

    return code;
}