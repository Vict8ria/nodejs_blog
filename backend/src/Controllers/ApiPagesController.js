const fs = require('fs');
const Url = require('url');
const routes = require('../Services/routes');
const HeaderTypes = require('../Custom/HeaderTypes');

/**
 *
 */
class ApiPagesController{

    constructor() {

    }

    GetData(request, response) {

        let url = request.url;

        console.log("get url", url);

        let paramsStr = Url.parse(url).query;

        if(paramsStr === null) {
            response.writeHeader(400);
            response.write('Missing required parameters');
            response.end();
            return;
        }

        let paramGroup = paramsStr.split('&');

        let params = {};
        for(let group of paramGroup) {
            let data = group.split('=');
            params[data[0]] = data[1];
        }

        console.log("params.page", params.page);

        let path = null;
        if(typeof params.page !== undefined){
            path = './data/' + params.page + '.json';
        }

        if (!fs.existsSync(path)) {
            return;
        }

        console.log("path", path);

        let headerType = new HeaderTypes();

        fs.readFile(path, (err, content) => {
            response.writeHeader(200, {"Content-Type": headerType.getContentType(url)});
            response.write(content);
            response.end();
        });
    }

    UpdateData(request, response) {
        let url = request.url;

        let paramsStr = Url.parse(url).query;

        if(paramsStr === null) {
            response.writeHeader(400);
            response.write('Missing required parameters');
            response.end();
            return;
        }

        let paramGroup = paramsStr.split('&');

        let params = {};
        for(let group of paramGroup) {
            let data = group.split('=');
            params[data[0]] = data[1];
        }

        let path = null;
        if(typeof params.page !== undefined){
            path = './data/' + params.page + '.json';
        }

        if (!fs.existsSync(path)) {
            return;
        }

        let headerType = new HeaderTypes();

        response.writeHeader(200, {"Content-Type": headerType.getContentType(url)});

        let data = '';
        request.on('data', function(chunk) {
            data += chunk.toString();
        });
        request.on('end', function(err) {
            if(response.statusCode === 200 && JSON.parse(data) && !err){
                response.write(data);

                fs.writeFile(path, data, function(err) {
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
    }

    GetPages(request, response) {
        let url = request.url;
        console.log("get pages", url);
        let path = '../build/' + url;

        let data = [];
        for(let route of routes) {

            if(route.controller.indexOf("PagesController") !== -1 && typeof route.data !== 'undefined') {
                data.push(route.data.match(/([^\/]*).json$/)[1]);
            }
        }

        let headerType = new HeaderTypes();

        fs.readFile(path, (err, content) => {
            response.writeHeader(200, {"Content-Type": headerType.getContentType('.json')});
            response.write(JSON.stringify(data));
            response.end();
        });

    }
}

module.exports = ApiPagesController;