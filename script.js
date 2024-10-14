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
