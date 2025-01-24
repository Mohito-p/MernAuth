import React,{useEffect,useState} from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import apis from '../../utilis/apis';
import {toast} from 'react-hot-toast'

const Super = () => {
    const [isAuth,setIsAuth] = useState(false)
    const [loading,setLoading] = useState(false)
    

    useEffect(()=>{

        const getRouteAccess = async()=>{

            try {
                setLoading(true)  
                const response = await fetch(apis().getAccess,{
                    method: 'POST',
                    body: JSON.stringify({token: localStorage.getItem('passtoken')}),
                    headers: {'Content-Type': 'application/json'}
                })

                const result = await response.json()

                if(!response.ok){
                    throw new Error(result?.message);
                   
                }
                if(result?.status){
                   setLoading(false)
                   setIsAuth(true) 
                }
                
            } catch (error) {
              setLoading(false);
              toast.error(error.message) 
            }
        };
        
        getRouteAccess();

    },[])
    if (loading){
        return <h2>loading...</h2>
    }

    if(isAuth){
        return <Outlet/>;
    }
    else{
        return <Navigate to="/login"/>;
    }
};

export default Super;
