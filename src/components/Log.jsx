
export default function Log({turns}) {
    return(
        <ol id="log">
        {turns.map((eachTurn) => (
            <li key={`${eachTurn.location.row}${eachTurn.location.col}`}>
                {eachTurn.player} selected {eachTurn.location.row}, {eachTurn.location.col}
            </li>
        ))}
        </ol>   
    )
}