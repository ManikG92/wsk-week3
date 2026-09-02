import express from "express";

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// Serve static files from the 'public' folder
app.use("/public", express.static("public"));

// Cat endpoint
app.get("/api/v1/cats", (req, res) => {
  const cat = {
    cat_id: 1,
    name: "Luna",
    birthdate: "2021-06-20",
    weight: 4.2,
    owner: "Manik",
    image: "https://loremflickr.com/320/240/cat",
  };
  res.json(cat);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
