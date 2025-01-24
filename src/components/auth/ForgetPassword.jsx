import React,{ useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import BacktoLogin from '../ui/BacktoLogin'
import {MdOutlineAttachEmail} from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import apis from '../../utilis/apis';
import {toast} from 'react-hot-toast'
import LoadingButton from '../ui/LoadingButton';
const ForgetPassword = () => {
    
    const [email,setEmail] =useState('')
    const [loading,setLoading]=useState(false)

    const navigate=useNavigate()

    const emailChanger=(event)=>{
        setEmail(event.target.value)
    }
    const submitHandler= async (event)=>{
        event.preventDefault()
        try {
            setLoading(true)
            const response = await fetch(apis().forgetPassword,{
                method:'POST',
                body:JSON.stringify({email}),
                headers:{'Content-Type':'application/json'}
            })

            const result= await response.json()
            setLoading(false)
            if(!response.ok){
                throw new Error(result?.message);
            }
            if(result?.status){
                toast.success(result?.message);
                console.log(result);
                localStorage.setItem('passToken',result?.Token);
                localStorage.setItem('email',email);
                navigate('/verifyOtp');
            }
        } catch (error) {
            toast.error(error.message);
        }
        
    }

  return (
    <div className='auth_main'>
        <form onSubmit={submitHandler}>
            <div className='auth_container'>
                <div className='auth_header'>
                    <MdOutlineAttachEmail/>
                    <p className='auth_header'>Forget your password</p>
                    <p className='auth_title'>Enter your register email , get a 6-digit OTP</p>
                </div>
                <div className="auth_item">
                   <label>Email *</label>
                   <Input onChange={emailChanger} placeholder="enter your email" type='email' required/>
                </div>
                <div className="auth_action">
                    <Button><LoadingButton loading={loading} title='Send Otp'/></Button>
                </div>
                <div>
                    <BacktoLogin/>
                </div>
            </div>
        </form>
      
    </div>
  )
}

export default ForgetPassword
