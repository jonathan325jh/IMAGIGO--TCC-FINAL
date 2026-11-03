/* ============================================================
   jogos.js — VERSÃO FINAL CORRIGIDA (sem travamento do painel)
   ============================================================ */
const SUPABASE_URL = "https://yxsfpmqwhpvajzyrapyi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4c2ZwbXF3aHB2YWp6eXJhcHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTU0MDAsImV4cCI6MjEwMzQ3MTQwMH0.qNgFa9lbwdqEjVFM2Su4yHchR_vtl7w9QOOrPYe1wsA";

let sb = null;
function initSupabase(){
    if (sb) return sb;
    if (window.supabase && typeof window.supabase.createClient === 'function'){
        try { sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY); } 
        catch (err) { console.error('❌ Erro Supabase:', err); }
    } else { setTimeout(initSupabase, 500); }
    return sb;
}
initSupabase();

const emailUsuario = sessionStorage.getItem('usuario_email') || localStorage.getItem('usuario_email') || "";
const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);
const C = ['sala','quarto','cozinha','banheiro'];
const N = {sala:'Sala', quarto:'Quarto', cozinha:'Cozinha', banheiro:'Banheiro'};

/* ===== Catálogo ===== */
const papeis = Array.from({length:22},(_,i)=>({ id:`parede_${i+1}`, nome:`Papel de Parede ${i+1}`, imagem:`jogos-moveis-imgs/parede-${i+1}.png`, preco:50, xp:10, tipo:'parede' }));
const pisos = Array.from({length:9},(_,i)=>({ id:`chao_${i+1}`, nome:`Piso ${i+1}`, imagem:`jogos-moveis-imgs/chao-${i+1}.png`, preco:45, xp:9, tipo:'chao' }));
const portas = Array.from({length:14},(_,i)=>({ id:`porta_${i+1}`, nome:`Porta ${i+1}`, imagem:`jogos-moveis-imgs/porta-${i+1}.png`, preco:40 + Math.floor(i/3) * 10, xp: Math.round((40 + Math.floor(i/3) * 10) / 5), tipo:'porta' }));

