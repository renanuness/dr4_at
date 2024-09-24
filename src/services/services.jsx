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
export function filterProducts(text){
    return axios.get(`https://dummyjson.com/products/search?q=${text}`)
    .then(res =>{
        return res.data;
    })
}

export function getProductById(id){
    return axios.get(`https://dummyjson.com/products/${id}`)
    .then(res=>{
        return res.data;
    })
}

export function updateProduct(product){
    console.log(product);
    return axios.put(`https://dummyjson.com/products/${product.id}`, {
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      product
    })
  })
  .then(res => res.data);
}