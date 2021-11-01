require('dotenv').config()
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let db;

const connect = async (url) => {
    try {
      const client = await MongoClient.connect(url, { useUnifiedTopology: true })
      db = client.db(process.env.DB_NAME)
      console.log('Connected successfully to mongodb server')
    } catch (err) {
        console.log(err)
    }
  }

const getDb = () => {
    return db
  }

  
const initDb = async () => {
    const userCollection = db.collection('users')
    userCollection.createIndex(
      {
        email: 1
      },
      {
        unique: true
      }
    )
  }

module.exports = { getDb, connect, initDb }
