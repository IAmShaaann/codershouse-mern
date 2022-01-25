import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import Button from "../../../components/shared/Button/Button";
import { verifyOtp } from "../../../http/index";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setAuth } from '../../../store/authSlice';

 


const StepOtp = () => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const { phone, hash } = useSelector((state) =>state.auth.otp)
  async function submit(){
    try{
      const { data } = await verifyOtp({otp, phone, hash});
      console.log(data);
      dispatch(setAuth(data));
    }
    catch(err){
      console.log(err);
    }

    
  }

  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title="Enter the code we just texted you. " icon="lock">
          <TextInput value={otp} onChange={(e) => setOtp(e.target.value)} />
          <div>
            <div>
              <p className={styles.bottomParagraph}>
                Didn't recieved? Tap to resend.
              </p>
            </div>
            <div className={styles.actionButtonWrap}>
              <Button onClick={submit} text="Next"></Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
