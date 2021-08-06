import EntityManager from "./EntityManager";
import Helpers from "./Helpers";
import UserRepository from "../Repositories/UserRepository";
import User from "../Entities/User";
const fs = require("fs-extra");

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
        this.redirect(url,permanently);
    }

    redirect(url, permanently = false) {
        this.res.redirect(permanently ? 301 : 302, url);
    }

    async getUser(): Promise<null|User> {
        if (typeof(this.req.session.user) == "undefined") return null;
        return await UserRepository.findOne(this.req.session.user.id);
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
        this.res.render(file,{...params, session: this.req.session, flash: this.res.locals});
    }

    setFlash(key: string, msgs: string|Array<string>) {
        if (this.req.session.flash == undefined) {
            this.req.session.flash = {};
        }
        this.req.session.flash[key] = msgs;
    }

    generateToken() {
        this.req.session.token = Helpers.generateRandomString(20);
    }
}
