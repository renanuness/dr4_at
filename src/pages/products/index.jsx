

import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import { getProducts, getSuppliers } from "../../services/services";
import { useNavigate } from "react-router-dom";

import  {useAuth}  from "../../contexts/authContext";

export default function Products(){
    const navigate = useNavigate();
    const {user} = useAuth();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [view, setView] = useState("grid");
    const [style, setStyle] = useState("flex flex-wrap gap-2 p-4 justify-center");
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");

    useEffect(()=>{
        getProducts(user.token).then(res=>{
            setProducts(res);
            setFilteredProducts(res);
        });
    }, []);

    useEffect(()=>{
        let s = view == 'grid' ?
            "flex flex-row flex-wrap gap-2 p-4 justify-center" :
            "flex flex-col gap-2 p-4 justify-center";

            setStyle(s);
    }, [view]);

    useEffect(()=>{
        getSuppliers(user.token)
        .then(data=>{
            setSuppliers(data);
        })
    },[]);

    useEffect(()=>{
        if(selectedSupplier == ''){
            setFilteredProducts(products);
            return;
        }

        let p = products.filter(p => p.fornecedor == selectedSupplier);
        setFilteredProducts(p);
    }, [selectedSupplier])

    function activeButton(value){
        return (view == value ? 'bg-green-600': '');
    }
    return (
        <div className="flex-col flex items-center">
            <div className="p-2 flex gap-2">
                <button className={"p-2 border "+ activeButton('grid') } onClick={()=>setView("grid")}>Grade</button>
                <button className={"p-2 border "+ activeButton('list') } onClick={()=>setView("list")}>Lista</button>
            </div>
            <div>
            <label for="fornecedor">Fornecedor:</label>
                <select onChange={(e)=> setSelectedSupplier(e.target.value)} name="fornecedor" id="fornecedor">
                <   option value="">Filtrar fornecedor</option>
                    {suppliers.map(supplier=>{
                        return (<option value={supplier.nome}>{supplier.nome}</option>)
                    })}
                </select>
            </div>
            <div className={style}>
            {filteredProducts.map(product =>
                <ProductCard key={product._id} product={product} productDetail={(id)=>navigate('/productDetail/'+id)}/>
            )}
            </div>
            <button onClick={()=>navigate("/products/add")} className="mb-2 p-2 border bg-blue-600">Adicionar produto</button>
        </div>
    )
}