import React, {useState} from "react";
import StepName from '../Steps/StepName/StepName';
import StepAvatar from "../Steps/StepAvatar/StepAvatar"; 


const Steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
  const [step, setStep] = useState(1);
  const Step = Steps[step];

  function onNext() {
      setStep(step+1);
  }

  return (
    <div className="cardWrapper">
      <Step onNext={onNext}></Step>
    </div>
  );
};

export default Activate;
