import { useState } from "react"

export default function Player({ initialName, symbol, isActive, onChangeName }) {
    const [playerName, setPlayerName] = useState(initialName)
    const [ editMode, setEditMode] = useState(false);
    

    function handleChangeName( event) {
        console.log(event);
        setPlayerName(event.target.value);
    }
    
    function handleClick() {
        if(editMode){
            onChangeName(symbol, playerName);
        }
        setEditMode((editMode) => !editMode);
    }

    let editablePlayerName = <span className="player-game">{playerName}</span>;
    if(editMode) 
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChangeName} />
    
    return (
        <li className={isActive ? 'active' : undefined }>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick} >{editMode ? "Save" : "Edit"}</button>
        </li>
    )
}