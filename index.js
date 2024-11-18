const express = require("express");
const mongoose = require("mongoose");
const db = require("./database/db.js");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  Service: "gmail",
  auth: {
    user: "ankitagadge2000@gmail.com",
    pass: "lwmf kqxb uzbw kbhl",
  },
});

db();

const Schema = mongoose.Schema;
// const usersschema = Schema.ObjectId;

const usersschema = new Schema({
  //author: ObjectId,
  name: String,
  email: String,
  mobile: Number,
});

const userModel = mongoose.model("newusers", usersschema);

var app = express();
app.use(express.json());

app.use(express.urlencoded());

app.get("/add", function (req, res) {
  res.render("adduser.ejs");
});

app.get("/show", async function (req, res) {
  try {
    var result = await userModel.find();
    res.render("showuser.ejs", { data: result });
  } catch (err) {
    res.send(err.message);
  }
});

app.post("/useraction", async function (req, res) {
  // console.log(req.body);
  try {
    var record = new userModel(req.body);
    await record.save();
    main(req.body.email);
    res.redirect("/show");
  } catch (err) {
    res.send(err.message);
  }
});

async function main(emailid) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "<ankitagadge2000@gmail.com>", // sender address
    to: emailid, // list of receivers
    subject: "Js application", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

app.listen(9000);
