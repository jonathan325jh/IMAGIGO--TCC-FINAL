    (function () {
        const btnOpcoes = document.getElementById('btnOpcoes');
        const menuOpcoes = document.getElementById('menuOpcoes');
        const menuSair = document.getElementById('menuSair');

        if (!btnOpcoes || !menuOpcoes) return;

        function abrirMenu() {
            menuOpcoes.classList.add('aberto');
            menuOpcoes.setAttribute('aria-hidden', 'false');
            btnOpcoes.setAttribute('aria-expanded', 'true');
            btnOpcoes.classList.add('ativo');
        }

        function fecharMenu() {
            menuOpcoes.classList.remove('aberto');
            menuOpcoes.setAttribute('aria-hidden', 'true');
            btnOpcoes.setAttribute('aria-expanded', 'false');
            btnOpcoes.classList.remove('ativo');
        }

        btnOpcoes.addEventListener('click', (e) => {
            e.stopPropagation();
            if (menuOpcoes.classList.contains('aberto')) {
                fecharMenu();
            } else {
                abrirMenu();
            }
        });

        // Fecha ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (!menuOpcoes.contains(e.target) && e.target !== btnOpcoes) {
                fecharMenu();
            }
        });

        // Fecha com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') fecharMenu();
        });

        // Item "Sair" — limpa sessão e vai para o login
        if (menuSair) {
            menuSair.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.clear();
                localStorage.removeItem('usuario_email');
                localStorage.removeItem('usuario_nome');
                localStorage.removeItem('tipo_usuario');
                window.location.href = 'login.html';
            });
        }
    })();