import { supplierSchema } from "../../validations/supplierValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { getSuppliers } from "../../services/services";
import { useAuth} from '../../contexts/authContext';

export default function SupplierForm(props){
    const user = props.user
    const [supplier, setSupplier] = useState(props.supplier);
    const action = props.action;

    const {
        setValue,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ 
        defaultValues: {...supplier},
        resolver: yupResolver(supplierSchema) });

    const onSubmit = async (data) => {
        props.submit(data);
    };

    useEffect(()=>{
        reset(supplier);
    }, [supplier]);

    return(
        <form className="mt-4 w-[60%] mx-auto flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <input
                className="rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Nome"
                {...register("nome")}
            />
            <p>{errors.nome?.message}</p>

            <div className="mt-8">
            { action == 'add' ?
                <input type="submit" className="mt-2 rounded-md bg-green-300 p-2" value="Adicionar"/> :
                <input type="submit" className="mt-2 rounded-md bg-green-300 p-2" value="Atualizar"/>}
            </div>
        </form>
    )
} 