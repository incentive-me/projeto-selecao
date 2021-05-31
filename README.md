<h4 align="center" >
  <img src="https://github.com/gustavocrvls/projeto-selecao/blob/8414bafad33f642932609bc1222977f7fc854cfa/src/assets/images/logo.svg" width="100" />
</h4>
<h4 align="center" style="color: #6B59DA;">
  GitHub Stars
</h4>

<p align="center">
  <a href="https://rocketseat.com.br">
    <img alt="Made by Rocketseat" src="https://img.shields.io/badge/made%20by-Gustavo-6B59DA">
  </a>
  <img alt="License" src="https://img.shields.io/badge/license-MIT-6B59DA">
</p>

## 💡 Sobre o Projeto

O projeto foi desenvolvido para uma vaga de Desenvolvedor Frontend na empresa incentive.me.

O GitHub Stars é um aplicativo onde os usuários do github podem estar fazendo o gerenciamento dos repositóros marcados com uma estrela através da utilização de tags.

Você pode dar uma olhada no Figma do projeto: <a href="https://www.figma.com/file/soDluCOmZ5HF6QU0sQ94PB/GitHub-Stars?node-id=0%3A1" target="_blank">GitHub Stars</a>

O projeto está hospedado no Vercel, no seguinte endereço: <a href="https://projeto-selecao-bay.vercel.app/" target="_blank">GitHub Stars</a>

<img src="https://github.com/gustavocrvls/projeto-selecao/blob/29a1e9c6ac66d9dacb2f5f68b11a261b909f8dd6/public/screenshots/github-stars.gif" alt="github-stars" width="100%">

<details>
  <summary>Detalhes do Desafio</summary>
  
  # PROJETO DE SELEÇÃO

  Ao conhecer uma pessoa que está aplicando para a Incentive.me gostamos de ter uma conversa sobre código. Afinal, escrever, ler e discutir sobre código faz parte da nossa rotina diária de trabalho.

  Você pode implementar o projeto usando qualquer linguagem de sua preferência. Lembre-se: use a linguagem com a qual você tem mais familiaridade.

  ## O QUE VAMOS AVALIAR

  Queremos avaliar sua capacidade de fornecer um produto simples com documentação suficiente para outros desenvolvedores contribuírem ativamente para o projeto posteriormente. Na entrevista vamos prestar atenção nos seguintes itens:

  * Comunicação na revisão do código presencial;
  * Argumentos sobre desafios enfrentados e escolhas realizadas na implementação;

  Ao revisar seu código vamos prestar atenção nos seguintes itens:

  * Organização do código;
  * Código bem escrito, limpo e coeso;
  * Arquitetura e princípios de desenvolvimento;
  * Documentação (README.md) com instruções claras para reproduzir o projeto;
  * Uso adequado de versionamento do código em git;
  * Uso de testes automatizados;
  * Deploy da aplicação: recomendamos Heroku por ter plano free;
  * O design da API RESTful é implementado, usando corretamente os verbos HTTP e o código de status apropriado;
  * Uso adequado de HTML5, CSS3 e JavaScript em um front-end minimamente estruturado.

  Caso você não se sinta confortável com algum desses itens, tudo bem, apenas nos fale sobre isso, ok? O objetivo aqui não é te fazer perder tempo com algo irrelevante. Nosso objetivo aqui é ter um código sobre o qual podemos conversar. Como você deve ter notado, a gente preza muito por colaboração, trabalho em time e comunicação. O objetivo aqui é ter, minimamente, essa experiência com você.

  Respeite o seu nível de conhecimento e experiência, o importante é você saber dizer o motivo das suas escolhas. Se você tiver qualquer dúvida, por favor, entre em contato com a gente. Estamos disponíveis para te ajudar a finalizar esse processo.

  ## IDEIAS DE PROJETOS

  A seguir seguem algumas ideias de projetos que você pode implementar:

  * [Cliente para o GitHub](https://github.com/incentive-me/projeto-selecao/blob/master/projects/GITHUB.md);
  * [Cliente para o Twitter](https://github.com/incentive-me/projeto-selecao/blob/master/projects/TWITTER.md);
  * [Cliente para o Meetup](https://github.com/incentive-me/projeto-selecao/blob/master/projects/MEETUP.md).

  Tem alguma outra ideia? Tem algum projeto que já está pronto e gostaria de apresentar? Fale com a gente :)

  ## COMO COMPARTILHAR O PROJETO CONOSCO

  1. Apague este README.md e adicione informações que achar relevante como configurar o projeto, contendo os comandos que devem ser executados para executar ele e os testes;
  2. Abra um PR apontando para a branch master deste repositório;
  3. Escreva qualquer consideração na descrição do PR e faça qualquer comentário que achar pertinente no código.

</details>

## 🕹 Funcionalidades
- [x] Login
- [x] Tags
  - [x] Criar
  - [x] Excluir
  - [x] Filtrar
  - [x] Buscar
- [ ] Utilizar Token do Github (em breve)

## 🛠 Tecnologias Usadas
- Typescript
- React
- styled-components
- Firebase

## 🧙‍♂️ Como Iniciar o Projeto

```
⚠ Você vai precisar criar um projeto no Firebase para fazer a persistência dos dados.
```

Primeiro faça a clonagem do projeto em algum diretorio do seu computador:
```bash
> cd "algum/diretorio/qualquer"
> git clone https://github.com/gustavocrvls/projeto-selecao.git
```
Depois disso instale as dependências:
```bash
> yarn install
```
Agora crie um arquivo _.env_ na raiz do projeto, com os campos que estão dentro de _.env.example._:
```env
REACT_APP_GITHUB_API=https://api.github.com # default

# Firebase
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
```

E então é só iniciar o projeto:
```bash
> yarn start
```
O projeto vai iniciar em http://localhost:3000. 

Isso é tudo, pessoal!
