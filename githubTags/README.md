# GitHub TAGS - Processo seletivo incentive.me

Projeto desenvolvido como parte do processo seletivo para incentive.me
O projeto consiste em poder consultar um usuário utilizando API do github, verificando seus repositórios com estrelas, permitindo adicionar uma tag ao repositório para que você possa encontra-lo mais facilmente consultando uma tag cadastrada. 

Trata-se de uma SPA onde funciona apenas localmente, sem persistência de dados.

O projeto permite:
- Fazer autenticação e autorização de usuário;
- Buscar todos os repositórios em que o usuário fornecido adicionou estrela;
- Gerenciar tags de repositórios listados (adicionar e excluir);
- Filtrar repositórios por tags.

### Repositório

https://github.com/AngeloVSO/githubtags

### Como rodar?

Faça um clone, acesse  terminal e dê um npm install.
Dê um comando npm start. Irá rodar em modo de desenvolvedor.
Em [http://localhost:3000](http://localhost:3000).

### Deploy

Link pra acessar aplicação: https://aodev-githubstags.netlify.app

### O que funciona:

- É possível criar cadastro 
- É possível efetuar login 
- Acesso a aplicação apenas com login
- É possível buscar um usuário via API github
- É possível visualizar repositórios com estrelas
- É possível adicionar tags aos repositórios com estrelas
- Não é possível adicionar tags iguais ao mesmo repositório
- É possível remover tags dos repositórios com estrelas
- É possível consultar repositórios informando uma tag cadastrada
- Responsividade para iphone 6/7/8 Plus

### O que não funciona:

- Não é possível manter as tags salvas casa atualize ou saia da aplicação
- Não é possível editar as tags
- Não é possível armazenar mais de um usuário cadastrado. Devido a falta de persistência de dados, caso seja cadastrado um segundo usuário, o primeiro será excluído.

### Tecnologias utilizadas

A fim de praticar meus conhecimentos, escolhi desenvolver o projeto em React.JS - uma das libs mais utilizadas no mercado atualmente.

React JS - Biblioteca JavaScript para criar interfaces de usuário.

Styled-Components - CSS escrito diretamente no código para estilização de componentes do React JS.
