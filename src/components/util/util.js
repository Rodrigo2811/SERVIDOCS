export const formataTel = (valor) => {
    const numero = valor.replace(/\D/g, '');

    return numero.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1)$2 $3-$4')
}

export const formataCPF = (valor) => {

    const limpo = valor.replace(/\D/g, '')


    if (valor.length <= 11) {
        return limpo.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
    } else {
        return limpo.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')

    }

}

export const dataRegistro = () => {
    const data = new Date()
    const dia = data.getDay()
    const mes = data.getMonth()
    const ano = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}


export const FormData = (dataStr) => {
    if (!dataStr) return '';
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
}