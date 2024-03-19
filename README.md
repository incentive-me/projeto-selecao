# Sistema de Pagamentos!

O projeto escolhido para o desafio técnico da empresa Incentive.me foi o Sistema de Pagamentos. Vamos a descrição e as etapas para execução: 


# API

## Descrição

A API foi desenvolvida em TypeScript e NestJs seguindo a arquitetura MVC (Model, Controller, View), que é um padrão sólido para o desenvolvimento de software, proporcionando uma estrutura organizada que promove a manutenibilidade, a reutilização de código e a testabilidade. E para banco de dados, foi usado o MySQL. Tanto a aplicação quanto o banco de dados serão executados em container Docker.

#### Principais Bibliotecas Utilizadas

- Bcrypt
- Express
- Typeorm
- Jest
- mysql2
- Swagger,
- JWT



### Executando a API

Usando o 'git clone' faça uma cópia do projeto e em seguida entre no diretório ./api.
O projeto foi desenvolvido usando docker e docker-compose, então após configurar o .env conforme o arquivo .env-example, execute:
```bash
$ docker compose up --build
```

Esse comando vai criar e executar os container do Banco de Dados e da API. Com isso a API já estará pronta para uso e rodando localmente na porta http://localhost:3001
Todas as rotas, com exceção de Criar Usuário e realizar Login, necessitam de autenticação para serem usadas.

## Executando os Testes

```bash
# Testes unitários
$ npm run test

# Para vizualizar a cobertura dos testes
$ npm run test:cov
```

A documentação da API foi desenvolvida usando o Swagger e pode ser acessada no link http://localhost:3001/api onde pode ser encontrado os detalhes e as informações dos endpoints.
Acessando também esse endereço do Swagger http://localhost:3001/api a API pode ser testada de forma simples, seguindo os passos:

- Crie um usuário
- Acesse a rota de login e gere um token
- Aplique o token no **Authorize** dessa forma => **Bearer token_gerado_no login** <=
- Use as rotas


## Sobre mim

Sou Henrique Caires, desenvolvedor de software. Estou a disposição para dúvidas, esclarecimentos e sugestões. Me encontre no linkedin: [Henrique Caires](https://www.linkedin.com/in/henrique-caires)