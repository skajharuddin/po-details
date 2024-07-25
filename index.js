const express = require("express");
const app = express();
const path = require("path");
const api = require("./api.js");
const ejsMate = require("ejs-mate");
const port = process.env.PORT || 3000;

app.set("view enigne", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/query", (req, res) => {
  let { pin } = req.body;
  console.log(pin);
  api
    .getApiData(pin) // Call api.js function to get API data
    .then((data) => {
      // res.send(`You searched for: ${pin}. API response: ${data}`);
      res.render("details.ejs", { pin, data });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error occurred while fetching API data");
    });
});

// Error-handling middleware
app.use((err, req, res, next) => {
  // res.status(500).render("error", { message: err.message });
  res.render("error/error.ejs");
  next();
});

app.listen(port, () => {
  console.log(`app is listening on port http://localhost:${port}`);
});
