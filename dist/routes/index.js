"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Importações das rotas serão descomentadas à medida que forem implementadas
const escolas_1 = __importDefault(require("./escolas"));
// import turmasRoutes from './turmas';
// import alunosRoutes from './alunos';
// import provasRoutes from './provas';
// import usuariosRoutes from './usuarios';
// import authRoutes from './auth';
const router = (0, express_1.Router)();
// Rota base da API
router.get('/', (req, res) => {
    res.json({
        message: 'API do Sistema de Avaliação e Gerenciamento (SAG)',
        status: 'online',
        endpoints: [
            '/escolas',
            '/turmas',
            '/alunos',
            '/provas',
            '/usuarios',
            '/auth'
        ]
    });
});
// Registra as rotas específicas (serão descomentadas à medida que forem implementadas)
router.use('/escolas', escolas_1.default);
// router.use('/turmas', turmasRoutes);
// router.use('/alunos', alunosRoutes);
// router.use('/provas', provasRoutes);
// router.use('/usuarios', usuariosRoutes);
// router.use('/auth', authRoutes);
exports.default = router;
