import React from 'react'
import './Input.css'
const Input = ({placeholder,required,onChange,value,type}) => {
  return (
    <input onChange={onChange}
    type={type} 
    value={value} 
    placeholder={placeholder} 
    required={required} 
    className="ui_input" 
    />
  )
}

export default Input
