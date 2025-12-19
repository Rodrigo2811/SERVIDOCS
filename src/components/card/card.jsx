
import './card.css'

const Card = ({ title, icon, qtd, description }) => {
    return (
        <div className="container-card">
            <h4>{title} {icon}</h4>
            <p>{(qtd)}</p>
            <span className='cadDescricao'>{description}</span>
        </div>
    )
}

export default Card;