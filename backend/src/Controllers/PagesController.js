const fs = require('fs');
const View = require('../Views/View');
const HeaderTypes = require('../Custom/HeaderTypes');


/**
 *
 */
class PagesController{

    constructor(){

    }

    /**
     * Считывает реквест и решает что ему с этими данными делать, и какой респонс вернуть пользователю
     *
     * @param request
     *
     * @return Response
     */
    IndexAction(request, response){
        let url = request.url;

        if(url === '/'){
            url = '/index.html';
        }

        let path = '../build' + url;

        if (!fs.existsSync(path)) return;

        let view = new View('../build');

        let headerType = new HeaderTypes();

        fs.readFile(path, (err, content) => {
            response.writeHeader(200, {"Content-Type": headerType.getContentType(url)});
            if(headerType.getContentType(url) === 'text/html') {
                content = view.draw(url, {counter: 4});
            }
            response.write(content);
            response.end();
        });
    }

}

module.exports = PagesController;