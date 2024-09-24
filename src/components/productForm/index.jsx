import { productSchema } from "../../validations/productValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

export default function ProductForm(props){
    const [product, setProduct] = useState(props.product);
    const action = props.action;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({ 
        defaultValues: {...product},
        resolver: yupResolver(productSchema) });

    const onSubmit = async (data) => {
        props.submit(data);
    };

    useEffect(()=>{
        setProduct(props.product);
    },[])

    useEffect(()=>{
        reset(product);
    }, [product]);

    return(
        <form className="mt-4 w-[60%] mx-auto" onSubmit={handleSubmit(onSubmit)}>
                        <input 
                className="rounded-md bg-slate-300 p-2"
                placeholder="Descrição" 
                {...register("descricao")} />
            <p>{errors.descricao?.message}</p>

            <br />

            <input
                className="rounded-md bg-slate-300 p-2 break-words"
                type="text"
                placeholder="Fornecedor"
                {...register("fornecedor")}
            />
            <p>{errors.fornecedor?.message}</p>
            <br />

            <input
                className="rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Nome"
                {...register("nome")}
            />
            <p>{errors.nome?.message}</p>

            <input
                className="rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Preço"
                {...register("preco")}
            />
            <p>{errors.preco?.message}</p>

            <input
                className="rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Url Imagem"
                {...register("url_imagem")}
            />
            <p>{errors.url_imagem?.message}</p>
            
            { action == 'add' ?
                <input type="submit" className="mt-2 rounded-md bg-green-300 p-2" value="Adicionar"/> :
                <input type="submit" className="mt-2 rounded-md bg-green-300 p-2" value="Atualizar"/>}
        </form>
    )
} 