const apis = () =>{
    const local ='http://localhost:5555/'

    const list = {
        registerUser: `${local}user/register`,
        loginUser: `${local}user/login`,
        forgetPassword: `${local}user/forget/password`,
        otpVerify: `${local}user/verifyOtp`,
        getOtpTime: `${local}user/getOtpTime`,
        updatePassword: `${local}user/updatepassword`,
        //getAccess: `${local}user/getAccess`
    };
    return list;
};

export default apis;