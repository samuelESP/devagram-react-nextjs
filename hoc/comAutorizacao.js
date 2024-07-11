import Cabecalho from "@/components/layout/Cabecalho";
import Rodape from "@/components/layout/Rodape";
import UsuarioService from "@/services/UsuarioService";
import { useRouter } from "next/router";

const usuarioService = new UsuarioService()

export default function ComAutorizacao(Componente) {
    return (props) => {
        
        const router = new useRouter();

        if (typeof window !== 'undefined' && window.localStorage) {
            if (!usuarioService.estaAutenticado()) {
                router.replace('/');
                return null;
            }

        }
            return (
                <>
                    <Cabecalho />
                    <Componente {...props} />
                    <Rodape />
                </>
            )
        return null;
    }
}