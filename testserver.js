var app = require('./config/testexpress')();
require('./config/testdatabase')();

app.listen(app.get('port'), () =>{
    console.log(`Express Server on port ${app.get('port')}`);
})
