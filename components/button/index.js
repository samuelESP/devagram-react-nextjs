export default function Button({
    tipo='button',
    texto,
    cor='primaria',
    disable = false,
    onclick
}){
    return(
        <button
        type={tipo}
        className={`btn ${cor}`}
        disabled={disable}
         onClick={onclick}>
            {texto}
        </button>
    )
}