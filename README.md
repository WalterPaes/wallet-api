<h1 align="center">
    Wallet API
</h1>

<h4 align="center">
  Wallet API is about a personal wallet app
</h4>

## :rocket: Technologies

This project was developed with the following technologies:

-  [TypeScript](https://www.typescriptlang.org/)
-  [NestJS](https://nestjs.com/)
-  [TypeORM](https://typeorm.io/#/)
-  [MySQL](https://www.mysql.com/)
-  [Postman](https://www.postman.com/)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
## Endpoints
| Endpoint 	| Headers 	| Request Payload 	| Response 	| StatusCode 	| Description 	|
|---	|---	|---	|---	|---	|---	|
| ```POST /auth/login``` 	|  	| ``` { "email" : "email@email.com", "password" : "******" } ``` 	| ``` { "access_token": "{TOKEN}" } ``` 	| 201 	| Login user 	|
| ```POST /users``` 	|  	| ``` { "name": "User Name", "email": "email@email.com", "password": "******"} ``` 	|  	| 201 	| Create a new User 	|
| ```GET /users``` 	| ```Authorization: Bearer {TOKEN}``` 	|  	| ``` { "id": 1, "name": "User Name", "email": "email@email.com" } ``` 	| 200 	| Get data about logged user 	|
| ```GET /wallet/balance``` 	| ```Authorization: Bearer {TOKEN}``` 	|  	| ``` { "_amount": 29.89 } ``` 	| 200 	| Get wallet amount 	|
| ```POST /wallet/deposit``` 	| ```Authorization: Bearer {TOKEN}``` 	| ``` { "amount": 30.89 } ``` 	|  	| 201 	| Add amount value in wallet 	|
| ```POST /wallet/deposit``` 	| ```Authorization: Bearer {TOKEN}``` 	| ``` { "amount": 9.89 } ``` 	|  	| 201 	| Remove amount value from wallet 	|
| ```GET /transactions``` 	| ```Authorization: Bearer {TOKEN}``` 	|  	| ``` [     { "amount": 4, "type": "withdraw", "date": "24/02/2022 21:17:48", "id": "04759b2d-a311-403b-9f13-a9d12698eaa7" },     { "amount": 34, "type": "deposit", "date": "24/02/2022 17:45:56", "id": "dd8185b3-fafc-47f2-9863-5c1836fd9fc8" }, ] ``` 	| 200 	| Get user's transactions list 	|
| ```GET /transactions/:id``` 	| ```Authorization: Bearer {TOKEN}``` 	|  	| ``` { "amount": 34, "type": "deposit", "date": "24/02/2022 17:45:56", "id": "dd8185b3-fafc-47f2-9863-5c1836fd9fc8" } ``` 	| 200 	| Get transaction info by id 	|

Made by [Walter Junior!](https://www.linkedin.com/in/walter-paes/)
