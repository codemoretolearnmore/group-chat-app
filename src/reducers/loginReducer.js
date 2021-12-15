const initialState={
    user:""
}
export default function authenticate(state=initialState,action){
    switch(action.type){
        case 'login':
            fetch('http://localhost:3001/',{
                method:'POST',
                body:JSON.stringify({
                    data:action.data
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            }).then((response)=>response.json())
            .then((data)=>{
                // console.log(data);
                localStorage.setItem('token',data._id);
            }).catch((error)=>console.warn('something went wrong',error))
            return state;
        case 'setUser':
            console.log('local id is ',localStorage.getItem('token'));
            if(localStorage.getItem('token')!==null)
            return {...state,user:localStorage.getItem('token')};
            else
            return {...state,user:null};
        default: 
            return state;
    }
}