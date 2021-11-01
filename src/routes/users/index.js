const { Router } = require('express')
const router = Router()
const { getDb } = require('../../db')
const { ObjectId } = require('mongodb')

//GET all users   /users
router.get('/', async (req, res) => {
   const db = await getDb()
   try{
      const users = await db.collection('users').find({}).toArray()
      res.send(users)
   } catch(err){
      res.status(500).send(err)
   }
})

//GET one user   /users/:id
router.get('/:id', async (req, res) => {
   const db = await getDb()
   try{
      const user = await db.collection('users').findOne({_id: ObjectId(req.params.id)})
      res.send(user)
   } catch(err){
      res.status(500).send(err)
   }
})

//POST new user if user does not exist   /users
router.post('/', async (req, res) => {
   const db = await getDb()
   try{
      const user = await db.collection('users').findOne({email: req.body.email})
      if(user){
         res.status(400).send('User already exists')
      } else {
         const newUser = await db.collection('users').insertOne(req.body)
         res.send(newUser.ops[0])
      }
   } catch(err){
      res.status(500).send(err)
   }
})

 module.exports = router