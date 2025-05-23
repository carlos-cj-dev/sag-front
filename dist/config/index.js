"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Configurações da aplicação
const config = {
    // Configurações do servidor
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development',
    },
    // Configurações de autenticação
    auth: {
        jwtSecret: process.env.JWT_SECRET || 'sag-sistema-secret',
        jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
    },
    // Configurações do banco de dados (apenas para referência - o Prisma usa o .env)
    database: {
        url: process.env.DATABASE_URL,
    },
    // Configurações de arquivos e uploads
    uploads: {
        dir: path_1.default.resolve(__dirname, '../../uploads'),
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'application/pdf'],
    },
    // Versão da API
    api: {
        version: 'v1',
        prefix: '/api',
    },
};
exports.default = config;
