# Teste GB

### :rocket: Requisitos do teste:
- Rota para cadastrar um novo revendedor(a) exigindo no mínimo nome completo, CPF,
email e senha;
- Rota para validar um login de um revendedor(a);
- Rota para cadastrar uma nova compra exigindo no mínimo código, valor, data e CPF do revendedor(a). Todos os cadastros são salvos com o status “Em validação” exceto
quando o CPF do revendedor(a) for 153.509.460-56, neste caso o status é salvo como
“Aprovado”;
- Rota para listar as compras cadastradas retornando código, valor, data, % de cashback
aplicado para esta compra, valor de cashback para esta compra e status;
- Rota para exibir o acumulado de cashback até o momento, essa rota irá consumir essa
informação de uma API externa disponibilizada pelo Boticário.

## :scroll: Documentação

### Tecnologias utilizadas

- [nodejs](https://nodejs.org/en/)
- [express](https://expressjs.com/pt-br/)
- [postgres](https://www.postgresql.org/)
- [typescript](https://www.typescriptlang.org/)
- [typeorm](https://typeorm.io/#/)
- [jsonwebtoken](https://jwt.io/)
- [pino](https://github.com/pinojs/pino)
- [axios](https://github.com/axios/axios)
- [jest](https://jestjs.io/)
- [babel](https://babeljs.io/)
- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
- [tsyringe](https://github.com/microsoft/tsyringe)


### Estrutura de pastas

``` 
src                      # Onde fica todo código da aplicação
├── @type                # Types que tiveram necessidade de sobrescrever o padrão
├── config               # Arquivos para configurações geral da aplicação
├── container            # Configuração responsável pela injeção de dependência
├── dtos                 # Tipagens reaproveitadas em várias partes do código
├── infra                # Toda parte de dados: models, repositórios e database config
├── logs                 # Arquivo do pinojs (logger), utilizado em toda aplicação
├── providers            # Serviços terceiros que ficam isolados para fácil manutenção
├── services             # Onde ficam as classes que comunicam com os repositórios
├── tests                # Testes unitário e de integração
├─ app.ts                # Início da aplicação
├─ routes.ts             # Arquivo que contém todas as rotas
├─ server.ts             # Arquivo que inicia o servidor da aplicação
```

### Instruções para rodar a API

:warning: Antes de rodar o projeto é necessário criar as database postgres, serão necessário duas:
- gb_challenge - bando da aplicação
- gb_challenge_test - banco utilizando nos testes de integração

Também será necessário completar o arquivo `.env` e `.env.development` com as credenciais do bando de dados.

Agora, basta seguir os passos abaixo:

```
# Clonando o repositório
$ git clone https://github.com/gdlopes/gb-challenge.git

# Navegando para a pasta do projeto
$ cd gb-challenge

# Instalando as dependencias
$ yarn

# Criando as migrations
$ yarn typeorm migration:run

# Rodando o projeto em desenvolvimento
$ yarn dev

# Para rodar os testes basta
$ yarn test
```

### Testes são importantes :heart:
![image](https://user-images.githubusercontent.com/39420270/105110636-c36d0800-5a9d-11eb-8779-ec0211fd9d1e.png)


### Sobre as rotas criadas

POST http://localhost:3333/resellers - rota para criar um novo revendedor.

GET http://localhost:3333/cashback/:cpf - rota para buscar o cashback acumulado de um revendedor.

POST http://localhost:3333/sessions - rota para autenticar um revendedor.

POST http://localhost:3333/orders - rota para criar um pedido.

GET http://localhost:3333/orders - rota para buscar os pedidos criados.

### Testando API localmente

Utilize as rotas citadas acima com seus devidos métodos HTTP para ver tudo fundionando, pode utilizar o [postman](https://www.postman.com/) ou qualquer aplicativo equivalente.

Caso esteja acostumado com o [Insomnia](https://insomnia.rest/) e o tenha instalado, pode importar o projeto através deste botão que deixei pronto com as rotas da aplicação :point_down:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=sami-challenge&uri=https%3A%2F%2Fgithub.com%2Fgdlopes%2Fsami-challenge%2Fblob%2Fmain%2FInsomnia_2021-01-19.json)


### Thats it folks :clap:
Get a :coffee: and keep learning :books: ! 

---

by Gustavo Lopes :tada:
