const mongoose=require('mongoose');
const usersSchema= new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : {
        type:'string',
        required:true
        },
    email : {
        type:'string',
        required:true
        },
    tweets : { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'tweets', 
        required: true 
    }
});

module.exports = mongoose.model('users',usersSchema);