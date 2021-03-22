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

      const data = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(data);
      let currentUser;

      /* eslint-disable-next-line */
      for (const user of accounts) {
        if (user.login === login) {
          currentUser = user;
          break;
        }
      }

      if (currentUser) {
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (isMatch) return res.send(200);
      }

      return res.status(400);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .put("/register", async (req, res) => {
    try {
      const { login, password } = req.body;
      res.setHeader("Content-Type", "application/json");

      let data = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(data);
      /* eslint-disable-next-line */
      for (const user of accounts) {
        if (user.login === login) {
          return res.status(400).json({ message: "A user with this login already exists!" });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      accounts.push({ login, password: hashedPassword });
      data = JSON.stringify({ accounts });

      fs.writeFileSync("./server/accounts.json", data);
      return res.status(201).json({ message: "Account has been created." });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  });

app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
