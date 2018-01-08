# xy-inc
O sistema foi desenvolvido com o NodeJs e utiliza o banco de dados MongoDB.

## Para executar o sistema é necessário alterar os arquivos:
* -/config/express.js, para definir a porta em que o servidor vai receber as conexões
* -/config/database.js, para alterar os dados do banco

## Iniciar o serviço atraves do comando:
* npm start

## Iniciar os testes atraves do comando:
* npm test



## Os serviços disponiveis são:


### Inserção de dados:

**POST /ponto**

**parametros de entrada(todos os campos são obrigatórios):**

* nome : string com o nome do local

* x : inteiro não negativo com a coordenada em X

* y : inteiro não negativo com a coordenada em Y




**parametros de saida:**

* success: true se o registro for inserido com sucesso e false caso haja algum problema

* message: mensagem caso não tenha sido inserido o registro




### Listagem de dados:

**GET /ponto**

**parametros de saida:**

* array com os dados da localidade (nome, x, y)




### Listagem de localidades na proximidade:

**POST /ponto/proximidade**

**parametros de entrada(todos os campos são obrigatórios):**

* distancia : inteiro não negativo com a distancia máxima do ponto de referencia

* x : inteiro não negativo com a coordenada em X do ponto de referencia

* y : inteiro não negativo com a coordenada em Y do ponto de referencia




**parametros de saida:**

* success: true se possivel realizar a busca com sucesso e false caso haja algum problema

* lista: array com os dados da localidade (nome, x, y)
