import React, { useState } from "react";
import Intro from "./components/Intro/Intro";
import { BrowserRouter as Router } from "react-router-dom";
import Inventar from "./components/Inventar";

import "./App.css";

function App() {
  const [token, setToken] = useState(null);
  //TODO: sessionStorage ?
  const handleToken = (newToken, podaciKorisnika) => {
    //TODO: stavi podatake korisnika u redux store
        //TODO: fetch podatke o preduzecu
        //TODO: stavi podatake o skladistima u redux store

    setToken({
      token:newToken,
      podaciKorisnika:podaciKorisnika
    });
    //TODO: REDUX ???????
  };

  return (
    <Router>
      {token ? <Inventar podaciKorisnika={token.podaciKorisnika}/>
       : <Intro handleToken={handleToken} />}
    </Router>
  );
}

export default App;
