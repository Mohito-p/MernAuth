import React,{useState} from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import {Link} from 'react-router-dom'
import {IoIosLogIn} from "react-icons/io";
import apis from '../../utilis/apis';
import {toast} from 'react-hot-toast'

import LoadingButton from '../ui/LoadingButton';

const Login = () => {

       const [email,setEmail] = useState('')
       const [password,setPassword]= useState('')
       const [loading,setLoading] = useState(false)

       const emailChange= (event)=>{
         setEmail(event.target.value)
       }

       const passwordChange=(event)=>{
        setPassword(event.target.value)
       }

       const submitHandler = async(event)=>{
           event.preventDefault();
           try {
            setLoading(true)
              const response = await fetch(apis().loginUser,{
                method: 'POST',
                body: JSON.stringify({email,password}),
                headers:{'Content-Type': 'application/json'}
              })
             
              const result= await response.json()
              setLoading(false)
              if(!response.ok){
                throw new Error(result?.message)
              }

              if(result?.status){
                toast.success(result?.message);
                localStorage.setItem('accessToken',result?.token);
              }
            
           } catch (error) {
             toast.error(error.message)
           }
           console.log(email,password);
       }

  return (
    <div className='auth_main'>
        <form onSubmit={submitHandler} >
            <div className='auth_container'>
                <div className='auth_header'>
                    <IoIosLogIn/>
                    <p className="auth_heading">Welcome back</p>
                    <p className='auth_title'>login to continue</p>
                </div>
                <div className="auth_item">
                    <label>Email *</label>
                    <Input onChange={emailChange} type='email' required placeholder='enter your email'/>
                </div>
                <div className="auth_item">
                    <label> Password *</label>
                    <Input  onChange={passwordChange} type='password' required placeholder='enter your email'/>
                </div>
                <div className='auth_action'>
                    <Button>
                    <LoadingButton loading={loading} title={"Login"}/>
                    </Button>
                </div>
                <div className='auth_options'>
                    <Link to='/register'>Create new account?</Link>
                    <Link to='/forget/password'>Forget Password</Link>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login
