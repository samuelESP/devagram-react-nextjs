
import Feed from "@/components/feed";
import ComAutorizacao from "@/hoc/comAutorizacao";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import CabecalhoPerfil from "@/components/cabecalhoPerfil";



function Perfil({ usuarioLogado }) {

    const [usuario, setUsuario] = useState({});
    const router = new useRouter();
    

    const setarNomeDoUsuario = async() => {
        setUsuario({
            nome: 'samuel ESP'
        })
    }
    useEffect(() => {
        setarNomeDoUsuario()
    }, [router.query.id])

    return (
        <div className="paginaPerfil">
            <CabecalhoPerfil 
                usuarioLogado={usuarioLogado}
                usuario={usuario}
            />
            <Feed usuarioLogado={usuarioLogado} />
        </div>
    )
}

export default ComAutorizacao(Perfil);