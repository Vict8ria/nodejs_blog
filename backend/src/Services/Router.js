const routes = require('./routes');
const Url = require('url');

const PagesController = require('../Controllers/PagesController');
const AdminController = require('../Controllers/AdminController');
const ApiPagesController = require('../Controllers/ApiPagesController');

const classes = { PagesController, AdminController, ApiPagesController };

/**
 * На вход получает текуўій request пользователя, і запускает нужный контролле.
 * Путі пропісаны в routes.json
 */
class Router{

    /**
     * Парсит реквест пользователя и вызывает нужный контроллер и передает в нужный метод request
     *
     * @param request
     * @return Response
     */
    constructor(request, response){
        this.request = request;
        this.response = response;
    }

    getPath() {
        let url = this.request.url;
        let pathname = Url.parse(url).pathname;

        for(let item of routes) {
            if(item.regexp.length === 0) continue;

            let regexp = new RegExp(item.regexp);
            if (!regexp.test(pathname)) continue;

            let method = item.method;

            let controller = new classes[item.controller]();
            controller[method](this.request, this.response);

            return;
        }
    }

}

module.exports = Router;