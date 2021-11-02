const { Router } = require("express");
const router = Router();
const { getDb } = require("../../db");
const { ObjectId } = require("mongodb");

// generate random number from 0 to 10000 //
const randomNumber = () => {
  return Math.floor(Math.random() * 10000);
};

// array of random company names //
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

// generate random payer //
const generatePayer = () => {
  const randomIndex = Math.floor(Math.random() * companyNames.length);
  return {
    payer: companyNames[randomIndex],
    points: randomNumber(),
    timeStamp: new Date().toISOString(),
  };
};

// add user _id to transaction and update points for user return transaction //
const addUserIdToTransaction = async (transaction, userId) => {
  const db = await getDb();
// check if transaction with same userID and payer exists in transactions collection //
   const transactionExists = await db
      .collection("transactions")
      .findOne({ userId, payer: transaction.payer });
   if (transactionExists) {
      // if the transactionExists, add points to existing transaction //
      await db
         .collection("transactions")
         .updateOne(
            { userId, payer: transaction.payer },
            { $inc: { points: transaction.points } }
         );
      // return the updated transaction //
      return await db
         .collection("transactions")
         .findOne({ userId, payer: transaction.payer });
   } else {
  transaction.userId = userId;
  await db
    .collection("users")
    .updateOne(
      { _id: ObjectId(userId) },
      { $inc: { points: transaction.points } }
    );
  return db.collection("transactions").insertOne(transaction);
   }
};

// create a transaction and add user _id //
router.post("/:id", async (req, res, next) => {
  const transaction = generatePayer();
  try {
    await addUserIdToTransaction(transaction, req.params.id);
    res.json(transaction);
  } catch (error) {
    next(error);
  }
});

// get all transactions for user //
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

// get payer points balance for user //
router.get("/:id/balance", async (req, res, next) => {
  try {
    const db = await getDb();
    const transactions = await db
      .collection("transactions")
      .find({ userId: req.params.id })
      .toArray();
    const balance = {};
    transactions.forEach((transaction) => {
      if (!balance[transaction.payer]) {
        balance[transaction.payer] = transaction.points;
      } else {
        balance[transaction.payer] += transaction.points;
      }
    });
    res.json(balance);
  } catch (error) {
    next(error);
  }
});

// spend user points //
router.put("/spend/:id", async (req, res, next) => {
  try {
    const db = await getDb();
    const user = await db.collection("users").findOne({ _id: ObjectId(req.params.id) });
    // check if user exists for the purpose of this challenge //
    if (!user) {
      res.status(404).json({ message: "User not found" }); 
    } else if (user.points < req.body.points) {
      res.status(400).json({ message: "Insufficient points" });
    } else {
      const transactions = await db
        .collection("transactions")
        .find({ userId: req.params.id, points: { $gt: 0 } })
        .sort({ timeStamp: 1 })
        .toArray();
      let points = req.body.points;
      let payer = "";
      let subtractedPoints = 0;
      let updatedTransactions = [];
      transactions.forEach((transaction) => {
        if (points > 0) {
          if (transaction.points > points) {
            subtractedPoints = points;
          } else {
            subtractedPoints = transaction.points;
          }
          points -= subtractedPoints;
          payer = transaction.payer;
          updatedTransactions.push({ payer, points: `-${subtractedPoints}` });
          db.collection("transactions").updateOne(
            { userId: req.params.id, payer: transaction.payer },
            { $inc: { points: -subtractedPoints } }
          );
          db.collection("users").updateOne(
            { _id: ObjectId(req.params.id) },
            { $inc: { points: -subtractedPoints } }
          );
        }
      });
      res.json(updatedTransactions);
    }
  } catch (error) {
    next(error);
   }
});

module.exports = router;
