
# 🌟Github Stars🌟

Desenvolvido para visualizar e gerenciar seus repositórios que receberam uma estrela no Github.

## 🚀 Introdução

Se você precisa de um lugar onde possa visualizar os repositórios que gostou no Github e marcou com uma estrela, o Github Stars vai te ajudar. Lá você pode ver e adicionar tags que vão te ajudar a identificar sobre o que se trata e conhecer as tecnologias envolvidas.

## ⚙ Como usar

Primeiramente, é necessário ter o [Node.js](https://nodejs.org/en) instalado em seu computador

Com isso, faça a clonagem do repositório em seu computador:

```
    git clone https://github.com/DFelipe1/test-incentive.me.git
```

Com o repositório clonado, você terá em seu computador todos os arquivos do projeto, incluindo as pastas `server` e `web` que serão utilizadas.

### Configuração

Antes de rodar a aplicação, é necessário configurar algumas coisas:

- **Instalação de Dependências:**

Entre na pasta 'server' e instale todas as dependências com seu gerenciador de pacotes:
```
    cd /server
    npm install
```

Faça o mesmo na pasta```web```:

```
    cd /web
    npm install
```

- **Variáveis de Ambiente:**

Antes de rodar o projeto, é necessário adicionar algumas variáveis de ambiente. Para isso, crie um OAuth App dentro da configuração de desenvolvedor no Github. [aqui esta um link direto para lá](https://github.com/settings/developers).

Recomenda-se que veja a [documentação do github](https://docs.github.com/pt).


Após criar um *OAuth App* no Github, pegue as chaves ``Client Id`` e ``Client Secrets``, crie um arquivo ``.env`` na raiz da pasta ``server`` e adicione o valor das chaves lá:

```
    GITHUB_ID
    GITHUB_SECRET

    DATABASE_URL="file:./dev.db"
```

---

Agora sim, está tudo pronto para rodar, e para isso é simples:

Entre na pasta 'server' e execute o comando:

**/server**
```
    npm run dev
```
Faça o mesmo na pasta 'web':

**/web**
```
    cd web
    npm run dev
```

🎉 Pronto, o App está rodando.



## Documentação da API

#### Autenticando com github

```http
  POST /register
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `code` | `string` | **Obrigatório**. Código devolvido pelo Github após autorização|

#### Retorna todos os repositorios

```http
  GET /${userId}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `userId`      | `string` | **Obrigatório**. ID do usuário logado. |

#### Retorna um único repositório

```http
  GET /repo/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID do repositório desejado. |

#### Retorna todas as tags

```http
  GET     /tags
```

#### Adiciona uma tag

```http
  POST    /tag
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `RepoId`      | `string` | **Obrigatório**. ID do repositório ao qual deseja adicionar a tag. |
`name`      | `string` | **Obrigatório**. Nome da tag desejada.|

#### Deleta tag de um repositório

```http
  DELETE    /tag/${tagId}/${reposId}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `tagId`      | `string` | **Obrigatório**. ID da tag que deseja deletar. |
`reposId`      | `string` | **Obrigatório**.ID do repositório ao qual a tag está atribuída.|


#### Filtra lista de repositórios por tag

```http
  GET /filter/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID da tag pela qual deseja filtrar. |





## 👨‍💻 Sobre o autor
Me chamo David Felipe, sou desenvolvedor web focado em front-end, apaixonado por criatividade! E resolver problemas através das linhas de código.

Se deseja me conhecer melhor ou me encontrar em algum lugar, vou deixar meus links abaixo 👇


## 🔗 Links
[![portfolio](https://img.shields.io/badge/meu_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://www.davidfelipe.dev)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/lipedev/)


