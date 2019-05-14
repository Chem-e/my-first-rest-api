const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose= require ('mongoose');
const path = require('path');
const morgan = require ('morgan'); 
const usersRoute = require('./routes/users-routes');
const tweetsRoute = require('./routes/tweets-routes');
require('dotenv').config();

mongoose.connect('mongodb+srv://node-for-first-time:'+process.env.MONGO_ATLAS_PW+'@mongo-zvi6i.mongodb.net/test?retryWrites=true',
{
  useNewUrlParser: true
}
);

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/users', usersRoute);
app.use('/tweets', tweetsRoute);

app.use((req,res,next)=>{
  const error = new Error('Not found');
  error.status=404;
  next(error);
})

<<<<<<< Updated upstream
module.exports = app
=======
app.use((error,req,res,next)=>{
  res.status(error.status||500);
  res.json({
    message:error.message
  })
})

app.listen(port, () => {
console.log(`Server running on port ${port}`)
})
>>>>>>> Stashed changes
