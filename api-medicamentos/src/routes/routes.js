const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const MedController = require('../controllers/MedController')

router.post('/novoMedicamento', MedController.novoMedicamento)
router.get('/medicamentos', MedController.listarMedicamentos)
router.get('/medicamentos/:id', MedController.buscaMedicamento)

router.post('/novocadastro', MedController.novocadastro)
router.get('/cadastro', MedController.listarcadastro)
router.get('/cadastro/:id', MedController.buscacadastro)
router.put('/atualizar/cadastro/:id', MedController.atualizarcadastro)
router.delete('/delete/cadastro/:id', MedController.removercadastro)

module.exports = router