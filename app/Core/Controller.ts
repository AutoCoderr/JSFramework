import EntityManager from "./EntityManager";

export default class Controller {
    async render(res,file,params = {}) {
        for (const paramName in params) {
            if (params[paramName] instanceof EntityManager) {
                params[paramName] = await params[paramName].serialize();
            } else if (params[paramName] instanceof Array) {
                for (let i=0;i<params[paramName].length;i++) {
                    if (params[paramName][i] instanceof EntityManager) {
                        params[paramName][i] = await params[paramName][i].serialize();
                    }
                }
            }
        }
        res.render(file,params);
    }
}
