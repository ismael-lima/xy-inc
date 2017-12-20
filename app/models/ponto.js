var mongoose = require('mongoose');

module.exports = ()=> {
    var schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        x:{
            type: Number,
            required: true
        },
        y:{
            type: Number,
            required: true
        }
    });

    return mongoose.model('Ponto', schema, 'pontos');
   
}