# Pagamentos APP

![Node](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![FireBase](https://img.shields.io/badge/Fire_Base-FFCB2D?style=for-the-badge&logo=firebase&logoColor=black)
![UIShadcn](https://img.shields.io/badge/UI.Shadcn-000?style=for-the-badge&logo=firebase&logoColor=white)
![Version](https://img.shields.io/badge/V0.1-100000?style=for-the-badge&logo=github&logoColor=white)

<img src="./public/presentation.gif" alt="Exemplo imagem">

# Sistema de Pagamentos

Este projeto é um sistema de pagamentos desenvolvido para treinar habilidades de programação, utilizando [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/), [ui.shadcn](https://shadcn.github.io/ui/) e [Firebase](https://firebase.google.com/) para a persistência dos dados. Através desta aplicação, os usuários podem se registrar, entrar na plataforma, cadastrar saldos e pagamentos, com o objetivo de gerenciar suas finanças pessoais de maneira eficaz.

## Funcionalidades

- **Autenticação**: Login e logout.
- **Pagamentos**:
  - Criar, visualizar, editar e apagar pagamentos.
  - Atributos: Nome, Descrição, Valor, Saldo Vinculado.
- **Saldos**:
  - Criar, visualizar, editar e apagar saldos.
  - Atributos: Nome, Descrição, Valor Inicial, Valor Restante.

## Regras de Negócio

- O sistema gerencia o valor restante de um saldo.
- Impede vinculação de um saldo a um pagamento se o saldo restante for insuficiente.
- Bloqueia a exclusão de um saldo vinculado a um pagamento.
- Atualiza o valor restante do saldo ao criar ou excluir um pagamento.

## Requisitos

- [Node.js](https://nodejs.org/en/)
- Uma conta no [Firebase](https://firebase.google.com/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone <https://github.com/AndersonAlvesCoelho/payments-app>
   ```

</table>

## 📝 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.
