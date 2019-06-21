const PORT = 4000 || process.env.PORT;
const express = require("express");
const graphQL = require("express-graphql");
const helmet = require("helmet");
const schema = require("./schema");
const mongoose = require("mongoose");

const app = express();
app.use(helmet());

mongoose.connect(
  "mongodb+srv://user1:testpass123@cluster0-scpsr.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  () => {
    console.log("Connected to the Database");
  }
);

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
