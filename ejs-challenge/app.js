//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const port = 3000;
let id;
let aboutContent = "This blog template challenge was created by Elliot Phua using EJS";
let contactContent = "You can find me here";
let postTitle;
let postBody;
let postLow;

const app = express();
let posts = [];
let ejsRender = {id: id, aboutContent: aboutContent, contactContent: contactContent, posts: posts, homeTitle: postTitle, homePost: postBody, postLow: postLow};

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/" || "/home", function (req, res) {
  ejsRender.id = "Home" || "/";
  res.render("home", ejsRender);

})

app.get("/about", function (req, res) {
  ejsRender.id = "About";
  res.render("about", ejsRender);
})

app.get("/contact", function (req, res) {
  ejsRender.id = "Contact";
  res.render("contact", ejsRender);
})

app.get("/compose", function (req, res) {
  ejsRender.id = "Compose"
  res.render("compose", ejsRender);
})
app.get("/post/:postId", function (req, res) {

  let reqParam = req.params.postId;
  
  for (var u = 0; u < posts.length; u++) {
    if (_.kebabCase(string = posts[u].postTitle) == _.kebabCase(string = reqParam)) {
      console.log("true");
      res.render("post", {homeTitle: posts[u].postTitle, homePost: posts[u].postBody, id:id});
      break;
    } else if (u == posts.length - 1 && _.kebabCase(string = posts[u].postTitle) != _.kebabCase(string = reqParam)) {
      console.log("No posts matched query");
      res.render("post", {homeTitle: "Error", homePost: "Post not found. Please try again", id: id});
    } else { continue; };
  };
});
app.post("/compose", function (req, res) {
  const post = { postTitle: req.body.postTitle, postBody: req.body.postBody, postLow: _.kebabCase(string = req.body.postTitle) };
  posts.push(post);
  res.redirect("/");
})

app.listen(process.env.PORT || port, function () {
  console.log("Server started on port " + port);
  console.log("navigate to /compose to create a new blog post!");
});


