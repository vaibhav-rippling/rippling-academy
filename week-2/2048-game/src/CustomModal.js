import { forwardRef, useState, useImperativeHandle } from "react";
import { Button } from "react-bootstrap";
import React from "react";
import Modal from "react-bootstrap/Modal";

const CustomModal = forwardRef((props, ref) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  useImperativeHandle(ref, () => ({
    handleShow() {
      setShow(true);
    },
  }));

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Game Over</Modal.Title>
        </Modal.Header>
        <Modal.Body>Game Over. Press New Game to start a new game.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
});

export default CustomModal;
