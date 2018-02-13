"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
class App {
    constructor() {
        this.express = express();
        this.mountRoutes();
    }
    mountRoutes() {
        const router = express.Router();
        router.get('/gcs/url', (req, res) => {
            const expiry = new Date().getTime() + 3600;
            const key = 'info.json';
            const bucketName = 'hangar-demo-bucket';
            const accessId = 'handardemoserviceaccount@hangardemostorage.iam.gserviceaccount.com';
            // Assemble URL --> request type, md5 content, content type, expiration timestamp, object path
            const stringPolicy = "PUT\n" + "\n" + "application/json\n" + expiry + "\n" + '/' + bucketName + '/' + key;
            // Sign URL with gcs pem file and url encode the result
            const privateKey = fs.readFileSync("gcs.pem", "utf8");
            const signature = encodeURIComponent(crypto.createSign('sha256').update(stringPolicy).sign(privateKey, "base64"));
            // Assemble final URL
            const signedUrl = "https://storage.googleapis.com/" + bucketName + "/" + key + "?GoogleAccessId=" + accessId + "&Expires=" + expiry + "&Signature=" + signature;
            res.json({
                message: signedUrl
            });
        });
        this.express.use('/', router);
        this.express.use(function (req, res, next) {
            res.status(404);
            res.send({ error: "Page not found" });
            return;
        });
    }
}
exports.default = new App().express;
//# sourceMappingURL=App.js.map