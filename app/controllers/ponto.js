module.exports = (app)=>{
   
    var Ponto = app.models.ponto;

    var controller = {
        listar : (req, res)=>{
            Ponto.find({},{'nome': 1, 'x':1,  'y':1, '_id':0},{sort: {nome: 1}}).exec()
            .then((pontos) =>{
                res.json(pontos);
            });
        },
        inserir: (req, res)=>{
            console.log(req.body);
            let item = req.body;
            if((item.nome == null) || (item.x<0) || (item.y <0)){
                res.json({success: false, message: 'O ponto de interesse deve conter nome e as coordenadas não podem ser negativas'});
            }
            else{
                item.x = Math.floor(item.x);
                item.y = Math.floor(item.y);
                let ponto = new Ponto(item);
                ponto.save((err) =>{
                    if(err){
                        res.json({success: false, message: 'Falha ao inserir dado. Entre em contato com o administrador do sistema'});
                    }
                    else{
                        res.json({success: true});
                    }
                })
            }
        },
        pontosproximos: (req, res) =>{
            console.log(req.body);
            let item = req.body;
            if((item.distancia < 0) || (item.x<0) || (item.y <0)){
                res.json({success: false, message: 'A distancia máxima e as coordenadas não podem ser negativas'});
            }
            else{
                let minx = item.distancia < item.x? item.x - item.distancia:0; 
                let miny = item.distancia < item.y? item.y - item.distancia:0; 
                let maxx = item.x + item.distancia;
                let maxy = item.y + item.distancia;

                Ponto.find({$and:  [ {x: {$gte: minx, $lte: maxx}}, {y: {$gte: miny, $lte: maxy}} ]  },{'nome': 1, 'x':1,  'y':1, '_id':0}).exec().then((pontos) =>{
                    let results = pontos.filter((obj)=> {
                        let a = Math.pow(Math.abs(obj.x - item.x),2);
                        let b = Math.pow(Math.abs(obj.y - item.y),2);
                        return  (a + b)<= Math.pow(item.distancia, 2);
                    });
                    res.json({success: true, lista: results});
                })
            }
        },
        limpar:(req, res) =>{
            Ponto.remove({}).exec().then(()=>{
                res.json({success: true});
            });
        }
    }

    return controller;

}
