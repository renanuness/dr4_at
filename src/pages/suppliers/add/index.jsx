import { useState } from "react";
import SupplierForm from "../../../components/supplierForm";
import { addSupplier } from "../../../services/services";
import { useAuth } from "../../../contexts/authContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AddSupplier(props){
    const [supplier, setSupplier] = useState({});
    const { user } = useAuth();
    const navigate = useNavigate();

    function add(data){
        addSupplier(data, user.token)
        .then(res=>{
            toast.success("Fornecedor adicionado com sucesso");
            navigate("/suppliers");
        })
    }

    return(
        <div>
            <SupplierForm action="add" submit={(data)=>add(data)}/>
        </div>
    )
}