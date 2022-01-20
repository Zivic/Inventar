import React from "react";
import { Route, Switch } from "react-router-dom";
import Skladista from "./Skladista/Skladista";
import Dashboard from "./Dashboard";
import AddNewKategorija from "./AddNewKategorija";
import PregledProizvoda from "./Proizvodi/PregledProizvoda";
import Proizvod from "./Proizvodi/Proizvod";
import Barkod  from "./Barkod/Barkod";
import Home from "./Home";
import MenadzerDashboard from "./Menadzer Dashboard/MenadzerDashboard";
import Chat from "./Chat";
import AdminDashboard from "./AdminDashboard";

const Main = () => {
  return (
    <>
      <Switch>
        <Route path="/skladista" component={Skladista} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/home" component={Home} />
        <Route path="/noviProizvod" component={Proizvod} />
        <Route path="/novaKategorija" component={AddNewKategorija} />
        <Route path="/pregledProizvoda" component={PregledProizvoda} />
        <Route path="/proizvod" component={Proizvod} />
        <Route path="/menadzerDashboard" component={MenadzerDashboard} />
        <Route path="/barkod" component={Barkod} />
        <Route path="/chat" component={Chat} />
        <Route path="/adminDashboard" component={AdminDashboard} />


        <Route exact path="/" component={Skladista} />
      </Switch>
    </>
  );
};
export default Main;
