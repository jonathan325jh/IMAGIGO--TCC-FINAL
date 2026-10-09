document.addEventListener('DOMContentLoaded', () => {

    // 1. Função genérica para controlar os carrosséis
    function configurarCarrossel(trackId, prevBtnId, nextBtnId) {
        const track = document.getElementById(trackId);
        const prevBtn = document.getElementById(prevBtnId);
        const nextBtn = document.getElementById(nextBtnId);

        if (!track || !prevBtn || !nextBtn) return;

        const scrollAmount = 300; // Distância em pixels para cada clique

        nextBtn.addEventListener('click', () => {
            track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });
    }

    // Inicializa carrosséis
    configurarCarrossel('carouselTrackReceitas', 'prevBtnReceitas', 'nextBtnReceitas');
    configurarCarrossel('carouselTrackConsertos', 'prevBtnConsertos', 'nextBtnConsertos');
    configurarCarrossel('carouselTrackFinancas', 'prevBtnFinancas', 'nextBtnFinancas');

    // 2. Sistema de Pesquisa em Tempo Real
    const searchInput = document.getElementById('searchInput');
    const searchResultsSection = document.getElementById('searchResultsSection');
    const searchResultsGrid = document.getElementById('searchResultsGrid');
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');
    const todosOsCards = document.querySelectorAll('.product-card-link');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const termo = e.target.value.toLowerCase().trim();

            if (termo === '') {
                // Esconde resultados e exibe as listas normais
                searchResultsSection.style.display = 'none';
                conteudoPrincipal.style.display = 'block';
                searchResultsGrid.innerHTML = '';
            } else {
                // Exibe contêiner de pesquisa
                searchResultsSection.style.display = 'block';
                conteudoPrincipal.style.display = 'none';
                searchResultsGrid.innerHTML = '';

                let encontrouResultados = false;

                todosOsCards.forEach(cardLink => {
                    const textoCard = cardLink.textContent.toLowerCase();
                    if (textoCard.includes(termo)) {
                        const clone = cardLink.cloneNode(true);
                        searchResultsGrid.appendChild(clone);
                        encontrouResultados = true;
                    }
                });

                if (!encontrouResultados) {
                    searchResultsGrid.innerHTML = '<p style="color: #666;">Nenhum tutorial encontrado.</p>';
                }
            }
        });
    }
});

