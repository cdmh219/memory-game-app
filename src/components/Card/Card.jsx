import './Card.css';

const Card = ({ data, onCardSelection}) => {
    return (
        <div className={`card ${data.flipped ? ' card--flipped': ''}`} 
        onClick={() => {
            if (!data.flipped) {
                onCardSelection(data);
            }
        }}>
            { data.flipped ? data.value: '' }
        </div>
    );
};

export default Card;