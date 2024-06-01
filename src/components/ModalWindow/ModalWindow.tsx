import React from 'react';
import { Modal } from 'react-bootstrap';

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  modalSize?: 'sm' | 'lg' | 'xl' | undefined;
  title: string | undefined;
  children: React.ReactNode;
}

function ModalWindow(props: ModalProps) {
  const { show, handleClose, modalSize, title, children } = props;
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
