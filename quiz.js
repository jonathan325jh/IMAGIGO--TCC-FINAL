const SUPABASE_URL = "https://yxsfpmqwhpvajzyrapyi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4c2ZwbXF3aHB2YWp6eXJhcHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTU0MDAsImV4cCI6MjEwMzQ3MTQwMH0.qNgFa9lbwdqEjVFM2Su4yHchR_vtl7w9QOOrPYe1wsA";

let sb = null;
if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const emailUsuario =
    sessionStorage.getItem('usuario_email') ||
    localStorage.getItem('usuario_email') ||
    "";

const $ = id => document.getElementById(id);

const XP_POR_ACERTO = 5;
const DINHEIRO_POR_ACERTO = 100;
const BONUS_STREAK = 50;
const STREAK_NECESSARIA = 5;

const CHAVE_CASA = 'estadoCasaSalvo_v4';

const perguntas = [
    {q:'O que é a "regra 50/30/20"?', a:['Uma regra de trânsito','Uma forma de dividir o salário: 50% necessidades, 30% desejos, 20% poupança','Um tipo de investimento','Uma lei trabalhista'], c:1},
    {q:'O que é reserva de emergência?', a:['Dinheiro guardado para imprevistos','Um empréstimo do banco','Dinheiro para gastar no fim de semana','Um tipo de ação'], c:0},
    {q:'O que significa CDI?', a:['Um imposto','Certificado de Depósito Interbancário, usado como referência de rendimento','Um tipo de cartão','Uma conta bancária'], c:1},
    {q:'Qual desses NÃO é um gasto essencial?', a:['Aluguel','Água e luz','Streaming de filmes','Supermercado'], c:2},
    {q:'O que é o crédito rotativo do cartão?', a:['Uma taxa de juros baixa','Um tipo de poupança','Uma linha de crédito com juros altíssimos quando você paga o mínimo da fatura','Um desconto do banco'], c:2},
    {q:'O que é juros compostos?', a:['Juros só sobre o valor inicial','Juros sobre juros, acumulados ao longo do tempo','Um imposto','Uma taxa fixa'], c:1},
    {q:'Qual o melhor lugar para a reserva de emergência?', a:['Ações','Tesouro Selic ou CDB de liquidez diária','Bitcoin','Dólar em casa'], c:1},
    {q:'O que é "pague-se primeiro"?', a:['Pagar todas as contas antes de guardar','Guardar/investir uma parte do salário antes de gastar','Pagar o banco primeiro','Comprar primeiro, pagar depois'], c:1},
    {q:'O que significa IPTU?', a:['Imposto sobre produtos','Imposto Predial e Territorial Urbano','Taxa de internet','Imposto de renda'], c:1},
    {q:'O que é inflação?', a:['Aumento geral dos preços ao longo do tempo','Queda dos preços','Um imposto','Um tipo de investimento'], c:0},
    {q:'Qual desses é um "desejo" e não uma "necessidade"?', a:['Aluguel','Comida','Netflix','Transporte'], c:2},
    {q:'O que é FGTS?', a:['Um imposto','Fundo de Garantia do Tempo de Serviço, depositado pelo empregador','Um tipo de ação','Um banco'], c:1},
    {q:'Se você gasta mais do que ganha, o resultado é:', a:['Lucro','Empate','Dívida','Investimento'], c:2},
    {q:'O que é uma ação?', a:['Um empréstimo','A menor parte de uma empresa','Um imposto','Uma poupança'], c:1},
    {q:'Qual desses NÃO é um bom hábito financeiro?', a:['Anotar os gastos','Pagar o mínimo do cartão','Fazer uma reserva','Pesquisar preços'], c:1},
    {q:'O que é cheque especial?', a:['Um cheque comum','Uma linha de crédito do banco com juros muito altos','Um tipo de poupança','Um seguro'], c:1},
    {q:'Qual a diferença entre poupança e Tesouro Selic?', a:['São a mesma coisa','A poupança rende menos e só rende no aniversário; o Tesouro rende mais e tem liquidez diária','O Tesouro rende menos','Nenhuma das opções'], c:1},
    {q:'O que é score de crédito?', a:['Uma pontuação que indica sua saúde financeira para o banco','Um tipo de cartão','Uma taxa','Um investimento'], c:0},
    {q:'O que fazer antes de comprar algo por impulso?', a:['Comprar imediatamente','Esperar 24h e ver se ainda quer','Parcelar em 12x','Emprestar dinheiro'], c:1},
    {q:'O que é IPVA?', a:['Imposto sobre Veículos Automotores','Imposto sobre produtos','Um seguro','Uma taxa de banco'], c:0},
    {q:'O que é "bola de neve" nas dívidas?', a:['Uma brincadeira','Quando os juros vão aumentando a dívida cada vez mais','Um tipo de investimento','Um plano de pagamento'], c:1},
    {q:'O que é Tesouro Direto?', a:['Um programa do governo para emprestar dinheiro a você','Um programa onde você empresta dinheiro ao governo e recebe juros','Um banco','Um imposto'], c:1},
    {q:'Qual desses NÃO é um investimento de renda fixa?', a:['CDB','Tesouro Selic','Ações','LCI'], c:2},
    {q:'O que é liquidez?', a:['Facilidade de transformar um investimento em dinheiro','Um tipo de taxa','Um imposto','Um banco'], c:0},
    {q:'O que fazer se seu salário aumentar?', a:['Gastar tudo','Manter o padrão de vida e investir o extra','Comprar um carro','Emprestar para amigos'], c:1},
    {q:'O que é um orçamento?', a:['Uma lista de desejos','Um plano de quanto ganhar, gastar e guardar','Um tipo de dívida','Um seguro'], c:1},
    {q:'O que é CDB?', a:['Certificado de Depósito Bancário, um investimento de renda fixa','Um tipo de ação','Um imposto','Uma conta corrente'], c:0},
    {q:'O que significa "viver abaixo das suas posses"?', a:['Gastar menos do que ganha','Gastar mais do que ganha','Gastar tudo','Não gastar nada'], c:0},
    {q:'Qual o maior inimigo do orçamento?', a:['Poupar','Compras por impulso','Investir','Planejar'], c:1},
    {q:'O que é um cartão de crédito?', a:['Dinheiro próprio','Uma linha de crédito emprestada pelo banco que você paga depois','Um tipo de poupança','Um investimento'], c:1}
];

