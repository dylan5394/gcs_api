"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const signedUrlRoute = require("./routes/signedUrlRoute");
class App {
    constructor() {
        this.express = express();
        this.configureRoutes();
    }
    configureRoutes() {
        this.express.use('/signed_urls', signedUrlRoute);
        this.express.use(function (req, res, next) {
            res.status(404);
            res.send({ error: "Page not found" });
            return;
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map