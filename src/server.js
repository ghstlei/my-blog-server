import express from "express";

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

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
