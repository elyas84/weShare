require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const dbconnection = require('./database/db')
dbconnection()
const morgan = require('morgan')
const cors = require('cors')
app.use(morgan("dev"))
app.use(cors())
/**Body parser */
app.use(express.json())

/** Routers APIS */

const userRouter = require('./routers/userRoute')
const postRouter = require('./routers/postRoute')
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)






app.listen(PORT, ()=>{
    console.log("server is running on port: "+PORT)
})
