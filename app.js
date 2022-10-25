const express = require("express");
const app = express();
const volleyball = require('volleyball');

app.get("/", (req, res) => res.send("Hello World!"));

//middleware
app.use(morgan('dev'));
app.use('volleyball');

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