const assentos = [
    {nome:'Cadeira 1', img:'cadeira-1', preco:35, comodo:'sala', w:50, h:60, cat:'assentos'}, {nome:'Cadeira 2', img:'cadeira-2', preco:50, comodo:'sala', w:60, h:70, cat:'assentos'},
    {nome:'Cadeira 3', img:'cadeira-3', preco:40, comodo:'sala', w:50, h:60, cat:'assentos'}, {nome:'Cadeira 4', img:'cadeira-4', preco:45, comodo:'sala', w:60, h:60, cat:'assentos'},
    {nome:'Cadeira 5', img:'cadeira-5', preco:55, comodo:'sala', w:55, h:65, cat:'assentos'}, {nome:'Cadeira 6', img:'cadeira-6', preco:65, comodo:'sala', w:55, h:65, cat:'assentos'},
    {nome:'Cadeira 7', img:'cadeira-7', preco:60, comodo:'sala', w:55, h:65, cat:'assentos'}, {nome:'Sofá 1', img:'sofa-1', preco:90, comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Sofá 2', img:'sofa-2', preco:95, comodo:'sala', w:100, h:60, cat:'assentos'}, {nome:'Sofá 3', img:'sofa-3', preco:100, comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Sofá 4', img:'sofa-4', preco:80, comodo:'sala', w:90, h:50, cat:'assentos'}, {nome:'Sofá 5', img:'sofa-5', preco:120, comodo:'sala', w:120, h:70, cat:'assentos'},
    {nome:'Sofá 6', img:'sofa-6', preco:70, comodo:'sala', w:70, h:70, cat:'assentos'}, {nome:'Sofá 7', img:'sofa-7', preco:90, comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Vaso Sanitário 1', img:'vaso-sanitario-1', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'}, {nome:'Vaso Sanitário 2', img:'vaso-sanitario-2', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'},
    {nome:'Vaso Sanitário 3', img:'vaso-sanitario-3', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'}, {nome:'Vaso Sanitário 4', img:'vaso-sanitario-4', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'},
    {nome:'Vaso Sanitário 5', img:'vaso-sanitario-5', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'}
];
const camas = [
    {nome:'Cama 1', img:'cama-1', preco:85, comodo:'quarto', w:110, h:70, cat:'camas'}, {nome:'Cama 2', img:'cama-2', preco:150,comodo:'quarto', w:140, h:85, cat:'camas'},
    {nome:'Cama 3', img:'cama-3', preco:85, comodo:'quarto', w:110, h:70, cat:'camas'}, {nome:'Cama 4', img:'cama-4', preco:150,comodo:'quarto', w:140, h:85, cat:'camas'},
    {nome:'Cama 5', img:'cama-5', preco:120,comodo:'quarto', w:120, h:80, cat:'camas'}, {nome:'Cama 6', img:'cama-6', preco:120,comodo:'quarto', w:120, h:80, cat:'camas'},
    {nome:'Cama 7', img:'cama-7', preco:130,comodo:'quarto', w:120, h:80, cat:'camas'}
];
const mesas = [
    {nome:'Mesa 1', img:'mesa-1', preco:50, comodo:'sala', w:75, h:45, cat:'mesas'}, {nome:'Mesa 2', img:'mesa-2', preco:110,comodo:'sala', w:110, h:70, cat:'mesas'},
    {nome:'Mesa 3', img:'mesa-3', preco:70, comodo:'sala', w:80, h:50, cat:'mesas'}, {nome:'Mesa 4', img:'mesa-4', preco:80, comodo:'sala', w:90, h:55, cat:'mesas'},
    {nome:'Mesa 5', img:'mesa-5', preco:90, comodo:'sala', w:100, h:60, cat:'mesas'}, {nome:'Mesa 6', img:'mesa-6', preco:95, comodo:'sala', w:100, h:60, cat:'mesas'},
    {nome:'Mesa 7', img:'mesa-7', preco:100,comodo:'sala', w:100, h:60, cat:'mesas'}
];
const armarios = [
    {nome:'Armário 1', img:'armario-1', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'}, {nome:'Armário 2', img:'armario-2', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 3', img:'armario-3', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'}, {nome:'Armário 4', img:'armario-4', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 5', img:'armario-5', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'}, {nome:'Armário 6', img:'armario-6', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 7', img:'armario-7', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'}, {nome:'Armário 8', img:'armario-8', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 9', img:'armario-9', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'}, {nome:'Armário 10', img:'armario-10', preco:130, comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Pia Cozinha 1', img:'pia-cozinha-1', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'}, {nome:'Pia Cozinha 2', img:'pia-cozinha-2', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 3', img:'pia-cozinha-3', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'}, {nome:'Pia Cozinha 4', img:'pia-cozinha-4', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 5', img:'pia-cozinha-5', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'}, {nome:'Pia Cozinha 6', img:'pia-cozinha-6', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Banheiro 1', img:'pia-banheiro-1', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'}, {nome:'Pia Banheiro 2', img:'pia-banheiro-2', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'},
    {nome:'Pia Banheiro 3', img:'pia-banheiro-3', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'}, {nome:'Pia Banheiro 4', img:'pia-banheiro-4', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'}
];
const decoracao = [
    {nome:'Vaso Planta 1', img:'vaso-planta-1', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'}, {nome:'Vaso Planta 2', img:'vaso-planta-2', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 3', img:'vaso-planta-3', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'}, {nome:'Vaso Planta 4', img:'vaso-planta-4', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 5', img:'vaso-planta-5', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'}, {nome:'Vaso Planta 6', img:'vaso-planta-6', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 7', img:'vaso-planta-7', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'}, {nome:'Tapete 1', img:'tapete-1', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 2', img:'tapete-2', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'}, {nome:'Tapete 3', img:'tapete-3', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 4', img:'tapete-4', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'}, {nome:'Tapete 5', img:'tapete-5', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 6', img:'tapete-6', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'}, {nome:'Tapete 7', img:'tapete-7', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Espelho 1', img:'espelho-1', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'}, {nome:'Espelho 2', img:'espelho-2', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Espelho 3', img:'espelho-3', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'}, {nome:'Espelho 4', img:'espelho-4', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Espelho 5', img:'espelho-5', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'}, {nome:'Chuveiro 1', img:'chuveiro-1', preco:200, comodo:'banheiro', w:60, h:180, cat:'decoracao'},
    {nome:'Chuveiro 2', img:'chuveiro-2', preco:200, comodo:'banheiro', w:60, h:180, cat:'decoracao'}, {nome:'Chuveiro 3', img:'chuveiro-3', preco:200, comodo:'banheiro', w:60, h:180, cat:'decoracao'},
    {nome:'Chuveiro 4', img:'chuveiro-4', preco:200, comodo:'banheiro', w:60, h:180, cat:'decoracao'}, {nome:'Decoração 1', img:'decoracao-1', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 2', img:'decoracao-2', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 3', img:'decoracao-3', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 4', img:'decoracao-4', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 5', img:'decoracao-5', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 6', img:'decoracao-6', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 7', img:'decoracao-7', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 8', img:'decoracao-8', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 9', img:'decoracao-9', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 10', img:'decoracao-10', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 11', img:'decoracao-11', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 12', img:'decoracao-12', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 13', img:'decoracao-13', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 14', img:'decoracao-14', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 15', img:'decoracao-15', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 16', img:'decoracao-16', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 17', img:'decoracao-17', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 18', img:'decoracao-18', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 19', img:'decoracao-19', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 20', img:'decoracao-20', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 21', img:'decoracao-21', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 22', img:'decoracao-22', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração 23', img:'decoracao-23', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 24', img:'decoracao-24', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 1', img:'decoracao-cozinha-1', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 2', img:'decoracao-cozinha-2', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 3', img:'decoracao-cozinha-3', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 4', img:'decoracao-cozinha-4', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 5', img:'decoracao-cozinha-5', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 6', img:'decoracao-cozinha-6', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 7', img:'decoracao-cozinha-7', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 8', img:'decoracao-cozinha-8', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 9', img:'decoracao-cozinha-9', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 10', img:'decoracao-cozinha-10', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 11', img:'decoracao-cozinha-11', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 12', img:'decoracao-cozinha-12', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 13', img:'decoracao-cozinha-13', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 14', img:'decoracao-cozinha-14', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 15', img:'decoracao-cozinha-15', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 16', img:'decoracao-cozinha-16', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Decoração Cozinha 17', img:'decoracao-cozinha-17', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 18', img:'decoracao-cozinha-18', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'}, {nome:'Ar-Condicionado 1', img:'ar-condicionado-1', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'},
    {nome:'Ar-Condicionado 2', img:'ar-condicionado-2', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'}, {nome:'Ar-Condicionado 3', img:'ar-condicionado-3', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'},
    {nome:'Ar-Condicionado 4', img:'ar-condicionado-4', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'}, {nome:'Microondas', img:'microondas-1', preco:180, comodo:'cozinha', w:70, h:50, cat:'decoracao'},
    {nome:'Papel Higiênico 1', img:'papel-higienico-1', preco:15, comodo:'banheiro', w:30, h:40, cat:'decoracao'}, {nome:'Papel Higiênico 2', img:'papel-higienico-2', preco:15, comodo:'banheiro', w:30, h:40, cat:'decoracao'},
    {nome:'Sabonete', img:'sabonete', preco:10, comodo:'banheiro', w:25, h:25, cat:'decoracao'}, {nome:'Rádio 1', img:'radio-1', preco:70, comodo:'sala', w:60, h:50, cat:'decoracao'},
    {nome:'Rádio 2', img:'radio-2', preco:70, comodo:'sala', w:60, h:50, cat:'decoracao'}, {nome:'Rádio 3', img:'radio-3', preco:70, comodo:'sala', w:60, h:50, cat:'decoracao'},
    {nome:'Item 1', img:'item-1', preco:35, comodo:'sala', w:40, h:40, cat:'decoracao'}, {nome:'Janela 1', img:'janela-1', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 2', img:'janela-2', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 3', img:'janela-3', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 4', img:'janela-4', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 5', img:'janela-5', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 6', img:'janela-6', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 7', img:'janela-7', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 8', img:'janela-8', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 9', img:'janela-9', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 10', img:'janela-10', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 11', img:'janela-11', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 12', img:'janela-12', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 13', img:'janela-13', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 14', img:'janela-14', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 15', img:'janela-15', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 16', img:'janela-16', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 17', img:'janela-17', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 18', img:'janela-18', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}, {nome:'Janela 19', img:'janela-19', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}
];
const quadros = [
    {nome:'Quadro 1', img:'quadro-1', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'}, {nome:'Quadro 2', img:'quadro-2', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'},
    {nome:'Quadro 3', img:'quadro-3', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'}, {nome:'Quadro 4', img:'quadro-4', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'},
    {nome:'Quadro 5', img:'quadro-5', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'}
];
const iluminacao = [
    {nome:'Abajur 1', img:'abajur-1', preco:30, comodo:'quarto', w:35, h:45, cat:'iluminacao'}, {nome:'Abajur 2', img:'abajur-2', preco:45, comodo:'sala', w:40, h:85, cat:'iluminacao'},
    {nome:'Abajur 3', img:'abajur-3', preco:35, comodo:'quarto', w:35, h:45, cat:'iluminacao'}, {nome:'Abajur 4', img:'abajur-4', preco:40, comodo:'quarto', w:35, h:45, cat:'iluminacao'},
    {nome:'Abajur 5', img:'abajur-5', preco:50, comodo:'sala', w:40, h:85, cat:'iluminacao'}, {nome:'Abajur 6', img:'abajur-6', preco:35, comodo:'quarto', w:35, h:45, cat:'iluminacao'},
    {nome:'Abajur 7', img:'abajur-7', preco:40, comodo:'quarto', w:35, h:45, cat:'iluminacao'}
];
const televisoes = [
    {nome:'Televisão 1', img:'televisao-1', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'}, {nome:'Televisão 2', img:'televisao-2', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 3', img:'televisao-3', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'}, {nome:'Televisão 4', img:'televisao-4', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 5', img:'televisao-5', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'}, {nome:'Televisão 6', img:'televisao-6', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 7', img:'televisao-7', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'}
];

const moveis = [...assentos, ...camas, ...mesas, ...armarios, ...decoracao, ...quadros, ...iluminacao, ...televisoes].map((m, i) => ({
    id: `movel_${i+1}`, nome: m.nome, imagem: `jogos-moveis-imgs/${m.img}.png`, preco: m.preco, xp: Math.round(m.preco / 5), comodo: m.comodo, w: m.w, h: m.h, categoria: m.cat
}));

const cat = [...papeis, ...pisos, ...portas, ...moveis];
const ALTURA_CHAO = 120;

const novo = () => ({
    xp: 0, dinheiro: 0, comodoAtual: 'sala', corBoneco: '#ffcc66', corPorta: '#b45309', corChao: '#78350f', corLinhaChao: '#451a03',
    fundoCor: '#0e1726', fundoBrilho: 100, tamanhoBoneco: 1, tamanhoPorta: 1, bonecoInvertido: false, portaInvertida: false,
    portaRemovida: false, portaImagem: null, portaCorHue: 0, portaModoCor: 'tingir', portaCorHex: '#8B4513', portaSaturacao: 100, portaBrilho: 100,
    posicaoPorta: { x: 20, y: 300 }, posicaoBoneco: { x: 120, y: 300 }, inventario: [],
    moveisComprados: { sala: [], quarto: [], cozinha: [], banheiro: [] }, portasPosicionadas: { sala: [], quarto: [], cozinha: [], banheiro: [] },
    corParedeComodo: { sala:'#334155', quarto:'#1e1b4b', cozinha:'#064e3b', banheiro:'#164e63' },
    paredeSaturacao: { sala: 100, quarto: 100, cozinha: 100, banheiro: 100 }, paredeBrilho: { sala: 100, quarto: 100, cozinha: 100, banheiro: 100 },
    chaoSaturacao: 100, chaoBrilho: 100,
    papelParede: Object.fromEntries(C.map(c => [c, { imagem:null,x:0,y:0,w:0,h:0,invertido:false }])),
    pisoChao: Object.fromEntries(C.map(c => [c, { imagem:null,x:0,y:0,w:0,h:0,invertido:false }]))
});

const VERSAO_ESTADO = 'v4';
const chaveEstado = 'estadoCasaSalvo_' + VERSAO_ESTADO + '_' + (emailUsuario || 'anon');

function migrarSaveAntigo(){
    const chaveAntiga = 'estadoCasaSalvo_' + VERSAO_ESTADO;
    if (localStorage.getItem(chaveEstado)) return;
    const antigo = localStorage.getItem(chaveAntiga);
    if (!antigo) return;
    try { JSON.parse(antigo); localStorage.setItem(chaveEstado, antigo); } catch (err) {}
}
migrarSaveAntigo();

const estadoSalvo = JSON.parse(localStorage.getItem(chaveEstado)) || {};
const padrao = novo();
let E = { ...padrao, ...estadoSalvo };

E.papelParede = { ...padrao.papelParede, ...(estadoSalvo.papelParede || {}) };
E.pisoChao = { ...padrao.pisoChao, ...(estadoSalvo.pisoChao || {}) };
E.corParedeComodo = { ...padrao.corParedeComodo, ...(estadoSalvo.corParedeComodo || {}) };
E.moveisComprados = { ...padrao.moveisComprados, ...(estadoSalvo.moveisComprados || {}) };

C.forEach(c => {
    if(!Array.isArray(E.moveisComprados[c])) E.moveisComprados[c] = [];
    E.moveisComprados[c].forEach(m => {
        if(m.invertido === undefined) m.invertido = false; if(m.escala === undefined) m.escala = 1; if(m.zIndex === undefined) m.zIndex = 4;
        if(m.corHue === undefined) m.corHue = 0; if(m.saturacao === undefined) m.saturacao = 100; if(m.brilho === undefined) m.brilho = 100;
        if(m.modoCor === undefined) m.modoCor = 'tingir'; if(m.corHex === undefined) m.corHex = '#8B4513';
    });
});

E.portasPosicionadas = { ...padrao.portasPosicionadas, ...(estadoSalvo.portasPosicionadas || {}) };
C.forEach(c => {
    if(!Array.isArray(E.portasPosicionadas[c])) E.portasPosicionadas[c] = [];
    E.portasPosicionadas[c].forEach(p => {
        if(p.invertido === undefined) p.invertido = false; if(p.escala === undefined) p.escala = 1; if(p.zIndex === undefined) p.zIndex = 5;
        if(p.corHue === undefined) p.corHue = 0; if(p.saturacao === undefined) p.saturacao = 100; if(p.brilho === undefined) p.brilho = 100;
        if(p.modoCor === undefined) p.modoCor = 'tingir'; if(p.corHex === undefined) p.corHex = '#8B4513';
    });
});

E.inventario = Array.isArray(estadoSalvo.inventario) ? estadoSalvo.inventario : [];
if (!E.posicaoPorta || typeof E.posicaoPorta.x !== 'number') E.posicaoPorta = { x: 20, y: 300 };
if (!E.posicaoBoneco || typeof E.posicaoBoneco.x !== 'number') E.posicaoBoneco = { x: 120, y: 300 };
if (typeof E.portaRemovida !== 'boolean') E.portaRemovida = false;
if (typeof E.portaImagem !== 'string' && E.portaImagem !== null) E.portaImagem = null;
if (E.fundoCor === undefined) E.fundoCor = '#0e1726';
if (E.fundoBrilho === undefined) E.fundoBrilho = 100;

let sel = null, selTipo = null, aba = 'catalogo', filtro = 'todos', alterado = false;
let notificacaoTimer = null;

function notificar(texto, tipo = 'sucesso', caminhoImagem = null, duracao = 2500, semIcone = false){
    const n = $('notificacao'), elIcone = $('notificacaoIcone'), elTexto = $('notificacaoTexto');
    if(!n) return;
    if (semIcone) elIcone.style.display = 'none';
    else {
        elIcone.style.display = 'flex';
        const imagens = { sucesso:'banner-salvar.png', erro:'banner-excluir.png', aviso:'banner-excluir.png', info:'banner-xp.png', dinheiro:'banner-dinheiro.png', xp:'banner-xp.png', level:'banner-level.png', verificado:'banner-verificado.png' };
        elIcone.innerHTML = `<img src="${caminhoImagem || imagens[tipo] || imagens.sucesso}" style="width:100%;height:100%;object-fit:contain;">`;
    }
    elTexto.textContent = texto; n.className = 'notificacao ' + tipo;
    clearTimeout(notificacaoTimer); requestAnimationFrame(() => n.classList.add('ativo'));
    notificacaoTimer = setTimeout(() => n.classList.remove('ativo'), duracao);
}

function sincronizarXPComEntrada(){ localStorage.setItem('usuario_xp_atualizado', Date.now()); }

async function somarXpNoSupabase(xpGanho){
    initSupabase(); if(!sb || !emailUsuario || !xpGanho || xpGanho <= 0) return;
    try {
        const { data } = await sb.from('usuarios').select('xp').eq('email', emailUsuario).single();
        const novoXp = (Number(data?.xp) || 0) + Math.abs(xpGanho);
        await sb.from('usuarios').update({ xp: novoXp }).eq('email', emailUsuario);
        E.xp = novoXp; localStorage.setItem(chaveEstado, JSON.stringify(E)); localStorage.setItem('usuario_xp_atualizado', Date.now());
    } catch(err){ console.error(err); }
}

async function carregarXpDoBanco(){
    initSupabase(); if(!sb || !emailUsuario) return;
    try {
        const { data } = await sb.from('usuarios').select('xp').eq('email', emailUsuario).single();
        renderStatus(); sincronizarXPComEntrada();
    } catch(err){ console.error(err); }
}

async function carregarCasaDoBanco(){
    initSupabase(); if (!sb || !emailUsuario) return;
    try {
        const { data, error } = await sb.from('usuarios').select('casa_estado').eq('email', emailUsuario).single();
        if (error || !data || !data.casa_estado) return;
        const remoto = data.casa_estado, xpLocalJogo = Number(E.xp) || 0;
        E = { ...padrao, ...remoto };
        E.papelParede = { ...padrao.papelParede, ...(remoto.papelParede || {}) };
        E.pisoChao = { ...padrao.pisoChao, ...(remoto.pisoChao || {}) };
        E.corParedeComodo = { ...padrao.corParedeComodo, ...(remoto.corParedeComodo || {}) };
        E.moveisComprados = { ...padrao.moveisComprados, ...(remoto.moveisComprados || {}) };
        E.portasPosicionadas = { ...padrao.portasPosicionadas, ...(remoto.portasPosicionadas || {}) };
        E.xp = xpLocalJogo; localStorage.setItem(chaveEstado, JSON.stringify(E)); render();
    } catch (err) { console.error(err); }
}

function verificarBotaoResgatar(){ const btn = $('btnResgatar'); if(btn) btn.style.display = (E.xp >= 100) ? 'block' : 'none'; }

async function resgatarXp(){
    if (E.xp < 100) return; initSupabase();
    if (!sb || !emailUsuario) return notificar('Faça login para resgatar.', 'erro', null, 2500, true);
    try {
        const { data } = await sb.from('usuarios').select('xp').eq('email', emailUsuario).single();
        const xpConta = Math.max(0, Number(data?.xp) || 0), xpResgatar = Math.floor(E.xp);
        const novoXpConta = xpConta + xpResgatar;
        await sb.from('usuarios').update({ xp: novoXpConta }).eq('email', emailUsuario);
        E.xp = 0; alterado = true; localStorage.setItem(chaveEstado, JSON.stringify(E)); localStorage.setItem('usuario_xp_atualizado', Date.now());
        renderStatus(); notificar(`+${xpResgatar} XP enviado! Level ${Math.floor(novoXpConta / 100)}`, 'xp', 'banner-xp.png', 3000);
    } catch (err) { console.error(err); }
}

function hexParaHue(hex){
    const r = parseInt(hex.slice(1,3),16)/255, g = parseInt(hex.slice(3,5),16)/255, b = parseInt(hex.slice(5,7),16)/255;
    const max = Math.max(r,g,b), min = Math.min(r,g,b); let h = 0;
    if (max === min) h = 0; else if (max === r) h = ((g-b)/(max-min)) % 6; else if (max === g) h = (b-r)/(max-min) + 2; else h = (r-g)/(max-min) + 4;
    h = Math.round(h * 60); if (h < 0) h += 360; return h;
}
function hexParaRgb(hex){ return { r: parseInt(hex.slice(1,3),16), g: parseInt(hex.slice(3,5),16), b: parseInt(hex.slice(5,7),16) }; }
function escurecerHex(hex, percentual){ const { r,g,b } = hexParaRgb(hex); const f = n => Math.max(0, Math.round(n * (1 - percentual/100))); const t = n => f(n).toString(16).padStart(2,'0'); return `#${t(r)}${t(g)}${t(b)}`; }

const cacheMascara = new Map();

function gerarMascaraColorida(imgSrc, hexAlvo, luminosidade = 100){
    const cacheKey = imgSrc + '|' + hexAlvo + '|' + luminosidade;
    if (cacheMascara.has(cacheKey)) return Promise.resolve(cacheMascara.get(cacheKey));

    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            try {
                const W = img.naturalWidth, H = img.naturalHeight;
                const canvas = document.createElement('canvas');
                canvas.width = W; canvas.height = H;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, W, H);
                const data = imageData.data;

                const alvo = hexParaRgb(hexAlvo);
                const brilhoUser = (luminosidade ?? 100) / 100;

                for (let i = 0; i < data.length; i += 4) {
                    if (data[i+3] < 128) continue;
                    const r = data[i], g = data[i+1], b = data[i+2];
                    const L = (0.299*r + 0.587*g + 0.114*b) / 255; 
                    
                    data[i]   = Math.min(255, Math.max(0, alvo.r * L * brilhoUser));
                    data[i+1] = Math.min(255, Math.max(0, alvo.g * L * brilhoUser));
                    data[i+2] = Math.min(255, Math.max(0, alvo.b * L * brilhoUser));
                }

                ctx.putImageData(imageData, 0, 0);
                const url = canvas.toDataURL('image/png');
                cacheMascara.set(cacheKey, url);
                resolve(url);
            } catch (e) { 
                resolve(null); 
            }
        };
        img.onerror = () => resolve(null);
        img.src = imgSrc;
    });
}

function aplicarEstiloCor(el, dados, imagem){
    const modo = dados.modoCor || 'tingir', hue = dados.corHue || 0, sat = dados.saturacao ?? 100, bri = dados.brilho ?? 100;
    
    el.style.background = 'transparent';
    el.style.backgroundColor = 'transparent';
    el.style.border = 'none';
    el.style.boxShadow = 'none';
    el.style.isolation = 'isolate';
    el.innerHTML = '';

    const img = document.createElement('img'); 
    img.src = imagem; 
    img.style.width = '100%'; 
    img.style.height = '100%'; 
    img.style.objectFit = 'contain'; 
    img.style.pointerEvents = 'none';
    img.style.background = 'transparent';
    el.appendChild(img);

    if (modo !== 'exata') {
        if (hue !== 0 || sat !== 100 || bri !== 100) {
            img.style.filter = `hue-rotate(${hue}deg) saturate(${sat}%) brightness(${bri}%)`;
        }
        return;
    }

    const hex = dados.corHex || '#8B4513';
    gerarMascaraColorida(imagem, hex, bri).then(url => {
        if (!el.isConnected) return;
        if (url){
            img.src = url;
        } else {
            const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
            if (Math.max(r,g,b) - Math.min(r,g,b) < 10) {
                img.style.filter = `grayscale(1) brightness(${(bri/100) * (r/255) * 2})`;
            } else {
                const hAlvo = hexParaHue(hex);
                img.style.filter = `grayscale(1) sepia(1) hue-rotate(${hAlvo}deg) saturate(300%) brightness(${bri/100})`;
            }
        }
    });
}

async function renderCenario(){
    const c = E.comodoAtual, parede = E.papelParede[c], piso = E.pisoChao[c], cen = $('cenario');
    if(!cen) return;
    
    cen.style.background = E.fundoCor || '#0e1726';
    const larguraCen = cen.clientWidth, alturaCen = cen.clientHeight;
    if(!parede.w || !parede.h){ parede.w = larguraCen; parede.h = alturaCen - ALTURA_CHAO; }
    if(!piso.w || !piso.h){ piso.w = larguraCen; piso.h = ALTURA_CHAO; }

    const elP = $('papelParede');
    elP.style.display = 'block'; elP.style.left = '0px'; elP.style.top = '0px'; 
    elP.style.width = '100%'; elP.style.height = (alturaCen - ALTURA_CHAO) + 'px';
    elP.style.transform = `scaleX(${parede.invertido ? -1 : 1})`; 
    elP.style.overflow = 'hidden'; elP.innerHTML = '';

    if (parede.imagem) {
        const div = document.createElement('div');
        div.style.cssText = `position:absolute;inset:0;background-image:url('${parede.imagem}');background-repeat:repeat-x;background-position:top left;background-size:auto 100%;pointer-events:none;`;
        elP.appendChild(div);
    } else { elP.style.backgroundColor = E.corParedeComodo[c]; }

    const elPi = $('pisoChao'), ch = $('chao');
    elPi.style.display = 'block'; elPi.style.left = '0px'; elPi.style.top = (alturaCen - ALTURA_CHAO) + 'px'; 
    elPi.style.width = '100%'; elPi.style.height = ALTURA_CHAO + 'px';
    elPi.style.transform = `scaleX(${piso.invertido ? -1 : 1})`; 
    elPi.style.borderTop = `5px solid ${E.corLinhaChao}`; 
    elPi.style.overflow = 'hidden'; elPi.innerHTML = '';

    if (piso.imagem) {
        const div = document.createElement('div');
        div.style.cssText = `position:absolute;inset:0;background-image:url('${piso.imagem}');background-repeat:repeat-x;background-position:top left;background-size:auto 100%;pointer-events:none;`;
        elPi.appendChild(div); 
        elPi.style.pointerEvents = 'auto'; ch.style.display = 'none';
    } else {
        elPi.style.pointerEvents = 'none'; ch.style.display = 'block'; 
        ch.style.background = E.corChao; ch.style.height = ALTURA_CHAO + 'px';
    }

    const elPo = $('porta');
    if(c === 'sala' && !E.portaRemovida){
        elPo.style.display = 'flex'; elPo.style.left = E.posicaoPorta.x + 'px'; elPo.style.top = E.posicaoPorta.y + 'px'; elPo.style.transform = `scale(${E.tamanhoPorta}) scaleX(${E.portaInvertida ? -1 : 1})`;
        if(E.portaImagem){ elPo.style.background = 'transparent'; aplicarEstiloCor(elPo, E, E.portaImagem); }
        else { elPo.innerHTML = '<div class="macaneta"></div>'; elPo.style.background = E.corPorta; }
    } else { elPo.style.display = 'none'; }

    const b = $('boneco'); 
    if(b) {
        b.style.left = E.posicaoBoneco.x + 'px'; b.style.top = E.posicaoBoneco.y + 'px'; b.style.transform = `scale(${E.tamanhoBoneco}) scaleX(${E.bonecoInvertido ? -1 : 1})`;
        $('bonecoCabeca').setAttribute('fill', E.corBoneco); $('bonecoCorpo').setAttribute('fill', E.corBoneco);
    }

    const inpCorParede = $('corParede'); if(inpCorParede) inpCorParede.value = E.corParedeComodo[c];
    const inpCorChao = $('corChao'); if(inpCorChao) inpCorChao.value = E.corChao;
    const inpCorBoneco = $('corBoneco'); if(inpCorBoneco) inpCorBoneco.value = E.corBoneco;
    const inpCorPorta = $('corPorta'); if(inpCorPorta) inpCorPorta.value = E.corPorta;
}

function renderMoveis(){
    const cont = $('container-moveis'); 
    cont.innerHTML = '';
    
    (E.moveisComprados[E.comodoAtual] || []).forEach((m,i) => {
        const el = document.createElement('div'); 
        el.className = 'movel arrastavel'; 
        el.dataset.index = i; 
        el.dataset.tipo = 'movel';
        el.style.left = m.x + 'px'; 
        el.style.top = m.y + 'px'; 
        el.style.width = (m.w * (m.escala || 1)) + 'px'; 
        el.style.height = (m.h * (m.escala || 1)) + 'px'; 
        el.style.transform = `scaleX(${m.invertido ? -1 : 1})`; 
        el.style.zIndex = m.zIndex || 4;
        aplicarEstiloCor(el, m, m.imagem); 
        cont.appendChild(el);
    });
    
    (E.portasPosicionadas[E.comodoAtual] || []).forEach((p, i) => {
        const el = document.createElement('div'); 
        el.className = 'movel arrastavel porta-extra'; 
        el.dataset.index = i; 
        el.dataset.tipo = 'porta_extra';
        el.style.left = p.x + 'px'; 
        el.style.top = p.y + 'px'; 
        el.style.width = (p.w * (p.escala || 1)) + 'px'; 
        el.style.height = (p.h * (p.escala || 1)) + 'px'; 
        el.style.transform = `scaleX(${p.invertido ? -1 : 1})`; 
        el.style.zIndex = p.zIndex || 5;
        aplicarEstiloCor(el, p, p.imagem); 
        cont.appendChild(el);
    });
}

function atualizarMovelVisual(idx, tipo = 'movel'){
    const el = document.querySelector(`.movel[data-tipo="${tipo}"][data-index="${idx}"]`); if (!el) return;
    const item = tipo === 'movel' ? E.moveisComprados[E.comodoAtual][idx] : E.portasPosicionadas[E.comodoAtual][idx];
    if (!item) return;
    el.style.left = item.x + 'px'; el.style.top = item.y + 'px'; el.style.width = (item.w * (item.escala || 1)) + 'px'; el.style.height = (item.h * (item.escala || 1)) + 'px'; el.style.transform = `scaleX(${item.invertido ? -1 : 1})`;
}

function renderStatus(){
    $('valXp').textContent = E.xp; $('valDinheiro').textContent = E.dinheiro; $('valInventario').textContent = E.inventario.length; $('valInventarioLoja').textContent = E.inventario.length;
    $('btnAbaLoja').style.background = aba === 'catalogo' ? '#eab308' : '#334155'; $('btnAbaInventario').style.background = aba === 'inventario' ? '#eab308' : '#334155';
    verificarBotaoResgatar();
}
function renderNav(){ $('navComodos').innerHTML = C.map(c => `<button class="btn-comodo ${E.comodoAtual === c ? 'ativo' : ''}" onclick="andarPara('${c}')">${N[c]}</button>`).join(''); }
function renderFiltros(){
    const n = {todos:'Todos',parede:'Paredes',chao:'Pisos',portas:'Portas',assentos:'Assentos',camas:'Camas',mesas:'Mesas',armarios:'Armários',decoracao:'Decoração',quadros:'Quadros',iluminacao:'Iluminação'};
    $('filtrosLoja').innerHTML = Object.keys(n).map(f => `<button class="${filtro === f ? 'ativo' : ''}" onclick="filtrarLoja('${f}')">${n[f]}</button>`).join('');
}
function renderLoja(){
    const g = $('gridLoja'); g.innerHTML = '';
    let itens = aba === 'catalogo' ? cat.slice() : E.inventario.map(id => cat.find(i => i.id === id)).filter(Boolean);
    if(filtro !== 'todos') itens = itens.filter(i => i.tipo === filtro || i.categoria === filtro);
    if(aba === 'inventario' && !itens.length){ g.innerHTML = `<div class="aviso-inventario-vazio">Seu inventário está vazio!</div>`; return; }
    itens.forEach((it,i) => {
        const d = document.createElement('div'); d.className = 'item-loja'; d.style.animationDelay = (i*0.03) + 's';
        const comprado = E.inventario.includes(it.id);
        if(aba === 'catalogo'){
            if(comprado) d.innerHTML = `<img src="${it.imagem}"><div style="font-size:12px;color:#fff;">${it.nome}</div><div style="color:#10b981;font-weight:bold;">Comprado</div><button class="btn-comprar usar" onclick="usar('${it.id}')">Usar</button>`;
            else d.innerHTML = `<img src="${it.imagem}"><div style="font-size:12px;color:#fff;">${it.nome}</div><div style="color:#facc15;font-weight:bold;">$${it.preco}</div><button class="btn-comprar" onclick="comprar('${it.id}')">Comprar</button>`;
        } else d.innerHTML = `<img src="${it.imagem}"><div style="font-size:12px;color:#fff;">${it.nome}</div><button class="btn-comprar usar" onclick="usar('${it.id}')">Usar</button>`;
        g.appendChild(d);
    });
}

function comprar(id){
    const it = cat.find(i => i.id === id); if(!it) return;
    if(E.dinheiro < it.preco) return notificar('Dinheiro insuficiente!', 'erro');
    if(!E.inventario.includes(it.id)) E.inventario.push(it.id);
    E.dinheiro -= it.preco; alterado = true; notificar(`Comprou: ${it.nome}`, 'sucesso'); render(); abrirLoja();
}

function usar(id){
    const it = cat.find(i => i.id === id); if(!it || !E.inventario.includes(id)) return notificar('Você não tem esse item!', 'erro');
    const c = E.comodoAtual, larguraCen = $('cenario').clientWidth, alturaCen = $('cenario').clientHeight;
    if(it.tipo === 'parede') E.papelParede[c] = {imagem: it.imagem, x:0, y:0, w:larguraCen, h:alturaCen - ALTURA_CHAO, invertido:false};
    else if(it.tipo === 'chao') E.pisoChao[c] = {imagem: it.imagem, x:0, y:alturaCen - ALTURA_CHAO, w:larguraCen, h:ALTURA_CHAO, invertido:false};
    else if(it.tipo === 'porta') E.portasPosicionadas[c].push({ id:it.id, nome:it.nome, imagem:it.imagem, x:200, y:200, w:70, h:140, escala:1, invertido:false, zIndex:5, corHue:0, saturacao:100, brilho:100, modoCor:'tingir', corHex:'#8B4513' });
    else E.moveisComprados[c].push({ id:it.id, nome:it.nome, imagem:it.imagem, x:200, y:150, w:it.w||80, h:it.h||80, escala:1, invertido:false, zIndex:4, corHue:0, saturacao:100, brilho:100, modoCor:'tingir', corHex:'#8B4513' });
    E.xp += 5; alterado = true; renderStatus(); notificar('+5 XP!', 'xp'); render(); fecharLoja();
}

function painelCorSolidaHTML({ hex, saturacao, brilho, prefixo, aoMudarCor, aoMudarSat, aoMudarBri, aoResetar }){
    return `<div class="linha"><span class="titulo-secao">Cor sólida</span></div><div class="linha">Cor <input type="color" id="${prefixo}Hex" value="${hex}" oninput="${aoMudarCor}(this.value)"></div><div class="linha">Sat. <input type="range" min="0" max="200" value="${saturacao}" oninput="${aoMudarSat}(this.value)"></div><div class="linha">Brilho <input type="range" min="20" max="200" value="${brilho}" oninput="${aoMudarBri}(this.value)"></div><div class="linha" style="justify-content:flex-end;"><button class="btn-resetar-cor" onclick="${aoResetar}()">Resetar</button></div>`;
}
function painelCorHTML(dados){
    return `<div class="linha" style="flex-direction:column; align-items:flex-start; gap:4px; padding-bottom: 4px;">
        <span class="titulo-secao">Modo de cor</span>
        <div class="toggle-modo-cor">
            <button type="button" class="btn-modo ${dados.modoCor==='tingir'?'ativo':''}" onclick="alterarModoCor('tingir');event.stopPropagation();">Tingir</button>
            <button type="button" class="btn-modo ${dados.modoCor==='exata'?'ativo':''}" onclick="alterarModoCor('exata');event.stopPropagation();">Exata</button>
        </div>
    </div>
    <div class="linha">Cor <input type="color" id="corMovelHex" value="${dados.corHex || '#8B4513'}" oninput="aplicarCorMovel(this.value)"></div>
    <div class="linha">Brilho <input type="range" min="20" max="200" value="${dados.brilho ?? 100}" oninput="aplicarBrilhoMovel(this.value)"></div>
    <div class="linha" style="justify-content:flex-end;"><button class="btn-resetar-cor" onclick="resetarCorMovel()">Resetar</button></div>`;
}

function abrirPainel(e, el){
    const p = $('painelFlutuante'), c = E.comodoAtual;
    let html = `<button class="btn-fechar-painel" onclick="fecharPainel()">×</button><div class="painel-drag-handle">⠿ Arraste</div>`;
    
    // Removidos os blocos de papelParede e pisoChao/chao.
    
    if(el.id === 'porta'){ 
        selTipo = 'porta'; 
        html += `<div class="titulo-flutuante">Porta</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${E.tamanhoPorta}" oninput="tamPorta(this.value)"></div>
            ${painelCorHTML({modoCor: E.portaModoCor, corHex:E.portaCorHex, corHue: E.portaCorHue, brilho:E.portaBrilho})}
            <div class="botoes">
                <button class="btn-flutuante" onclick="inverter('porta');fecharPainel();" title="Inverter"><img src="banner-inverter.png"></button>
                <button class="btn-flutuante remover" onclick="removerPorta();" title="Remover"><img src="banner-excluir.png"></button>
            </div>`; 
    }
    else if(el.dataset.tipo === 'porta_extra'){ 
        sel = +el.dataset.index; selTipo = 'porta_extra'; 
        const p2 = E.portasPosicionadas[c][sel]; 
        html += `<div class="titulo-flutuante">${p2.nome}</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${p2.escala || 1}" oninput="tamPortaExtra(this.value)"></div>
            ${painelCorHTML(p2)}
            <div class="botoes">
                <button class="btn-flutuante" onclick="sobreporPortaExtra();fecharPainel();" title="Sobrepor"><img src="banner-sobreposto.png"></button>
                <button class="btn-flutuante" onclick="inverter('porta_extra');fecharPainel();" title="Inverter"><img src="banner-inverter.png"></button>
                <button class="btn-flutuante remover" onclick="removerPortaExtra();" title="Remover"><img src="banner-excluir.png"></button>
            </div>`; 
    }
    else if(el.dataset.index !== undefined){ 
        sel = +el.dataset.index; selTipo = 'movel'; 
        const m = E.moveisComprados[c][sel]; 
        html += `<div class="titulo-flutuante">${m.nome}</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${m.escala || 1}" oninput="tamMovel(this.value)"></div>
            ${painelCorHTML(m)}
            <div class="botoes">
                <button class="btn-flutuante" onclick="sobreporMovel();fecharPainel();" title="Sobrepor"><img src="banner-sobreposto.png"></button>
                <button class="btn-flutuante" onclick="inverter('movel');fecharPainel();" title="Inverter"><img src="banner-inverter.png"></button>
                <button class="btn-flutuante remover" onclick="removerMovel();" title="Remover"><img src="banner-excluir.png"></button>
            </div>`; 
    }
    else {
        return;
    }
    
    p.innerHTML = html; p.classList.add('ativo');
    const pt = e.touches ? e.changedTouches[0] : e;
    p.style.left = Math.max(10, pt.clientX - 130) + 'px'; 
    p.style.top = Math.max(10, pt.clientY - 200) + 'px';
    ativarDragPainel(p);
}

function fecharPainel(){ $('painelFlutuante').classList.remove('ativo'); sel = null; selTipo = null; }
function deselecionarComCliqueFora(e){ if(e.target.id === 'cenario' || e.target.id === 'chao') fecharPainel(); }
document.addEventListener('click', e => { const p = $('painelFlutuante'); if(p.classList.contains('ativo') && !p.contains(e.target) && !e.target.closest('.arrastavel')) fecharPainel(); });

function ativarDragPainel(painel){
    const handle = painel.querySelector('.painel-drag-handle'); if (!handle) return;
    let sX, sY, sL, sT, ativo = false;
    handle.addEventListener('mousedown', e => { const pt = e; sX = pt.clientX; sY = pt.clientY; const r = painel.getBoundingClientRect(); sL = r.left; sT = r.top; ativo = true; });
    document.addEventListener('mousemove', e => { if(!ativo) return; painel.style.left = (sL + e.clientX - sX) + 'px'; painel.style.top = (sT + e.clientY - sY) + 'px'; });
    document.addEventListener('mouseup', () => ativo = false);
}

/* ===== COR E SOBREPOSIÇÃO (sem travar o jogo) ===== */
function alterarModoCor(modo){
    if (selTipo === 'porta'){ 
        E.portaModoCor = modo; 
        renderCenario(); 
    }
    else if (selTipo === 'porta_extra' && sel !== null){ 
        const p = E.portasPosicionadas[E.comodoAtual][sel]; 
        if(p) p.modoCor = modo; 
        renderMoveis(); 
        arrasto();
    }
    else if (selTipo === 'movel' && sel !== null){ 
        const m = E.moveisComprados[E.comodoAtual][sel]; 
        if(m) m.modoCor = modo; 
        renderMoveis(); 
        arrasto();
    }
    alterado = true;
}

function aplicarCorMovel(hex){
    if (selTipo === 'porta'){ 
        E.portaCorHex = hex; 
        E.portaCorHue = hexParaHue(hex); 
        renderCenario(); 
        return; 
    }
    const item = selTipo === 'movel' 
        ? E.moveisComprados[E.comodoAtual][sel] 
        : E.portasPosicionadas[E.comodoAtual][sel];
    if(item) { 
        item.corHex = hex; 
        item.corHue = hexParaHue(hex); 
        const el = document.querySelector(`.movel[data-tipo="${selTipo}"][data-index="${sel}"]`); 
        if(el) aplicarEstiloCor(el, item, item.imagem); 
    }
}

function aplicarBrilhoMovel(v){
    if (selTipo === 'porta'){ 
        E.portaBrilho = Number(v); 
        renderCenario(); 
        return; 
    }
    const item = selTipo === 'movel' 
        ? E.moveisComprados[E.comodoAtual][sel] 
        : E.portasPosicionadas[E.comodoAtual][sel];
    if(item) { 
        item.brilho = Number(v); 
        const el = document.querySelector(`.movel[data-tipo="${selTipo}"][data-index="${sel}"]`); 
        if(el) aplicarEstiloCor(el, item, item.imagem); 
    }
}

function resetarCorMovel(){
    if (selTipo === 'porta'){ 
        E.portaCorHex = '#8B4513'; 
        E.portaBrilho = 100; 
        renderCenario(); 
        return; 
    }
    const item = selTipo === 'movel' 
        ? E.moveisComprados[E.comodoAtual][sel] 
        : E.portasPosicionadas[E.comodoAtual][sel];
    if(item) { 
        item.corHex = '#8B4513'; 
        item.brilho = 100; 
        const el = document.querySelector(`.movel[data-tipo="${selTipo}"][data-index="${sel}"]`); 
        if(el) aplicarEstiloCor(el, item, item.imagem); 
    }
}

function sobreporMovel(){
    if(sel === null) return;
    const m = E.moveisComprados[E.comodoAtual][sel];
    if(!m) return;
    m.zIndex = Math.min(50, (m.zIndex || 4) + 5);
    alterado = true;
    const el = document.querySelector(`.movel[data-tipo="movel"][data-index="${sel}"]`);
    if(el) el.style.zIndex = m.zIndex;
}

function sobreporPortaExtra(){
    if(sel === null) return;
    const p2 = E.portasPosicionadas[E.comodoAtual][sel];
    if(!p2) return;
    p2.zIndex = Math.min(50, (p2.zIndex || 5) + 5);
    alterado = true;
    const el = document.querySelector(`.movel[data-tipo="porta_extra"][data-index="${sel}"]`);
    if(el) el.style.zIndex = p2.zIndex;
}

function inverter(t){
    const c = E.comodoAtual;
    if(t === 'papel') E.papelParede[c].invertido = !E.papelParede[c].invertido;
    else if(t === 'piso') E.pisoChao[c].invertido = !E.pisoChao[c].invertido;
    else if(t === 'boneco') E.bonecoInvertido = !E.bonecoInvertido;
    else if(t === 'porta') E.portaInvertida = !E.portaInvertida;
    else if(t === 'movel' && sel !== null){
        const m = E.moveisComprados[c][sel];
        if(m) m.invertido = !m.invertido;
    } else if(t === 'porta_extra' && sel !== null){
        const p2 = E.portasPosicionadas[c][sel];
        if(p2) p2.invertido = !p2.invertido;
    }
    alterado = true;
    renderCenario();
    renderMoveis();
    arrasto();
    fecharPainel();
}

/* ===== TAMANHOS ===== */
function tamBoneco(v){ E.tamanhoBoneco = +v; alterado = true; renderCenario(); }
function tamPorta(v){ E.tamanhoPorta = +v; alterado = true; renderCenario(); }

function tamMovel(v){
    if(sel === null) return;
    const m = E.moveisComprados[E.comodoAtual][sel];
    if(!m) return;
    m.escala = +v;
    alterado = true;
    const el = document.querySelector(`.movel[data-tipo="movel"][data-index="${sel}"]`);
    if(el){
        el.style.width = (m.w * m.escala) + 'px';
        el.style.height = (m.h * m.escala) + 'px';
    }
    const inputRange = document.querySelector('#painelFlutuante .linha input[type="range"]');
    if(inputRange && inputRange.value !== String(v)) inputRange.value = v;
}

function tamPortaExtra(v){
    if(sel === null) return;
    const p2 = E.portasPosicionadas[E.comodoAtual][sel];
    if(!p2) return;
    p2.escala = +v;
    alterado = true;
    const el = document.querySelector(`.movel[data-tipo="porta_extra"][data-index="${sel}"]`);
    if(el){
        el.style.width = (p2.w * p2.escala) + 'px';
        el.style.height = (p2.h * p2.escala) + 'px';
    }
    const inputRange = document.querySelector('#painelFlutuante .linha input[type="range"]');
    if(inputRange && inputRange.value !== String(v)) inputRange.value = v;
}

function removerMovel(){ if(sel !== null) { E.moveisComprados[E.comodoAtual].splice(sel,1); render(); fecharPainel(); } }
function removerPortaExtra(){ if(sel !== null) { E.portasPosicionadas[E.comodoAtual].splice(sel,1); render(); fecharPainel(); } }
function removerPorta(){ E.portaRemovida = true; alterado = true; fecharPainel(); render(); }
function restaurarPorta(){ E.portaRemovida = false; alterado = true; fecharPainel(); render(); }
function andarPara(c){ E.comodoAtual = c; fecharPainel(); render(); }
function abrirLoja(){ $('modalLoja').style.display = 'flex'; renderLoja(); }
function fecharLoja(){ $('modalLoja').style.display = 'none'; }
function mudarAbaLoja(a){ aba = a; renderStatus(); renderLoja(); }
function filtrarLoja(f){ filtro = f; renderFiltros(); renderLoja(); }

/* ===== SALVAR / SAIR ===== */
async function salvarCenario(){
    localStorage.setItem(chaveEstado, JSON.stringify(E)); alterado = false; initSupabase();
    if (!sb || !emailUsuario) return notificar('Salvo localmente!', 'aviso');
    try { const { xp, ...casaSemXp } = E; await sb.from('usuarios').update({ casa_estado: casaSemXp }).eq('email', emailUsuario); notificar('Cenário salvo!', 'sucesso'); } catch (err) { console.error(err); }
}
function tentarSair(){ if(alterado) $('modalSair').classList.add('ativo'); else window.location.href = 'jogos.html'; }
function fecharModalSair(){ $('modalSair').classList.remove('ativo'); }
async function salvarESair(){ await salvarCenario(); fecharModalSair(); setTimeout(() => window.location.href = 'jogos.html', 500); }
function sairSemSalvar(){ fecharModalSair(); window.location.href = 'jogos.html'; }

/* ===== ARRASTO ===== */
function arrasto(){
    $$('.arrastavel').forEach(el => {
        let sX, sY, sL, sT, ativo = false, moveu = false;
        
        el.addEventListener('mousedown', ini); 
        el.addEventListener('touchstart', ini, {passive:false});
        
        function ini(e){
            const p = e.touches ? e.touches[0] : e; 
            sX = p.clientX; 
            sY = p.clientY; 
            sL = el.offsetLeft; 
            sT = el.offsetTop; 
            ativo = true; 
            moveu = false;
            
            el.style.zIndex = 9999;
            
            document.addEventListener('mouseup', fim); 
            document.addEventListener('touchend', fim); 
            document.addEventListener('mousemove', mov); 
            document.addEventListener('touchmove', mov, {passive:false});
        }
        
        function mov(e){
            if(!ativo || ['papelParede', 'pisoChao', 'chao'].includes(el.id)) return;
            const p = e.touches ? e.touches[0] : e, dx = p.clientX - sX, dy = p.clientY - sY;
            if(Math.abs(dx) + Math.abs(dy) > 5){ moveu = true; alterado = true; }
            el.style.left = (sL + dx) + 'px'; 
            el.style.top = (sT + dy) + 'px';
            const c = E.comodoAtual;
            if(el.id === 'boneco') E.posicaoBoneco = { x: sL+dx, y: sT+dy };
            else if(el.id === 'porta') E.posicaoPorta = { x: sL+dx, y: sT+dy };
            else if(el.dataset.tipo === 'porta_extra'){ const p2 = E.portasPosicionadas[c][+el.dataset.index]; if(p2){ p2.x = sL+dx; p2.y = sT+dy; } }
            else if(el.dataset.index !== undefined){ const m = E.moveisComprados[c][+el.dataset.index]; if(m){ m.x = sL+dx; m.y = sT+dy; } }
        }
        
        function fim(e){ 
            const c = E.comodoAtual;
            let zIndexOriginal = 4;
            if(el.dataset.tipo === 'movel') zIndexOriginal = E.moveisComprados[c][+el.dataset.index]?.zIndex || 4;
            else if(el.dataset.tipo === 'porta_extra') zIndexOriginal = E.portasPosicionadas[c][+el.dataset.index]?.zIndex || 5;
            el.style.zIndex = zIndexOriginal;
            
            if(ativo && !moveu) abrirPainel(e, el); 
            ativo = false; 
            document.removeEventListener('mouseup', fim); 
            document.removeEventListener('touchend', fim); 
            document.removeEventListener('mousemove', mov); 
            document.removeEventListener('touchmove', mov); 
        }
    });
}

function render(){ renderStatus(); renderNav(); renderCenario(); renderMoveis(); renderFiltros(); renderLoja(); arrasto(); }

window.addEventListener('DOMContentLoaded', () => { initSupabase(); render(); carregarXpDoBanco(); carregarCasaDoBanco(); });