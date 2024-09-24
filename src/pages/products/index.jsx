

import { useContext, useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import ProductFilter from "../../components/productFilter";
import { getProducts, filterProducts } from "../../services/services";
import { useNavigate } from "react-router-dom";

import  {useAuth}  from "../../contexts/authContext";

export default function Products(){
    const navigate = useNavigate();
    const {user} = useAuth();
    const pageSize = 30;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [canLoad, setCanLoad] = useState(true);
    const [saved, setSaved] = useState([]);

    console.log(user.token);
    useEffect(()=>{
        getProducts(user.token, pageSize).then(res=>{
            console.log(res);
            setProducts(res);
        });
    }, []);

    return (
        <div className="flex-col flex items-center">
            <ProductFilter filter={(v)=>filter(v)} />
            <div className="flex flex-wrap gap-2 p-4 justify-center">
            {products.map(product =>
                <ProductCard key={product.id} product={product} saved={()=>{saved.includes(product.id)}} productDetail={(id)=>navigate('/productDetail/'+id)}/>
            )}
            </div>
            { 
                canLoad ?
                <button className="bg-green-400 rounded-md w-44 mb-4" onClick={(e)=>loadMore(e)}>Carregar mais</button>
                : ''
            }
        </div>
    )
}