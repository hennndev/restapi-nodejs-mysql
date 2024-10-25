const express = require("express")
const connection = require("./config/db")
const app = express()
require("dotenv").config({})
const authRoutes = require("./routers/auth.routes")
const postsRoutes = require("./routers/posts.routes")
const usersRoutes = require("./routers/users.routes")

app.use(express.json())
app.use(authRoutes)
app.use(postsRoutes)
app.use(usersRoutes)

connection.connect((err) => {
    if(err) throw err
    app.listen(process.env.PORT || 5000, () => {
        console.log("Server and MySQL database has connected")
    })
})
