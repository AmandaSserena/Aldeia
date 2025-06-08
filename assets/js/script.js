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

const menuToggle = document.getElementById('menu-toggle');
const menu = document.getElementById('menu');

menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
     document.body.classList.toggle('no-scroll');
});



function voltarAoTopo() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }



    // Galeria de Imagens

    const modal = document.getElementById("modal");
const modalImg = document.getElementById("img-grande");
const descricao = document.getElementById("descricao");
const imagens = document.querySelectorAll(".thumb");
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const fechar = document.querySelector('.fechar');

let indexAtual = 0;

imagens.forEach((img, index) => {
    img.addEventListener("click", function() {
        modal.style.display = "flex";
        indexAtual = index;
        mostrarImagem(indexAtual);
    });
});

function mostrarImagem(index) {
    modalImg.classList.add('deslizando');
    setTimeout(() => {
        modalImg.src = imagens[index].src;
        descricao.innerText = imagens[index].alt;
        modalImg.classList.remove('deslizando');
    }, 300);
}

prevBtn.addEventListener('click', () => {
    indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
    mostrarImagem(indexAtual);
});

nextBtn.addEventListener('click', () => {
    indexAtual = (indexAtual + 1) % imagens.length;
    mostrarImagem(indexAtual);
});

fechar.addEventListener("click", function() {
    modal.style.display = "none";
});

modal.addEventListener("click", function(e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Teclado: ←, →, ESC
document.addEventListener('keydown', function(e) {
    if(modal.style.display === "flex") {
        if (e.key === "ArrowLeft") {
            indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
            mostrarImagem(indexAtual);
        } else if (e.key === "ArrowRight") {
            indexAtual = (indexAtual + 1) % imagens.length;
            mostrarImagem(indexAtual);
        } else if (e.key === "Escape") {
            modal.style.display = "none";
        }
    }
});





const coracao = document.querySelector('.coração');
const contador = document.querySelector('.contador');
// modalImg já foi declarado anteriormente

function getImageKey() {
    return 'curtido_' + modalImg.src;
}

function getCountKey() {
    return 'count_' + modalImg.src;
}

// Atualiza visualmente
function updateCurtida() {
    const key = getImageKey();
    const countKey = getCountKey();
    
    const curtido = localStorage.getItem(key) === 'true';
    const count = localStorage.getItem(countKey) || 0;
    
    if (curtido) {
        coracao.classList.add('curtiu');
    } else {
        coracao.classList.remove('curtiu');
    }
    contador.textContent = count;
}

// Quando abrir imagem
modalImg.addEventListener('load', updateCurtida);

// Clique para curtir
coracao.addEventListener('click', function() {
    const key = getImageKey();
    const countKey = getCountKey();
    
    let count = parseInt(localStorage.getItem(countKey)) || 0;
    
    if (coracao.classList.contains('curtiu')) {
        // Descurtindo
        coracao.classList.remove('curtiu');
        localStorage.removeItem(key);
        count = Math.max(0, count - 1);
    } else {
        // Curtindo
        coracao.classList.add('curtiu');
        localStorage.setItem(key, 'true');
        count++;
    }
    
    localStorage.setItem(countKey, count);
    contador.textContent = count;

    // Animação pulse
    coracao.classList.add('pulse');
    setTimeout(() => coracao.classList.remove('pulse'), 600);
});

