
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