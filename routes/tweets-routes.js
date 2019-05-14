const express = require("express");
const tweetsRouter = express.Router();
const mongoose = require("mongoose");
const Tweets = require("../models/tweets-model");

tweetsRouter.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'get request'
    })
});

tweetsRouter.get('/:tweetId', (req, res, next) => {
    const id=req.params.userId;
    if(id==='special'){
         res.status(200).json({
            message:'blah la',
            id:id
        });
    }
    else{
        res.status(200).json({
            message: 'Usernot foundaaaaaooo'
        });
    }
});

tweetsRouter.post('/:tweetId', (req, res, next) => {
    res.status(201).json({
        message: 'post request'
    })
});

tweetsRouter.delete('/:tweetId', (req, res, next) => {
    res.status(200).json({
        message: 'post request'
    })
});

module.exports = tweetsRouter;