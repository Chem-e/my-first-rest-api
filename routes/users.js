const express = require("express");
const usersRouter = express.Router();
const mongoose = require("mongoose");
const Users = require("../models/users");
const Tweets = require("../models/tweets");

usersRouter.get("/", (req, res, next) => {
    Users.find()
      .select("name email _id")
      .exec()
      .then(docs => {
        const response = {
          count: docs.length,
          users: docs.map(doc => {
            return {
              name: doc.name,
              email: doc.email,
              _id: doc._id,
              request: {
                type: "GET",
                url: "http://localhost:5000/users/" + doc._id
              }
            };
          })
        };
        res.status(200).json(response);
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
  

usersRouter.get('/:userId', (req, res, next) => {
    const id=req.params.userId;
    Users.findById(id)
    .populate('tweets', 'message')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            user: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:5000/users'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

usersRouter.post('/', (req, res, next) => {
    
    const user = new Users({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        tweets:req.body.tweetsId
      });
      user
        .save()
        .then(result => {
          console.log(result);
          res.status(201).json({
            message: "Saved successfully!!",
            createdUser: {
                name: result.name,
                email: result.email,
                _id: result._id,
                tweets:{
                    _id:result.tweets,
                    url:"http://localhost:5000/tweets/"+result.tweets
                },
                request: {
                    type: 'GET',
                    url: "http://localhost:5000/users/" + result._id
                }
            }
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({
            error: err
          });
        });
});

usersRouter.post("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Users.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
          message: 'user updated',
          request: {
              type: 'GET',
              url: 'http://localhost:5000/users/' + id
          }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

  usersRouter.delete("/:userId", (req, res, next) => {
    const id = req.params.userId;
    Users.remove({ _id: id })
      .exec()
      .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

module.exports = usersRouter;


