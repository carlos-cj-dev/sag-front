"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("./config"));
const database_1 = require("./config/database");
const routes_1 = __importDefault(require("./routes"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Cria a aplicação Express
const app = (0, express_1.default)();
exports.app = app;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Rota para verificar se a API está funcionando
app.get('/', (req, res) => {
    res.json({
        message: 'SAG API funcionando!',
        version: '1.0.0',
        environment: config_1.default.server.env
    });
});
// Registra as rotas da API
app.use(`${config_1.default.api.prefix}/${config_1.default.api.version}`, routes_1.default);
// Middleware para tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Ocorreu um erro no servidor',
        error: config_1.default.server.env === 'development' ? err.message : undefined
    });
});
// Middleware para rotas não encontradas
app.use((req, res) => {
    res.status(404).json({
        message: 'Rota não encontrada'
    });
});
// Inicia o servidor
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Testa a conexão com o banco de dados
        const dbConnected = yield (0, database_1.testConnection)();
        if (!dbConnected) {
            console.error('❌ Falha ao conectar ao banco de dados. Verifique suas configurações');
            process.exit(1);
        }
        const PORT = config_1.default.server.port;
        app.listen(PORT, () => {
            console.log(`⚡️ Servidor rodando em http://localhost:${PORT}`);
            console.log(`📡 API disponível em http://localhost:${PORT}${config_1.default.api.prefix}/${config_1.default.api.version}`);
            console.log(`🌎 Ambiente: ${config_1.default.server.env}`);
        });
    }
    catch (error) {
        console.error('❌ Erro ao iniciar o servidor:', error);
        process.exit(1);
    }
});
exports.startServer = startServer;
