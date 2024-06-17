import express from "express";
import bodyParser from "body-parser";
import bcrypt, { hash } from "bcrypt";
import cors from "cors";
import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "b2!ioani",
    database: "smartbrain",
  },
});

// db.select("*")
//   .from("users")
//   .then((data) => {
//     console.log(data);
//   });

const app = express();
app.use(bodyParser.json());
app.use(cors());

const saltRounds = 10;

app.get("/", (req, res) => {
  res.send(dataBase.users);
});
//un simplu GET request in postman ca sa vedem ca avem legatura intre client si server

app.post("/signin", (req, res) => {
  db.select("email", "hash")
    .from("login")
    .where("email", "=", req.body.email)
    .then((data) => {
      // Load hash from your password DB.
      bcrypt.compare(req.body.password, data[0].hash, function (err, result) {
        // result == true
        db.select("*")
          .from("users")
          .where("email", "=", req.body.email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      });
    })
    .catch((err) => res.status(400).json("Wrong Credentials"));
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);

  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx("users")
          .returning("*")
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => {
            res.json(user[0]);
          });
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) =>
    res.status(400).json("unable to register, account already registered")
  );
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      console.log(user);
      if (user.length) {
        res.json(user[0]);
      } else {
        res.status(400).json("Error getting user");
      }
    });
});

app.put("/image", (req, res) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      res.json(entries[0].entries);
    })
    .catch((err) => res.status(400).json("unable to get count"));
});

app.listen(3001, () => {
  console.log("app is running on port 3001");
});

// Load hash from your password DB.
// bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
// result == true
// });

// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
// result == false
// });

// If you are using knex.js version 1.0.0 or higher this now
// returns an array of objects. Therefore, the code goes from:
// entries[0] --> this used to return the entries
// TO
// entries[0].entries --> this now returns the entries
