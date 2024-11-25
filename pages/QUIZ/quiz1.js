// Defina as perguntas do quiz
const questions = [
    {
        question: "O que é reciclável?",
        options: ["Plástico", "Lixo orgânico", "Papel", "Todos os anteriores"],
        correctAnswer: "Todos os anteriores"
    },
    {
        question: "Como a reciclagem ajuda o meio ambiente?",
        options: ["Reduzindo a poluição", "Aumentando o lixo", "Desmatando florestas", "Nenhuma das alternativas"],
        correctAnswer: "Reduzindo a poluição"
    },
    {
        question: "Qual é o principal material reciclável utilizado em garrafas?",
        options: ["Vidro", "Plástico", "Papel", "Metal"],
        correctAnswer: "Plástico"
    },
    {
        question: "O que é compostagem?",
        options: ["Transformação de resíduos orgânicos em fertilizante", "Transformação de lixo eletrônico", "Reciclagem de garrafas plásticas", "Nenhuma das alternativas"],
        correctAnswer: "Transformação de resíduos orgânicos em fertilizante"
    },
    {
        question: "Como podemos reduzir o uso de plástico no nosso dia a dia?",
        options: ["Usando sacolas plásticas", "Comprando produtos embalados em plástico", "Usando sacolas reutilizáveis", "Comprando produtos em embalagens descartáveis"],
        correctAnswer: "Usando sacolas reutilizáveis"
    },
    {
        question: "O que acontece com os materiais recicláveis que não são reciclados?",
        options: ["Vão para aterros sanitários", "São reutilizados em outros produtos", "São transformados em energia", "Nenhuma das alternativas"],
        correctAnswer: "Vão para aterros sanitários"
    },
    {
        question: "Qual é a vida útil de uma garrafa de plástico no meio ambiente?",
        options: ["5 anos", "100 anos", "500 anos", "Indefinidamente"],
        correctAnswer: "500 anos"
    },
    {
        question: "Qual material pode ser reciclado infinitamente sem perder qualidade?",
        options: ["Plástico", "Vidro", "Papel", "Metal"],
        correctAnswer: "Vidro"
    },
    {
        question: "Qual destes materiais não pode ser reciclado?",
        options: ["Plástico", "Vidro", "Madeira", "Papel"],
        correctAnswer: "Madeira"
    },
    {
        question: "O que é a coleta seletiva?",
        options: ["Mistura de lixo orgânico e reciclável", "Separação dos materiais recicláveis", "Coleta de lixo comum", "Reciclagem de metais"],
        correctAnswer: "Separação dos materiais recicláveis"
    }
];

// Variáveis do quiz
let currentQuestionIndex = 0;
let score = 0;

// Exibe a pergunta atual
function displayQuestion() {
    const questionElement = document.getElementById('quiz');
    const currentQuestion = questions[currentQuestionIndex];
    
    questionElement.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="options">
            ${currentQuestion.options.map(option => `
                <label>
                    <input type="radio" name="answer" value="${option}"> ${option}
                </label>
            `).join('<br>')}
        </div>
    `;
}

// Exibe os resultados
function showResults() {
    const resultsElement = document.getElementById('results');
    resultsElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas.`;
    document.getElementById('restart').style.display = 'inline-block'; // Exibe o botão de recomeçar
}

// Processa a resposta e move para a próxima pergunta
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption.value === currentQuestion.correctAnswer) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Reinicia o quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    displayQuestion();
    document.getElementById('results').innerHTML = '';
    document.getElementById('restart').style.display = 'none'; // Esconde o botão de recomeçar
}

// Inicializa o quiz
document.getElementById('submit').addEventListener('click', nextQuestion);
document.getElementById('restart').addEventListener('click', restartQuiz);

// Exibe a primeira pergunta ao carregar a página
displayQuestion();

const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.documentElement.classList.add(`${currentTheme}-theme`);

    themeToggle.onclick = function() {
        if (document.documentElement.classList.contains('dark-theme')) {
            document.documentElement.classList.remove('dark-theme');
            document.documentElement.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.classList.replace('bx-moon', 'bx-sun');
        } else {
            document.documentElement.classList.remove('light-theme');
            document.documentElement.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            themeToggle.classList.replace('bx-sun', 'bx-moon');
        }
    };

    if (currentTheme === 'light') {
        themeToggle.classList.replace('bx-moon', 'bx-sun');
    }

    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    let fontSize = 10; 

   
    zoomInBtn.addEventListener('click', () => {
        if (fontSize < 20) { 
            fontSize += 1;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });

    
    zoomOutBtn.addEventListener('click', () => {
        if (fontSize > 8) { 
            fontSize -= 1;
            document.documentElement.style.fontSize = fontSize + 'px';
        }
    });
    
    const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const navbarLinks = document.querySelectorAll('.navbar a');


menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
});


navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
    });
});

