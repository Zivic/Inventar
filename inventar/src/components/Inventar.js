import React from 'react';
import Navigation from "./Nav/Navigation";
import Sidebar from "./Nav/Sidebar";
import Main from "./Main";


const Inventar = () => {

//TODO: Redux 
    return (
        <div className="App">
          <Navigation />
          <div className="flex row flex-nowrap fullHeight">
            <Sidebar />
            <Main />
          </div>
        </div>
    )
}

export default Inventar;