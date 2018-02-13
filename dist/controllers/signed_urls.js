"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
router.get('/signed_urls', function (req, res) {
    res.json({
        signed_url: "test"
    });
});
module.exports = router;
//# sourceMappingURL=signed_urls.js.map