# Payment System

Este projeto foi construido utilizando **Node, Express, Prisma, Typescript, NextJS, MaterialUI e TailwindCSS.**

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Lucas-barreto1/projeto-selecao.git
```

2. Install dependencies

```bash
FRONT:
  cd app
  yarn install
BACK:
  cd server
  yarn install
```

## Usage

1. Start the application

```bash
  FRONT:
    cd app
    yarn dev
  BACK:
    cd server
    yarn dev
```

2. A aplicação estará disponível em http://localhost:8080 e o app em http://localhost:3000

## API Endpoints

A API fornece os seguintes endpoints:

```markdown
    -- BALANCE--


    GET /balance - Retorna todos os balanços

    GET /balance/:id - Retorna um balanço específico

    POST /balance - Cria um novo balanço

    PATCH /balance - Atualiza um balanço

    DELETE /balance/:id - Deleta um balanço

    -- PAYMENT --

    GET /payment - Retorna todos os pagamentos

    GET /payment/:id - Retorna um pagamento específico

    POST /payment - Cria um novo pagamento

    PATCH /payment - Atualiza um pagamento

    DELETE /payment/:id - Deleta um pagamento


    -- USER --

      POST /login - Login na aplicação

      POST /user - Registra um novo usuário

      GET /user/:id - Retorna um usuário específico
```
