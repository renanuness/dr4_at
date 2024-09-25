import * as yup from "yup";

const supplierSchema = yup.object().shape({
    nome: yup.string().required("Por favor, preencha o campo de nome.")
})


export {
    supplierSchema
}