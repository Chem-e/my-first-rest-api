const express = require("express");
const tweetsRouter = express.Router();
const mongoose = require("mongoose");
let moment = require('moment');
moment().format();
let timeAndDate= moment().format('MMMM Do YYYY, h:mm:ss a');

const Tweets = require("../models/tweets-model");

// Handle incoming GET requests to /tweets
tweetsRouter.get("/", (req, res, next) => {
  Tweets
    .find()
    .select("message date _id")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        tweets: docs.map(doc => {
          return {
            _id: doc._id,
            date: doc.date,
            message: doc.message,
            request: {
              type: "GET",
              url: "http://localhost:5000/tweets/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

tweetsRouter.post("/", (req, res, next) => {
      const tweet = new Tweets({
        _id: mongoose.Types.ObjectId(),
        date:moment().format('MMMM Do YYYY, h:mm:ss a'),
        message: req.body.message
      });
    tweet.save()
    .then(result => {
      res.status(201).json({
        message: "Tweet stored",
        createdTweet: {
            _id: result._id,
            date: result.date,
            message: result.message
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/tweets/" + result._id
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

tweetsRouter.get("/:tweetId", (req, res, next) => {
  Tweets
    .findById(req.params.tweetId)
    .select("message date _id")  
    .exec()
    .then(tweet => {
      if (!tweet) {
        return res.status(404).json({
          message: "Tweet not found"
        });
      }
      res.status(200).json({
        tweet: tweet,
        request: {
          type: "GET",
          url: "http://localhost:5000/tweet"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

tweetsRouter.delete("/:tweetId", (req, res, next) => {
  Tweets.remove({ _id: req.params.tweetId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Tweet deleted !!",
        request: {
          type: "POST",
          url: "http://localhost:5000/tweets",
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = tweetsRouter;