const TOTAL_PERGUNTAS = 5;

let atual = 0;
let dinheiroGanho = 0;
let xpGanho = 0;
let acertos = 0;
let erros = 0;
let streak = 0;
let perguntasSorteio = [];
let bloqueado = false;

let notificacaoTimer = null;
function notificar(texto, tipo = 'sucesso', caminhoImagem = null, duracao = 2500){
    const n = $('notificacao');
    const elIco = $('notificacaoIcone');
    const elTxt = $('notificacaoTexto');
    if(!n) return;

    const imagens = {
        sucesso: 'banner-xp.png',
        erro: 'banner-excluir.png',
        aviso: 'banner-dinheiro.png',
        info: 'banner-xp.png',
        dinheiro: 'banner-dinheiro.png',
        xp: 'banner-xp.png',
        level: 'banner-level.png'
    };

    const imgFinal = caminhoImagem || imagens[tipo] || imagens.sucesso;

    elIco.innerHTML = `<img src="${imgFinal}" alt="Ícone" style="width:100%;height:100%;object-fit:contain;">`;
    elTxt.textContent = texto;
    n.className = 'notificacao ' + tipo;

    clearTimeout(notificacaoTimer);
    requestAnimationFrame(() => n.classList.add('ativo'));
    notificacaoTimer = setTimeout(() => n.classList.remove('ativo'), duracao);
}

function verificarBotaoResgatar(){
    const btn = $('btnResgatar');
    if(!btn) return;

    let xpAtual = 0;
    try {
        const estado = JSON.parse(localStorage.getItem(CHAVE_CASA) || '{}');
        xpAtual = Number(estado.xp) || 0;
    } catch(e){}

    btn.style.display = (xpAtual >= 100) ? 'block' : 'none';
}

function resgatarXp(){
    try {
        const estado = JSON.parse(localStorage.getItem(CHAVE_CASA) || '{}');
        const xpAtual = Number(estado.xp) || 0;
        if(xpAtual < 100) return;

        estado.xp = xpAtual - 100;
        localStorage.setItem(CHAVE_CASA, JSON.stringify(estado));
        localStorage.setItem('usuario_xp_atualizado', Date.now());

        somarXpNoSupabase(-100);

        atualizarStatusUI();
        verificarBotaoResgatar();
        notificar('XP resgatado!', 'level', 'banner-level.png', 2500);
    } catch(err){ console.error(err); }
}

async function somarXpNoSupabase(xpDelta){
    if(!sb) { console.warn('Supabase não inicializado'); return; }
    if(!emailUsuario) { console.warn('emailUsuario vazio'); return; }

    try {
        const { data, error } = await sb
            .from('usuarios')
            .select('xp, level')
            .eq('email', emailUsuario)
            .maybeSingle();

        if(error){
            console.error('Erro ao buscar XP:', error);
            return;
        }
        if(!data){
            console.warn('Usuário não encontrado:', emailUsuario);
            return;
        }

        const xpAtual = Number(data.xp) || 0;
        const novoXp = Math.max(0, xpAtual + xpDelta);
        const novoLevel = Math.floor(novoXp / 100);

        const { error: errUp } = await sb
            .from('usuarios')
            .update({ xp: novoXp, level: novoLevel })
            .eq('email', emailUsuario);

        if(errUp){
            console.error('Erro ao atualizar XP:', errUp);
            return;
        }

        console.log(`XP atualizado: ${xpAtual} → ${novoXp} (level ${novoLevel})`);
        localStorage.setItem('usuario_xp_atualizado', Date.now());

    } catch(err){
        console.error('Erro ao somar XP:', err);
    }
}

