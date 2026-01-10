export const buscarClientes = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3003/clientes')


        if (!response.ok) return []

        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error('Erro ao buscar clientes', error)
        return []
    }
}


export const buscarProdutos = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3003/produtos')

        if (!response.ok) return []

        const data = await response.json()

        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error("Erro ao buscar produtos", error)

    }
}

export const buscarDespesas = async () => {
    try {
        const response = await fetch('http://127.0.0.1:3003/despesas')
        if (!response.ok) return []


        const data = await response.json()
        return Array.isArray(data) ? data : []
    } catch (error) {
        console.error(error)
    }
}