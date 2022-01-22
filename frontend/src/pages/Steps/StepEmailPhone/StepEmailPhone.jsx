import { React, useState } from "react";
import Phone from "./Phone/Phone";
import Email from "./Email/Email";
import styles from "./StepEmailPhone.module.css";

const PhoneEmailMap = {
  phone: Phone,
  email: Email,
};

const StepEmailPhone = ({ onNext }) => {
  const [type, setType] = useState("phone"); //checks the value for the respective key.
  const Component = PhoneEmailMap[type];

  console.log(  );
  return (
    <>
      <div className={styles.cardWrapper}>
        <div>
          <div className={styles.buttonWrap}>
            <button
              className={`${styles.tabButton}  ${
                type === "phone" ? styles.active : ""
              }`}
              onClick={() => {
                setType("phone");
              }}
            >
              <img src="/images/mobile.png" alt="Mobile" />
            </button>
            <button
              className={`${styles.tabButton}  ${
                type === "email" ? styles.active : ""
              }`}
              onClick={() => {
                setType("email");
              }}
            >
              <img src="/images/email.png" alt="Email" />
            </button>
          </div>
          <Component onNext={onNext} />
        </div>
      </div>
    </>
  );
};

export default StepEmailPhone;
