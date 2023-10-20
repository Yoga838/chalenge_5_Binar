const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3000
const router = require('./routers')
const swagerUi = require('swagger-ui-express')
const swaggerJson = require('./openapi.json')

app.use(express.json({strict : false}))
app.use('/dokumentasi', swagerUi.serve, swagerUi.setup(swaggerJson))
app.use('/api/v1', router)
app.get('/', (req, res) => {
    res.status(200).send('Hello, World!');
  });

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`)
})
module.exports = app;