import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import styles from "./StepOtp.module.css";
import Button from "../../../components/shared/Button/Button";

const StepOtp = ({ onNext }) => {
  const [otp, setOtp] = useState("");
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
              <Button text="Next"></Button>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default StepOtp;
