import React, { useState, useRef, useEffect } from "react";
import { FaFingerprint } from "react-icons/fa";
import Button from "../ui/Button";
import BacktoLogin from "../ui/BacktoLogin";
import Timer from "./Timer";
import { useNavigate } from "react-router-dom";
import apis from "../../utilis/apis";
import { toast } from "react-hot-toast";
import LoadingButton from "../ui/LoadingButton";

const VerifyOtp = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  const navigate = useNavigate();

  const inputRef = [ref1, ref2, ref3, ref4, ref5, ref6];
  const [loading, setLoading] = useState(false);
  const [isExpire, setIsExpire] = useState(false);
  const [otpTime, setOtpTime] = useState(null);

  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");

  const otpArray = [setOtp1, setOtp2, setOtp3, setOtp4, setOtp5, setOtp6];

  // Autofocus on the first OTP input on mount
  useEffect(() => {
    if (ref1.current) {
      ref1.current.focus();
    }
  }, []);

  // Handle OTP input change
  const inputChange = (event, location) => {
    const value = event.target.value.slice(0, 1); // Limit input to 1 character
    otpArray[location](value);

    if (location < 5 && value) {
      inputRef[location + 1].current.focus();
    }
  };

  // Handle OTP form submission
  const submitHandler = async (event) => {
    event.preventDefault();

    const finalOtp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    if (finalOtp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(apis().VerifyOtp, {
        method: "POST",
        body: JSON.stringify({ otp: finalOtp }),
        headers: { "Content-Type": "application/json" },
      });

      const rawResponse = await response.text();
      console.log("Raw Response:", rawResponse); // Log raw response for debugging

      if (!response.ok) {
        throw new Error(rawResponse);
      }

      const result = JSON.parse(rawResponse);

      if (result?.status) {
        toast.success(result?.message);
        navigate("/updatepassword");
      } else {
        toast.error(result?.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error(error.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP handler
  const resenderHandler = async () => {
    try {
      const email = localStorage.getItem("email");
      if (!email) {
        toast.error("Email is missing in localStorage");
        return;
      }

      const response = await fetch(apis().forgetPassword, {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message);
      }

      if (result?.status) {
        toast.success(result?.message);
        localStorage.setItem("passToken", result?.token);
        setOtpTime(1 * 60 * 1000); // Reset OTP timer to 1 minute
        setIsExpire(false);
      }
    } catch (error) {
      console.error("Resend OTP Error:", error.message);
      toast.error(error.message || "Failed to resend OTP");
    }
  };

  // Fetch OTP time on component mount
  useEffect(() => {
    const getTime = async () => {
      try {
        const passToken = localStorage.getItem("passToken");
        if (!passToken) {
          toast.error("Token is missing in localStorage");
          return;
        }

        const response = await fetch(apis().getOtpTime, {
          method: "POST",
          body: JSON.stringify({ token: passToken }),
          headers: { "Content-Type": "application/json" },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message);
        }

        if (result?.status) {
          const remainingTime =
            new Date(result?.sendTime).getTime() - new Date().getTime();

          if (remainingTime > 0) {
            setOtpTime(remainingTime);
          } else {
            setIsExpire(true);
          }
        }
      } catch (error) {
        console.error("Get OTP Time Error:", error.message);
        toast.error(error.message || "Failed to fetch OTP time");
      }
    };

    getTime();
  }, []);

  return (
    <div className="auth_main">
      <form onSubmit={submitHandler}>
        <div className="auth_container">
          <div className="auth_header">
            <FaFingerprint />
            <p className="auth_heading">Verify your OTP</p>
            <p className="auth_title">
              Enter the 6-digit OTP we just sent to your email.
            </p>
          </div>
          <div className="auth_item">
            <label>OTP *</label>
            <div className="otp_input_container">
              {inputRef.map((item, index) => (
                <input
                  required
                  key={index}
                  onChange={(event) => inputChange(event, index)}
                  ref={item}
                  onInput={(event) => {
                    if (event.target.value.length > 1) {
                      event.target.value = event.target.value.slice(0, 1);
                    }
                  }}
                  type="number"
                  className="ui_input otp_input"
                />
              ))}
            </div>
          </div>
          <div className="auth_action">
            <Button>
              <LoadingButton loading={loading} title="Verify" />
            </Button>
          </div>
          <div>
            {otpTime !== null && !isExpire ? (
              <Timer setIsExpire={setIsExpire} time={otpTime} />
            ) : (
              <span onClick={resenderHandler} className="otp_resend_action">
                Resend
              </span>
            )}
          </div>
          <div>
            <BacktoLogin />
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;

