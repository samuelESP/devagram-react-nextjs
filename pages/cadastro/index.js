//dependencias/libs/funcoes
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {validarEmail, validarSenha, validarNome,confirmacaoDeSenha} from "@/utils/validadores";
import UsuarioService from "@/services/UsuarioService";

// Componentes
import Button from "@/components/button";
import InputPublico from "@/components/inputPublico";
import UploadImagem from "@/components/uploadImagem";

//Imagens
import imagemLogo from "../../public/images/logo.svg";
import imagemUsuarioAtivo from "../../public/images/usuarioAtivo.svg";
import imagemEnvelope from "../../public/images/envelope.svg";
import imagemChave from "../../public/images/chave.svg";
import imagemAvatar from "../../public/images/avatar.svg";

const usuarioService = new UsuarioService();

export default function Cadastro() {


    const [imagem, setImagem] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);


    const validarFormulario = () => {
        return (
            validarNome(nome)
            && validarEmail(email)
            && validarSenha(senha)
            && confirmacaoDeSenha(senha, confirmacaoSenha)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);

        try {
            const corpoReqCadastro = new FormData();
            corpoReqCadastro.append("nome", nome);
            corpoReqCadastro.append("email", email);
            corpoReqCadastro.append("senha", senha);

            if(imagem?.arquivo){
                corpoReqCadastro.append("file", imagem.arquivo);
            }
        
            await usuarioService.cadastro(corpoReqCadastro)
            alert("Sucesso")
        } catch (e) {
            alert('Erro ao cadastrar usuário ' + e?.response?.data?.erro)
        }
        setEstaSubmetendo(false);
    }

    return (
        <section className={`paginaCadastro paginaPublica`}>
            <div className="logoContainer desktop">
                <Image
                    src={imagemLogo}
                    alt="logotipo"
                    layout="fill"
                    className="logo"
                />
            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <UploadImagem
                        imagemPreviewClassName="avatar avatarPreview"
                        imagemPreview={imagem?.preview || imagemAvatar.src}
                        setImagem={setImagem}
                    />
                    <InputPublico
                        imagem={imagemUsuarioAtivo}
                        texto="nome completo"
                        tipo="text"
                        aoAlterarValor={(event) => setNome(event.target.value)}
                        valor={nome}
                        mensagemValidacao="O nome precisa de pelo menos 2 caracteres"
                        exibirMensagemValidacao={nome && !validarNome(nome)}
                    />
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="Email"
                        tipo="email"
                        aoAlterarValor={(event) => setEmail(event.target.value)}
                        valor={email}
                        mensagemValidacao="O e-mail informado é inválido!"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />
                    <InputPublico
                        imagem={imagemChave}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={(event) => setSenha(event.target.value)}
                        valor={senha}
                        mensagemValidacao="Necessario ter mais de 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />
                    <InputPublico
                        imagem={imagemChave}
                        texto="Confirmar senha"
                        tipo="password"
                        aoAlterarValor={(event) => setConfirmacaoSenha(event.target.value)}
                        valor={confirmacaoSenha}
                        mensagemValidacao="As senhas precisam ser iguais"
                        exibirMensagemValidacao={confirmacaoSenha && !confirmacaoDeSenha(senha, confirmacaoSenha)}
                    />

                    <Button
                        texto="Cadastrar"
                        tipo="submit"
                        disable={!validarFormulario()|| estaSubmetendo}
                    />

                </form>
                <div className="rodapePaginaPublica">
                    <p>Já possui uma conta?</p>
                    <Link href="/">Faça seu login agora!</Link>
                </div>
            </div>
        </section>
    )
}