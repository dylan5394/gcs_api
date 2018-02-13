"use strict";
const express = require("express");
const crypto = require("crypto");
const fs = require("fs");
let signedUrlRouter = express.Router();
signedUrlRouter.get('/', function (request, response) {
    const params = request.query;
    let requestType = "GET";
    let contentType = "";
    let expires = new Date().getTime() + 60 * 60;
    if ('requestType' in params) {
        requestType = params.requestType;
    }
    if ('contentType' in params) {
        contentType = params.contentType;
    }
    if ('expires' in params) {
        expires = params.expires;
    }
    const key = 'info.json';
    const bucketName = 'hangar-demo-bucket';
    const accessId = 'handardemoserviceaccount@hangardemostorage.iam.gserviceaccount.com';
    const md5Content = "";
    // Assemble policy
    const stringPolicy = requestType + "\n" + md5Content + "\n" + contentType + "\n" + expires + "\n" + '/' + bucketName + '/' + key;
    // Sign policy with gcs pem file and url encode the result
    const privateKey = fs.readFileSync("gcs.pem", "utf8");
    const signature = encodeURIComponent(crypto.createSign('sha256').update(stringPolicy).sign(privateKey, "base64"));
    // Assemble final URL
    const signedUrl = "https://storage.googleapis.com/" + bucketName + "/" + key + "?GoogleAccessId=" + accessId + "&Expires=" + expires + "&Signature=" + signature;
    response.json({
        signed_url: signedUrl
    });
});
module.exports = signedUrlRouter;
//# sourceMappingURL=signedUrlRoute.js.map