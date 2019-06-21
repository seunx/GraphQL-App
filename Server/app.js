const PORT = 4000 || process.env.PORT;
const express = require("express");
const graphQL = require("express-graphql");
const helmet = require("helmet");

const app = express();
app.use(helmet);

app.use("/graphql", graphQL({}));

app.listen(PORT, () => {
  console.log(`Server listening on Port: ${PORT}`);
});