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
