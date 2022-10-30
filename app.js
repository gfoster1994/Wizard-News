const express = require("express");
const app = express();
const morgan = require("morgan");

//middleware
app.use(morgan("dev"));
app.use(express.static("public"));

app.get("/style.css");

app.get("/", (req, res) => {
  res.send("Home Page!");
});

const postsRouter = require("./routes/postRoutes")

app.use("/posts", postsRouter)



const PORT = 1337;

app.use((err, req, res, next) => {
  console.error(err.stack)
  // res.status(500).send('Something broke!')
  res.status(404).send('Page not found!')
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
