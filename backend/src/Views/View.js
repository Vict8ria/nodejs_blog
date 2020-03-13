const Templater = require('./Templater');
const fs = require('fs');

/**
 * Создается 1 раз
 */
class View {

    /**
     * При ициницализации передается дирректория с шаблонами
     *
     * @param ViewPath
     */
    constructor(ViewPath){
        this.path = ViewPath;
    }


    /**
     * @param fileName (название шаблона, с вложеностью до него)
     * @param data (данные для отрисовки, в виде массива)
     */
    draw(fileName, data){
        let templateCode = fs.readFileSync(this.path + fileName, 'utf8');

        let dataFile = fileName.split('.')[0];

        let templater = this.getTemplater();
        templater = templater.transform(templateCode, dataFile, data);

        return templater;
    }

    /**
     * Возврашает экземпляр Tempalater, используется в draw
     */
    getTemplater(){
        return new Templater();
    }

}

module.exports = View;