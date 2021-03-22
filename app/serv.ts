const express = require("express");

const app = express();

app.get("/", (req: any, res: any) => {
   res.send("COUCOU");
});

app.listen(80);

console.log("Server started");
