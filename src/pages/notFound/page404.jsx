import img404 from '../../images/404.png'

import './page404.css'

const Page404 = () => {

    function handleVoltar() {
        window.location.href = '/Dashboard'
    }
    return (
        <>
            <div className="container-404">
                <img src={img404} alt="" />
                <p>OPS! Pagina não encontrada</p>
                <p>Desculpe pelo transtorno mas essa pagna nao existe ou está em contrução</p>
                <button className='btn-voltar' onClick={handleVoltar}>Voltar</button>
            </div>
        </>

    )

}

export default Page404