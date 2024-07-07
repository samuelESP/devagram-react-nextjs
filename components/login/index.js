//dependencias/libs/funcoes
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { validarEmail, validarSenha } from "@/utils/validadores";
import UsuarioService from "@/services/UsuarioService";

// Componentes
import InputPublico from "../inputPublico";
import Button from "../button";

// Imagens
import imagemEnvelope from "@/public/images/envelope.svg";
import imagemChanve from "@/public/images/chave.svg";
import imagemLogo from "@/public/images/logo.svg";



const usuarioService = new UsuarioService();


export default function Login({ aposAutenticacao }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [estaSubmetendo, setEstaSubmetendo] = useState(false);


    const validarFormulario = () => {
        return (
            validarEmail(email)
            && validarSenha(senha)
        );
    }

    const aoSubmeter = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) {
            return;
        }

        setEstaSubmetendo(true);

        try {
            await usuarioService.login({
                login: email,
                senha
            });

            if (aposAutenticacao) {
                aposAutenticacao();
            }
        } catch (error) {
            alert("Erro ao realizar o login. " + error?.response?.data?.erro);
        }

        setEstaSubmetendo(false);
    }

    return (
        <section className={`paginaLogin paginaPublica`}>
            <div className="logoContainer">

                {<Image
                    src={imagemLogo}
                    alt="LogoTipo"
                    layout="fill"
                    className="logo"
                />}

            </div>

            <div className="conteudoPaginaPublica">
                <form onSubmit={aoSubmeter}>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={(event) => setEmail(event.target.value)}
                        valor={email}
                        mensagemValidacao="O endereço informado é inválido"
                        exibirMensagemValidacao={email && !validarEmail(email)}
                    />

                    <InputPublico
                        imagem={imagemChanve}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={(event) => setSenha(event.target.value)}
                        valor={senha}
                        mensagemValidacao="Necessario ter mais de 3 caracteres"
                        exibirMensagemValidacao={senha && !validarSenha(senha)}
                    />
                    <Button
                        tipo="submit"
                        texto="Login"
                        disable={!validarFormulario() || estaSubmetendo}
                    />
                </form>
                <div className="rodapePaginaPublica">
                    <p>Não possui uma conta?</p>
                    <Link href="/cadastro">Faça seu cadastro agora!</Link>
                </div>
            </div>
        </section>
    )
}