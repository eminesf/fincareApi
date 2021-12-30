const express = require("express");
const { v4: uuidv4 } = require("uuid")

const app = express();

app.use(express.json());

const customers = [];

app.post('/account', (request, response) => {
  const { cpf, name } = request.body;

  const customerAlreadyExist = customers.some(customer => customer.cpf === cpf);

  if(customerAlreadyExist){
    return response.status(400).json({error: "Customer already exists"});
  }

  const id = uuidv4();
  
  customers.push({
    id,
    name,
    cpf,
    statement: [],
  })

  return response.status(201).send();
})

app.get('/account', (request, response) => {
  return response.json(customers);
})

app.listen(3333);