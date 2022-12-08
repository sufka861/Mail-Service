//************* Express Server ************//
require("dotenv").config();
const express = require("express");
const app = express();

const { connect, connection, mongoose } = require("mongoose");
mongoose.set('strictQuery', true);

connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

connection.on("connected", () => {
  console.log("connection made");
});

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

const mailer = require("./IAM/mailerAPI.js") //or the rellevant path
const emailAddress = "sufkarmon2@gmail.com";
const emailSubject = "Welcome!";
const emailHtmlPATH = {path: 'https://mail-service-69zm.onrender.com/api/mail/welcomeHTML'};

mailer.sendMail(emailAddress, emailSubject, emailHtmlPATH);