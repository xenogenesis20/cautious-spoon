const { Router } = require("express");
const router = Router();
const { getDb } = require("../../db");
const { ObjectId } = require("mongodb");

// generate random number from 0 to 10000
const randomNumber = () => {
  return Math.floor(Math.random() * 10000);
};

// array of random company names   (for testing)
const companyNames = [
  "Apple",
  "Amazon",
  "Google",
  "Microsoft",
  "Facebook",
  "Twitter",
  "Ford",
  "Samsung",
  "LG",
  "Sony",
];

// generate random payer
const generatePayer = () => {
  const randomIndex = Math.floor(Math.random() * companyNames.length);
  return {
    payer: companyNames[randomIndex],
    points: randomNumber(),
    timeStamp: new Date().toISOString(),
  };
};

// add user _id to transaction and update points for user return transaction
const addUserIdToTransaction = async (transaction, userId) => {
  const db = await getDb();
  const user = await db.collection("users").findOne({ _id: ObjectId(userId) });
  transaction.userId = userId;
  await db
    .collection("users")
    .updateOne(
      { _id: ObjectId(userId) },
      { $inc: { points: transaction.points } }
    );
  return db.collection("transactions").insertOne(transaction);
};

// create transaction and add user id
router.post("/:id", async (req, res, next) => {
  const transaction = generatePayer();
  try {
    const db = await getDb();
    await addUserIdToTransaction(transaction, req.params.id);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

// get all transactions for user
router.get("/:id", async (req, res, next) => {
  try {
    const db = await getDb();
    const transactions = await db
      .collection("transactions")
      .find({ userId: req.params.id })
      .toArray();
    res.json(transactions);
  } catch (error) {
    next(error);
  }
});


router.put("/:id", async (req, res, next) => {
   try {
      const db = await getDb();
      const user = await db.collection("users").findOne({ _id: ObjectId(req.params.id) });
      if (user.points < req.body.points) {
         res.status(400).json({ error: "Not enough points" });
      } else {
         const transactions = await db
            .collection("transactions")
            .find({ userId: req.params.id })
            .sort({ timeStamp: 1 })
            .toArray();
         let pointsToSpend = req.body.points;
         let transactionsToUpdate = [];
         for (let i = 0; i < transactions.length; i++) {
            if (pointsToSpend > 0) {
               if (transactions[i].points > pointsToSpend) {
                  transactionsToUpdate.push({
                     ...transactions[i],
                     points: transactions[i].points - pointsToSpend,
                  });
                  pointsToSpend = 0;
               } else {
                  transactionsToUpdate.push({
                     ...transactions[i],
                     points: 0,
                  });
                  pointsToSpend -= transactions[i].points;
               }
            }
         }
         await db
            .collection("users")
            .updateOne(
               { _id: ObjectId(req.params.id) },
               { $inc: { points: -req.body.points } }
            );
         for (let i = 0; i < transactionsToUpdate.length; i++) {
            await db
               .collection("transactions")
               .updateOne(
                  { _id: ObjectId(transactionsToUpdate[i]._id) },
                  { $set: { points: transactionsToUpdate[i].points } }
               );
         }
         res.json(transactionsToUpdate);
      }
   } catch (error) {
      next(error);
   }
});







module.exports = router;
