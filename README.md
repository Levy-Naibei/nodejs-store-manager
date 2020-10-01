## Store Manager

> This is a RESTful API service that implements store functionalities

## Tech-stack

- Node.js
- express.js
- mongodb
- JSON Web Token (JWT)
- bcrypt

### Prerequisite

- Node installed in your machine

## Features

Registered users can:

- Create store product(s) and order(s)
- Retrieve store product(s) and order(s)
- Update store product(s)
- Delete store product(s) and order(s)

## API Endpoints

|       Endpoint                           |              FUNCTIONALITY                              |
| -----------------------------------------|:-------------------------------------------------------:|
| POST &emsp;&emsp;/users/signup           | This will take email and password                       |
| POST &emsp;&emsp;/users/login            | This will take email and password and return token      |
| GET &emsp;&emsp;/users/signup            | This will fetch all signed up users                     |
| GET &emsp;&emsp;/users/login             | This will fetch all logged in users                     |
| POST &emsp;&emsp;/products               | This will name, price and product image store product   | | POST &emsp;&emsp;/orders                 | This will take productId and quantity and store order   |

## Getting Started

```
    git clone https://github.com/Levy-Naibei/nodejs-store-manager.git
```

```
    cd nodejs-store-manager
```

```
    Run yarn/npm install
```

```
    Create .env file and add environment variables as shown in .env.sample file
```

```
    Run yarn start
```

```
    Copy localhost:5000 in postman and test api endpoints
```