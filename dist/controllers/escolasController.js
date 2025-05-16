"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEscola = exports.updateEscola = exports.createEscola = exports.getEscolaById = exports.getEscolas = void 0;
const database_1 = require("../config/database");
const getEscolas = async (req, res) => {
    try {
        const escolas = await database_1.prisma.escola.findMany({
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
};
exports.getEscolas = getEscolas;
const getEscolaById = async (req, res) => {
    try {
        const escolaId = parseInt(req.params.id);
        const escola = await database_1.prisma.escola.findUnique({
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
};
exports.getEscolaById = getEscolaById;
const createEscola = async (req, res) => {
    try {
        const { nome, regiao, grupo, endereco, telefone, email, diretor } = req.body;
        if (!nome) {
            return res.status(400).json({
                success: false,
                message: 'O nome da escola é obrigatório'
            });
        }
        const escola = await database_1.prisma.escola.create({
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
};
exports.createEscola = createEscola;
const updateEscola = async (req, res) => {
    try {
        const escolaId = parseInt(req.params.id);
        const { nome, regiao, grupo, endereco, telefone, email, diretor } = req.body;
        const escolaExists = await database_1.prisma.escola.findUnique({
            where: { id: escolaId }
        });
        if (!escolaExists) {
            return res.status(404).json({
                success: false,
                message: 'Escola não encontrada'
            });
        }
        const escola = await database_1.prisma.escola.update({
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
};
exports.updateEscola = updateEscola;
const deleteEscola = async (req, res) => {
    try {
        const escolaId = parseInt(req.params.id);
        const escolaExists = await database_1.prisma.escola.findUnique({
            where: { id: escolaId }
        });
        if (!escolaExists) {
            return res.status(404).json({
                success: false,
                message: 'Escola não encontrada'
            });
        }
        const turmaCont = await database_1.prisma.turma.count({
            where: { escolaId }
        });
        const alunoCont = await database_1.prisma.aluno.count({
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
        await database_1.prisma.escola.delete({
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
};
exports.deleteEscola = deleteEscola;
//# sourceMappingURL=escolasController.js.map