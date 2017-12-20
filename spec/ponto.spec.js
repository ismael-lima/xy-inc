var request = require("request");
var server = require("../server");
var base_url = "http://localhost:3001/ponto";

describe("XY Inc tests", () => {
    
    describe("Limpar a base de dados", () => {
        it("Limpar a base de dados", (done) =>{
            request.get(base_url+'/clear', (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
    });

    describe("Inserir registros", () => {
        it("Inserir registro 1", (done) => {
            request.post(base_url,{form:{nome:'Lanchonete', x :27, y:12}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
        
        it("Inserir registro 2", (done) => {
            request.post(base_url,{form:{nome:'Posto', x :31, y:18}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
                
        it("Inserir registro 3", (done) => {
            request.post(base_url,{form:{nome:'Joalheria', x :15, y:12}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
                        
        it("Inserir registro 4", (done) => {
            request.post(base_url,{form:{nome:'Floricultura', x :19, y:21}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
                                
        it("Inserir registro 5", (done) => {
            request.post(base_url,{form:{nome:'Pub', x :12, y:8}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
                                        
        it("Inserir registro 6", (done) => {
            request.post(base_url,{form:{nome:'Supermercado', x :23, y:6}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });
                                                
        it("Inserir registro 7", (done) => {
            request.post(base_url,{form:{nome:'Churrascaria', x :28, y:2}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                done();
            });
        });            
        
        it("Inserir registro 8", (done) => {
            request.post(base_url,{form:{nome:'Clube de Xadrez', x :28, y:-2}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(false);
                done();
            });
        });                               
    });
    
    describe("Listar registros", () => {
        it("Listar registros", (done) =>{
            request.get(base_url, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.length).toBe(7);
                done();
            });
        });
    });
    
    describe("Listar pontos proximos", () => {
        it("Listar pontos proximos", (done) =>{
            request.post(base_url+'/proximidade',{form:{distancia:10,x: 20,y: 10}}, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                let retorno = JSON.parse(body);
                expect(retorno.success).toBe(true);
                expect(retorno.lista.length).toBe(4);
                done();
            });
        });
    });
    
    describe("inserir pontos ramdomicos", () => {
        for(let cont = 0; cont<1000; cont++)
        {
            let xt = Math.floor(Math.random() * 500);
            let yt = Math.floor(Math.random() * 500);

            let ponto = {nome:'Ponto Teste '+cont, 
                        x :xt, 
                        y:yt};

            it("inserir ponto X: "+xt+", Y: "+yt, (done) =>{
                request.post(base_url,{form: ponto}, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    let retorno = JSON.parse(body);
                    expect(retorno.success).toBe(true);
                    done();
                });
            });
        }
    });
    
    describe("Listar pontos proximos ramdomicos", () => {
        for(let cont = 0; cont<100; cont++)
        {
            let xt = Math.floor(Math.random() * 500);
            let yt = Math.floor(Math.random() * 500);
            let dt = Math.floor(Math.random() * 100);

            it("Listar pontos na distancia de "+dt+" do ponto X: "+xt+", Y: "+yt, (done) =>{
                request.post(base_url+'/proximidade',{form: {distancia:dt,x: xt,y: yt}}, (error, response, body) => {
                    expect(response.statusCode).toBe(200);
                    let retorno = JSON.parse(body);
                    expect(retorno.success).toBe(true);
                    retorno.lista.forEach((item)=>{
                        let a = Math.pow(Math.abs(xt - item.x),2) + Math.pow(Math.abs(yt - item.y),2);
                        let h = Math.pow(dt, 2);
                        expect(a).not.toBeGreaterThan(h);
                    });
                    done();
                });
            });
        }
    });

});