import React from 'react'
import Spinner from '../ui/Spinner.jsx';
const LoadingButton = ({loading,title}) => {
  return (
    <div className="auth_inner">
        <span>{loading ? "please wait...": title}</span>
       
        {loading && <Spinner/>}

    </div>
  );
};

export default LoadingButton;
