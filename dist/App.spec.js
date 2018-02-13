"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const supertest = require("supertest");
const App_1 = require("./App");
describe('API', () => {
    it('returns json response', () => supertest(App_1.default)
        .get('/signed_urls')
        .expect('Content-Type', /json/)
        .expect(200));
});
//# sourceMappingURL=App.spec.js.map