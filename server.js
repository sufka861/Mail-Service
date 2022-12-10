//************* Express Server ************//
require("dotenv").config();
const express = require("express");
const app = express();
const logger = require("./logger");
const {connect, connection, mongoose} = require("mongoose");
mongoose.set("strictQuery", true);

connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connected!"))
    .catch((err) => console.log(err));

connection.on("connected", () => {
    console.log("connection made");
});

const {templatesRouter} = require("./Routers/templatesRouter");
const {clientRouter} = require("./Routers/clientRouter");
const {mailRouter} = require("./Routers/mailRouter");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger);
app.use("/api/templates", templatesRouter);
app.use("/api/mail", mailRouter);
app.use("/Front", express.static(process.cwd() + "/Front"));
app.use("/", clientRouter);

app.listen(process.env.PORT);
console.log(`listening to port ${process.env.PORT}`);
