const express = require('express');
const request = require('supertest');
const router = require('../../routers')
const app = express()

app.use(express.json())

app.use('/api/v1',router)

describe('Integration Testing', () =>{
  test('Get Data User', async () => {
    const response = await request(app).get("/api/v1/users")
    expect(response.status).toBe(200)
  });
  test('Get Data Detail User', async () => {
    const response = await request(app).get("/api/v1/users/1")
    expect(response.status).toBe(200)
  });
  test('Post Data User', async () => {
    const response = await request(app).post("/api/v1/users").send({
        "name": "test2",
        "email": "test@test.com",
        "password": "test",
        "identity_number": "124656332",
        "identity_type":"Kartu Spesial",
        "address":"Perum Tidar"
    })
    expect(response.status).toBe(200)
  });
  test('Get Data Transactions', async () => {
    const response = await request(app).get("/api/v1/transactions")
    expect(response.status).toBe(200)
  });
  test('Get Data Detail Transactions', async () => {
    const response = await request(app).get("/api/v1/transactions/1")
    expect(response.status).toBe(200)
  });
  test('Post Data Transactions', async () => {
    const response = await request(app).post("/api/v1/transactions").send({
        "source_account_id":1,
        "destination_account_id":2,
        "amount":100
    })
    expect(response.status).toBe(200)
  });
  test('Get Data Account', async () => {
    const response = await request(app).get("/api/v1/Accounts")
    expect(response.status).toBe(200)
  });
  test('Get Data Detail Account', async () => {
    const response = await request(app).get("/api/v1/Accounts/1")
    expect(response.status).toBe(200)
  });
  test('Post Data Account', async () => {
    const response = await request(app).post("/api/v1/Accounts").send({
        "id":6,
        "balance":3000
    })
    expect(response.status).toBe(200)
  })
})