const http = require('http');
const fs = require('fs');
const port = 80;

const requestHandler = (request, response) => {

    let url = request.url;

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



        // записать в файл
        // ответить клиенту об ошибке или успешном сохренении
        // проверить данные на json

        return;
    }

    switch(url) {
        case '/':
            url = '/index.html';
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

var jsonContent = fs.readFileSync('./data/index.json', 'utf8');
let lang = JSON.parse(jsonContent);

let templateLink = '../build/index.html'; //тут данные из build/index.html (если для главной)
let templateHtml = fs.readFileSync(templateLink, 'utf8'); //admin page html

/**
 * ищем через регулярку все вхождения {!string!}, сама регулярка: /{![^{!]+!}/ig
 * и заменяем найденный текст на данные, которые находит в lang обьекте
 */

let regexp = /{!([^{!]+)!}/;

let match = templateHtml.match(regexp);

while(templateHtml.match(regexp)!== null)  {

    let match = templateHtml.match(regexp);
    let temp = match[0];
    let path = match[1];
    path = path.split('.');

    let u = lang;
    for(let path_item of path) {
        u = u[path_item];
    }
    templateHtml = templateHtml.replace(temp, u);
}


fs.writeFile(templateLink, templateHtml, function(err) {
    if(err) {
        return console.log(err);
    }
});

