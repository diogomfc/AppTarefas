const TaskModel = require('../model/TaskModel.js');
const {
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  startOfYear, 
  endOfYear} = require('date-fns');


const current = new Date(); //Data Atual

class TaskController{
//Dentro da clasee pode ter varias funções. 


//req - amarxena todas as informações de requisição.
//res - todas as informaçõe para devolver um tipo de resposta. 
//await -  aguardar o banco de dados para o codigo pegar as informações
//async -  prioriza a execução no DB - Sempre usar
//then - Captura a Resposta positiva
//catch - Captura o Erro caso der errado

// .find({}) - Busca os dados no MongoDB
// .sort('') - Usado na ordenação e indicando se a ordenação será crescente (1) ou decrescente (0)
// .then() - Captura a Resposta positiva
// .catch() - Captura o Erro caso der errado
// .save() - salva a informações no DB

// OPERADORES //
// $and – operador lógico AND
// $or – operador lógico OR
// $not – operador lógico NOT
// $gt = maior que
// $lt = menor que
// $gte = maior ou igual
// $lte = menor ou igual
// $ne = diferente de
// $in = todos os documentos cujo atributo possui um dos valores especificados (no SQL operador IN)
// $nin = todos os documentos cujo atributo não possui um dos valores especificados (no SQL operador NOT IN)

//MODELO ESTRUTURA //
/* async today(req,res){
    await TaskModel
    .find({})
    .then()
    .catch();*/


  async create(req, res){
      
    const task = new TaskModel (req.body);
    await task 
    .save() //salva a informações no DB
    .then(response =>{
        return res.status(200).json(response);
    }) // deu certo devolve a informação
    .catch(error => {
        return res.status(500).json(error)
    }) // erro

  }

  async update (req, res){
    await TaskModel.findOneAndUpdate({'_id': req.params.id}, req.body, {new: true})
    .then(response =>{
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(500).json(error);
    })
  }

  async all (req, res){
    await TaskModel.find({ macaddress: {'$in': req.params.macaddress}})
      .sort('when')
      .then(response =>{
        return res.status(200).json(response);
      })
      .catch(error => {
        return res.status(500).json(error);
      });
  }

  async show (req, res){
    await TaskModel.findById(req.params.id)
    .then(response=>{
      if(response)
        return res.status(200).json(response);
      else {
      return res.status(404).json({error:'Tarefa não encontrada'});
      }
    })
    .catch(error =>{
      return res.status(500).json(error);
    });
  }

  async delete(req,res){
  await TaskModel.deleteOne({'_id':req.params.id})
  .then(response=>{
    return res.status(200).json(response);
  })
  .catch(error=>{
    return res.status(500).json(error);
  });
  }

  async done (req,res){
    await TaskModel.findByIdAndUpdate (
      {'_id': req.params.id },
      {'done': req.params.done},
      {new:true}
      )
    .then(response =>{
      return res.status(200).json(response);
    })
    .catch(error =>{
     return res.status(500).json(error);
    });
  }

  async late(req,res){
    await TaskModel
    .find({
      'when': {'$lt': current}, //Filtrar somente as datas menores ou igual as datas atual
      'macaddress':{'$in': req.params.macaddress} // filtrar macaddress
    })
    .sort('when') // Organizar por data e Hora
    .then (response =>{
     return (res.status(200).json(response));
    })
    .catch(error =>{
     return (res.status(500).json(error));
    });
  }

  async today(req,res){
    await TaskModel
    .find({
      'macaddress':{'$in': req.params.macaddress}, // filtrar macaddress pelo corpo da requesição http
      'when': {'$gte': startOfDay(current), '$lte': endOfDay(current)} // Filtar maior ou igual o primeiro minuto do início do dia e o último minuto do dia
    })
    .sort('when') // Ordenar por data e hora
    .then(response =>{
      return (res.status(200).json(response));
    }) // Resposta se der certo a consulta
    .catch(error => {
      return (res.status(500).json(error));
    }); // Resposta se der errado a consilta
  }
 
  async week (req, res){
    await TaskModel
   .find ({
     'macaddress':{'$in': req.params.macaddress},
     'when':{'$gte': startOfWeek(current), '$lte': endOfWeek(current)}, //Filtrar por semana
    })
   .sort('when')
   .then(response =>{
     return(res.status(200).json(response));
   })
   .catch(error =>{
     return(res.status(500).json(error));
   });
  }

  async month (req, res){
    await TaskModel
    .find({
      'macaddress':{'$in': req.params.macaddress},
      'when':{'$gte': startOfMonth(current), '$lte': endOfMonth(current)}, //Filtrar por mês
    })
    .sort('when')
    .then(response =>{
      return(res.status(200).json(response));
      })
    .catch(error =>{
     return(res.status(500).json(error));
    });
  }

  async year (req, res){
   await TaskModel
    .find({
      'macaddress':{'$in':req.params.macaddress},
      'when':{'$gte':startOfYear(current), '$lte':endOfYear(current)}, //Filtar por ano
    })
    .sort('when')
    .then(response =>{
      return(res.status(200).json(response));
    })
    .catch(error =>{
      return(res.status(500).json(error));
    });
  }
}

module.exports = new TaskController();