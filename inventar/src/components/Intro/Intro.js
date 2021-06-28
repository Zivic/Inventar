import React from "react";
import { useState, useEffect } from "react";
import {Form, Button} from "react-bootstrap";
import Registracija from "./Registracija";
import Login from "./Login";
import axios from "axios";

const Intro = (props) => {
  const {handleToken} = props;

  const [mode, setMode] = useState("intro");

  const IntroJSX = (
    <div>
      <h1>Intro</h1>
      <Button variant="primary" type="" onClick={(e) => changeToLogin(e)}>
        Login
      </Button>
      <Button
        variant="primary"
        type=""
        onClick={(e) => changeToRegistracija(e)}
      >
        Registracija
      </Button>
    </div>
  );
  //TODO: dodaj funkciju za loggedIn kao props: {prvo proveri kako radi redux sesija...}
  //TODO: dodaj funkciju za setMode kao props:

  const changeToLogin = () => {
    setMode("login");
  };

  const changeToIntro = () => {
    setMode("intro");
  };

  const changeToRegistracija = () => {
    setMode("registracija");
  };

  return (
    <div>
      {mode == "registracija" && (
        <Registracija
          handleSuccess={changeToLogin}
          handleBack={changeToIntro}
        />
      )}
      {mode == "login" && <Login handleBack={changeToIntro} handleToken={handleToken}/>}
      {mode == "intro" && IntroJSX}
    </div>
  );
};
export default Intro;
