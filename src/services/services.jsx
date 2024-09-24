import { data } from 'autoprefixer';
import axios from 'axios'

export function getProducts(token){
    return axios.get(`https://api-infnet-produtos-privado.vercel.app/produtos`,{
        headers: {
          'Authorization': `${token}`
        }
      })
    .then(res => {
        return res.data;
    });
}

export function addProduct(product, token){
    return axios.post('https://api-infnet-produtos-privado.vercel.app/produtos', product, {
        headers: {
            'Authorization': `${token}`
            }
    })
    .then(res => {
        return res.data;
    })
}

export function getProductById(id, token){
    return axios.get(`https://api-infnet-produtos-privado.vercel.app/produtos/${id}`,{
        headers: {
            'Authorization': `${token}`
            }
    })
    .then(res=>{
        return res.data;
    })
}

export function updateProduct(product, token){
    return axios.put(`https://api-infnet-produtos-privado.vercel.app/produtos/${product._id}`,product, {
    headers: { 'Content-Type': 'application/json','Authorization':`${token}` },
  })
  .then(res => res.data);
}

export function deleteProduct(id, token){
    return axios.delete(`https://api-infnet-produtos-privado.vercel.app/produtos/${id}`, {
        headers: { 'Content-Type': 'application/json','Authorization':`${token}` },
      })
      .then(res => res.data);
}

export function getSuppliers(token){
    return axios.get('https://api-infnet-produtos-privado.vercel.app/fornecedores',{
        headers: { 'Content-Type': 'application/json','Authorization':`${token}` },
      })
      .then(res=> {return res.data});
}