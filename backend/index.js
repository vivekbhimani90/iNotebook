const connectToMongo = require("./db");
var cors = require("cors");

const express = require("express");
connectToMongo();
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

//Availble Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/note"));

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port ${port}`);
});
