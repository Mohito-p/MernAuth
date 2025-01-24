import React, {useState} from 'react'
import './auth.css'
import Input from '../ui/Input'
import {FaFolderPlus} from "react-icons/fa";
import Button from "../ui/Button"
import BacktoLogin from '../ui/BacktoLogin';
import { useNavigate } from 'react-router-dom';
import apis from '../../utilis/apis';
import {toast} from 'react-hot-toast'
import LoadingButton from '../ui/LoadingButton.jsx';

const Register = () => {
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword] = useState('')
const [loading,setLoading] = useState(false);

const navigate = useNavigate()

const nameChange=(event)=>{
     setName(event.target.value);
}

const emailChange=(event)=>{
  setEmail(event.target.value);
}

const passwordChange=(event)=>{
  setPassword(event.target.value);
}

  const submitHandler= async(event)=>{
    event.preventDefault();
    try{
      setLoading(true);
      const response = await fetch(apis().registerUser, {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      const result = await response.json();

      //console.log('Server response:', result);
      setLoading(false);
      if (!response.ok) {
        throw new Error(result?.message || 'Server error');
      }
  
      if (result?.status) {
        toast.success(result?.message || 'Registered successfully');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register');
    }
    //console.log(name,email,password);
    
  };

  return (
    <div className='auth_main'>
       <form onSubmit={submitHandler}>
         <div className='auth_container'>
         <div className='auth_header'>
          <FaFolderPlus/>
          <p className="auth_heading">Welcome</p>
          <p className="auth_title">Create a new account</p>
         </div>
         <div className="auth_item">
            <label>Name *</label>
            <Input onChange={nameChange} type='text' required placeholder="enter your name"/>
         </div>
         <div className="auth_item">
            <label>Email *</label>
            <Input onChange={emailChange} type='email' required placeholder="enter your name"/>
         </div>
         <div className="auth_item">
            <label>Password *</label>
            <Input onChange={passwordChange} type='password' required placeholder="enter your name"/>
         </div>
         <div className="auth_action">
           <Button>
            <LoadingButton loading={loading} title="Register"/>
           </Button>
         </div>
         <div>
           <BacktoLogin/>
         </div>
         </div>
       </form>
    </div>
  )
}

export default Register
