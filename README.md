# Projeto Seleção - Plataforma de pagamentos

O projeto escolhido para minha aplicação foi o sistema de pagamentos, o lado do cliente  foi reproduzido o layout do Figma com a combinação de React e Material UI como sugerido. Já o lado do servidor foi estruturado com Java e Spring Boot. Buscando sempre boas práticas de programação e estruturação de arquivos de forma organizada.
Meu maior desafio com esse desafio foi o tempo hábil disponível do projeto, onde o mesmo não foi finalizado, independente do meu andamento no processo, pretendo continuar e finalizar o projeto, pois minha curva de aprendizado com o mesmo me agregou bastante, então se tem algo contra eu finalizar o mesmo e manter em meu portfólio, só me avisar.

Na sequência irei fazer um apanhado das features desenvolvidas.

## Stack

### Back-end
- Java
- Spring Boot
- JPA / Hibernate
- MySQL
- Flyway
- Maven

### Front-end
- JavaScript
- ReactJs
- Material UI
- Tailwind Css
- Vite

## Endpoints back-end

Camadas service foram incluídas nas requisições em que seriam necessárias lógicas de tratamento de erros.

### BalanceController - Controller de Saldos

<code>POST</code> <code>/balances</code - cria um novo saldo no banco de dados de acordo com o corpo da requisição enviado

<code>GET</code> <code>/balances</code> - lista todos os saldos cadastrados no banco de dados

<code>PUT</code> <code>/balances</code> - atualiza somente o nome de um saldo com base em seu ID

<code>DELETE</code> <code>/balances/{id}</code> - deleta um saldo do banco de dados com base em seu ID enviado na URL

<code>POST</code> <code>/balances/{id}</code> - lista o saldo referente ao ID enviado na URL

### PaymentController - Controller de Pagamentos

<code>POST</code> <code>/payments</code - cria um novo pagamento no banco de dados de acordo com o corpo da requisição enviado

<code>GET</code> <code>/payments</code> - lista todos os pagamentos cadastrados no banco de dados

<code>PUT</code> <code>/payments</code> - atualiza somente o nome de um pagamento com base em seu ID

<code>DELETE</code> <code>/payments/{id}</code> - deleta um pagamento do banco de dados com base em seu ID enviado na URL

<code>POST</code> <code>/payments/{id}</code> - lista o pagamento referente ao ID enviado na URL

## Rotas front-end

As rotas daqui foram feitas em português pensando em um eventual usuário da aplicação que não possui conhecimento em inglês.

<code>/login</code> - Renderiza a página de login

<code>/</code> - Renderiza página inicial sem nenhuma opção selecionada

<code>/pagamentos</code> - Renderiza página de pagamentos

<code>/pagamentos/criar</code> - Renderiza página de criação de pagamentos

<code>/pagamentos/editar</code> - Renderiza página de edição de pagamentos

<code>/saldos</code> - Renderiza página de saldos

<code>/saldos/criar</code> - Renderiza página de criação de saldos

<code>/saldos/editar</code> - Renderiza página de edição de saldos

## Como executar o projeto

### Back-end
Pré-requisito: Java 17

```bash
# clonar repositório
git clone git@github.com:felipesousac/projeto-selecao.git

# entrar na pasta do projeto back-end
cd server

# alterar as credenciais de banco de dados no arquivo application.properties

# executar o projeto
./mvnw spring-boot:run
```

### Front-end

```bash
# entrar na pasta do projeto front-end
cd client

# rodas os seguinte comandos
npm install
npm run dev

# após acessar a seguinte url para seguir com o fluxo da aplicação
http://localhost:5173/
```