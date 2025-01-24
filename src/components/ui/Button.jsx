import React from 'react'
import './Button.css'
const Button = ({onClick,type,children}) => {
  return (
    <button className="ui_button" onclick={onclick} type={type}>
        {children}
    </button>
  )
}

export default Button
