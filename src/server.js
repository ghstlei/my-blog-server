import express from "express";

let articlesInfo = [
  { name: "learn-react", upvotes: 0 },
  { name: "learn-node", upvotes: 0 },
  { name: "learn-mongodb", upvotes: 0 },
];

const app = express();
app.use(express.json());

/*app.post("/hello", (req, res) => {
  res.send(`Hello ${req.body.name}!`);
});

app.get("/hello/:name/goodbye/:deadname", (req, res) => {
  console.log(req.params);
  const { name, deadname } = req.params;
  res.send(`Hello ${name}! Goodbye ${deadname}!`);
}); */

app.put("/api/articles/:name/upvote"),
  (req, res) => {
    const { name } = req.params;
    const articles = articlesInfo.find((article) => article.name === name);

    if (articles) {
      articles.upvotes += 1;
      res.send(`${name} now has ${articles.upvotes} upvotes.`);
    } else {
      res.send("Article not found.");
    }
  };

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
