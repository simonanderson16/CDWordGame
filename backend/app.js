const express = require("express");
const cors = require("cors");
const app = express();
const port = 8888;

app.use(express.json());
app.use(cors());

// Import the router modules
const createRouter = require("./routes/create");

// Use the router modules
app.use("/create", createRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
