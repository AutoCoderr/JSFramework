import crypto from "crypto";
const fs = require("fs-extra");

export default class Helpers {
    constructor() {
    }

    static getData(method,args) {
        if (method === "GET") {
            return args.GET;
        }
        if (method === "POST") {
            let datas = [];
            for (let key in args.POST) {
                if (args.POST[key].type === "text") {
                    datas[key] = args.POST[key].content;
                }
            }
            return datas;
        }
        return {};
    }

    static hashPassword(str) {
        let sha1 = crypto.createHash("sha1");
        sha1.update(str);
        return sha1.digest("hex");
    }

    static replaceAll(str,A,B) {
        while (str.replace(A,B) != str) {
            str = str.replace(A,B);
        }
        return str;
    }

    static ucFirst = str => str.charAt(0).toUpperCase()+str.slice(1);

    static getPath(pathName, params = {}) {
        const controllers = JSON.parse(fs.readFileSync(__dirname+"/routes.json"));
        const regexReplacer = new RegExp(":[a-zA-Z0-9_]+");
        const replacer = (match,index,content) => {
            match = match.slice(1);
            if (params[match] != undefined) {
                return params[match];
            }
            console.log("url '"+content+"' has a parameter ':"+match+"' which is not setted");
            return "nothing"
        };

        for (const controllerName in controllers) {
            const controllerSettings = controllers[controllerName];
            const {prefix, routes, prefix_route} = controllerSettings;

            if (pathName.length >= prefix.length && pathName.substring(0,prefix.length) == prefix &&
                routes[pathName.substring(prefix.length)] != undefined) {
                let route = prefix_route+routes[pathName.substring(prefix.length)].route;

                while (route != route.replace(regexReplacer,replacer)) {
                    route = route.replace(regexReplacer,replacer);
                }

                return route;
            }
        }

        return "#nothing";
    }
};
