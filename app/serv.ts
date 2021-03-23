import {TestController} from "./Controllers/TestController";

const {twig} = require("twig");
const express = require("express");

const app = express();

app.set('views', 'Views');
app.set('view engine', 'twig')

app.use('/test',TestController);

app.listen(80);

console.log("Server started");
