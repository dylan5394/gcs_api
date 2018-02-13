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
    const validRequestTypes = ["GET", "PUT", "POST", "DELETE"];
    const validContentTypes = ["application/json", "application/xml"];
    if ('requestType' in params) {
        if (validRequestTypes.indexOf(params.requestType) === -1) {
            response.status(400);
            response.send({ error: "Invalid request type supplied. Use GET, PUT, POST, or DELETE." });
            return;
        }
        requestType = params.requestType;
    }
    if ('contentType' in params) {
        if (validContentTypes.indexOf(params.contentType) === -1) {
            response.status(400);
            response.send({ error: "Invalid content type supplied. Use application/json or application/xml." });
            return;
        }
        contentType = params.contentType;
    }
    if ('expires' in params) {
        if (isNaN(params.expires)) {
            response.status(400);
            response.send({ error: "Invalid expiration timestamp supplied. Provide a proper timestamp in seconds." });
            return;
        }
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