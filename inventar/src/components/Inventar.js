import React, { useState } from 'react';
import Navigation from "./Nav/Navigation";
import Sidebar from "./Nav/Sidebar";
import Main from "./Main";


const Inventar = () => {
 const [collapse, setCollapse] = useState(false);
 const toggleCollapse = () => {
  setCollapse(!collapse);
 }

//TODO: Redux 
    return (
        <div className="App">
          <Navigation toggleCollapse={() => toggleCollapse()}/>
          <div className="flex row flex-nowrap fullHeight">
           {!collapse && <Sidebar />}
            <Main />
          </div>
        </div>
    )
}

export default Inventar;