require('dotenv').config()
const express = require('express');
const Db = require('./db');
const users = require('./routes/users');
const transactions = require('./routes/transactions');
const app = express();

// parseres
app.use(express.json())

// Routes
app.use('/users', users);
app.use('/transactions', transactions);


// Start server
Db.connect(process.env.DB_CONN_STRING || '').then(async () => {
  console.log('initializing database...')
  await Db.initDb()
  console.log('database initialized!')
  app.listen(process.env.PORT) // start the server listening
  console.log(`server listening at port ${process.env.PORT}`)
})


