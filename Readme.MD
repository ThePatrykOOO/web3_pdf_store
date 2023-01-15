# Web3 PDF Store

This is a project based on Web3 transactions where users can pay and download PDF files without registration and fill
out forms.

I create an API (Nest.js) site responsible for handling and retrieving every request. Also in the future, I'll create
frontend apps to handle views and API requests. Frontend Framework: I don't know. Maybe Vue.js (I'm regular) or React.js
I would like to learn this again and improve my skills in this project.

## Big Picture

Firstly I create big picture event storming, in which I describe most of the events/actions in the project.
![BigPicture](diagrams/big_picture.jpg)

## Setup project

```
git clone git@github.com:ThePatrykOOO/web3_pdf_store.git
cd web3_pdf_store
docker-compose build
docker-compose up
```

### Run migration

```
docker-compose exec -it api_store bash
npx sequelize-cli db:migrate
```

## TODO List

### API

Admin Panel

- [x] Auth - Login/Register
- [x] Users - get List/single, update, delete
- [x] Products - get List/single, update, delete
- [ ] Orders - get list/single, mark as refunded, Tests
- [x] Unit Tests - User Service, Product Service, Order Service

Seller Panel

- [ ] Auth - Login/Register
- [ ] Products - get List/single, update, delete
- [ ] Orders - get list/single, mark as refunded, Tests
- [ ] Unit Tests - Products Service, Order Service

Store

- [ ] Orders - create order and mark as completed

### Frontend Panel

Soon 

