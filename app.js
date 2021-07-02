//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = " Welcome to Sumanth's Blog-Post.This website allows you to post as many blogs you like and stores all of them in the Amazon AWS server, so that anytime you visit our website back your post will be there waiting for you. Post blogs here to educate people with your knowledge and share your wonderful experiences with the world ! ";
const aboutContent = " Heyy, I am Sumanth S from Bengaluru Karnataka. Currently I am pursuing Computer Science Engineering at Dayanand Sagar Academy Of Technology And Management. I communicate with Machines using Code and to Humans using Machines ;-)";
const contactContent = " You can contact me via mail : sumanths1245@gmail.com   &    mobile: 9739624949.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-sumanth:vhg7yVTYhnUwGbP@blogwebsite.vgjy1.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

let port = process.env.PORT;
if(port == null || port ==""){
  port = 3000;
}

app.listen(port, function() {
  console.log("Server has started successfully!");
});
