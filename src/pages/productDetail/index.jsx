import { useEffect, useState } from "react";
import { deleteProduct, getProductById } from "../../services/services";
import { useNavigate, useParams } from "react-router-dom";
import {  useAuth } from "../../contexts/authContext"
import Modal from 'react-modal';
import { useQuill } from 'react-quilljs';

import 'quill/dist/quill.snow.css'; // Add css for snow theme
import { toast } from "react-toastify";

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

export default function ProductDetail() {
    const { quill, quillRef } = useQuill();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [product, setProduct] = useState({});
    const { id } = useParams();
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        getProductById(id, user.token).then(
            res => {
                setProduct(res);
            }
        )
    }, [])

    function goToEdit() {
        navigate("/editProduct/" + product._id);
    }

    function deleteItem(){
        deleteProduct(product._id, user.token)
        .then(()=>{
            toast.success("Produto excluído com sucesso");
            navigate("/products")
        })
    }

    return (
        <div id="container">
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <p>Deseja realmente excluir o item?</p>
                <div className="flex gap-2">
                    <button className="rounded-md bg-green-200 p-2" onClick={deleteItem}>Sim</button>
                    <button className="rounded-md bg-red-200 p-2" onClick={closeModal}>Não</button>
                </div>
            </Modal>
            <img className="w-48" src={product?.url_imagem}/>
            <p>{product.nome}</p>
            <p>R$ {product.preco}</p>
            <p>{product.fornecedor}</p>
            <div dangerouslySetInnerHTML={{__html: product.descricao}}></div>
            <div>
                <button onClick={goToEdit} className="rounded-md bg-green-200 p-2">Editar</button>
                <button onClick={openModal} className="rounded-md bg-red-200 p-2">Excluir</button>
            </div>
        </div>
    )
}