const fs = require('fs');
const HeaderTypes = require('../Custom/HeaderTypes');

/**
 *
 */
class AdminController{

    constructor() {

    }

    AdminAction(request, response){

        let url = request.url;

        if(url === '/admin'){
            url = '/admin/index.html';
        }

        let path = '../build/admin/index.html';


        if (!fs.existsSync(path)) {
            return;
        }

        let headerType = new HeaderTypes();

        fs.readFile(path, 'utf-8', (err, content) => {
            response.writeHeader(200, {"Content-Type": headerType.getContentType(url)});
            response.write(content);
            response.end();
        });
    }

}
module.exports = AdminController;
