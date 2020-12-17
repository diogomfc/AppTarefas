const { Router } = require('express');
const express = require('express');
const router = express.Router(); //identifica as rotas 

const TaskController = require('../controller/TaskController.js');
const TaskValidation = require('../middlewares/TaskValidation.js');
//const MacaddressValidation = require('../middlewares/MacaddressValidation.js');

router.post('/',TaskValidation,TaskController.create); //Cadastar
router.put('/:id',TaskValidation, TaskController.update); //Atualizar 
router.get('/:id', TaskController.show); //Exibir uma tarefe expecifica
router.delete('/:id', TaskController.delete); // Deletar
router.put('/:id/:done', TaskController.done); // Atualizar Status para verdadeiro ou falso

//FILTROS
router.get('/filter/all/:macaddress', TaskController.all); // Filtar todos
router.get('/filter/late/:macaddress',  TaskController.late); //Listar tarefas atrazadas
router.get('/filter/today/:macaddress', TaskController.today); // Filtrar tarefas do dia
router.get('/filter/week/:macaddress', TaskController.week); // Filtrar tarefas da semana
router.get('/filter/month/:macaddress', TaskController.month); // filtrar tarefas do mês
router.get('/filter/year/:macaddress', TaskController.year); // filtrar tarefas do ano


module.exports = router;