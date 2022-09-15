require("../src/db/conn");
const express = require("express");
const router = require("./routes/index");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4321;

app.use(express.json());
app.use(cors());
app.use(router);

app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`server running at ${port}`);
});
