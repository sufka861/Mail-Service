//************* Express Server ************//
require("dotenv").config();
const express = require("express");
const app = express();
const { templatesRouter } = require("./Routers/templatesRouter");
const { clientRouter } = require("./Routers/clientRouter");
const { mailRouter } = require("./Routers/mailRouter");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/templates", templatesRouter);
app.use("/api/mail", mailRouter);
app.use("/", clientRouter);

app.listen(process.env.PORT);
console.log(`listening to port ${process.env.PORT}`);

// const iam = require("./IAM/IAM");