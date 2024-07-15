import { useState } from "react";
import { FazerComentario } from "./FazerComentario";
import FeedService from "@/services/FeedService";
import Link from "next/link";
import Avatar from "../avatar";
import Image from "next/image";

import imgCurtir from '../../public/images/coracaoDesativo.svg';
import imgCurtido from '../../public/images/coracaoAtivo.svg';
import imgComentarioAtivo from '../../public/images/comentarioAtivo.svg';
import imgComentarioCinza from '../../public/images/comentarioDesativo.svg';

const tamanhoLimiteDescricao = 90;
const feedService = new FeedService();

export default function Postagem({ id, usuario, fotoDoPost, descricao, comentarios, usuarioLogado, curtidas }) {

    const [curtidasPostagem, setCurtidasPostagem] = useState(curtidas);

    const [comentariosPostagem, setComentariosPostagem] = useState(comentarios);
    const [deveExibirSecaoParaComentar, setDeveExibirSecaoParaComentar] = useState(false);
    const [tamanhoAtualDaDescricao, setTamanhoAtualDaDescricao] = useState(tamanhoLimiteDescricao);


    const exibirDescricaoCompleta = () => {
        setTamanhoAtualDaDescricao(Number.MAX_SAFE_INTEGER);
    }

    const descricaoMaiorQueLimite = () => {
        return descricao.length > tamanhoAtualDaDescricao;
    }

    const obterDescricao = () => {
        let mensagem = descricao.substring(0, tamanhoAtualDaDescricao);
        if (descricaoMaiorQueLimite()) {
            mensagem += '...';
        }
        return mensagem;
    }


    const obterImagemComentario = () => {
        return deveExibirSecaoParaComentar ? imgComentarioAtivo : imgComentarioCinza;
    }

    const comentar = async (comentario) => {

        try {
            await feedService.adicionarComentario(id, comentario);
            setDeveExibirSecaoParaComentar(false);
            setComentariosPostagem([
                ...comentariosPostagem,
                {
                    nome: usuarioLogado.nome,
                    mensagem: comentario
                }
            ]);
        } catch (e) {
            alert(`Erro ao fazer comentario! ` + (e?.response?.data?.erro || ''));
        }
    }


    const usuarioLogadoCurtiuPostagem = () => {
        return curtidasPostagem.includes(usuarioLogado.id);
    }

    const alterarCurtida = async () => {
        try {
            await feedService.alterarCurtida(id);
            if (usuarioLogadoCurtiuPostagem()) {
                setCurtidasPostagem(
                    curtidasPostagem.filter(idUsuarioQueCurtiu => idUsuarioQueCurtiu !== usuarioLogado.id)
                )
            } else {
                setCurtidasPostagem([
                    ...curtidasPostagem,
                    usuarioLogado.id
                ])
            }
        } catch (e) {
            alert(`Erro ao alterar a curtida! ` + (e?.response?.data?.erro || ''));
        }
    }

    const obterImagemCurtida = () => {
        return usuarioLogadoCurtiuPostagem()
            ? imgCurtido
            : imgCurtir;
    }

    return (
        <div className="postagem">

            <Link href={`/perfil/${usuario.id}`}>
                <section className="cabecalhoPostagem">
                    <Avatar src={usuario.avatar} />
                    <strong>{usuario.nome}</strong>
                </section>
            </Link>

            <div className="fotoDaPostagem">
                <img src={fotoDoPost} alt="Foto Da Postagem" />
            </div>

            <div className="rodapeDaPostagem">
                <div className="acoesDaPostagem">
                    <Image
                        src={obterImagemCurtida()}
                        alt='icone curtir'
                        width={20}
                        height={20}
                        onClick={alterarCurtida}
                    />

                    <Image
                        src={obterImagemComentario()}
                        alt='icone comentar'
                        width={20}
                        height={20}
                        onClick={() => setDeveExibirSecaoParaComentar(!deveExibirSecaoParaComentar)}
                    />

                    <span className="quantidadeCurtidas">
                        Curtido por <strong> {curtidasPostagem.length} pessoas</strong>
                    </span>
                </div>

                <div className="descricaoDaPostagem">
                    <strong className="nomeUsuario">{usuario.nome}</strong>
                    <p className="descricao">
                        {obterDescricao()}
                        {descricaoMaiorQueLimite() && (
                            <span
                                onClick={exibirDescricaoCompleta}
                                className="exibirDescricaoCompleta">
                                mais
                            </span>
                        )}
                    </p>
                </div>
                <div className="comentariosDaPublicacao">
                    {comentariosPostagem.map((comentario, i) => (
                        <div className="comentario" key={i}>
                            <strong className="nomeUsuario">{comentario.nome}</strong>
                            <p className="descricao">{comentario.mensagem}</p>
                        </div>
                    ))}
                </div>
            </div>
            {deveExibirSecaoParaComentar &&
                <FazerComentario comentar={comentar} usuarioLogado={usuarioLogado} />
            }

        </div>
    )
}
