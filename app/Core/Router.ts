const fs = require("fs-extra");

export default function Router(app) {
    const controllers = JSON.parse(fs.readFileSync(__dirname+"/routes.json"));

    for (const controllerName in controllers) {
        const controllerPath = __dirname+"/../Controllers/"+controllerName+".js";
        if (fs.existsSync(controllerPath) && !fs.statSync(controllerPath).isDirectory()) {
            const C = require(controllerPath).default;
            const controller = new C();

            const controllerConfig = controllers[controllerName];

            for (const routeName in controllerConfig.routes) {
                const config = controllerConfig.routes[routeName];

                if (typeof(controller[config.action]) != "undefined") {
                    let methods = ["get"];
                    if (config.methods != undefined) {
                        methods = config.methods.map(method => method.toLowerCase());
                    }
                    for (const method of methods) {
                        app[method](controllerConfig.prefix_route+config.route , controller[config.action]);
                    }
                } else {
                    console.log("the '"+controllerConfig.prefix+routeName+"' route in not correctly configured");
                }
            }
        } else {
            console.log("the '"+controllerName+"' controller in not correctly configured");
        }
    }
}
