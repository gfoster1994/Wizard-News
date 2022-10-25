const express = require("express");
const app = express();
const morgan = require("morgan");
const volleyball = require("volleyball");
const postBank = require("./postBank");

//middleware
app.use(morgan("dev"));
app.use(volleyball);
app.use(express.static("public"));

app.get("/style.css");

app.get("/", (req, res) => {
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Wizard News</title>
  <link rel="stylesheet" href="/style.css" />
</head>
<body>
  <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
    ${posts
      .map(
        (post) => `
      <div class='news-item'>
        <p>
          <span class="news-position">${post.id}. ▲</span>${post.title}
          <small>(by ${post.name})</small>
        </p>
        <small class="news-info">
          ${post.upvotes} upvotes | ${post.date}
        </small>
      </div>`
      )
      .join("")}
  </div>
</body>
</html>`;
  res.send(html);
});

//single post route
app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  const post = postBank.find(id);
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>${post.title}
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            <p>${post.content}</p>
            <br>
            ${post.upvotes} upvotes | ${post.date}
          </small>
          </div>
    </div>
  </body>
  </html>`;
  res.send(html);
});

const PORT = 1337;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
