import './App.css';
import{BrowserRouter as Router, Route} from 'react-router-dom';
import Login from './components/login/index';
import Register from './components/register/index';
import ChatBox from './components/chatbox/index';
import {Provider} from 'react-redux';
import store from './store';
function App(props) {
  console.log(props.store);
  return (
    <Router>
      <Route exact path="/" component={ChatBox}/>
      <Route exact path="/users/login/" component={Login}/>
      <Route exact path="/users/register/" component={Register}/>
    </Router>
  );
}
function Main(){
  return(
    <Provider store={store}>
      <App/>
    </Provider>
  )
}
export default Main;
