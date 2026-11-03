// ============================================================
// musica.js — Versão otimizada para .mp3
// + Disco de vinil ARRASTÁVEL (mouse + touch)
// + Volume sincronizado com config-sistemas.html
// ============================================================

if (window.__musicaJaCarregada) {
    console.log("🎵 musica.js já carregado, ignorando");
} else {
    window.__musicaJaCarregada = true;

    (function () {
        // ===== CONFIGURAÇÃO =====
        const CAMINHO_MUSICA = "IMAGIGO THEME.mp3";
        const CHAVE_TEMPO = "musica_tempo_atual";
        const CHAVE_LIBERADO = "musica_liberada";
        const CHAVE_VOLUME = "musica_volume";
        const CHAVE_VINIL_POS = "vinil_posicao";

        // Lê o volume salvo (config-sistemas.html grava em 0..1)
        const VOLUME_SALVO = parseFloat(localStorage.getItem(CHAVE_VOLUME));
        const VOLUME_INICIAL = isNaN(VOLUME_SALVO)
            ? 0.3
            : Math.max(0, Math.min(1, VOLUME_SALVO));

        // ===== 1. REMOVE ÁUDIOS DUPLICADOS =====
        const audiosAntigos = document.querySelectorAll('audio#musica-fundo');
        audiosAntigos.forEach((a, index) => {
            if (index > 0) a.remove();
        });

        // ===== 2. CRIA O ÁUDIO COM PRELOAD AGRESSIVO =====
        let audio = document.getElementById('musica-fundo');

        if (!audio) {
            audio = document.createElement('audio');
            audio.id = 'musica-fundo';
            audio.src = CAMINHO_MUSICA;
            audio.loop = true;
            audio.volume = VOLUME_INICIAL;
            audio.preload = 'auto';
            audio.style.display = 'none';
            audio.load();
            document.body.appendChild(audio);
        } else {
            // Garante que o volume salvo seja aplicado mesmo se o áudio já existia
            audio.volume = VOLUME_INICIAL;
        }

        // ===== 3. RECUPERA O TEMPO SALVO =====
        let tempoSalvo = parseFloat(localStorage.getItem(CHAVE_TEMPO) || '0');
        if (isNaN(tempoSalvo) || tempoSalvo < 0) tempoSalvo = 0;

        // ===== 4. APLICA O TEMPO E TOCA =====
        function iniciarMusicaComTempo() {
            if (!audio.duration || isNaN(audio.duration)) {
                setTimeout(iniciarMusicaComTempo, 20);
                return;
            }

            audio.pause();

            if (tempoSalvo > 0 && tempoSalvo < audio.duration) {
                try {
                    audio.currentTime = tempoSalvo;
                } catch (e) {
                    audio.currentTime = 0;
                }
            } else {
                audio.currentTime = 0;
            }

            audio.addEventListener('seeked', function onSeeked() {
                audio.removeEventListener('seeked', onSeeked);
                tentarTocar();
            }, { once: true });

            setTimeout(() => {
                if (audio.paused) tentarTocar();
            }, 50);
        }

        // ===== 5. TENTA TOCAR =====
        function tentarTocar() {
            const jaLiberado = localStorage.getItem(CHAVE_LIBERADO) === 'true';

            if (jaLiberado) {
                audio.play().catch(() => criarVinilCSS());
            } else {
                audio.play().then(() => {
                    localStorage.setItem(CHAVE_LIBERADO, 'true');
                }).catch(() => criarVinilCSS());
            }
        }

        // ===== 6. SALVA O TEMPO (a cada 1s) =====
        let ultimoSalvamento = 0;
        function salvarTempo() {
            const agora = Date.now();
            if (agora - ultimoSalvamento < 1000) return;
            ultimoSalvamento = agora;

            if (audio && !isNaN(audio.currentTime) && audio.currentTime > 0) {
                if (!audio.duration || audio.currentTime < audio.duration) {
                    localStorage.setItem(CHAVE_TEMPO, audio.currentTime.toString());
                }
            }
        }

        audio.addEventListener('timeupdate', salvarTempo);

        window.addEventListener('beforeunload', () => {
            if (audio && !isNaN(audio.currentTime)) {
                localStorage.setItem(CHAVE_TEMPO, audio.currentTime.toString());
            }
        });

        window.addEventListener('pagehide', () => {
            if (audio && !isNaN(audio.currentTime)) {
                localStorage.setItem(CHAVE_TEMPO, audio.currentTime.toString());
            }
        });

        // ===== 7. INTERCEPTA CLIQUES (salva tempo antes de navegar) =====
        document.addEventListener('click', function (e) {
            const alvo = e.target.closest('a, button');
            if (alvo && audio && !isNaN(audio.currentTime)) {
                localStorage.setItem(CHAVE_TEMPO, audio.currentTime.toString());
            }
        }, true);

        // ===== 8. ATUALIZA O VOLUME EM TEMPO REAL =====
        // Se outra página (config-sistemas.html) mudar o volume, reflete aqui
        function sincronizarVolume() {
            const v = parseFloat(localStorage.getItem(CHAVE_VOLUME));
            if (!isNaN(v)) {
                audio.volume = Math.max(0, Math.min(1, v));
            }
        }
        window.addEventListener('storage', (e) => {
            if (e.key === CHAVE_VOLUME) sincronizarVolume();
        });
        setInterval(sincronizarVolume, 1500);

        // ===== 9. CRIA O VINIL ARRASTÁVEL =====
        function criarVinilCSS() {
            if (document.getElementById('vinil-css')) return;

            // ===== CSS DO VINIL =====
            const style = document.createElement('style');
            style.textContent = `
                @keyframes girarVinilCSS {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes flutuarVinil {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                #vinil-css {
                    position: fixed;
                    top: 20px;
                    left: 20px;
                    z-index: 999999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    cursor: grab;
                    animation: flutuarVinil 2s ease-in-out infinite;
                    transition: opacity 0.3s ease;
                    user-select: none;
                    -webkit-user-select: none;
                    touch-action: none;
                    will-change: left, top;
                }
                #vinil-css.arrastando {
                    cursor: grabbing;
                    animation: none;
                    transition: none;
                }
                #vinil-css img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    object-fit: cover;
                    animation: girarVinilCSS 3s linear infinite;
                    pointer-events: none;
                    -webkit-user-drag: none;
                    user-select: none;
                }
                #vinil-css .texto {
                    color: #fff;
                    font-size: 10px;
                    font-weight: bold;
                    text-align: center;
                    margin-top: 6px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.8);
                    background: rgba(15, 23, 42, 0.85);
                    padding: 3px 8px;
                    border-radius: 15px;
                    border: 1px solid #38bdf8;
                    white-space: nowrap;
                    pointer-events: none;
                }
                #vinil-css .fechar {
                    position: absolute;
                    top: -5px;
                    right: -5px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    background: #ef4444;
                    color: #fff;
                    font-size: 14px;
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    border: 2px solid #fff;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                    z-index: 2;
                }
                #vinil-css .fechar:hover {
                    background: #dc2626;
                }
            `;
            document.head.appendChild(style);

            // ===== ELEMENTO VINIL =====
            const vinil = document.createElement('div');
            vinil.id = 'vinil-css';
            vinil.innerHTML = `
                <img src="disco de vinil.gif" alt="Ativar som">
                <div class="texto">← Ativar som</div>
                <div class="fechar" title="Esconder">×</div>
            `;
            document.body.appendChild(vinil);

            // ===== RESTAURA POSIÇÃO SALVA =====
            try {
                const posSalva = JSON.parse(localStorage.getItem(CHAVE_VINIL_POS) || 'null');
                if (posSalva && typeof posSalva.left === 'number' && typeof posSalva.top === 'number') {
                    aplicarPosicao(posSalva.left, posSalva.top);
                }
            } catch (e) { /* ignora */ }

            // ===== FUNÇÃO: aplica posição respeitando os limites da tela =====
            function aplicarPosicao(left, top) {
                const largura = vinil.offsetWidth || 80;
                const altura = vinil.offsetHeight || 100;
                const maxLeft = Math.max(0, window.innerWidth - largura);
                const maxTop = Math.max(0, window.innerHeight - altura);

                const l = Math.max(0, Math.min(left, maxLeft));
                const t = Math.max(0, Math.min(top, maxTop));

                vinil.style.left = l + 'px';
                vinil.style.top = t + 'px';
                vinil.style.right = 'auto';
                vinil.style.bottom = 'auto';
            }

            // ===== DRAG: MOUSE + TOUCH =====
            let arrastando = false;
            let moveu = false;
            let offsetX = 0;
            let offsetY = 0;
            let startX = 0;
            let startY = 0;

            function getPonto(e) {
                if (e.touches && e.touches.length > 0) {
                    return { x: e.touches[0].clientX, y: e.touches[0].clientY };
                }
                if (e.changedTouches && e.changedTouches.length > 0) {
                    return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
                }
                return { x: e.clientX, y: e.clientY };
            }

            function iniciarDrag(e) {
                // Ignora se o clique foi no botão fechar
                if (e.target.closest('.fechar')) return;

                const p = getPonto(e);
                const rect = vinil.getBoundingClientRect();

                arrastando = true;
                moveu = false;
                offsetX = p.x - rect.left;
                offsetY = p.y - rect.top;
                startX = p.x;
                startY = p.y;

                vinil.classList.add('arrastando');

                if (e.cancelable) e.preventDefault();
            }

            function moverDrag(e) {
                if (!arrastando) return;

                const p = getPonto(e);
                const dx = Math.abs(p.x - startX);
                const dy = Math.abs(p.y - startY);
                if (dx > 4 || dy > 4) moveu = true;

                aplicarPosicao(p.x - offsetX, p.y - offsetY);

                if (e.cancelable) e.preventDefault();
            }

            function finalizarDrag(e) {
                if (!arrastando) return;
                arrastando = false;
                vinil.classList.remove('arrastando');

                // Salva a posição final
                const rect = vinil.getBoundingClientRect();
                localStorage.setItem(CHAVE_VINIL_POS, JSON.stringify({
                    left: Math.round(rect.left),
                    top: Math.round(rect.top)
                }));

                // Se foi só um clique (não arrastou), tenta tocar
                if (!moveu) {
                    audio.play().then(() => {
                        localStorage.setItem(CHAVE_LIBERADO, 'true');
                        vinil.style.opacity = '0';
                        setTimeout(() => vinil.remove(), 300);
                    }).catch((err) => {
                        console.error("🎵 Erro ao tocar:", err);
                    });
                }
            }

            // ===== EVENTOS MOUSE =====
            vinil.addEventListener('mousedown', iniciarDrag);
            document.addEventListener('mousemove', moverDrag);
            document.addEventListener('mouseup', finalizarDrag);

            // ===== EVENTOS TOUCH =====
            vinil.addEventListener('touchstart', iniciarDrag, { passive: false });
            document.addEventListener('touchmove', moverDrag, { passive: false });
            document.addEventListener('touchend', finalizarDrag);
            document.addEventListener('touchcancel', finalizarDrag);

            // ===== BOTÃO FECHAR =====
            vinil.querySelector('.fechar').addEventListener('click', (e) => {
                e.stopPropagation();
                vinil.remove();
            });

            // ===== AJUSTA POSIÇÃO SE A JANELA MUDAR DE TAMANHO =====
            window.addEventListener('resize', () => {
                const rect = vinil.getBoundingClientRect();
                aplicarPosicao(rect.left, rect.top);
            });
        }

        // ===== 10. INICIALIZAÇÃO =====
        if (audio.readyState >= 1) {
            iniciarMusicaComTempo();
        } else {
            audio.addEventListener('loadedmetadata', iniciarMusicaComTempo, { once: true });
            setTimeout(() => {
                if (audio.readyState >= 1) iniciarMusicaComTempo();
            }, 1000);
        }
    })();
}