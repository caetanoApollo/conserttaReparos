/**
 * main.js
 * Script principal da Landing Page Consertta Reparos
 */
document.addEventListener('DOMContentLoaded', () => {
    /* ==============================================================
       1. CONFIGURAÇÃO DINÂMICA DO WHATSAPP
       ============================================================== */
    // Configurado com o número solicitado
    const WHATSAPP_NUMBER = "5551999683397";

    /**
     * Função global para abrir o WhatsApp com mensagem pré-preenchida
     * @param {string} servico - Nome do serviço ou contexto (ex: 'Reparos Hidráulicos')
     */
    window.openWhatsApp = function (servico) {
        let mensagem = "Olá, gostaria de solicitar um orçamento";

        // Contextualiza a mensagem com base de onde o usuário clicou
        if (servico && servico !== 'Geral') {
            mensagem += ` para ${servico}`;
        }
        mensagem += ". Pode me ajudar?";

        // Formata a URL (encodeURIComponent garante que os espaços virem %20)
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensagem)}`;

        // Abre em nova aba
        window.open(url, '_blank');
    };

    /* ==============================================================
       2. CONTROLE DO MENU MOBILE (HAMBURGUER)
       ============================================================== */
    const menuBtn = document.getElementById('menuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Abre/fecha menu ao clicar no botão
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Atualiza acessibilidade
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
        menuBtn.setAttribute('aria-expanded', !isExpanded);
    });

    // Fecha o menu ao clicar em qualquer link (Útil em Single Page)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            menuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    /* ==============================================================
       3. ANIMAÇÕES DE SCROLL SUAVE (Intersection Observer)
       ============================================================== */
    // Seleciona todos os elementos com as classes de animação
    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .fade-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Dispara quando 15% do elemento estiver visível
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'visible' que aciona a transição do CSS
                entry.target.classList.add('visible');
                // Para de observar o elemento após a animação rodar uma vez (melhora performance)
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Inicializa a observação
    animatedElements.forEach(el => {
        scrollObserver.observe(el);
    });
});