## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## modelo entidad relacion
![Logo](./images/e-r.png)

## graph QL corriendo
![Logo](./images/qlWorking.png)

## swagger
http://localhost:3000/api

## graph QL
http://localhost:3000/graphql

## Installation

```bash
$ npm install
```

## Running the app

```bash
# run redis and postgres
$ docker-compose up -d

# run migrations
$ npx sequelize-cli db:migrate

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
