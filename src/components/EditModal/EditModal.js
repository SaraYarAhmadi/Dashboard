import React, { useEffect } from "react";
import "./EditModal.css";
import { Button } from 'react-bootstrap';

export default function EditModal({ children, onClose, onSubmit }) {
  useEffect(() => {
    const checkKey = (event) => {
      console.log(event);
      if (event.keyCode === 27) {
        onClose();
      }
    };

    window.addEventListener("keydown", checkKey);

    return () => window.removeEventListener("keydown", checkKey);
  });

  return (
    <div className="modal-parent active">
      <form className="edit-modal-form">
        <h1>اطلاعات جدید را وارد نمایید</h1>

        {children}

        <Button className="btn-success border-0 py-3 px-3 fw-bold w-100 mt-3" onClick={onSubmit}>
          ثبت اطلاعات جدید
        </Button>
      </form>
    </div>
  );
}
