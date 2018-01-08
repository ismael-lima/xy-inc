var express = require('express')
module.exports =  (app) => {
    var controller = app.controllers.ponto;

    var pontosRouter = express.Router();
    
    pontosRouter.get('/', controller.listar);
    pontosRouter.post('/', controller.inserir);
    pontosRouter.post('/pontosproximos', controller.pontosproximos);
    pontosRouter.get('/clear', controller.limpar);
    
    app.use('/ponto', pontosRouter);
}
