

import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import ProductFilter from "../../components/productFilter";
import { getProducts, filterProducts } from "../../services/servicesOld";
import { useNavigate } from "react-router-dom";


export default function Products(){
    const navigate = useNavigate();
    const pageSize = 30;
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [canLoad, setCanLoad] = useState(true);
    const [saved, setSaved] = useState([]);

    useEffect(()=>{
        getProducts(1, pageSize).then(res=>{
            setProducts(res.products);
            if(currentPage * pageSize > res.total){
                setCanLoad(false);
            }else{
                setCanLoad(true);
            }
        });

        let s = JSON.parse(localStorage.getItem('saved'));
        console.log(s);
        setSaved(s);
    }, []);

    function filter(value){
        filterProducts(value).then(res =>{
            setProducts(res.products);
        });
    }

    function loadMore(event){
        console.log(event)
        event.preventDefault();
        let page = currentPage;
        page++;
        getProducts(page, pageSize).then(res=>{
            let newProducts = [...products, ...res.products];
            setProducts(newProducts);
            if(currentPage * pageSize > res.total){
                setCanLoad(false);
            }else{
                setCanLoad(true);
            }
        });
        setCurrentPage(page);
    }
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