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
exports.prisma = void 0;
exports.testConnection = testConnection;
exports.closeConnection = closeConnection;
const prisma_1 = require("../../src/generated/prisma");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
// Mostra a URL do banco de dados com a senha ocultada para debug
const connectionString = process.env.DATABASE_URL || '';
const maskedConnectionString = connectionString.replace(/:([^:@]+)@/, ':***@');
console.log(`🔌 Tentando conectar ao banco de dados: ${maskedConnectionString}`);
// Cria uma instância global do Prisma Client com tratamento de erro
let prisma;
try {
    exports.prisma = prisma = new prisma_1.PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        errorFormat: 'pretty',
    });
    console.log('✅ Cliente Prisma inicializado com sucesso');
}
catch (error) {
    console.error('❌ Erro ao inicializar o Prisma Client:', error);
    throw new Error('Falha ao inicializar o Prisma. Execute "npm run prisma:generate" e tente novamente.');
}
// Função para testar a conexão com o banco de dados
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.$connect();
            console.log('✅ Conexão com o banco de dados estabelecida com sucesso');
            // Verifica a versão do servidor MySQL 
            const result = yield prisma.$queryRaw `SELECT VERSION() as version`;
            console.log(`📊 Versão do MySQL: ${JSON.stringify(result)}`);
            return true;
        }
        catch (error) {
            console.error('❌ Erro ao conectar ao banco de dados:', error);
            return false;
        }
    });
}
// Função para fechar a conexão (útil para testes ou quando precisar encerrar o app)
function closeConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.$disconnect();
        console.log('🔌 Conexão com o banco de dados encerrada');
    });
}
