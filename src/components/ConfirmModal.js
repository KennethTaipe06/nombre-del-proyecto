import React from 'react';
import './Modal.css'; // Importar el archivo CSS

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Are you sure?</h2>
        <button className="confirm-button" onClick={onConfirm}>Yes</button>
        <button className="cancel-button" onClick={onClose}>No</button>
      </div>
    </div>
  );
};

export default ConfirmModal;
