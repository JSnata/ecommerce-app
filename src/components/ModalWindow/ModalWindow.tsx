import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  modalSize?: 'sm' | 'lg' | 'xl';
  title: string;
  children: React.ReactNode;
}

function ModalWindow({ show, handleClose, modalSize, title, children }: ModalProps) {
  return (
    <Modal show={show} onHide={handleClose} keyboard={false} size={modalSize}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
}

export default ModalWindow;
