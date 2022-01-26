import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <Routes>
        <Route path="/skladista" element={<Skladista/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/noviProizvod" element={<Proizvod/>} />
        <Route path="/novaKategorija" element={<AddNewKategorija/>} />
        <Route path="/pregledProizvoda" element={<PregledProizvoda/>} />
        <Route path="/proizvod" element={<Proizvod/>} />
        <Route path="/menadzerDashboard" element={<MenadzerDashboard/>} />
        <Route path="/barkod" element={<Barkod/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="/adminDashboard" element={<AdminDashboard/>} />


        <Route exact path="/" element={<Skladista/>} />
      </Routes>
    </>
  );
};
export default Main;
