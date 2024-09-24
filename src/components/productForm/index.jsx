import { productSchema } from "../../validations/productValidation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import { getSuppliers } from "../../services/services";
import { useAuth} from '../../contexts/authContext';

export default function ProductForm(props){
    const user = props.user
    const { quill, quillRef } = useQuill();
    const [product, setProduct] = useState(props.product);
    const [suppliers, setSuppliers] = useState([]);
    const action = props.action;
    let firstLoad = true;

    const {
        setValue,
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
        getSuppliers(user.token)
        .then(data=>{
            setSuppliers(data);
        })
    },[])

    useEffect(()=>{
        reset(product);


    }, [product]);

    useEffect(() => {
        if (quill && firstLoad && action == 'edit') {
            quill.clipboard.dangerouslyPasteHTML(product.descricao);
            firstLoad = false;
        }
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
            setValue("descricao", quill.root.innerHTML);
          });
        }
      }, [quill]);

    return(
        <form className="mt-4 w-[60%] mx-auto flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            <input
                className="rounded-md bg-slate-300 p-2"
                type="text"
                placeholder="Nome"
                {...register("nome")}
            />
            <p>{errors.nome?.message}</p>

            {/* <input
                className="rounded-md mt-4 bg-slate-300 p-2 break-words"
                type="text"
                placeholder="Fornecedor"
                {...register("fornecedor")}
            />
            <p>{errors.fornecedor?.message}</p> */}

            <label for="fornecedor">Fornecedor:</label>

            <select {...register("fornecedor")} name="fornecedor" id="fornecedor">
                {suppliers.map(supplier=>{
                    return (<option selected={supplier.nome == product.fornecedor} value={supplier.nome}>{supplier.nome}</option>)
                })}
            </select>

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

            <div>
                <p>Descrição</p>
                <div className="w-80 h-40 mb-4">
                    <div ref={quillRef} />
                </div>
            </div>

            <input 
                type="hidden"
                className="rounded-md bg-slate-300 p-2"
                placeholder="Descrição" 
                {...register("descricao")} />
            <p>{errors.descricao?.message}</p>
            <div className="mt-8">
            { action == 'add' ?
                <input type="submit" className="mt-2 rounded-md bg-green-300 p-2" value="Adicionar"/> :
                <input type="submit" className="mt-2 rounded-md bg-green-300 p-2" value="Atualizar"/>}
            </div>
        </form>
    )
} 