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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEscola = exports.updateEscola = exports.createEscola = exports.getEscolaById = exports.getEscolas = void 0;
const database_1 = require("../config/database");
/**
 * @desc    Obter todas as escolas
 * @route   GET /api/v1/escolas
 * @access  Private
 */
const getEscolas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const escolas = yield database_1.prisma.escola.findMany({
            orderBy: {
                nome: 'asc'
            }
        });
        res.status(200).json({
            success: true,
            count: escolas.length,
            data: escolas
        });
    }
    catch (error) {
        console.error('Erro ao buscar escolas:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar escolas',
            error: error.message
        });
    }
});
exports.getEscolas = getEscolas;
/**
 * @desc    Obter uma escola pelo ID
 * @route   GET /api/v1/escolas/:id
 * @access  Private
 */
const getEscolaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const escolaId = parseInt(req.params.id);
        const escola = yield database_1.prisma.escola.findUnique({
            where: { id: escolaId },
            include: {
                turmas: true
            }
        });
        if (!escola) {
            return res.status(404).json({
                success: false,
                message: 'Escola não encontrada'
            });
        }
        res.status(200).json({
            success: true,
            data: escola
        });
    }
    catch (error) {
        console.error('Erro ao buscar escola:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao buscar escola',
            error: error.message
        });
    }
});
exports.getEscolaById = getEscolaById;
/**
 * @desc    Criar uma nova escola
 * @route   POST /api/v1/escolas
 * @access  Private/Admin
 */
const createEscola = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nome, regiao, grupo, endereco, telefone, email, diretor } = req.body;
        // Validação básica
        if (!nome) {
            return res.status(400).json({
                success: false,
                message: 'O nome da escola é obrigatório'
            });
        }
        const escola = yield database_1.prisma.escola.create({
            data: {
                nome,
                regiao,
                grupo,
                endereco,
                telefone,
                email,
                diretor,
            }
        });
        res.status(201).json({
            success: true,
            data: escola,
            message: 'Escola criada com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao criar escola:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao criar escola',
            error: error.message
        });
    }
});
exports.createEscola = createEscola;
/**
 * @desc    Atualizar uma escola existente
 * @route   PUT /api/v1/escolas/:id
 * @access  Private/Admin
 */
const updateEscola = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const escolaId = parseInt(req.params.id);
        const { nome, regiao, grupo, endereco, telefone, email, diretor } = req.body;
        // Verificar se a escola existe
        const escolaExists = yield database_1.prisma.escola.findUnique({
            where: { id: escolaId }
        });
        if (!escolaExists) {
            return res.status(404).json({
                success: false,
                message: 'Escola não encontrada'
            });
        }
        // Atualizar a escola
        const escola = yield database_1.prisma.escola.update({
            where: { id: escolaId },
            data: {
                nome,
                regiao,
                grupo,
                endereco,
                telefone,
                email,
                diretor,
            }
        });
        res.status(200).json({
            success: true,
            data: escola,
            message: 'Escola atualizada com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao atualizar escola:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao atualizar escola',
            error: error.message
        });
    }
});
exports.updateEscola = updateEscola;
/**
 * @desc    Excluir uma escola
 * @route   DELETE /api/v1/escolas/:id
 * @access  Private/Admin
 */
const deleteEscola = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const escolaId = parseInt(req.params.id);
        // Verificar se a escola existe
        const escolaExists = yield database_1.prisma.escola.findUnique({
            where: { id: escolaId }
        });
        if (!escolaExists) {
            return res.status(404).json({
                success: false,
                message: 'Escola não encontrada'
            });
        }
        // Verificar se existem turmas ou alunos associados à escola
        const turmaCont = yield database_1.prisma.turma.count({
            where: { escolaId }
        });
        const alunoCont = yield database_1.prisma.aluno.count({
            where: { escolaId }
        });
        if (turmaCont > 0 || alunoCont > 0) {
            return res.status(400).json({
                success: false,
                message: 'Não é possível excluir a escola pois existem turmas ou alunos associados',
                turmas: turmaCont,
                alunos: alunoCont
            });
        }
        // Excluir a escola
        yield database_1.prisma.escola.delete({
            where: { id: escolaId }
        });
        res.status(200).json({
            success: true,
            message: 'Escola excluída com sucesso'
        });
    }
    catch (error) {
        console.error('Erro ao excluir escola:', error);
        res.status(500).json({
            success: false,
            message: 'Erro ao excluir escola',
            error: error.message
        });
    }
});
exports.deleteEscola = deleteEscola;
