import axios from "axios";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  setKorisnikData,
  selectKorisnik,
} from "../../features/korisnik/korisnikSlice";

const Login = (props) => {
  const { handleBack, handleToken } = props;

  const kor = useSelector(selectKorisnik);
  const dispatch = useDispatch();

  const email = React.createRef();
  const password = React.createRef();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("LOGIN");
    if (email.current.value && password.current.value) {
      //console.log(email.current.value, password.current.value);

      let podaciKorisnika = {
        email: email.current.value,
        password: password.current.value,
      };

      axios
        .post("http://localhost:3001/api/korisnici/login", {
          headers: { "Content-Type": "application/json" },
          data: JSON.stringify(podaciKorisnika),
        })
        .then((res) => {
          console.log(res);
          console.log(res.data.token);
          if (res.data.token) {
            dispatch(setKorisnikData(res.data.podaciKorisnika));
            handleToken(res.data.token, res.data.podaciKorisnika);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      <div className="d-flex">
        <div className="d-flex col-6 justify-content-center align-items-center">
          <div className="col-sm-10 col-md-8">
            <h1>Login</h1>
            <br />
            <Form className="">
              <Form.Group controlId="formaRegistracijaIme">
                <Form.Label>e-mail</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Unesite svoj e-mail"
                  ref={email}
                />
              </Form.Group>

              <Form.Group controlId="formaRegistracijaPrezime">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Unesite svoj password"
                  ref={password}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </Button>
              <Button variant="danger" type="" onClick={(e) => handleBack(e)}>
                Nazad
              </Button>
            </Form>
          </div>
        </div>
        <div className="col-6 fancyBG" style={{ height: "100vh" }}></div>
      </div>
    </div>
  );
};
export default Login;
