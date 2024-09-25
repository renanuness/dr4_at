import { useState } from "react";
import SupplierForm from "../../../components/supplierForm";


export default function AddSupplier(props){
    const [supplier, setSupplier] = useState({});


    return(
        <div>
            <SupplierForm action="add" />
        </div>
    )
}