import React from "react";
import PropTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectModal } from "./modalSlice";

//Takes in 3 props:
GenericModal.propTypes = {
  propHeading: PropTypes.string,
  propBody: PropTypes.object,
  propButtons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      func: PropTypes.func.isRequired,
    })
  ),
};

function GenericModal({ propHeading, propBody, propButtons }) {
  console.log("PROPBUTTONS: ");
  console.log(propButtons);
  const modalState = useSelector(selectModal);
  const pButtons = propButtons;

  return (
    modalState && (
      <Modal
        show={modalState}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {propHeading}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{propBody}</Modal.Body>
        <Modal.Footer>
          {pButtons.map((propButton, index) => (
            <Button key={'propButton ' + index} onClick={() => propButton.func()}>{propButton.name}</Button>
          ))}
        </Modal.Footer>
      </Modal>
    )
  );
}

export default GenericModal;

//USAGE:
{
  /* <GenericModal propHeading="This is a heading" propBody={modalBodyJSX} 
propButtons={[{
  name: "ButtonText",
  func: () => dispatch(forceClose())},
  {
   name: "ButtonText2",
   func: () => dispatch(forceClose())}
]}

/>
<button onClick={() => dispatch(toggle())}>Open modal</button> */
}
