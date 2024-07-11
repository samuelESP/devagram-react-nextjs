//dependencias/libs/funcoes
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';

// Componentes
import ResultadoPesquisa from './ResultadoPesquisa';
import Navegacao from './Navegacao';
import UsuarioService from '@/services/UsuarioService';

//Imagens
import logoHorizontal from "../../public/images/logoHorizontal.svg"
import imagemLupa from "../../public/images/lupa.svg"



const usuarioService = new UsuarioService();

export default function Cabecalho() {

    const [resultadoPesquisa, setResultadoPesquisa] = useState([]);
    const [termoPesquisado, setTermoPesquisado] = useState('');
    const router = new useRouter();


    const aoPesquisar = async (e) => {
        setTermoPesquisado(e.target.value);
        setResultadoPesquisa('');
        if (termoPesquisado.length < 3) {
            return
        }

        try {
            const { data } = await usuarioService.pesquisar(termoPesquisado);
            setResultadoPesquisa(data);
        } catch (error) {
            alert("Erro ao pesquisar usuario. " + error?.response?.data?.erro)
        }
    }


    const aoClicarResultadoPesquisa = (id) => {
        setResultadoPesquisa([]);
        setTermoPesquisado('');
        router.push(`/perfil/${id}`);
    }

    const redirecionarParaHome = () => {
        router.push('/');
    }

    return (
        <header className="cabecalhoPrincipal">
            <div className="conteudoCabecalhoPrincipal">
                <div className='logoCabecalhoPrincipal'>
                    <Image
                        onClick={redirecionarParaHome}
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