//dependencias/libs/funcoes
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Componentes
import InputPublico from "../inputPublico";
import Button from "../button";

// Imagens
import imagemEnvelope from "@/public/images/envelope.svg";
import imagemChanve from "@/public/images/chave.svg";
import imagemLogo from "@/public/images/logo.svg";





export default function Login() {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");


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
                <form>
                    <InputPublico
                        imagem={imagemEnvelope}
                        texto="E-mail"
                        tipo="email"
                        aoAlterarValor={(event) => setEmail(event.target.value)}
                        valor={email}
                    />

                    <InputPublico
                        imagem={imagemChanve}
                        texto="Senha"
                        tipo="password"
                        aoAlterarValor={(event) => setSenha(event.target.value)}
                        valor={senha}
                    />
                    <Button
                        tipo="submit"
                        texto="Login"
                        disabled={false}
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