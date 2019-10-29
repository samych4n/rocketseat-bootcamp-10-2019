"use strict";
module.exports = {
    // dialect: 'mysql',
    dialect: 'postgres',
    host: 'localhost',
    // username: 'root',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
//# sourceMappingURL=database.js.map