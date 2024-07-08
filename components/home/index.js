import ComAutorizacao from "@/hoc/comAutorizacao"

function Home(){
    return(
        <h1>Estou na minha Home</h1>
    )
}

export default ComAutorizacao(Home)