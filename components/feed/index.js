import { useState, useEffect } from "react";
import Postagem from "./Postagem";


export default function Feed({ usuarioLogado }) {

    const [listaDePostagens, setListaDePostagens] = useState([])

    useEffect(() => {
        setListaDePostagens([
            {
                id: '1',
                usuario: {
                    id: '1',
                    nome: 'Samuel',
                    avatar: null
                },
                fotoDoPost: 'https://www.interligar.com.br/wp-content/uploads/2017/10/artigo_01102017.jpg',
                descricao: 'belo Gato e cachorro',
                curtidas: [],
                comentarios: [{
                    nome: "Fulano",
                    mensagem: "Muito Legal"
                }]
            },
            {
                id: '2',
                usuario: {
                    id: '2',
                    nome: 'Damuel',
                    avatar: null
                },
                fotoDoPost: 'https://t.ctcdn.com.br/JlHwiRHyv0mTD7GfRkIlgO6eQX8=/640x360/smart/i257652.jpeg',
                descricao: 't is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. ',
                curtidas: [],
                comentarios: [{
                    nome: "Ciclano",
                    mensagem: "Muito Bom"
                }]
            }
        ])
    }, [usuarioLogado])


    return (
        <div className="feedContainer largura30pctDesktop">
            {listaDePostagens.map(dadosPostagem => (

                <Postagem
                    key={dadosPostagem.id}
                    {...dadosPostagem}
                    usuarioLogado={usuarioLogado}
                />
            ))}
        </div>
    )
}