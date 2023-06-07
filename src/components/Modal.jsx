import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 13000;
`;

const ModalContent = styled.div`
  background-color: #1a1919;
  text-align: center;
  padding: 1rem 2rem;
  padding-bottom: 40px;
  border-radius: 10px;
  max-width: 500px;
  width: 80%;
  position: relative;
  z-index: 13001;
  border: 2px solid #d2d2d2;
`;

const Modal = ({ isOpen, onRequestClose, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <ModalOverlay onClick={onRequestClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
