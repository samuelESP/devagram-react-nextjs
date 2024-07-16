import CabecalhoComAcoes from "../cabecalhoComAcoes";
import iconeEquerda from '../../public/images/setaEsquerda.svg';
import Avatar from "../avatar";
import Button from "../button";

export default function CabecalhoPerfil({
    usuario,
}) {
    console.log(usuario);
    return (
        <div className="cabecalhoPerfil largura30pctDesktop">

            <CabecalhoComAcoes
                iconeEquerda={iconeEquerda}
                titulo={usuario.nome}
            />

            <div className="statusPerfil">
                <Avatar
                    src={usuario.avatar}
                />
                <div className="informacoesPerfil">
                    <div className='statusContainer'>
                        <div className='status'>
                            <strong>15</strong>
                            <span>Publicações</span>
                        </div>
                        <div className='status'>
                            <strong>120</strong>
                            <span>Seguidores</span>
                        </div>
                        <div className='status'>
                            <strong>110</strong>
                            <span>seguindo</span>
                        </div>
                    </div>
                    <Button
                        texto={'seguir'}
                        cor='primaria'
                    />
                </div>
            </div>
        </div>
    )
}