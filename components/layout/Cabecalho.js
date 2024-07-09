//dependencias/libs/funcoes
import Image from 'next/image';

// Componentes

//Imagens
import logoHorizontal from "../../public/images/logoHorizontal.svg"
import imagemLupa from "../../public/images/lupa.svg"
import Navegacao from './Navegacao';
import { useState } from 'react';
import ResultadoPesquisa from './ResultadoPesquisa';

export default function Cabecalho() {

    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');


    const aoPesquisar = (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa('');
        if (termoPesquisado.length < 3) {
            return
        }
        setResultadoPesquisa([
            {
                avatar: "",
                nome: "Samuel",
                email: "samuel@gmail.com",
                _id: "124345141"
            },
            {
                avatar: "",
                nome: "teste",
                email: "teste@gmail.com",
                _id: "41412421"
            },
            {
                avatar: "",
                nome: "rafael",
                email: "rafael@gmail.com",
                _id: "756745645635"
            },
        ])
    }


    const aoClicarResultadoPesquisa = (id) => {
        console.log("aoClicarResultadoPesquisa", {id});
    }

    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className='logoCabecalhoPrincipal'>
                    <Image
                        src={logoHorizontal}
                        alt="logo devagram"
                        layout="fill"
                    />
                </div>
                <div className='barraPesquisa'>
                    <div className='containerImagemLupa'>
                        <Image
                            src={imagemLupa}
                            alt='Icone lupa'
                            layout='fill'
                        />
                    </div>
                    <input
                        type='text'
                        placeholder='Pesquisar'
                        value={termoPesquisado}
                        onChange={aoPesquisar}
                    />
                </div>
                <Navegacao className='desktop' />
            </div>


            {resultadoPesquisa.length > 0 && (
                <div className='resultadoPesquisaContainer'>
                    {resultadoPesquisa.map(r => {
                        return <ResultadoPesquisa
                            avatar={r.avatar}
                            nome={r.nome}
                            email={r.email}
                            key={r._id}
                            id={r._id}
                            onClick={aoClicarResultadoPesquisa}
                        />
                    })}
                </div>
            )}
        </header>
    )
}