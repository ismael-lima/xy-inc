var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');


module.exports = ()=>{
    var app = express();

    app.set('port', 3021);
    app.use(express.static('./public'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.set('view engine', 'ejs');
    app.set('views', './app/views');

    load('models', {cwd: 'app'})
        .then('controllers')
        .then('routes')
        .into(app);

    return app;
}
