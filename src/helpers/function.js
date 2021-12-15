

export function register(data){
    // console.log(data);
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
    }).catch((error)=>console.warn('something went wrong ',error))
}
export async function setStatus(data){
    return fetch('http://localhost:3001/',{
        method:'POST',
        body:JSON.stringify({
            data
        }),
        headers:{
            'Content-Type':'application/json'
        }
    }).then((response)=>response.json())
    .then((data)=>{
        // console.log(data);
        return data;
    }).catch((err)=>{
        console.warn('something went wrong ',err);
    })
}

