import React from 'react';
import {Link} from 'react-router-dom';
import './form.css';
import $ from 'jquery';
import {connect} from 'react-redux';
import ChatBox from './../chatbox/index';
import { createBrowserHistory } from "history";
var history=createBrowserHistory();
export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
            email:'',
            isLoggedIn:false,
            user:{}
        }
        this.login=this.login.bind(this);
    }
    componentDidMount(){
        
    }


    login(evt){
        evt.preventDefault();

        const email=$('#log_email').val();
        const pass=$('#log_pass').val();
        if(email===''||pass===''){
            $('.feedback-msg').html('Enter All fields');
            $('.feedback-msg').addClass('text-danger');
            setTimeout(()=>{
                $('.feedback-msg').html('');
                $('.feedback-msg').removeClass('text-danger');
            },2000);
            return;
        }
        $('#login').attr('disabled',true);
        const lastLogin=new Date().toLocaleTimeString();
        const obj={action:'login',email,pass,lastLogin};
        fetch('http://localhost:3001/',{
            method:'POST',
            body:JSON.stringify({
                data:obj
            }),
            headers:{
                'Content-Type':'application/json'
            }
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            if(data.message!==undefined){
                $('.feedback-msg').html(data.message);
                $('.feedback-msg').addClass('text-danger');
                // return;
            }else{
                setTimeout(() => {
                    localStorage.setItem('token',data._id);
                    history.push('/');
                    this.setState({isLoggedIn:true})
                    console.log('logged in state',this.state.isLoggedIn);
                    this.forceUpdate()
                }, 1000);
            }
            
            
        }).catch((error)=>console.warn('something went wrong',error))
        // this.setState({isLoggeIn:this.props.isLoggeIn,user:this.props.user});
        setTimeout(()=>{
            $('.feedback-msg').html('');
            $('.feedback-msg').removeClass('text-danger');
        },2000);
        $('#login').removeAttr('disabled');
    }
    render(){
        if(this.state.isLoggedIn!==true)
        return(
            <div className="container-fluid">
                <div className="row" style={{paddingTop:"3rem"}}>
                    <div className="col-sm-4"></div>
                    <div className="col-sm-4 user">
                        <div className="user_form">
                            <form onSubmit={this.login}>
                                <div className="form-heading">
                                    <h3 className="text-center">Messenger</h3>
                                </div>
                                <div className="feedback text-center pb-2">
                                    <p className="feedback-msg text-danger"></p>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="text" id="log_email" placeholder="Enter Email Id"/>
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type="password" id="log_pass" placeholder="Enter Password"/>
                                </div>
                                <div className="form-group">
                                    <div className="remember">
                                        <input type="checkbox" className="" id="remember"/>
                                        <label style={{color:"white"}} htmlFor="remember">Remember Me</label>
                                    </div>
                                    <div className="forgot" style={{float:"right"}}>
                                        <Link to="" style={{color:"white"}}>Forgot Password?</Link>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary" type="button" id="login" onClick={this.login}>
                                    Login
                                    </button>   
                                </div>
                                <div className="form-group text-center">
                                    <p className="text-center">or Login with</p>
                                    <button className="btn btn-social-icon btn-facebook btn-rounded"><span className="fa fa-facebook"></span></button>
                                    <button className="btn btn-social-icon btn-instagram btn-rounded"><span className="fa fa-instagram"></span></button>
                                    <button className="btn btn-social-icon btn-github btn-rounded"><span className="fa fa-github"></span></button>
                                </div>
                                <p style={{color:"white"}} className="go_to_register">New to Messenger?<Link to={'/users/register/'} style={{color:"green"}}> register here</Link></p>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-4"></div>
                </div>
            </div>
        );
        else return(<ChatBox/>);
    }
    
}
