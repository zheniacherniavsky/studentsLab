/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-param-reassign */
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
      console.log("login operation.");
      const { login, password } = req.body;

      const data = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(data);
      let currentUser;

      for (const user of accounts) {
        if (user.login === login) {
          currentUser = user;
          break;
        }
      }

      if (currentUser) {
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if (isMatch) return res.status(200).json({ isAdmin: currentUser.isAdmin });
      }

      return res.status(400).json({ message: "This account does not exist." });
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .put("/register", async (req, res) => {
    try {
      console.log("register operation.");
      const { login, password } = req.body;
      console.log(login);
      res.setHeader("Content-Type", "application/json");

      let data = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(data);
      for (const user of accounts) {
        console.log(user.login);
        if (user.login === login) {
          return res.status(400).json({ message: "A user with this login already exists!" });
        }
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      accounts.push({
        login,
        password: hashedPassword,
        isAdmin: false,
        profile: {
          avatar: "",
          username: "",
          description: "",
        },
      });
      data = JSON.stringify({ accounts });

      fs.writeFileSync("./server/accounts.json", data);
      return res.status(201).json({ message: "Account has been created." });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .get("/products", async (req, res) => {
    try {
      await setTimeout(() => {
        console.log("get products operation.");
        const data = fs.readFileSync("./server/data.json");
        const { products } = JSON.parse(data);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify(products));
      }, 1000);
      return res.status(200);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .get("/getprofile/:login", (req, res) => {
    try {
      console.log("getprofile operation.");
      const accountsData = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(accountsData);
      for (const account of accounts) {
        if (account.login === req.params.login) return res.send(JSON.stringify(account.profile));
      }
      return res.status(404).json({ message: "Profile not found!" });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .post("/saveprofile", (req, res) => {
    try {
      console.log("saveprofile operation.");
      const { login, username, description } = req.body;

      let data = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(data);
      let user;
      for (const account of accounts) {
        if (account.login === login) {
          user = account;
          break;
        }
      }
      if (user) {
        user.profile.username = username;
        user.profile.description = description;
        data = JSON.stringify({ accounts });
        fs.writeFileSync("./server/accounts.json", data);
        return res.status(200).json({ message: "Profile data was changed." });
      }
      return res.status(404).json({ message: "Account not found!" });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .post("/changepassword", async (req, res) => {
    try {
      console.log("changepassword operation.");
      const { login, newPassword } = req.body;

      let data = fs.readFileSync("./server/accounts.json");
      const { accounts } = JSON.parse(data);
      let user;
      for (const account of accounts) {
        if (account.login === login) {
          user = account;
          break;
        }
      }

      if (user) {
        const isMatch = await bcrypt.compare(newPassword, user.password);
        if (isMatch) return res.status(400).json({ message: "Your old password is the same as your new one!" });

        user.password = await bcrypt.hash(newPassword, 12);
        data = JSON.stringify({ accounts });
        fs.writeFileSync("./server/accounts.json", data);
        return res.status(200).json({ message: "Password was changed." });
      }
      return res.status(404).json({ message: "Account not found!" });
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  })

  .get("/sortedProducts/:platform/:type/:criteria/:genre/:age/:searchName", async (req, res) => {
    try {
      await setTimeout(() => {
        const { platform, type, criteria, genre, age, searchName } = req.params;
        console.log(platform, type, criteria, genre, age, searchName);

        const data = fs.readFileSync("./server/data.json");
        const { products } = JSON.parse(data);
        res.setHeader("Content-Type", "application/json");

        const sortedProducts = [];
        for (const product of products) {
          let valid = true;
          if (genre !== "all genres") {
            if (product.category.toLowerCase() !== genre) valid = false;
          }
          if (product.age < Number(age)) valid = false;
          if (searchName !== "__emptyName__" && !product.name.toLowerCase().includes(searchName.toLowerCase()))
            valid = false;
          if (!product.platform.includes(platform)) valid = false;
          if (valid) sortedProducts.push(product);
        }

        switch (criteria) {
          case "price":
            if (type === "ascending") sortedProducts.sort((a, b) => a.price - b.price);
            if (type === "descending") sortedProducts.sort((a, b) => b.price - a.price);
            break;
          case "name":
            if (type === "ascending")
              sortedProducts.sort((a, b) => {
                if (a.name[0] < b.name[0]) return -1;
                return 1;
              });
            if (type === "descending")
              sortedProducts.sort((a, b) => {
                if (a.name[0] > b.name[0]) return -1;
                return 1;
              });
            break;
          case "rating":
            if (type === "ascending") sortedProducts.sort((a, b) => a.rating - b.rating);
            if (type === "descending") sortedProducts.sort((a, b) => b.rating - a.rating);
            break;
          default:
            break;
        }

        res.send(JSON.stringify(sortedProducts));
      }, 1000);
      return res.status(200);
    } catch (e) {
      console.log(e.message);
      return res.status(500).json({ message: "Something went wrong. Try again!" });
    }
  });
app.listen(port, () => {
  console.log(`server listening at http://localhost:${port}`);
});
