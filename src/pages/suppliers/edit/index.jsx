import { useState } from "react";
import SupplierForm from "../../../components/supplierForm";


export default function EditSupplier(props){
    const [supplier, setSupplier] = useState(props.supplier);


    return(
        <div>
        {
            supplier == undefined ? '':
            <SupplierForm action="edit" />
            }
        </div>
    )
}