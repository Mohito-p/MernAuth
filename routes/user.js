const express=require('express');
const register=require('../controller/register')
const login=require('../controller/login')
const forgetPassword = require('../controller/forgetPassword');
const verifyOtp = require('../controller/verifyOtp')
const getOtpTime = require('../controller/getOtpTime')
const updatePassword = require('../controller/passwordUpdate')
//const getAccess = require('../controller/getAccess')


const router=express.Router()

router.post('/register',register)
router.post("/login",login);
router.post("/forget/password",forgetPassword);
router.post("/verifyOtp",verifyOtp);
router.post('/otp/time',getOtpTime); 
router.post('/updatepassword',updatePassword);
//router.post('/get/access',getAccess);

module.exports=router;