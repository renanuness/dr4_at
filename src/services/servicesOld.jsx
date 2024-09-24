import axios from 'axios'

export function getProducts(page, pageSize){
    return axios.get(`https://dummyjson.com/products?skip=${(page-1)*pageSize}&limit=${pageSize}`)
    .then(res => {
        return res.data;
    });
}

export function filterProducts(text){
    return axios.get(`https://dummyjson.com/products/search?q=${text}`)
    .then(res =>{
        return res.data;
    })
}

export function getProductById(id){
    return axios.get(`https://api-infnet-produtos-privado.vercel.app/produtos/${id}`)
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