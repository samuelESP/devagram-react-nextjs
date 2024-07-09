//dependencias/libs/funcoes
import Image from 'next/image';

//Imagens
import imgHomeAtivo from "../../public/images/homeAtivo.svg";
import imgHomeCinza from "../../public/images/homeCinza.svg";
import imgPublicacaoAtivo from '../../public/images/publicacaoAtivo.svg';
import imgPublicacaoCinza from '../../public/images/publicacaoDesativo.svg';
import imgUsuarioAtivo from '../../public/images/usuarioAtivo.svg';
import imgUsuarioCinza from '../../public/images/usuarioDesativo.svg';


export default function Navegacao({className}) {
    return (
        <nav className={`barraNavegacao ${className}`}>
            <ul>
                <li>
                    <Image
                        src={imgHomeAtivo}
                        alt='icone home'
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={imgPublicacaoCinza}
                        alt='icone publicacao'
                        width={20}
                        height={20}
                    />
                </li>
                <li>
                    <Image
                        src={imgUsuarioCinza}
                        alt='icone usuario'
                        width={20}
                        height={20}
                    />
                </li>

            </ul>
        </nav>
    )
}