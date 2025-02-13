import React,{ useState, useEffect } from "react";
import { generateOtp, validateOtp } from "../Configuration/OTPService";
import './OtpHandler.css'

const OtpComponent = () => {
    const [userId, setUserId] = useState('');
    const [otp, setOtp] = useState('');
    const [userOtp, setUserOtp] = useState('');
    const [message, setMessage] = useState('');
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);

    const handleGenerateOtp = async () => {
        try{
            const response = await generateOtp(userId);
            setOtp(response.data);
            setMessage('OTP generated');
            setTimer(30);
        }
        catch (error) {
            setMessage('Error generating OTP');
        }
    };

    const handleValidateOtp = async () => {
        try {
            const response =await validateOtp(userId, userOtp);
            setMessage(response.data.message);
        } 
        catch (error) {
            setMessage('Invalid OTP or Expired OTP');
        }
    };

        return (
            
            <div className="container">
                <div className="header">OTP Form</div>
                <div className="input">
            <input type="text" placeholder="Enter User Id" value={userId} onChange={(e) => setUserId(e.target.value)} />
            <input type="datetime-local" />
            </div>
            <button className="submit" onClick={handleGenerateOtp}>Generate OTP</button>
            {timer > 0 && <p>OTP is valid for {timer} seconds</p>}
            {timer > 0 && <p>{otp}</p>}
            <div className="input">
            <input className="input" type="text" placeholder="Enter OTP" value={userOtp} onChange={(e) => setUserOtp(e.target.value)} />
            </div>
            <button className="submit" onClick={handleValidateOtp}>validate OTP</button>
            <p>{message}</p>
            </div>
        );
    };

    export default OtpComponent;