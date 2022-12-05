const mongoose = require("mongoose")

const servicesSchema = new mongoose.Schema({
    // _id: String, 
    servicename: String,
    expires: Number,
    count: Number,
    live: String,
})

const usersSchema = new mongoose.Schema({
    // _id: String, 
    username: String,
    email: String,
    role: Number,
    authorization: String,
    services: [servicesSchema], 
})  

const accountSchema = new mongoose.Schema({
    // _id: String, 
    accid: Number,
    accstatus: String,
    accountname: String,
    users: [usersSchema],
})

module.exports = mongoose.model("accounts", accountSchema)



// {
//     "_id": {
//       "$oid": "6385b45c8f336159040d30ce"
//     },
//     "users": [
//       {
//         "name": "Santhosh",
//         "email": "santhoshdevelops@gmail.com",
//         "role": "0",
//         "authorization": "",
//         "refreshtoken": "",
//         "rest_link": "",
//         "services": [
//           {
//             "name": "face-match",
//             "expires": "300h",
//             "count": "300"
//           },
//           {
//             "name": "face-extraction",
//             "expires": "24h",
//             "count": "300"
//           }
//         ]
//       }
//     ],
//     "accname": "SYNTIZEN"
//   }