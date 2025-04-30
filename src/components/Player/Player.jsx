
import './Player.css';

const Player = ({name = '', score = 0, isActive = false}) => {
    return (
        <div className={`player ${isActive ? 'player--active': ''}`}>
            <h2>{name}</h2>
            <p>Score: {score}</p>
        </div>
    );
};

export default Player;