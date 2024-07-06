const validarNome = (nome) => {
    return nome?.toString().length >= 2; 
}

const validarEmail =(email) => {
    const emailString = email.toString();
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    return emailRegex.test(emailString);
}

const validarSenha = (senha) => {
    return senha?.toString().length > 3
}

const confirmacaoDeSenha = (senha, confirmacao) => {
    return validarSenha(senha) && senha === confirmacao
}

export {
    validarNome,
    validarEmail,
    validarSenha,
    confirmacaoDeSenha
}