const express = require("express")

const app=express()

app.use(express.json())

const connect = require("./src/db/db")

const AccountsController = require("./src/controllers/accounts.controller")

const PORT = process.env.PORT || 4000


app.use("/", AccountsController)


const appName = app.listen(PORT,async()=>{
    try {
        await connect()
        
        console.log(`server connected on port ${appName.address().port}`)

    } catch (error) {
       console.log(error) 
    }
})