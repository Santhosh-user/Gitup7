const express = require("express");
const router = express.Router();

const Accounts = require("../models/accounts.models");

router.get("/", async (req, res) => {
  try {
    const accounts = await Accounts.find();
    console.log(accounts, "accounts");
    res.send(accounts);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/createaccount", async (req, res) => {
  try {
    const accounts = await Accounts.create(req.body);
    console.log(accounts, "accounts");
    res.send(accounts);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.patch("/updateaccount", async (req, res) => {

  try {
    // const accounts = await Accounts.findOneAndUpdate({"users.email":req.body.users[0].email},{'$set':{"users":req.body.username}}, {returnDocument: "after"})

    // const accounts = await Accounts.findOneAndUpdate({"users.email":req.body.email},{'$set':{"users":req.body.users.username}}, {returnDocument: "after"})

    // const accounts= await Accounts.aggregate([{'$unwind':"$users"},{'$match':{"users.email":req.body.email}},{'$project':{"users.username":req.body.username}}])

    // const accounts1 = await Accounts.findOneAndUpdate({"accid":req.body.accid},{'$set':{"accountname.$.":req.body.accountname}}, {returnDocument: "after"})

    // const accounts2 = await Accounts.findOneAndUpdate({"users.services.count":req.body.users[0].services.count},{'$set':{"users":req.body.users.services}}, {returnDocument: "after"})

    // const accounts =await Accounts.findOneAndUpdate(

    //     { "email": req.body.email},

    //       req.body
    //     // {

    //     //   arrayFilters: [ { "e.email": "y1@gmail.com"} ]

    //     // }

    //  )

    //  const accounts =await Accounts.findOneAndUpdate(

    //     { "users.email": "y1@gmail.com"},

    //     { $set: { "users" : req.body.users[0] } },

    //     // {

    //     //   arrayFilters: [ { "e.email": "y1@gmail.com"} ]

    //     // }

    //  )

    // const accounts = await Accounts.findOneAndUpdate(
    //   { "users.email": "b1@gmail.com" },

    //   { $set: { "users.$.username": "b7" } }

    //   // {

    //   //   arrayFilters: [ { "e.email": "b1@gmail.com"} ]

    //   // }
    // );

    // res.send(accounts);

    let userData = req.body;
    

    const queryEmail = userData["servicename"];
    console.log(queryEmail, "qe")

    delete userData["servicename"];

    Object.keys(userData).forEach((key) => {
      userData[`users.$[].services.$.${key}`] = userData[key];
      delete userData[key];
    });
    console.log(userData, "ud")
    const accounts = await Accounts.findOneAndUpdate(
      {
        "users.services.servicename": queryEmail,
      },

      { $set: userData }
    );

    console.log(accounts, "accounts");


    res.send(accounts);


  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
