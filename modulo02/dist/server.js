"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
app_1.app.listen(process.env.APP_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`listening na porta ${process.env.APP_PORT}`);
});
//# sourceMappingURL=server.js.map