import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import { getProducts, getSuppliers } from "../../services/services";
import { useNavigate } from "react-router-dom";

import  {useAuth}  from "../../contexts/authContext";
import SupplierCard from "../../components/supplierCard";

export default function Suppliers(){
    const navigate = useNavigate();
    const {user} = useAuth();
    const [suppliers, setSuppliers] = useState([]);

    useEffect(()=>{
        getSuppliers(user.token)
        .then(data=>{
            setSuppliers(data);
        })
    },[]);


    return (
        <div className="flex-col flex items-center p-4">
            <div className="flex gap-4 flex-wrap">
            {suppliers.map(supplier =>
                <SupplierCard supplier={supplier} />
            )}
            </div>
            <button onClick={()=>navigate("/addSupplier")} className="mb-2 p-2 border bg-blue-600">Adicionar fornecedor</button>
        </div>
    )
}