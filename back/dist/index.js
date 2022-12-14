"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
var server_1 = require("@trpc/server");
var standalone_1 = require("@trpc/server/adapters/standalone");
var http_1 = __importDefault(require("http"));
var zod_1 = require("zod");
var t = server_1.initTRPC.create();
var publicProcedure = t.procedure;
var router = t.router;
var appRouter = router({
    greeting: publicProcedure
        // This is the input schema of your procedure
        // 💡 Tip: Try changing this and see type errors on the client straight away
        .input(zod_1.z
        .object({
        name: zod_1.z.string().nullish()
    })
        .nullish())
        .query(function (_a) {
        var _b;
        var input = _a.input;
        // This is what you're returning to your client
        return {
            text: "hello ".concat((_b = input === null || input === void 0 ? void 0 : input.name) !== null && _b !== void 0 ? _b : 'world')
        };
    })
});
// create handler
var handler = (0, standalone_1.createHTTPHandler)({
    router: appRouter,
    createContext: function () {
        console.log('context 3');
        return {};
    }
});
var server = http_1["default"].createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        return res.end();
    }
    handler(req, res);
});
server.listen(2022);
