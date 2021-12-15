const { unique } = require('jquery');
const mongoose=require('mongoose');
// var validateEmail = function(email) {
//     var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//     return re.test(email)
// };
const messageSchema=mongoose.Schema({
    sender_id:{
        type:String,
    },
    timestamp:{
        type:String,
        required:true
    },
    message:{
        type:String,
    }

});
module.exports=mongoose.model("messages",messageSchema);