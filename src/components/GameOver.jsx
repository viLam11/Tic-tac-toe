
export default function GameOver({winner, onRestart}) {
    return <div id="game-over">
        <h2>GAME OVER!</h2>
        {winner? <p>{winner}  won!</p> : <p>Draw</p>}
        
        <p> 
            <button onClick={onRestart} >
                Rematch!
            </button>
        </p>
    </div>
}