const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");
const timeAgo = require('node-time-ago')

//middleware
app.use(morgan("dev"));
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
          ${post.upvotes} upvotes | ${timeAgo(post.date)}
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
            ${post.upvotes} upvotes | ${timeAgo(post.date)}
          </small>
          </div>
    </div>
  </body>
  </html>`;
  if (!post.id) { throw new Error("Not Found") }
  else { res.send(html); }
});

const PORT = 1337;

app.use((err, req, res, next) => {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.status(404).send('Page not found!')
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
