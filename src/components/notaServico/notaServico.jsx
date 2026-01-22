import { useRef } from 'react';
import html2pdf from 'html2pdf.js/dist/html2pdf.bundle.min.js';
import logo from '../../images/indice.jpg';

const NotaServico = ({ dados, fechar }) => {
    const conteudoRef = useRef();

    const gerarPDF = async () => {
        const elemento = conteudoRef.current;

        const opcoes = {
            margin: [5, 5, 5, 5],
            filename: `Nota_${dados.cliente}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                logging: true,
                scrollY: -window.screenY,
                windowHeight: elemento.scrollHeight,
                backgroundColor: '#ffffff'
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        // Geramos a partir do clone e removemos ele depois

        try {
            const pdf = html2pdf().set(opcoes).from(elemento)

            await pdf.save()
        } catch (error) {
            console.error('Erro ao gerar pdf: ', error)
        }
    };

    return (
        <div className="overlay-fixo" style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <div className="modal-branco" style={{
                backgroundColor: '#fff', padding: '20px', borderRadius: '5px',
                maxHeight: '90vh', overflowY: 'auto'
            }}>

                {/* ÁREA DE CAPTURA */}
                <div
                    ref={conteudoRef}
                    style={{
                        width: '700px', padding: '40px', backgroundColor: '#ffffff', color: '#000', display: 'block', overflow: 'visible', position: 'relative'
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #333' }}>
                        <img src={logo} alt="logo" style={{ width: '100px' }} />
                        <div style={{ textAlign: 'right', fontSize: '12px' }}>

                            <p>Rua Getulio Vargas nº 33 - 1º andar - Centro</p>
                            <p>Dias D'Ávila-Ba - CEP: 42.850-000</p>
                            <p>CNPJ: 46.626.505/0001-67</p>
                        </div>
                    </div>

                    <h2 style={{ textAlign: 'center', marginTop: '20px' }}>NOTA DE SERVIÇO</h2>

                    <div style={{ margin: '20px 0' }}>
                        <p><strong>CLIENTE:</strong> {dados.cliente}</p>
                        <p><strong>CPF/CNPJ: {dados.cpf || 'Não Informado'}</strong></p>
                        <p><strong>DATA:</strong> {new Date(dados.data).toLocaleString()}</p>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead style={{ backgroundColor: '#eee' }}>
                            <tr>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Descrição</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Qtd</th>
                                <th style={{ border: '1px solid #000', padding: '5px' }}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dados.itens.map((item, i) => (
                                <tr key={i}>
                                    <td style={{ border: '1px solid #000', padding: '5px' }}>{item.nome}</td>
                                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'center' }}>{item.quantidade}</td>
                                    <td style={{ border: '1px solid #000', padding: '5px', textAlign: 'right' }}>
                                        R$ {(item.quantidade * item.preco_unitario).toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ textAlign: 'right', marginTop: '20px' }}>
                        <h3>TOTAL: R$ {dados.total}</h3>
                    </div>
                </div>

                {/* BOTÕES (NÃO CLONADOS) */}
                <div style={{ textAlign: 'center', marginTop: '20px', padding: '10px' }}>
                    <button onClick={gerarPDF} style={{
                        padding: '10px 30px', backgroundColor: '#28a745', color: '#fff',
                        border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px'
                    }}>
                        IMPRIMIR AGORA
                    </button>
                    <button onClick={fechar} style={{
                        padding: '10px 30px', backgroundColor: '#dc3545', color: '#fff',
                        border: 'none', borderRadius: '5px', cursor: 'pointer'
                    }}>
                        FECHAR
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotaServico;