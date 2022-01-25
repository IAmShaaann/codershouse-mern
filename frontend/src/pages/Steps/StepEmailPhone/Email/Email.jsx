import React, { useState } from "react";
import Card from "../../../../components/shared/Card/Card";
import styles from "../StepEmailPhone.module.css";
import  Button  from "../../../../components/shared/Button/Button";
import TextInput from "../../../../components/shared/TextInput/TextInput";


const Email = ({onNext}) => {
    const [email, setEmail] = useState('');
  return (
    <div>
      <Card title="Enter your email address. " icon="email">
      <TextInput
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
        <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={ onNext }></Button>
        </div>
        <p className={styles.bottomParagraph}>By entering your email, you’re agreeing to our Terms of Service and Privacy Policy. Thanks!</p>
        </div>
      </Card>
    </div>
  );
};

export default Email;
