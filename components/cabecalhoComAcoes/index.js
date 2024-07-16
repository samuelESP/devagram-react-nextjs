import Image from "next/image";


export default function CabecalhoComAcoes({ className,
    iconeEquerda,
    textoEsquerda = null,
    aoClicarAcaoEsquerda,
    titulo,
    elementoDireita,
    aoClicarElementoDireita

}) {

    return (
        <div className={`cabecalhoComAcoes ${className}`}>
            {iconeEquerda ? (
                <Image
                    src={iconeEquerda}
                    alt='icone esquerda cabeçalho com ações'
                    width={25}
                    height={25}
                    onClick={aoClicarAcaoEsquerda}
                />
            ) : (
                textoEsquerda !== null && (
                    <span className='cabecalhoComAcoesTextoEsquerda' onClick={aoClicarAcaoEsquerda}>
                        {textoEsquerda}
                    </span>
                )
            )}

            <h3>{titulo}</h3>

            {elementoDireita && (

                <button
                    type='button'
                    className='btnAcaoDireita'
                // onClick={aoClicarElementoDireita}
                >
                    {elementoDireita}
                </button>
            )}
        </div>
    )
}