const toggleButton = document.getElementById('toggle-dark-mode');
const icon = toggleButton.querySelector('i');

// Carrega o estado salvo do localStorage
if (localStorage.getItem('modoEscuro') === 'true') {
    document.body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

// Alternar modo escuro e salvar no localStorage
toggleButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    const modoEscuroAtivo = document.body.classList.contains('dark-mode');
    localStorage.setItem('modoEscuro', modoEscuroAtivo);

    if (modoEscuroAtivo) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});



// Seleciona todos os elementos com a classe 'fade-in'
const fadeElements = document.querySelectorAll('.fade-in');

// Função para verificar se o elemento está visível na tela
function checkFadeIn() {
    fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100; // Ajuste o "100" conforme a sensibilidade desejada

        if (isVisible) {
            element.classList.add('show');
        }
    });
}

// Ativa a função no scroll e no carregamento da página
window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);



// Espera o carregamento completo da página
window.onload = function() {
    const banner = document.getElementById("banner");
    const imagens = [
        "./assets/img/banner1.webp",   
        "./assets/img/banner2.webp",
        "./assets/img/banner3.webp",
        "./assets/img/banner4.webp",
    ];

    let indexAtual = 0;

    // Função para atualizar o banner
    function updateBanner() {
        banner.style.backgroundImage = `url(${imagens[indexAtual]})`;
    }

    // Função para voltar uma imagem
    window.prevSlide = function() {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        updateBanner();
    }

    // Função para avançar uma imagem
    window.nextSlide = function() {
        indexAtual = (indexAtual + 1) % imagens.length;
        updateBanner();
    }

    // Troca automática do banner a cada 5 segundos
    setInterval(function() {
        indexAtual = (indexAtual + 1) % imagens.length;
        updateBanner();
    }, 5000);

    // Inicializa o banner com a primeira imagem
    updateBanner();
};
