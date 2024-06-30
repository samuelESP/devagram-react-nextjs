import Button from "@/components/button";
import Avatar from "@/components/avatar";
import UploadImagem from "@/components/uploadImagem";
import { useState, useRef } from "react";

export default function Home() {

  const [imagem, setImagem] = useState(null);
  const referenciaInput = useRef(null)

  return (
    <>
      <h1>Ola Mundo!</h1>


        <button onClick={() => referenciaInput?.current?.click()}>Abrir seletor de arquivos</button>

        <UploadImagem 
        setImagem={setImagem} 
        imagemPreview={imagem?.preview}
        aoSetarAReferencia={(ref) => referenciaInput.current = ref}
        />

        <Avatar />

        <Button 
        cor={'primaria'} 
        texto={'Login'} 
        type={'Login'} 
        onclick={() => console.log("Botão clicado")} />

    </>
  );
}
