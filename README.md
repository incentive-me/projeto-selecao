# labeled-github-stars

<b>labeled-github-stars</b> allows you to label starred projects from your github profile.

You can visit and enjoy it: https://labeled-github-stars.herokuapp.com/

_____


## Contributing

### Tecnologies used

- [Nextjs/React](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Typescript](https://www.typescriptlang.org/)
- [Styled Components](https://styled-components.com/)

### Clone repo

```bash
git clone https://github.com/carvalho-rafael/projeto-selecao.git
```

### Get Packages

```bash
yarn install
```

### Set Enviroment Vars
First, copy the example file

```bash
cp .env.example .env
```

In .env file you'll need to set github credencials. Follow [this link](https://docs.github.com/en/developers/apps/building-oauth-apps/creating-an-oauth-app) to see how you can get it!

### Generate tables
After set DATABASE_URL in .env file generate the tabels with Prisma.

```bash
cd src

npx prisma generate
#OR If your database is hosted on Heroku, You'll need to run this, instead:
npx prisma db push
```

### Run

```bash
yarn dev
```

_____


### Author

<table>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/carvalho-rafael">
          <img width="90" height="90" src="https://avatars.githubusercontent.com/carvalho-rafael">
          <p>Rafael Carvalho</p>
          <p>Github</p>
        </a>
        <a href="https://www.instagram.com/desenvolvedor.jr/">
        <p>Instagram</p>
        </a>
      </td>
    </tr>
  <tbody>
</table>

