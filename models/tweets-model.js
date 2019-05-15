const mongoose = require('mongoose');

const tweetsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    message:{
        type:'string',
        required:true
    } ,
    date:{
        type:'string',
        required:'true'
    }
});

module.exports = mongoose.model('Tweets', tweetsSchema);