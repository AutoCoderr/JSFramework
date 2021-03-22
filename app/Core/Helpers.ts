import crypto from "crypto";
import fs from "fs-extra";

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
};
