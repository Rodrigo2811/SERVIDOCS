import './alert.css'

const Alert = ({ mensagem, tipo }) => {
    return (
        <>
            <div className={`container-alert ${tipo}`}>
                {mensagem}
            </div>
        </>
    )
}

export default Alert;