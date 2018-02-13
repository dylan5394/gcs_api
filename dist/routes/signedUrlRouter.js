"use strict";
const express = require("express");
let signedUrlRouter = express.Router();
signedUrlRouter.get('/signed_urls', function (req, res) {
    res.json({
        signed_url: "test"
    });
});
module.exports = signedUrlRouter;
//# sourceMappingURL=signedUrlRouter.js.map