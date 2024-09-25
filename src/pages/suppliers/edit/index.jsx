import { useState } from "react";
import SupplierForm from "../../../components/supplierForm";
import { useEffect } from "react";
import { useAuth } from "../../../contexts/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSupplier } from "../../../services/services";
import { toast } from "react-toastify";


export default function EditSupplier({route}){
    const [supplier, setSupplier] = useState();
    const { state} = useLocation();
    const { user} = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        setSupplier(state.supplier);
    }, [])

    function edit(data){
        updateSupplier(data, user.token)
        .then(res=>{
            toast.success("Fornecedor atualizado com sucesso");
            navigate("/suppliers");
        })
    }
    return(
        <div>
        {
            supplier == undefined ? '':
            <SupplierForm action="edit" submit={(data)=>edit(data)} supplier={supplier}/>
        }
        </div>
    )
}