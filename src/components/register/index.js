import './../login/form.css';
import $ from 'jquery';
import {register} from './../../helpers/function';
export default function Register(){
    function handleClick(evt){
        evt.preventDefault();
        console.log('registered');
        const action='register',name=$('#reg_name').val(),email=$('#reg_email').val(),pass=$('#reg_pass').val(),confirm_pass=$('#re_reg_pass').val();
        if(name===''||email===''||pass===''||confirm_pass===''){
            $('.feedback-msg').html('Enter all fields');
            $('.feedback-msg').addClass('text-danger');
            setTimeout(()=>{
                $('.feedback-msg').html('');
                $('.feedback-msg').removeClass('text-danger');
            },2000);
            return;
        }else if(pass!==confirm_pass){
            $('.feedback-msg').html("Password doesn't match");
            $('.feedback-msg').addClass('text-danger');
            setTimeout(()=>{
                $('.feedback-msg').html('');
                $('.feedback-msg').removeClass('text-danger');
            },2000);
            return;
        }else{
            const data={action,name,email,pass};
            fetch('http://localhost:3001/',{
                method:'POST',
                body:JSON.stringify({
                    data
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then(function(response){
                if(response.ok){
                return response.json();
                }
                return Promise.reject(response);
            }).then((data)=>{
                console.log(data);
                if(data.message!==null){
                    $('.feedback-msg').html(data.message);
                    $('.feedback-msg').addClass('text-danger');
                }else{
                    $('.feedback-msg').html('Registration Successful');
                    $('.feedback-msg').addClass('text-success');
                    $('#reg_name').val('');$('#reg_email').val('');
                    $('#reg_pass').val('');
                    $('#re_reg_pass').val('');
                }
                setTimeout(()=>{
                    $('.feedback-msg').html('');
                    $('.feedback-msg').removeClass('text-success');
                    $('.feedback-msg').removeClass('text-danger');
                },2000)
            }).catch((error)=>console.warn('something went wrong ',error))
        }
        
    }
    return(
        <div className="container-fluid">
            <div className="row" style={{paddingTop:"3rem"}}>
                <div className="col-sm-4"></div>
                <div className="col-sm-4">
                    
                    <div className="user user_form">
                        <form onSubmit={handleClick}>
                            <div className="form-heading">
                                <h3 className="text-center">Messenger</h3>
                            </div>
                            <div className="feedback text-center">
                                <p className="feedback-msg pb-2"></p>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" id="reg_name" placeholder="Enter Name"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="email" id="reg_email" placeholder="Enter Email Id"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" id="reg_pass" placeholder="Choose Password"/>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="password" id="re_reg_pass" placeholder="Confirm Password"/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type="button" id="register" onClick={handleClick} style={{width:"100%"}}>
                                Register
                                </button>
                            </div>
                            <div className="form-group text-center">
                                <p>or continue with</p>
                                <button className="btn btn-social-icon btn-facebook btn-rounded"><span className="fa fa-facebook"></span></button>
                                <button className="btn btn-social-icon btn-instagram btn-rounded"><span className="fa fa-instagram"></span></button>
                                <button className="btn btn-social-icon btn-github btn-rounded"><span className="fa fa-github"></span></button>
                            </div>
                            <p style={{color:"white"}} className="go_to_register">Already have an account?<a href={'/users/login/'} style={{color:"green"}}> login here</a></p>
                        </form>
                    </div>
                </div>
                <div className="col-sm-4"></div>
            </div>
        </div>
    );
}