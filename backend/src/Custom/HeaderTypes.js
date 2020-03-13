class HeaderTypes{

    constructor(){

    }

    getContentType(url){
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

        for (let ext of Object.keys(extentions)) {
            let reg = new RegExp("\." + ext + "$");
            if (reg.test(url)) return extentions[ext];
        }

        return null;
    }

    checkHeaderType(url) {
        return this.getContentType(url);
    }
}

module.exports = HeaderTypes;