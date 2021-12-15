import React from 'react';
import './chatbox.css';
import UsersList from './userslist';
import Messages from './messages';
import loader from './../loader.gif';
import {connect} from 'react-redux';
import { createBrowserHistory } from "history";
import Form from './../login/index';
import $ from 'jquery';
var history=createBrowserHistory();
export default class ChatBox extends React.Component{
    constructor(props){
        super(props);
        this.state={
            users:[{}],
            isLoggedIn:true,
            isLoading:false,
            message:[{}],
        }
        this.logout=this.logout.bind(this);
        this.send=this.send.bind(this);
        this.deleteMessages=this.deleteMessages.bind(this);
        this.fetchUser=this.fetchUser.bind(this);
        this.fetchMessages=this.fetchMessages.bind(this);
    }
    componentDidMount(){
        this.setState({isLoading:true})
        console.log(new Date().toLocaleTimeString());
        if(localStorage.getItem('token')===null){
            history.push('/users/login/');
            this.setState({isLoggedIn:false});
        }else{
            setInterval(()=>{
                
                this.fetchUser();
                this.fetchMessages();
                this.setState({isLoading:false})
            },1000);
        }
    }
    fetchUser(){
        fetch('http://localhost:3001/',{
            method:'POST',
            body:JSON.stringify({
                data:{
                    action:'loadUser',
                }
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            this.setState({users:data});
        }).catch((error)=>console.warn('something went wrong',error))

    }
    fetchMessages(){
        fetch('http://localhost:3001/',{
            method:'POST',
            body:JSON.stringify({
                data:{
                    action:'loadMessages',
                }
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            this.setState({message:data});
            
        }).catch((error)=>console.warn('something went wrong',error))
    }
    deleteMessages(id){
        fetch('http://localhost:3001/',{
            method:'POST',
            body:JSON.stringify({
                data:{
                    action:'deleteMessage',
                    message_id:id
                }
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            this.fetchMessages();
            // this.setState({message:data});
            
        }).catch((error)=>console.warn('something went wrong',error))
    }
    send(evt){
        evt.preventDefault();
        const message=$('#message_val').val();
        const newmessage={sender_id:localStorage.getItem('token'),timestamp:new Date().toLocaleTimeString(),message:message};
        fetch('http://localhost:3001/',{
            method:'POST',
            body:JSON.stringify({
                data:{
                    action:'saveMessage',
                    sender_id:localStorage.getItem('token'),
                    timestamp:new Date().toLocaleTimeString(),
                    message:message
                }
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            this.fetchMessages();
            // this.setState((prevState)=>{
            //     return Object.assign({},prevState,{
            //         message:prevState.message.concat(newmessage)
            //     })
            // });
            $('#message_val').val('');
        }).catch((error)=>console.warn('something went wrong',error))
    }
    logout(){
        fetch('http://localhost:3001/',{
            method:'POST',
            body:JSON.stringify({
                data:{
                    action:'logout',
                    userid:localStorage.getItem('token'),
                    lastActive:Date.now()
                }
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            localStorage.removeItem('token');
            history.push('/users/login/');
            this.setState({isLoggedIn:false});
            this.forceUpdate()
        }).catch((error)=>console.warn('something went wrong',error))
        
    }
    render(){
        if(this.state.isLoggedIn===true){
            if(!this.state.isLoading)
                return(
                    <div id="frame">
                        <div id="sidepanel">
                            {/* <div id="profile">
                                <div className="wrap">
                                    <img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" className="online" alt="" />
                                    <p>Mike Ross</p>
                                    <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                                    <div id="status-options">
                                        <ul>
                                            <li id="status-online" className="active"><span className="status-circle"></span> <p>Online</p></li>
                                            <li id="status-away"><span className="status-circle"></span> <p>Away</p></li>
                                            <li id="status-busy"><span className="status-circle"></span> <p>Busy</p></li>
                                            <li id="status-offline"><span className="status-circle"></span> <p>Offline</p></li>
                                        </ul>
                                    </div>
                                    <div id="expanded">
                                        <label htmlFor="twitter"><i className="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
                                        <input name="twitter" type="text" value="mikeross" />
                                        <label htmlFor="twitter"><i className="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
                                        <input name="twitter" type="text" value="ross81" />
                                        <label htmlFor="twitter"><i className="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
                                        <input name="twitter" type="text" value="mike.ross" />
                                    </div>
                                </div>
                            </div> */}
                            <div id="search">
                                <label htmlFor=""><i className="fa fa-search" aria-hidden="true"></i></label>
                                <input type="text" placeholder="Search contacts..." />
                            </div>
                            <UsersList users={this.state.users}/>
                            <div id="bottom-bar">
                                <button id="addcontact"><i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
                                <button id="settings"><i className="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
                            </div>
                        </div>
                        <div className="content">
                            <div className="contact-profile" style={{textAlign:"center"}}>
                                {/* <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" /> */}
                                <div style={{display:"flex"}}>
                                <p className="mr-auto" style={{margin:"0",marginLeft:"1rem",textAlign:"center",float:"center",justifyContent:"center"}}>Messenger</p>
                                <button onClick={this.logout} type="button" className="btn text-right"><span className="fa fa-sign-out-alt"></span></button>
                                </div>
                                <div className="social-media">
                                    {/* <i className="fa fa-facebook" aria-hidden="true"></i>
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                    <i className="fa fa-instagram" aria-hidden="true"></i> */}
                                    
                                </div>
                            </div>
                            <Messages messages={this.state.message} deleteMessages={this.deleteMessages}/>
                            <div className="message-input">
                                <div className="wrap">
                                <input type="text" placeholder="Write your message..."  id="message_val" defaultValue="" autoComplete={false}/>
                                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button className="submit" onClick={this.send}><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            else return(
                <div className="preloader text-center">
                    <img className="text-center" src={loader} alt="loader"/>
                </div>
            );
        }else{
            return(<Form/>)
        }
        
    }
}
