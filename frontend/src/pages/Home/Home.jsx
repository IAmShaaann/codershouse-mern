import React from "react";
import styles from "./Home.module.css";
import {Link, useNavigate} from 'react-router-dom';
import Card from "../../components/shared/Card/Card";
import  Button  from '../../components/shared/Button/Button';

const Home = () => {

  
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: '10px',
  }
  const navigate = useNavigate();
  function startRegister(){
    navigate('/authenticate');
    console.log("Registration Start...");
  }
  return (
    <div className={styles.cardWrapper}>

      <Card title="Welcome to CodersHouse!" icon="logo"> 
      <p className={styles.text}>
        We’re working hard to get Codershouse ready for everyone! While we wrap
        up the finishing touches, we’re adding people gradually to make sure
        nothing breaks. 
      </p>
      <div>
        <Button onClick = {startRegister} text="Let's Go!"></Button>
      </div>
      <div className={styles.signinWrapper}>
        <span className={styles.hasInvite}>Have an invite text?</span>
       
      </div>
      </Card>
      
    </div>
  );
};

export default Home;

// Note-1: In react-router-dom v6 useHistory() is replaced by useNavigate().

// Note-2: In react-router-don v6 history.push has been replaced by navigate. 