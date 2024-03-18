# Payment Platform

A NestJS and Vite monorepo application

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

Nest is [MIT licensed](LICENSE).
