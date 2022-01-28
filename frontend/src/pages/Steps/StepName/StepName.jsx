import React, { useState } from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import TextInput from "../../../components/shared/TextInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import styles from "./StepName.module.css";

const StepName = ({ onNext }) => {
  const dispacth = useDispatch();
  const { name } = useSelector((state) => state.activate);
  const [fullname, setFullname] = useState(name);

  function nextStep() {
    if (!fullname) {
      return;
    }
    dispacth(setName(fullname));
    onNext();
  }

  return (
    <>
      <Card title="Hey! What's your name?" icon="specsEmoji">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <div>
          <div>
            <p className={styles.paragraph}>
              People use real names at codershouse
            </p>
          </div>
          <div className={styles.actionButtonWrap}>
            <Button onClick={nextStep} text="Next"></Button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default StepName;