function salvarDinheiroNoJogo(){
    try {
        const estado = JSON.parse(localStorage.getItem(CHAVE_CASA) || '{}');
        estado.dinheiro = (Number(estado.dinheiro) || 0) + dinheiroGanho;
        localStorage.setItem(CHAVE_CASA, JSON.stringify(estado));
    } catch(err){ console.error('Erro ao salvar dinheiro:', err); }
}

function atualizarStatusUI(){
    try {
        const estado = JSON.parse(localStorage.getItem(CHAVE_CASA) || '{}');
        const xpTotal = Number(estado.xp) || 0;
        const dinheiroTotal = Number(estado.dinheiro) || 0;
        if($('valXp')) $('valXp').textContent = xpTotal;
        if($('valDinheiro')) $('valDinheiro').textContent = dinheiroTotal;
    } catch(e){}
}

function embaralhar(arr){
    const a = arr.slice();
    for(let i = a.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function iniciarQuiz(){
    atual = 0;
    dinheiroGanho = 0;
    xpGanho = 0;
    acertos = 0;
    erros = 0;
    streak = 0;
    bloqueado = false;
    perguntasSorteio = embaralhar(perguntas).slice(0, TOTAL_PERGUNTAS);

    $('telaInicio').style.display = 'none';
    $('telaJogo').style.display = 'block';
    $('telaFim').style.display = 'none';
    $('totalPerguntas').textContent = TOTAL_PERGUNTAS;

    mostrarPergunta();
}

function mostrarPergunta(){
    if(atual >= perguntasSorteio.length){
        finalizarQuiz();
        return;
    }
    const p = perguntasSorteio[atual];
    bloqueado = false;
    $('numPergunta').textContent = atual + 1;
    $('textoPergunta').textContent = p.q;
    const progresso = ((atual) / TOTAL_PERGUNTAS) * 100;
    $('barraProgresso').style.width = progresso + '%';
    const boxStreak = $('streakBox');
    if(streak >= 2){
        boxStreak.style.display = 'inline-block';
        $('streakNum').textContent = streak;
    } else {
        boxStreak.style.display = 'none';
    }
    const letras = ['A','B','C','D'];
    $('alternativas').innerHTML = p.a.map((alt, i) =>
        `<button class="alternativa" onclick="responder(${i})">
            <span class="letra">${letras[i]}</span>
            <span>${alt}</span>
         </button>`
    ).join('');
}

function responder(indice){
    if(bloqueado) return;
    bloqueado = true;
    const p = perguntasSorteio[atual];
    const botoes = document.querySelectorAll('.alternativa');
    botoes.forEach((btn, i) => {
        btn.classList.add('desabilitada');
        if(i === p.c) btn.classList.add('certa');
        if(i === indice && indice !== p.c) btn.classList.add('errada');
    });
    if(indice === p.c){
        acertos++;
        streak++;
        dinheiroGanho += DINHEIRO_POR_ACERTO;
        xpGanho += XP_POR_ACERTO;
        notificar(`Acertou! +$${DINHEIRO_POR_ACERTO}  •  +${XP_POR_ACERTO} XP`, 'sucesso', 'banner-xp.png', 1500);
        if(streak > 0 && streak % STREAK_NECESSARIA === 0){
            dinheiroGanho += BONUS_STREAK;
            setTimeout(() => notificar(`🔥 ${STREAK_NECESSARIA} seguidas! +$${BONUS_STREAK} de bônus!`, 'aviso', 'banner-dinheiro.png', 2500), 500);
        }
    } else {
        erros++;
        streak = 0;
        notificar('Errou! A resposta certa está em verde.', 'erro', 'banner-excluir.png', 2000);
    }
    atual++;

    atualizarStatusUI();

    setTimeout(mostrarPergunta, 1600);
}

async function finalizarQuiz(){
    $('telaJogo').style.display = 'none';
    $('telaFim').style.display = 'block';
    $('fimAcertos').textContent = acertos;
    $('fimErros').textContent = erros;
    $('fimDinheiro').textContent = '$' + dinheiroGanho;
    $('fimXp').textContent = '+' + xpGanho + ' XP';
    $('barraProgresso').style.width = '100%';

    salvarDinheiroNoJogo();
    await somarXpNoSupabase(xpGanho);

    atualizarStatusUI();
    verificarBotaoResgatar();
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('Quiz carregado. emailUsuario:', emailUsuario);
    atualizarStatusUI();
    verificarBotaoResgatar();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'usuario_xp_atualizado' || e.key === CHAVE_CASA) {
        atualizarStatusUI();
        verificarBotaoResgatar();
    }
});