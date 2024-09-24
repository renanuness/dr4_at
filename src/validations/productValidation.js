import * as yup from "yup";

const productSchema = yup.object().shape({
    nome: yup.string().required("Por favor, preencha o campo de nome."),
    fornecedor: yup.string().required("Por favor, preencha o campo de fornecedor."),
    url_imagem: yup.string().required("Por favor, preencha o campo de url da imagem."),
    descricao: yup.string().required("Por favor, preencha a descrição.").min(6, "A descrião deve ter ao menos 6 caracteres."),
    preco: yup.number().min(1).typeError("Por favor, digite um valor número maior que 1.").required("O campo e-mail é obrigatório!"),
})


export {
    productSchema
}