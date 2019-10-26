"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
app.use(express_1.default.json());
var users = ['AAAA', 'Cláudio', 'Victor'];
function checkUserExist(req, res, next) {
    if (!req.body.name)
        return res.status(400).json({ error: 'User name is required' });
    return next();
}
function checkUserInArray(req, res, next) {
    if (!users[req.params.index])
        return res.status(400).json({ error: 'User does not exists' });
    return next();
}
app.use(function (req, res, next) {
    console.log("M\u00E9todo: " + req.method + "; URL: " + req.url);
    next();
});
app.get('/user', function (req, res) { return res.json(users); });
app.get('/user/:index', checkUserInArray, function (req, res) {
    var index = req.params.index;
    return res.json(users[index]);
});
app.post('/user', checkUserExist, function (req, res) {
    var name = req.body.name;
    users.push(name);
    return res.json(users);
});
app.put('/user/:index', checkUserInArray, checkUserExist, function (req, res) {
    var index = req.params.index;
    var name = req.body.name;
    users[index] = name;
    return res.json(users);
});
app.delete('/user/:index', checkUserInArray, function (req, res) {
    var index = req.params.index;
    users.splice(index, 1);
    return res.send();
});
app.listen(3000);
