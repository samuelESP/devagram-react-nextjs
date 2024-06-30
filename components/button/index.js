export default function Button({
    type= 'button',
    texto ,
    cor='primaria',
    disable = false,
    onclick
}){
    return(
        <button
        type={type}
        className={`btn ${cor}`}
        disabled={disable}
         onClick={onclick}>
            {texto}
        </button>
    )
}