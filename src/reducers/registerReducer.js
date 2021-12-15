const initialState={
    user:{}
}
export default function authenticate(state=initialState,action){
    switch(action.type){
        case 'register':
            fetch('http://localhost:3001/',{
                method:'POST',
                body:JSON.stringify({
                    data:action.data
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
            }).catch((error)=>console.warn('something went wrong'+error))
            return {...state,user:{email:action.data.email,pass:action.data.pass}};
        default: 
            return state;
    }
}