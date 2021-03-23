import Router from "./Core/Router";
import Helpers from "./Core/Helpers";

const Twig = require("twig");
const {twig} = Twig;
const express = require("express");

const app = express();

Twig.extendFunction('path', function (pathName, params = {}) {
    return Helpers.getPath(pathName, params);
})

app.set('views', 'Views');
app.set('view engine', 'twig');

app.listen(80);

Router(app);

console.log("Server started");
