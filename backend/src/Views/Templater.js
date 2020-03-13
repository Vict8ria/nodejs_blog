const fs = require('fs');
const PageData = require('../Models/PageData');
/**
 * Отвечает за преобразования из шаблона в html
 * Используется только во View
 */
class Templater{

    constructor(){

    }

    /**
     * Возврашает html код из шаблона, подставляя данные из нужного json
     *
     * @param template (полный код шаблона)
     * @param dataFile (названия json файла)
     * @param data (данные из контроллера)
     *
     * @return string
     */
    transform(template, dataFile, data){
        let pageData = new PageData('./data');

        let dictionary = pageData.getTempalateData(dataFile);

        let regexp = /{!([^{!]+)!}/;

        while(template.match(regexp)!== null)  {

            let match = template.match(regexp);
            let temp = match[0];
            let path = match[1];
            path = path.split('.');

            let obj = dictionary;
            for(let path_item of path) {
                obj = obj[path_item];
            }
            template = template.replace(temp, obj);
        }

        return template;
    }

}

module.exports = Templater;