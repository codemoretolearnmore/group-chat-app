const { unique } = require('jquery');
const mongoose=require('mongoose');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const subscriberSchema=mongoose.Schema({
    name:String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [
            async function(email) {
              const user = await this.constructor.findOne({ email });
              if(user) {
                if(this.id === user.id) {
                  return true;
                }
                return false;
              }
              return true;
            },
            'The specified email address is already in use.'
        ],
        unique:[validateEmail,'Email must be formated'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        required:true,
        type:String
    },
    loginStatus:Boolean,
    lastActive:{
      type:String,
      required:true
    }
    
});
module.exports=mongoose.model("User",subscriberSchema);