import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";
import { deleteSupplier } from "../../services/services";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

export default function SupplierCard(props) {
    const navigate = useNavigate();
    const supplier = props.supplier;
    const { user } = useAuth();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    function deleteRecord() {
        deleteSupplier(supplier._id, user.token).
            then(data => {
                closeModal();
                toast.success("Fornecedor deletado com sucesso");
            });
    }

    function editSupplier() {
        navigate(`/editSupplier/${supplier._id}`)
    }

    return (
        <div className="w-40 h-40 text-center rounded-md border items-center flex flex-col justify-center hover:cursor-pointer">
            <p>{supplier.nome}</p>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p>Deseja realmente excluir o item?</p>
                <div className="flex gap-2">
                    <button className="rounded-md bg-green-200 p-2" onClick={deleteRecord}>Sim</button>
                    <button className="rounded-md bg-red-200 p-2" onClick={closeModal}>Não</button>
                </div>
            </Modal>
            <div>
                <button className="mb-2 p-2 border bg-green-400" onClick={editSupplier}>Editar</button>
                <button className="mb-2 p-2 border bg-red-400" onClick={openModal}>Excluir</button>
            </div>
        </div>
    )
}