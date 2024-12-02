
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

const correctAnswers = {
    Q1: "Amarela",
    Q2: "Vidro",
    Q3: "Papel",
    Q4: "Espuma",
    Q5: "Amarela",
    Q6: "Marrom",
    Q7: "Separar materiais recicláveis",
    Q8: "Pontos de coleta específicos",
    Q9: "Separação de resíduos recicláveis e orgânicos",
    Q10: "Reduz a poluição e o desperdício",
  };
  
  const form = document.getElementById("quiz-form");
  const resultsDiv = document.getElementById("results");
  const restartBtn = document.getElementById("restart-btn");
  const submitBtn = document.getElementById("submit-btn");
  
  // Botão para enviar o quiz
  submitBtn.addEventListener("click", () => {
    let results = "";
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
  
    Object.keys(correctAnswers).forEach((question) => {
      const userAnswer = form[question]?.value || "Não respondido";
      const correctAnswer = correctAnswers[question];
      if (userAnswer === correctAnswer) {
        results += `<p>${question}: Certo! Resposta: ${correctAnswer}</p>`;
        score++;
      } else {
        results += `<p>${question}: Errado! Resposta correta: ${correctAnswer} (Você respondeu: ${userAnswer})</p>`;
      }
    });
  
    results += `<h3>Sua pontuação: ${score}/${totalQuestions}</h3>`;
    resultsDiv.innerHTML = results;
  
    // Exibe o botão de reiniciar e esconde o botão de enviar
    restartBtn.style.display = "block";
    submitBtn.style.display = "none";
  });
  
  // Botão para reiniciar o quiz
  restartBtn.addEventListener("click", () => {
    // Reseta as respostas do formulário
    form.reset();
  
    // Limpa os resultados
    resultsDiv.innerHTML = "";
  
    // Reexibe o botão de enviar e esconde o de reiniciar
    restartBtn.style.display = "none";
    submitBtn.style.display = "block";
  });

