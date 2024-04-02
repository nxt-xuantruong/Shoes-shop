import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AdminForm from "../forms/AdminForm/AdminForm";
import ProductForm from "../forms/ProductForm/ProductForm";

import "./ModalForm.css";

function ModalForm({ tab, closeModal, selectedProduct }) {
  const handleCloseModal = () => {
    closeModal(false);
  };

  return (
    <div className="modalForm">
      <span className="iconClose" onClick={handleCloseModal}>
        <FontAwesomeIcon icon={faXmark} />
      </span>
      <h2>{selectedProduct ? "update" : "thêm mới"}</h2>
      {tab === "accountAdmin" ? (
        <AdminForm />
      ) : (
        <ProductForm selectedProduct={selectedProduct} />
      )}
    </div>
  );
}

export default ModalForm;
