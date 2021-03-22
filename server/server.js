const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.urlencoded({ extended: false }));

app
  .post("/login", async (req, res) => {
    try {
      const { login, password } = req.body;

      let data = fs.readFileSync("./server/accounts.json");
      let accounts = JSON.parse(data)["accounts"];

      for (let user of accounts) {
        if (user.login == login) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) return res.send(200);
          else return res.send(400);
        }
      }

      res.send(400);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .put("/register", async (req, res) => {
    try {
      const { login, password } = req.body;

      let data = fs.readFileSync("./server/accounts.json");
      let accounts = JSON.parse(data)["accounts"];
      for (let user of accounts) {
        if (user.login == login) {
          res.setHeader("Content-Type", "application/json");
          return res.status(400).json({ message: "A user with this login already exists!" });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      accounts.push({ login: login, password: hashedPassword });
      data = JSON.stringify({ accounts: accounts });

      fs.writeFileSync("./server/accounts.json", data);
      res.send(201);
    } catch (e) {
      res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  });

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
