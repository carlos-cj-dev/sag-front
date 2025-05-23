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
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
// Carrega as variáveis de ambiente
dotenv_1.default.config();
/**
 * Script para verificar a conexão com o banco de dados e configurar o ambiente inicial
 */
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🔍 Verificando conexão com o banco de dados...');
        const prisma = new client_1.PrismaClient();
        try {
            // Tenta conectar ao banco de dados
            yield prisma.$connect();
            console.log('✅ Conexão com o banco de dados estabelecida com sucesso!');
            // Verifica se o banco de dados está vazio executando uma consulta simples
            const escolaCount = yield prisma.escola.count();
            console.log(`ℹ️ Número de escolas no banco de dados: ${escolaCount}`);
            if (escolaCount === 0) {
                console.log('🌱 Banco de dados vazio. Execute o comando "npm run prisma:seed" para popular com dados iniciais.');
            }
            // Lista as tabelas disponíveis no esquema
            console.log('📋 Tabelas disponíveis no esquema:');
            const dmmf = yield prisma._getDmmf();
            dmmf.datamodel.models.forEach((model) => {
                console.log(`   - ${model.name}`);
            });
            console.log('✨ Banco de dados pronto para uso!');
        }
        catch (error) {
            console.error('❌ Erro ao conectar ao banco de dados:', error);
            console.log('\n🔧 Sugestões para resolver o problema:');
            console.log('1. Verifique se o contêiner MySQL está rodando com "docker-compose ps"');
            console.log('2. Certifique-se de que a string de conexão no arquivo .env está correta');
            console.log('3. Execute as migrações com "npm run prisma:migrate"');
            console.log('4. Reinicie o contêiner MySQL com "npm run db:down" e "npm run db:up"');
            process.exit(1);
        }
        finally {
            yield prisma.$disconnect();
        }
    });
}
// Executa a função
setupDatabase().catch(console.error);
