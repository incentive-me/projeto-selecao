# github project

## Sobre

Aplicação onde o usuario logado pode pesquisar por repositorios de um determinado usuário e adicionar tag de identificação de sua preferência.

## Instalação

#### Pré-requisitos

Certifique-se de ter instalado em sua maquina estas ferramentas: Git, Node.js, e um editor de textos como o VSCode.

#### Rodando a aplicação localmente

1. Clone o repositório

- `https://github.com/LeonardoCavachini/gitHub_front-end.git`

2. Entre na pasta do repositório que você acabou de clonar:

- `cd gitHub_front-end`

3. Instale as dependências:

- `npm install`

- Inicie o projeto com `npm start`  
  Por padrão o React procura rodar as aplicações na porta 3000.
  Uma página no browser será aberta com a aplicação.  
  Divirta-se!!

4. Inicie o projeto no backend:

para iniciar o porjeto no backend voĉe precisará fazer o clone do projeto no repositorio do backend.

- `git clone https://github.com/LeonardoCavachini/github_back-end.git`

- `cd github_back-end`

- adicione um arquivo `.env` na raiz do projeto com as sehuintes vaiaveis de ambiente.

MYSQL_USER=`exemplo: root`

MYSQL_PASSWORD=`exemplo: 123`

HOSTNAME=`exemplo: localhost`

PORT_NUMBER=`exemplo: 3306`

DB_NAME=`exemplo: meu-db`

- Inicie o projeto com `npm start`

  O projeto irá iniciar o backend na porta 3001.

## Como Usar

Ao iniciar o usuario deverá se logar, mas caso ele não esteja cadastrado no sistema, ele será direcionado para uma pagina de registro, após o registro irá se direcionar para o login, logado no sistema, na primeira caixa de texto, deverá ser digitado um login do github, feito isso, será exibido todos os repositorios do usuario do github, quando digitado o nome do reposito na segunda caixa de texto, será exibido o repositorio digitado, na caixa de ` Tag Repositorio` pode-se digitar a tag que o usuario deseja adicionar no repositorio, por fim, quando o uruario digita o nome da tag do repositorio no campo de busca tag, o repositorio com a tag mecionada é exibido.

## Tecnologias

Tecnologias utilizadas para construção da aplicação:

- Node
- React
- mysql

Ferramentas para controle e organização de código:

- Git
