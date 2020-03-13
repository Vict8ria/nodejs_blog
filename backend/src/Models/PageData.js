const fs = require('fs');

class PageData {

    /**
     * Передается путь pageDataPath для файлов, используемых в отрисовки шаблонов
     *
     * @param pageDataPath
     */
    constructor(pageDataPath){
        this.path = pageDataPath;
    }

    /**
     * Возвращает обьект с данными указанного темплейта template
     *
     * @param dataFile
     * @return data(object)
     */
    getTempalateData(dataFile){
        let file = this.path + dataFile + '.json';

        let json_str = fs.readFileSync(file, 'utf8');

        return JSON.parse(json_str);
    }

    /**
     * Сохраняет данные data в указанные темплейт template
     *
     * @param template
     * @param data
     */
    setTemplateData(template, data){
        // для сохранения в adminController делаем вызов этого метода
        // data --> json
        // записать json в файд (с fs)
    }

}

module.exports = PageData;