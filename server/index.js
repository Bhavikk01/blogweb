const express = require("express");
const cors = require("cors");
const MongoDBService = require("./mongoDB/mongoDB_service.js");
const authRouter = require("./routers/auth_router.js");
const userRouter = require("./routers/user_router.js");
const blogRouter = require("./routers/blog_router.js");
const app = express();
require("dotenv").config();
const bodyParser = require('body-parser');


const db = new MongoDBService();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use("/api", userRouter);
app.use("/api", blogRouter);

app.listen(process.env.PORT, () => {
    console.log("Server is started at port " + process.env.PORT);
    db.connectDB();
});