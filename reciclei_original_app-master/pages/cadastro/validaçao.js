document.getElementById('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário até a validação ser concluída
    let isValid = true;

    // Limpando todas as mensagens de erro
    document.querySelectorAll('.error-message').forEach(function (element) {
        element.textContent = '';
    });

    // Validação do nome completo (mínimo 15, máximo 80 caracteres alfabéticos)
    const name = document.getElementById('name').value;
    if (name.length < 15 || name.length > 80 || !/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById('name-error').textContent = 'O nome deve ter entre 15 e 80 caracteres alfabéticos.';
        isValid = false;
    }

    // Validação do nome materno (campo obrigatório)
    const motherName = document.getElementById('mother_name').value;
    if (motherName.trim() === "") {
        document.getElementById('mother-name-error').textContent = 'O nome materno é obrigatório.';
        isValid = false;
    }

    // Validação do CPF (com dígito verificador)
    const cpf = document.getElementById('cpf').value;
    if (!validarCPF(cpf)) {
        document.getElementById('cpf-error').textContent = 'CPF inválido.';
        isValid = false;
    }

    // Validação do e-mail (campo obrigatório)
    const email = document.getElementById('email').value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('email-error').textContent = 'Formato de e-mail inválido.';
        isValid = false;
    }

    //validalção do celular (campo obrigatório)
    const cell = document.getElementById('cell').value;
    if (cell.trim() === "") {
        document.getElementById('cell-error').textContent = 'O celular completo é obrigatório.'
    }

    // Validação do endereço completo (campo obrigatório)
    const address = document.getElementById('enderess').value;
    if (address.trim() === "") {
        document.getElementById('enderess-error').textContent = 'O endereço completo é obrigatório.';
        isValid = false;
    }

    // Validação do login (exatamente 6 caracteres alfabéticos)
    const login = document.getElementById('login').value;
    if (login.length !== 6 || !/^[A-Za-z]+$/.test(login)) {
        document.getElementById('login-error').textContent = 'O login deve ter exatamente 6 caracteres alfabéticos.';
        isValid = false;
    }

    // Validação da senha (8 caracteres alfabéticos)
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirme_password').value;
    if (password.trim() === "") {
        document.getElementById('password-error').textContent = 'O campo de senha não pode estar vazio.';
        isValid = false;
    }

    // Validação da confirmação da senha (senhas devem ser iguais)
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'As senhas não coincidem.';
        isValid = false;
    }

    // Validação da data de nascimento (campo obrigatório)
    const dataNascimento = document.getElementById('data').value;
    if (!dataNascimento) {
        document.getElementById('data-error').textContent = 'A data de nascimento é obrigatória.';
        isValid = false;
    }

    // Validação do sexo (campo obrigatório)
    const sexo = document.querySelector('input[name="sexo"]:checked');
    if (!sexo) {
        document.getElementById('sexo-error').textContent = 'O sexo é obrigatório.';
        isValid = false;
    }

    // Se todas as validações passarem, exibe mensagem de sucesso
    if (isValid) {
        alert('Cadastro realizado com sucesso!');
        // Aqui você pode fazer o envio real do formulário
        // Exemplo: document.getElementById('form').submit();
    }
});

// Função para validar o CPF (cálculo do dígito verificador)
function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove qualquer caractere que não seja número
    if (cpf.length !== 11) return false;

    // Testa sequência de números repetidos
    if (/^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    let resto;
    
    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    // Valida o segundo dígito verificador
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

$('#cpf').mask('000.000.000-00');
$('#tel-fix').mask('(00) 00000-0000');
$('#cell').mask('(00) 00000-0000');
