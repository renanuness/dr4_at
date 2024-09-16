import { useEffect, useState } from "react";



export default function ProductCard(props){
    const product = props.product;
    const [saved, setSaved] = useState(props.saved);
    const [favStyle, setFavStyle] = useState("");

    function setFavorite(){
        let saved = JSON.parse(localStorage.getItem('saved'));
        if(saved == null){
            saved = [];
        }

        saved.push(product.id);
        localStorage.setItem('saved', JSON.stringify(saved));
    }

    useEffect(()=>{
        if(saved){
            setFavStyle("rounded-md bg-orange-200 p-2");
        }else{
            setFavStyle("rounded-md bg-gray-200 p-2");
        }
    }, [saved])
    return (
        <div className="flex w-52 bg-gray-400 rounded-lg p-5 flex-col items-center">
            <img src={product.images[0]}/>
            <p className="text-center">{product.title}</p>
            <p className="text-center">R$ {product.price}</p>
            <p>{product.rating}/5</p>
            <div>
                <button className="rounded-md bg-green-200 p-2" onClick={()=>props.productDetail(product.id)}>Ver mais</button>
                <button className={favStyle} onClick={setFavorite}>Favoritar</button>
            </div>
        </div>
    )
}