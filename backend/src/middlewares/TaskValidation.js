const TaskModel = require('../model/TaskModel.js');
const {isPast} = require('date-fns');
const { exists } = require('../model/TaskModel.js');

//middlewares Validação
const TaskValidation = async (req,res,next) => {
  const {macaddress, type, title, description, when } = req.body;
  if (!macaddress)
  return res.status(400).json({error: 'macaddress é obrigatorio'});
  else  if (!type)
  return res.status(400).json({error: 'Tipo é obrigatorio'}); 
  else if (!title)
  return res.status(400).json({error: 'Titlo e obrigatório'});
  else  if (!description)
  return res.status(400).json({error: 'A descrição é obrigatorio'}); 
  else  if (!when)
  return res.status(400).json({error: 'A Data e hora é obrigatorio'}); 
  else  if (isPast(new Date(when)))
  return res.status(400).json({error: 'escolha uma tada e hora diferente'}); 
  else{
      let exists;

      if(req.params.id){
        exists = await TaskModel.
                     findOne(
                         {
                          '_id':{'$ne': req.params.id}, //Tirando o próprio ID tem alguma tarefa para atualizar?
                          'when':{'$eq': new Date(when)}, // Nessa mesma data e horário.
                          'macaddress':{'$in':macaddress} // com esse mesmo McAdress.
                        });
      }else{

        exists = await TaskModel.
                      findOne(
                          {
                            'when':{'$eq': new Date(when)},
                            'macaddress':{'$in':macaddress}
                          });
      }

      if(exists){
        return res.status(400).json({error: 'Já existe uma tarefa nesse dia e horário'});   
      }
      
  next();
   }
}

module.exports = TaskValidation;
