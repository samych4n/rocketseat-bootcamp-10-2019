"use strict";
require("dotenv/config");
module.exports = {
    // dialect: 'mysql',
    dialect: 'postgres',
    host: process.env.DB_HOST,
    // username: 'root',
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
//# sourceMappingURL=database.js.map