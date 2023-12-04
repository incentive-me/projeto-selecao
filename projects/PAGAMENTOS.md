# Plataforma de pagamentos

Você deverá implementar um sistema de pagamentos seguindo as seguintes especificações:

## Requisitos

O usuário deve ser capaz de:

- Fazer login e logout na aplicação;
- Criar pagamentos;
- Ver os pagamentos;
- Apagar um pagamento;
- Editar o nome de um pagamento;
- Criar saldos;
- Ver os saldos;
- Apagar um saldo;
- Editar o nome de um saldo;

Os pagamentos devem possuir:

- Nome;
- Descrição;
- Valor;
- Um saldo vinculado;

Os saldos devem possuir:

- Nome;
- Descrição;
- Valor inicial;
- Valor restante;

O sistema deve:

- Gerenciar o valor restante em de um saldo;
- Impedir que um saldo seja vinculado a um pagamento se o valor restante no saldo for menor que o do pagamento;
- Impedir que um saldo seja excluído caso um pagamento esteja vinculado a ele;
- Consumir o valor restante de um saldo quando o mesmo for usado em um pagamento.
- Devolver o valor consumido em um saldo se o pagamento a ele vinculado for excluído;

## Design

Fizemos um [design no figma](https://www.figma.com/file/Hj8wBgoKSucQCMT89Ea9N4/Projeto---Sele%C3%A7%C3%A3o?type=design&node-id=0%3A1&mode=design&t=8tJ3WcBaofPCGWzg-1) para você se inspirar. Nele, nós usamos [MaterialUI](https://mui.com/) como biblioteca de componentes. Se você possuir familiaridade com [React](https://react.dev/), recomendamos o uso dessa biblioteca, pois facilitará
o seu desenvolvimento. Tenha em mente que se você tiver dificultade de seguir o design que criamos, você pode criar algo diferente, opte pelo que te deixe mais confortável.
