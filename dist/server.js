"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
// Inicia o servidor
(0, app_1.startServer)().catch(error => {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
});
