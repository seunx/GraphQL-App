require("dotenv").config();
const PORT = 4000 || process.env.PORT;
const express = require("express");
const graphQL = require("express-graphql");
const helmet = require("helmet");
const schema = require("./schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(helmet());

mongoose.connect(process.env.URL, { useNewUrlParser: true }, () => {
  console.log("Connected to the Database");
});

app.use(
  "/graphql",
  graphQL({
    schema,
    graphiql: true
  })
);

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});
