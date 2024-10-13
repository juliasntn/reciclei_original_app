document.querySelector('form').addEventListener('submit', function(event) {
    const loginInput = document.getElementById('login');
    const passwordInput = document.getElementById('password');
    const loginError = document.getElementById('login-error');
    const passwordError = document.getElementById('password-error');

    // Limpar mensagens de erro anteriores
    loginError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    // Validação de campo vazio - Login
    if (loginInput.value.trim() === "") {
        loginError.textContent = "O campo Login não pode estar vazio.";
        valid = false;
    }

    // Validação de tamanho máximo do Login
    if (loginInput.value.length > 6) {
        loginError.textContent = "O campo Login deve ter no máximo 6 caracteres.";
        valid = false;
    }

    // Validação de tamanho mínimo do Login
    if (loginInput.value.length < 3) {
        loginError.textContent = "O campo Login deve ter pelo menos 3 caracteres.";
        valid = false;
    }

    // Validação de campo vazio - Senha
    if (passwordInput.value.trim() === "") {
        passwordError.textContent = "O campo Senha não pode estar vazio.";
        valid = false;
    }

    // Validação de tamanho mínimo da Senha
    if (passwordInput.value.length < 3) {
        passwordError.textContent = "A senha deve ter pelo menos 3 caracteres.";
        valid = false;
    }

    // Se houver erro, impedir o envio do formulário
    if (!valid) {
        event.preventDefault();
    }
});