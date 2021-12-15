const express=require('express');
const app=express();
var bodyParser=require('body-parser');
var cors=require('cors');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const port=3001;
app.use(cors());
const Subscriber=require('./schema');
const Message=require('./messageSchema');
app.post('/',(req,res)=>{
    const mongoose=require('mongoose');
    mongoose.connect("mongodb://localhost:27017/groupchat",{useNewUrlParser:true});
    const db=mongoose.connection;
    db.once('open',()=>{
        console.log('connected to database successfully');
    });
    const action=req.body.data.action;
    if(action==='login'){
        const email=req.body.data.email,password=req.body.data.pass;
        Subscriber.findOne({email,password})
        .exec((err,doc)=>{
            if(err){
                console.log(err);
                res.send({message:'Server Internal error!'});
            }
            else{
                if(doc!==null){
                    Subscriber.updateOne({email},{loginStatus:true},function(err,result){
                        if(err){
                            console.log(err);
                            res.send({message:'Server Internal error!'});
                        }
                        else{
                            console.log(result);
                            res.send(doc);
                        }
                    })
                }else{
                    res.send({message:"User doesn't exist"});
                }
                
            }
        })
    }else if(action==='logout'){
        const userid=req.body.data.userid,lastActive=req.body.data.lastActive;
        Subscriber.updateOne({_id:userid},{loginStatus:false,lastActive},function(err,result){
            if(err) console.log(err);
            else {
                console.log(result);
                res.send(result);
            }
        })
    }else if(action==='register'){
        const data=req.body.data;
        const email=data.email,username=data.username,name=data.name,password=data.pass,loginStatus=false,lastActive="12";
        
        Subscriber.findOne({email}).exec((err,result)=>{
            if(err){
                console.log(err);
                res.send({message:'Server Internal error!'});
            }else{
                console.log(result);
                if(result!==null){
                    res.send({message:'User Already Registered'});
                }else{
                    const subscriber=new Subscriber({name,email,password,loginStatus,lastActive});
                    subscriber.save((err,doc)=>{
                        if(err){
                            console.log(err);
                            res.send({message:'Server Internal error!'});
                        }
                        else{
                            console.log(doc);
                            res.send(doc);
                        }
                    })
                }
            }
        })
        
    }else if(action==='setstatus'){
        const email=req.body.data.email;
        Subscriber.updateOne({email},{loginStatus:true},function(err,result){
            if(err) console.log(err);
            else{
                console.log(result);
                res.send({isLoggedIn:true});
            }
        })
    }else if(action==='saveMessage'){
        const data=req.body.data;
        console.log(data);
        const sender_id=data.sender_id,timestamp=data.timestamp,message=data.message;
        const newmessage=new Message({sender_id,timestamp,message});
        newmessage.save((err,result)=>{
            if(err) console.log(err);
            else{
                console.log(result);
                res.send(result);
            }
        })
    }else if(action==='loadMessages'){
        Message.find().exec((err,result)=>{
            if(err) console.log(err);
            else{
                console.log(result);
                res.send(result);
            }
        })
    }else if(action==='loadUser'){
        Subscriber.find({loginStatus:true})
        .exec((err,result)=>{
            if(err) console.log(err);
            else{
                console.log(result);
                res.send(result);
            }
        })
    }else if(action==='deleteMessage'){
        Message.deleteOne({_id:req.body.data.message_id}).exec((err,result)=>{
            if(err) console.log(err);
            else {
                console.log(result);
                res.send(result);
            }
        })
    }
    
});
app.get('/',(req,res)=>{
    res.send('hii');
})
app.listen(port,()=>{
    console.log(`Sever has started and is listening on port number:${port}`);
})