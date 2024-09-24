// descricao:"<p>Gato Banana</p>"
// fornecedor:"Fornecedor de teste"
// nome:"Teste"
// preco:"1122.12"
// url_imagem:"https://i.pinimg.com/564x/2e/f4/94/2ef4945fb49befba44ce9738a9149387.jpg"
// __v:0
// _id:"66ef2912c20d59000c6df333"

import { useState } from "react";
import ProductForm from "../../../components/productForm";
import { addProduct } from "../../../services/services";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function AddProduct(){
    const { user} = useAuth();
    const navigation = useNavigate();

    function saveProduct(product){
        addProduct(product, user.token)
        .then(data=>{
            toast.success("Produto cadastrado com sucesso!");
            navigation("/products");
        })
        .catch(er=>{
            toast.error("Erro ao salvar produto.")
        });
    }
    return (
        <div>
            <h1>Add product</h1>
            <ProductForm user={user}  submit={p=>saveProduct(p)}action="add"/>
        </div>
    );
}