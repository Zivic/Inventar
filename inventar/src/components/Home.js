import React from "react";
import GenericModal from "../features/modal/GenericModal";
import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  forceOpen,
  forceClose,
  selectModal,
} from "../features/modal/modalSlice";

const Home = () => {
  //const isOpenModal = useSelector(selectModal);
  const dispatch = useDispatch();

  const modalBodyJSX = (
    <>
      <h2>This is a body</h2>
      <p>Amazing</p>
    </>
  );

  return (
    <div
      style={{
        margin: ".5rem",
        //backgroundColor: "gray",
        width: "100%",
        border: "solid green",
        borderWidth: ".1rem .1rem 0",
        borderRadius: "8px 8px 0 0",
        height: "500px",
      }}
    >
      Home
      <GenericModal propHeading="This is a heading" propBody={modalBodyJSX} 
      propButtons={[{
        name: "ButtonText",
        func: () => dispatch(forceClose())},
        {
         name: "ButtonText2",
         func: () => dispatch(forceClose())}
      ]}
    
    />
      <button onClick={() => dispatch(toggle())}>Open modal</button>
    </div>
  );
};
export default Home;
