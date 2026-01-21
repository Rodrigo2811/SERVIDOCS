export const formataTel = (valor) => {
    const numero = valor.replace(/\D/g, '');

    return numero.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1)$2 $3-$4')
}

export const formataCPF = (valor) => {

    const limpo = valor.replace(/\D/g, '')

    return limpo.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')


}

export const dataRegistro = () => {
    const data = new Date()
    const dia = data.getDate()
    const mes = data.getMonth()
    const ano = data.getFullYear()

    return `${dia}/${mes + 1}/${ano}`
}


export const FormData = (dataStr) => {
    const data = new Date(dataStr);

    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(data)

}