import { createStore } from 'redux'
import reducer from './reducers/index'
const initalState={
    loggedInUser:{},
}
var store;

 store = createStore(reducer,initalState)
console.log('this is initiliazed store ',store.getState());

export default store;