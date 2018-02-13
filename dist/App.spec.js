"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const App_1 = require("./App");
describe('API', () => {
    it('returns json response', () => supertest(App_1.default)
        .get('/signed_urls')
        .expect('Content-Type', /json/)
        .expect(200));
    it('returns 400 response for invalid request type', () => supertest(App_1.default)
        .get('/signed_urls?requestType=bad')
        .expect(400));
    it('returns 400 response for invalid content type', () => supertest(App_1.default)
        .get('/signed_urls?contentType=bad')
        .expect(400));
    it('returns 400 response for invalid timestamp', () => supertest(App_1.default)
        .get('/signed_urls?expires=bad')
        .expect(400));
});
//# sourceMappingURL=App.spec.js.map