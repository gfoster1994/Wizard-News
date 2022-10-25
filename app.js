const express = require("express");
const app = express();
const morgan = require('morgan');
const volleyball = require('volleyball');
const postBank = require("./postBank");

//middleware
app.use(morgan('dev'));
app.use(volleyball);
app.use(express.static('public'))

app.get("/style.css")

app.get("/", (req, res) => {

const posts = postBank.list();

const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>Wizard News</title>
    </head>
    <body>
      <ul>
        ${posts.map(post => `<li>${post.title} ${post.name}</li>`)}
      </ul>
    </body>
  </html>`

  res.send(html);
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
