import express from "express";
import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  console.log(req.params);
  const { name } = req.params;
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.sendStatus(404), send("Article Not Found");
  }
});

app.post("/hello", (req, res) => {
  res.send(`Hello ${req.body.name}!`);
});

app.get("/hello/:name/goodbye/:deadname", (req, res) => {
  console.log(req.params);
  const { name, deadname } = req.params;
  res.send(`Hello ${name}! Goodbye ${deadname}!`);
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;

  await db.collection("articles").updateOne({ name }, { $inc: { upvotes: 1 } });

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.send(`${name} article now has ${article.upvotes} upvotes.`);
  } else {
    res.send("Article not found.");
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;

  await db
    .collection("articles")
    .updateOne({ name }, { $push: { comments: { postedBy, text } } });

  const article = await db.collection("articles").findOne({ name });

  if (article) {
    console.log("Article:", article);
    console.log("Article comments:", article.comments);
    res.send(article.comments);
  } else {
    res.send("Article not found.");
  }
});

connectToDb(() => {
  console.log("Connected to database.");
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
