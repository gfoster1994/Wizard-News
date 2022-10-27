const express = require("express");
const app = express();
const morgan = require("morgan");
const postBank = require("./postBank");
// const timeAgo = require('node-time-ago');

const  { postsRouter } = require("./Posts.js")
const { singlePostRouter } = require("./SinglePost.js")

//middleware
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/style.css");

app.get("/", (req, res) => {
  res.send("Home Page!");
});

// app.use("/posts", postsRouter)
app.get("/posts", (req, res) => {
  const posts = postBank.list();
  res.send(postsRouter(posts))
})

// app.use("/posts/:id", singlePostRouter)





// const PORT = 1337;
const PORT = 1338;

app.use((err, req, res, next) => {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.status(404).send('Page not found!')
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
