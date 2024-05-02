const { Router } = require("express");
const axios = require("axios");
// npm i ejs axios

const router = Router();

router.get("/", (req, res) => {
  let isActive = true;

  const users = [
    {
      id: 1,
      name: "juan",
      lastname: "perez",
    },
    {
      id: 2,
      name: "jane",
      lastname: "doe",
    },
  ];

  const title = "Index Page";
  res.render("index", {
    title,
    isActive,
    users,
  });
  // el unico que es una pagina completa
});

router.get("/posts", async (req, res) => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  res.render("posts", {
    posts: response.data,
  });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;

// function HomeRoutes(app) {
//     app.all('/about', (req, res) => {
//         res.send('About Page');
//     });

//     app.get('/dashboard', (req, res) => {
//         res.sendFile("Dashboard Page");
//     });
// }

// module.exports = HomeRoutes
