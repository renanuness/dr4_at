import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../services/services";
import ProductForm from "../../components/productForm";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/authContext";



export default function EditProduct() {
    const { user } = useAuth();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id, user.token).then(res => {
            console.log(res)
            setProduct(res);
        })
    }, [])

    function editProductReq(prod){
        updateProduct(prod, user.token).then(()=>{
            toast.success("Informações atualizadas com sucesso!");
            navigate("/products");
        })
    }

    return (
        <div>
        { product ? 
            <ProductForm action="edit" submit={(p)=>editProductReq(p)}  product={product}/>
            : ''
        }
        </div>
    )
}