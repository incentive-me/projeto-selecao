# Payment Platform

⚛️ A React and NestJS monorepo application

The platform is a financial management solution that simplifies the process of managing payments and balances. With it, users can easily record and manage payments while efficiently managing their available balances, providing a comprehensive and organized view of their financial transactions.

### [Live Demo](https://payment-platform-web.vercel.app/)

<details>
  <summary>Screenshots</summary>
    <img src="apps/web/public/screenshots/login.png" alt="Login">
    <img src="apps/web/public/screenshots/register.png" alt="Register">
    <img src="apps/web/public/screenshots/payments.png"alt="Payment list">
    <img src="apps/web/public/screenshots/payment-edit.png"alt="Payment edit">
    <img src="apps/web/public/screenshots/balances.png"alt="Balances list">
    <img src="apps/web/public/screenshots/balance-edit.png"alt="Balance edit">
</details>

## Configure .env files

Api

```
cp apps/api/.env.example apps/api/.env
```

Web

```
cp apps/web/.env.example apps/web/.env
```

## Installation

```bash
$ pnpm install
```

## Generate Prisma

```
cd /apps/api
```

```
npx prisma generate
```

## Running the app

Api

```bash
# development
$ pnpm --filter api run start

# watch mode
$ pnpm --filter api run start:dev

# production mode
$ pnpm --filter api run start:prod
```

Web

```bash
# development
$ pnpm --filter web run dev
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/NicolasJardin/payment-platform/blob/master/LICENSE) file for details
