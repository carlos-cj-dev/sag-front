"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const escolasController_1 = require("../controllers/escolasController");
const router = (0, express_1.Router)();
/**
 * @route   GET /api/v1/escolas
 * @desc    Obter todas as escolas
 * @access  Private
 */
router.get('/', escolasController_1.getEscolas);
/**
 * @route   GET /api/v1/escolas/:id
 * @desc    Obter uma escola pelo ID
 * @access  Private
 */
router.get('/:id', escolasController_1.getEscolaById);
/**
 * @route   POST /api/v1/escolas
 * @desc    Criar uma nova escola
 * @access  Private/Admin
 */
router.post('/', escolasController_1.createEscola);
/**
 * @route   PUT /api/v1/escolas/:id
 * @desc    Atualizar uma escola existente
 * @access  Private/Admin
 */
router.put('/:id', escolasController_1.updateEscola);
/**
 * @route   DELETE /api/v1/escolas/:id
 * @desc    Excluir uma escola
 * @access  Private/Admin
 */
router.delete('/:id', escolasController_1.deleteEscola);
exports.default = router;
