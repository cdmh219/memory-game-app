import Card from "../Card/Card";
import './Board.css';

const Board = ({data, onCardSelection}) => {
    const dataAtRange = (fromIndex, toIndex) => {
        const arr = [];

        for (let i = fromIndex; i <= toIndex; i++){
            arr.push(data[i]);
        }
        
        return arr;
    };

    return (
        <div className="board">
            {
                [0,6,12,18,24,30].map((rowOffset) => (
                    <div key={rowOffset} className="board__row">
                        {dataAtRange(rowOffset,rowOffset+5).map(item => (
                            <Card key={item.id} data={item} onCardSelection={onCardSelection} />
                        ))}
                    </div>
                ))
            }
        </div>
    );
};

export default Board;