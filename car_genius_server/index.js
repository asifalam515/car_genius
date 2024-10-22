const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
var cors = require("cors");
// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
