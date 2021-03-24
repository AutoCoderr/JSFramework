import EntityManager from "./EntityManager";
import Helpers from "./Helpers";

export default class Controller {
    req: any;
    res: any;

    constructor(req,res) {
        this.req = req;
        this.res = res;
    }

    getDatas() {
        return Helpers.getDatas(this.req);
    }

    redirectToRoute(routeName, params: null|any = null, permanently = false) {
        if (params == null) params = {};
        let url = Helpers.getPath(routeName, params);
        if (url == "#nothing") url = "/";
        this.res.redirect(permanently ? 301 : 302, url);
    }

    async render(file,params = {}) {
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
        this.res.render(file,{...params, session: this.req.session});
    }
}
