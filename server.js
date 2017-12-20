var app = require('./config/express')();
require('./config/database')();

app.listen(app.get('port'), () =>{
    console.log(`Express Server on port ${app.get('port')}`);
})