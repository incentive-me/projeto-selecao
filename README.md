# Sistema de Pagamentos!

Projeto para o desafio técnico da empresa Incentive.me. O projeto escolhido foi o Sistema de Pagamentos, o resultado você pode acessar em: 
https://payment-system-oseias.vercel.app/

# Api

## Descrição

A api foi desenvolvida em NodeJS seguindo a filosofia de design Clean Architecture, onde são abastraídas e separadas as responsabilidades em cada camada. 

#### Bibliotecas Utilizadas

- Express, nodemon e sucrase
- dotenv, cors
- JsonWebToken, uuid e Bcrypt
- mysql2


### Instalação da Api

Faça um fork do projeto. Entre no diretório ./api e digite o comando:
```bash
$ yarn install
```

Após instalar as dependências do projeto, crie um arquivo .env e coloque as variáveis de ambiente conforme o arquivo .env-example.

Você precisará criar um banco de dados mysql para rodar o projeto, para isso separei um arquivo db_mysql.sql como exemplo de relacionamentos das tabelas.

Com isso pronto rode o comando: 

```bash
$ yarn build
```

Após o buid, rode o comando para iniciar o servidor: 

```bash
$ yarn start
```

A api estará rodando localmente na porta http://localhost:3001/

# Frontend

O frontend foi desenvolvido, conforme a sugestão, em ReactJS. 

#### Bibliotecas Utilizadas

- React-router-dom, axios
- MaterialUI 
- Redux 

### Instalação do Frontend

Entre no diretório .frontend-payment-system e rode o comando: 

```bash
$ yarn install
```

Após instalar as dependências, entre no diretório ./src/utils/http.ts e altere a variável baseUrl para o endereço local: 

```js
export const baseUrl: string = "http://localhost:5173/"
```

Após isso estamos prontos para inicializar com o seguinte comando: 

```bash
$ yarn dev
```

O frontend já estará funcionando e rodando localmente na porta http://localhost:5173

## Sobre mim

Sou Oséias Costa, desenvolvedor fullstack. Caso tiver dúvidas me coloco a disposição para ajudar. Me chame no linkedin: 
https://www.linkedin.com/in/oseias-costa/