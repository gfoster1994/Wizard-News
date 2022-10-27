const express = require ("express");
const singlePostRouter = express();
const postBank = require("./postBank");
const timeAgo = require('node-time-ago');

//single post route
singlePostRouter.get("/posts/:id", (req, res) => {
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

  module.exports = {singlePostRouter}