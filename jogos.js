const SUPABASE_URL = "https://yxsfpmqwhpvajzyrapyi.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4c2ZwbXF3aHB2YWp6eXJhcHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc4OTU0MDAsImV4cCI6MjEwMzQ3MTQwMH0.qNgFa9lbwdqEjVFM2Su4yHchR_vtl7w9QOOrPYe1wsA";

let sb = null;
if (window.supabase) sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const emailUsuario = localStorage.getItem('usuario_email') || "";

const $ = id => document.getElementById(id);
const $$ = s => document.querySelectorAll(s);
const C = ['sala','quarto','cozinha','banheiro'];
const N = {sala:'Sala', quarto:'Quarto', cozinha:'Cozinha', banheiro:'Banheiro'};

const papeis = Array.from({length:22},(_,i)=>({
    id:`parede_${i+1}`,
    nome:`Papel de Parede ${i+1}`,
    imagem:`jogos-moveis-imgs/parede-${i+1}.png`,
    preco:50,
    xp:10,
    tipo:'parede'
}));

const pisos = Array.from({length:9},(_,i)=>({
    id:`chao_${i+1}`,
    nome:`Piso ${i+1}`,
    imagem:`jogos-moveis-imgs/chao-${i+1}.png`,
    preco:45,
    xp:9,
    tipo:'chao'
}));

const portas = Array.from({length:14},(_,i)=>({
    id:`porta_${i+1}`,
    nome:`Porta ${i+1}`,
    imagem:`jogos-moveis-imgs/porta-${i+1}.png`,
    preco:40 + Math.floor(i/3) * 10,
    xp: Math.round((40 + Math.floor(i/3) * 10) / 5),
    tipo:'porta'
}));

const assentos = [
    {nome:'Cadeira 1', img:'cadeira-1', preco:35, comodo:'sala', w:50, h:60, cat:'assentos'},
    {nome:'Cadeira 2', img:'cadeira-2', preco:50, comodo:'sala', w:60, h:70, cat:'assentos'},
    {nome:'Cadeira 3', img:'cadeira-3', preco:40, comodo:'sala', w:50, h:60, cat:'assentos'},
    {nome:'Cadeira 4', img:'cadeira-4', preco:45, comodo:'sala', w:60, h:60, cat:'assentos'},
    {nome:'Cadeira 5', img:'cadeira-5', preco:55, comodo:'sala', w:55, h:65, cat:'assentos'},
    {nome:'Cadeira 6', img:'cadeira-6', preco:65, comodo:'sala', w:55, h:65, cat:'assentos'},
    {nome:'Cadeira 7', img:'cadeira-7', preco:60, comodo:'sala', w:55, h:65, cat:'assentos'},
    {nome:'Sofá 1',    img:'sofa-1',    preco:90, comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Sofá 2',    img:'sofa-2',    preco:95, comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Sofá 3',    img:'sofa-3',    preco:100,comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Sofá 4',    img:'sofa-4',    preco:80, comodo:'sala', w:90, h:50, cat:'assentos'},
    {nome:'Sofá 5',    img:'sofa-5',    preco:120,comodo:'sala', w:120, h:70, cat:'assentos'},
    {nome:'Sofá 6',    img:'sofa-6',    preco:70, comodo:'sala', w:70, h:70, cat:'assentos'},
    {nome:'Sofá 7',    img:'sofa-7',    preco:90, comodo:'sala', w:100, h:60, cat:'assentos'},
    {nome:'Vaso Sanitário 1', img:'vaso-sanitario-1', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'},
    {nome:'Vaso Sanitário 2', img:'vaso-sanitario-2', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'},
    {nome:'Vaso Sanitário 3', img:'vaso-sanitario-3', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'},
    {nome:'Vaso Sanitário 4', img:'vaso-sanitario-4', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'},
    {nome:'Vaso Sanitário 5', img:'vaso-sanitario-5', preco:150, comodo:'banheiro', w:50, h:75, cat:'assentos'}
];

const camas = [
    {nome:'Cama 1', img:'cama-1', preco:85, comodo:'quarto', w:110, h:70, cat:'camas'},
    {nome:'Cama 2', img:'cama-2', preco:150,comodo:'quarto', w:140, h:85, cat:'camas'},
    {nome:'Cama 3', img:'cama-3', preco:85, comodo:'quarto', w:110, h:70, cat:'camas'},
    {nome:'Cama 4', img:'cama-4', preco:150,comodo:'quarto', w:140, h:85, cat:'camas'},
    {nome:'Cama 5', img:'cama-5', preco:120,comodo:'quarto', w:120, h:80, cat:'camas'},
    {nome:'Cama 6', img:'cama-6', preco:120,comodo:'quarto', w:120, h:80, cat:'camas'},
    {nome:'Cama 7', img:'cama-7', preco:130,comodo:'quarto', w:120, h:80, cat:'camas'}
];

const mesas = [
    {nome:'Mesa 1', img:'mesa-1', preco:50, comodo:'sala', w:75, h:45, cat:'mesas'},
    {nome:'Mesa 2', img:'mesa-2', preco:110,comodo:'sala', w:110, h:70, cat:'mesas'},
    {nome:'Mesa 3', img:'mesa-3', preco:70, comodo:'sala', w:80, h:50, cat:'mesas'},
    {nome:'Mesa 4', img:'mesa-4', preco:80, comodo:'sala', w:90, h:55, cat:'mesas'},
    {nome:'Mesa 5', img:'mesa-5', preco:90, comodo:'sala', w:100, h:60, cat:'mesas'},
    {nome:'Mesa 6', img:'mesa-6', preco:95, comodo:'sala', w:100, h:60, cat:'mesas'},
    {nome:'Mesa 7', img:'mesa-7', preco:100,comodo:'sala', w:100, h:60, cat:'mesas'}
];

const armarios = [
    {nome:'Armário 1',  img:'armario-1',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 2',  img:'armario-2',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 3',  img:'armario-3',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 4',  img:'armario-4',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 5',  img:'armario-5',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 6',  img:'armario-6',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 7',  img:'armario-7',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 8',  img:'armario-8',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 9',  img:'armario-9',        preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Armário 10', img:'armario-10',       preco:130,comodo:'quarto', w:85, h:120, cat:'armarios'},
    {nome:'Pia Cozinha 1', img:'pia-cozinha-1', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 2', img:'pia-cozinha-2', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 3', img:'pia-cozinha-3', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 4', img:'pia-cozinha-4', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 5', img:'pia-cozinha-5', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Cozinha 6', img:'pia-cozinha-6', preco:40, comodo:'cozinha', w:120, h:60, cat:'armarios'},
    {nome:'Pia Banheiro 1', img:'pia-banheiro-1', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'},
    {nome:'Pia Banheiro 2', img:'pia-banheiro-2', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'},
    {nome:'Pia Banheiro 3', img:'pia-banheiro-3', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'},
    {nome:'Pia Banheiro 4', img:'pia-banheiro-4', preco:40, comodo:'banheiro', w:120, h:60, cat:'armarios'}
];

const decoracao = [
    {nome:'Vaso Planta 1', img:'vaso-planta-1', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 2', img:'vaso-planta-2', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 3', img:'vaso-planta-3', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 4', img:'vaso-planta-4', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 5', img:'vaso-planta-5', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 6', img:'vaso-planta-6', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Vaso Planta 7', img:'vaso-planta-7', preco:25, comodo:'sala', w:40, h:60, cat:'decoracao'},
    {nome:'Tapete 1', img:'tapete-1', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 2', img:'tapete-2', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 3', img:'tapete-3', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 4', img:'tapete-4', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 5', img:'tapete-5', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 6', img:'tapete-6', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Tapete 7', img:'tapete-7', preco:40, comodo:'sala', w:120, h:60, cat:'decoracao'},
    {nome:'Espelho 1', img:'espelho-1', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Espelho 2', img:'espelho-2', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Espelho 3', img:'espelho-3', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Espelho 4', img:'espelho-4', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Espelho 5', img:'espelho-5', preco:60, comodo:'sala', w:80, h:120, cat:'decoracao'},
    {nome:'Chuveiro 1', img:'chuveiro-1', preco:200,comodo:'banheiro', w:60, h:180, cat:'decoracao'},
    {nome:'Chuveiro 2', img:'chuveiro-2', preco:200,comodo:'banheiro', w:60, h:180, cat:'decoracao'},
    {nome:'Chuveiro 3', img:'chuveiro-3', preco:200,comodo:'banheiro', w:60, h:180, cat:'decoracao'},
    {nome:'Chuveiro 4', img:'chuveiro-4', preco:200,comodo:'banheiro', w:60, h:180, cat:'decoracao'},
    {nome:'Decoração 1',  img:'decoracao-1',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 2',  img:'decoracao-2',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 3',  img:'decoracao-3',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 4',  img:'decoracao-4',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 5',  img:'decoracao-5',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 6',  img:'decoracao-6',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 7',  img:'decoracao-7',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 8',  img:'decoracao-8',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 9',  img:'decoracao-9',  preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 10', img:'decoracao-10', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 11', img:'decoracao-11', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 12', img:'decoracao-12', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 13', img:'decoracao-13', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 14', img:'decoracao-14', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 15', img:'decoracao-15', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 16', img:'decoracao-16', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 17', img:'decoracao-17', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 18', img:'decoracao-18', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 19', img:'decoracao-19', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 20', img:'decoracao-20', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 21', img:'decoracao-21', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 22', img:'decoracao-22', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 23', img:'decoracao-23', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração 24', img:'decoracao-24', preco:30, comodo:'sala', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 1',  img:'decoracao-cozinha-1',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 2',  img:'decoracao-cozinha-2',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 3',  img:'decoracao-cozinha-3',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 4',  img:'decoracao-cozinha-4',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 5',  img:'decoracao-cozinha-5',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 6',  img:'decoracao-cozinha-6',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 7',  img:'decoracao-cozinha-7',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 8',  img:'decoracao-cozinha-8',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 9',  img:'decoracao-cozinha-9',  preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 10', img:'decoracao-cozinha-10', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 11', img:'decoracao-cozinha-11', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 12', img:'decoracao-cozinha-12', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 13', img:'decoracao-cozinha-13', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 14', img:'decoracao-cozinha-14', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 15', img:'decoracao-cozinha-15', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 16', img:'decoracao-cozinha-16', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 17', img:'decoracao-cozinha-17', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Decoração Cozinha 18', img:'decoracao-cozinha-18', preco:30, comodo:'cozinha', w:50, h:50, cat:'decoracao'},
    {nome:'Ar-Condicionado 1', img:'ar-condicionado-1', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'},
    {nome:'Ar-Condicionado 2', img:'ar-condicionado-2', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'},
    {nome:'Ar-Condicionado 3', img:'ar-condicionado-3', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'},
    {nome:'Ar-Condicionado 4', img:'ar-condicionado-4', preco:250, comodo:'sala', w:100, h:50, cat:'decoracao'},
    {nome:'Microondas', img:'microondas-1', preco:180, comodo:'cozinha', w:70, h:50, cat:'decoracao'},
    {nome:'Papel Higiênico 1', img:'papel-higienico-1', preco:15, comodo:'banheiro', w:30, h:40, cat:'decoracao'},
    {nome:'Papel Higiênico 2', img:'papel-higienico-2', preco:15, comodo:'banheiro', w:30, h:40, cat:'decoracao'},
    {nome:'Sabonete',          img:'sabonete',          preco:10, comodo:'banheiro', w:25, h:25, cat:'decoracao'},
    {nome:'Rádio 1',           img:'radio-1',           preco:70, comodo:'sala',     w:60, h:50, cat:'decoracao'},
    {nome:'Rádio 2',           img:'radio-2',           preco:70, comodo:'sala',     w:60, h:50, cat:'decoracao'},
    {nome:'Rádio 3',           img:'radio-3',           preco:70, comodo:'sala',     w:60, h:50, cat:'decoracao'},
    {nome:'Item 1',            img:'item-1',            preco:35, comodo:'sala',     w:40, h:40, cat:'decoracao'},
    {nome:'Janela 1',  img:'janela-1',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 2',  img:'janela-2',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 3',  img:'janela-3',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 4',  img:'janela-4',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 5',  img:'janela-5',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 6',  img:'janela-6',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 7',  img:'janela-7',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 8',  img:'janela-8',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 9',  img:'janela-9',  preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 10', img:'janela-10', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 11', img:'janela-11', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 12', img:'janela-12', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 13', img:'janela-13', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 14', img:'janela-14', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 15', img:'janela-15', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 16', img:'janela-16', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 17', img:'janela-17', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 18', img:'janela-18', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'},
    {nome:'Janela 19', img:'janela-19', preco:80, comodo:'sala', w:100, h:100, cat:'decoracao'}
];

const quadros = [
    {nome:'Quadro 1', img:'quadro-1', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'},
    {nome:'Quadro 2', img:'quadro-2', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'},
    {nome:'Quadro 3', img:'quadro-3', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'},
    {nome:'Quadro 4', img:'quadro-4', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'},
    {nome:'Quadro 5', img:'quadro-5', preco:40, comodo:'sala', w:120, h:60, cat:'quadros'}
];

const iluminacao = [
    {nome:'Abajur 1', img:'abajur-1', preco:30, comodo:'quarto', w:35, h:45, cat:'iluminacao'},
    {nome:'Abajur 2', img:'abajur-2', preco:45, comodo:'sala',   w:40, h:85, cat:'iluminacao'},
    {nome:'Abajur 3', img:'abajur-3', preco:35, comodo:'quarto', w:35, h:45, cat:'iluminacao'},
    {nome:'Abajur 4', img:'abajur-4', preco:40, comodo:'quarto', w:35, h:45, cat:'iluminacao'},
    {nome:'Abajur 5', img:'abajur-5', preco:50, comodo:'sala',   w:40, h:85, cat:'iluminacao'},
    {nome:'Abajur 6', img:'abajur-6', preco:35, comodo:'quarto', w:35, h:45, cat:'iluminacao'},
    {nome:'Abajur 7', img:'abajur-7', preco:40, comodo:'quarto', w:35, h:45, cat:'iluminacao'}
];

const televisoes = [
    {nome:'Televisão 1', img:'televisao-1', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 2', img:'televisao-2', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 3', img:'televisao-3', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 4', img:'televisao-4', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 5', img:'televisao-5', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 6', img:'televisao-6', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'},
    {nome:'Televisão 7', img:'televisao-7', preco:200, comodo:'sala', w:100, h:70, cat:'decoracao'}
];

const moveis = [
    ...assentos, ...camas, ...mesas, ...armarios,
    ...decoracao, ...quadros, ...iluminacao, ...televisoes
].map((m, i) => ({
    id: `movel_${i+1}`,
    nome: m.nome,
    imagem: `jogos-moveis-imgs/${m.img}.png`,
    preco: m.preco,
    xp: Math.round(m.preco / 5),
    comodo: m.comodo,
    w: m.w,
    h: m.h,
    categoria: m.cat
}));

const cat = [...papeis, ...pisos, ...portas, ...moveis];

const ALTURA_CHAO = 120;

const novo = () => ({
    xp: 0,
    dinheiro: 0,
    comodoAtual: 'sala',
    corBoneco: '#ffcc66',
    corPorta: '#b45309',
    corChao: '#78350f',
    corLinhaChao: '#451a03',
    tamanhoBoneco: 1,
    tamanhoPorta: 1,
    bonecoInvertido: false,
    portaInvertida: false,
    portaRemovida: false,
    portaImagem: null,
    posicaoPorta:  { x: 20,  y: 300 },
    posicaoBoneco: { x: 120, y: 300 },
    inventario: [],
    moveisComprados: { sala: [], quarto: [], cozinha: [], banheiro: [] },
    portasPosicionadas: { sala: [], quarto: [], cozinha: [], banheiro: [] },
    corParedeComodo: { sala: '#334155', quarto: '#1e1b4b', cozinha: '#064e3b', banheiro: '#164e63' },
    papelParede: Object.fromEntries(C.map(c => [c, { imagem: null, x: 0, y: 0, w: 0, h: 0, invertido: false }])),
    pisoChao: Object.fromEntries(C.map(c => [c, { imagem: null, x: 0, y: 0, w: 0, h: 0, invertido: false }]))
});

const VERSAO_ESTADO = 'v4';
const chaveEstado = 'estadoCasaSalvo_' + VERSAO_ESTADO;

const estadoSalvo = JSON.parse(localStorage.getItem(chaveEstado)) || {};
const padrao = novo();

let E = { ...padrao, ...estadoSalvo };

E.papelParede     = { ...padrao.papelParede,     ...(estadoSalvo.papelParede     || {}) };
E.pisoChao        = { ...padrao.pisoChao,        ...(estadoSalvo.pisoChao        || {}) };
E.corParedeComodo = { ...padrao.corParedeComodo, ...(estadoSalvo.corParedeComodo || {}) };

E.moveisComprados = { ...padrao.moveisComprados, ...(estadoSalvo.moveisComprados || {}) };
C.forEach(c => {
    if(!Array.isArray(E.moveisComprados[c])) E.moveisComprados[c] = [];
    E.moveisComprados[c].forEach(m => {
        if(m.invertido === undefined) m.invertido = false;
        if(m.escala === undefined) m.escala = 1;
        if(m.zIndex === undefined) m.zIndex = 4;
    });
});

E.portasPosicionadas = { ...padrao.portasPosicionadas, ...(estadoSalvo.portasPosicionadas || {}) };
C.forEach(c => {
    if(!Array.isArray(E.portasPosicionadas[c])) E.portasPosicionadas[c] = [];
    E.portasPosicionadas[c].forEach(p => {
        if(p.invertido === undefined) p.invertido = false;
        if(p.escala === undefined) p.escala = 1;
        if(p.zIndex === undefined) p.zIndex = 5;
    });
});

E.inventario = Array.isArray(estadoSalvo.inventario) ? estadoSalvo.inventario : [];

if (!E.posicaoPorta || typeof E.posicaoPorta.x !== 'number' || typeof E.posicaoPorta.y !== 'number') {
    E.posicaoPorta = { x: 20, y: 300 };
}
if (!E.posicaoBoneco || typeof E.posicaoBoneco.x !== 'number' || typeof E.posicaoBoneco.y !== 'number') {
    E.posicaoBoneco = { x: 120, y: 300 };
}
if (typeof E.portaRemovida !== 'boolean') E.portaRemovida = false;
if (typeof E.portaImagem !== 'string' && E.portaImagem !== null) E.portaImagem = null;

let sel = null, aba = 'catalogo', filtro = 'todos';
let selTipo = null;
let alterado = false;

let notificacaoTimer = null;
function notificar(texto, tipo = 'sucesso', caminhoImagem = null, duracao = 2500, semIcone = false){
    const n = $('notificacao');
    const elIcone = $('notificacaoIcone');
    const elTexto = $('notificacaoTexto');
    if(!n) return;

    if (semIcone) {
        elIcone.style.display = 'none';
    } else {
        elIcone.style.display = 'flex';
        const imagens = {
            sucesso: 'banner-salvar.png',
            erro: 'banner-excluir.png',
            aviso: 'banner-excluir.png',
            info: 'banner-xp.png',
            dinheiro: 'banner-dinheiro.png',
            xp: 'banner-xp.png',
            level: 'banner-level.png',
            verificado: 'banner-verificado.png'
        };
        const imgFinal = caminhoImagem || imagens[tipo] || imagens.sucesso;
        elIcone.innerHTML = `<img src="${imgFinal}" alt="Ícone" style="width:100%;height:100%;object-fit:contain;">`;
    }

    elTexto.textContent = texto;
    n.className = 'notificacao ' + tipo;

    clearTimeout(notificacaoTimer);
    requestAnimationFrame(() => n.classList.add('ativo'));
    notificacaoTimer = setTimeout(() => n.classList.remove('ativo'), duracao);
}

function sincronizarXPComEntrada(){
    localStorage.setItem('usuario_xp_atualizado', Date.now());
}

async function somarXpNoSupabase(xpGanho){
    if(!sb || !emailUsuario) return;
    try {
        const { data, error } = await sb.from('usuarios').select('xp').eq('email', emailUsuario).single();
        if(error) return console.error('Erro ao buscar XP:', error);
        const xpAtual = Number(data?.xp) || 0;
        const novoXp = Math.max(0, xpAtual + xpGanho);
        const { error: errUp } = await sb.from('usuarios').update({ xp: novoXp }).eq('email', emailUsuario);
        if(errUp) return console.error('Erro ao atualizar XP:', errUp);
        localStorage.setItem('usuario_xp_atualizado', Date.now());
    } catch(err){ console.error('Erro na sincronização do XP:', err); }
}

async function carregarXpDoBanco(){
    if(!sb || !emailUsuario) return;
    try {
        const { data, error } = await sb.from('usuarios').select('xp').eq('email', emailUsuario).single();
        if(error) return;
        E.xp = Number(data?.xp) || 0;
        localStorage.setItem(chaveEstado, JSON.stringify(E));
        renderStatus();
        sincronizarXPComEntrada();
    } catch(err){ console.error(err); }
}

function verificarBotaoResgatar(){
    const btn = $('btnResgatar');
    if(!btn) return;
    btn.style.display = (E.xp >= 100) ? 'block' : 'none';
}

function resgatarXp(){
    if(E.xp < 100) return;
    E.xp -= 100;
    alterado = true;
    somarXpNoSupabase(-100);
    salvarCenario();
    renderStatus();
    notificar('XP resgatado!', 'level', 'banner-level.png', 2500);
}

function render(){
    renderStatus();
    renderNav();
    renderCenario();
    renderMoveis();
    renderFiltros();
    renderLoja();
    arrasto();
}

function renderStatus(){
    $('valXp').textContent = E.xp;
    $('valDinheiro').textContent = E.dinheiro;
    $('valInventario').textContent = E.inventario.length;
    $('valInventarioLoja').textContent = E.inventario.length;
    $('btnAbaLoja').style.background = aba === 'catalogo' ? '#eab308' : '#334155';
    $('btnAbaInventario').style.background = aba === 'inventario' ? '#eab308' : '#334155';
    verificarBotaoResgatar();
}

function renderNav(){
    $('navComodos').innerHTML = C.map(c =>
        `<button class="btn-comodo ${E.comodoAtual === c ? 'ativo' : ''}" onclick="andarPara('${c}')">${N[c]}</button>`
    ).join('');
}

function renderCenario(){
    const c = E.comodoAtual;
    const parede = E.papelParede[c];
    const piso = E.pisoChao[c];
    const cen = $('cenario');
    cen.style.background = E.corParedeComodo[c];

    const larguraCen = cen.clientWidth;
    const alturaCen = cen.clientHeight;

    if(!parede.w || !parede.h){
        parede.w = larguraCen;
        parede.h = alturaCen - ALTURA_CHAO;
        parede.x = 0;
        parede.y = 0;
    }

    if(!piso.w || !piso.h){
        piso.w = larguraCen;
        piso.h = ALTURA_CHAO;
        piso.x = 0;
        piso.y = alturaCen - ALTURA_CHAO;
    }

    const elP = $('papelParede');
    if(parede.imagem){
        elP.style.display = 'block';
        elP.style.left = '0px';
        elP.style.top = '0px';
        elP.style.width = '100%';
        elP.style.height = (alturaCen - ALTURA_CHAO) + 'px';
        elP.style.transform = `scaleX(${parede.invertido ? -1 : 1})`;
        elP.style.backgroundImage = `url('${parede.imagem}')`;
        elP.style.backgroundSize = 'auto 100%';
        elP.style.backgroundRepeat = 'repeat-x';
        elP.style.backgroundPosition = 'top left';
    } else {
        elP.style.display = 'none';
        elP.style.backgroundImage = '';
    }

    const elPi = $('pisoChao');
    const ch = $('chao');
    if(piso.imagem){
        elPi.style.display = 'block';
        elPi.style.left = '0px';
        elPi.style.top = (alturaCen - ALTURA_CHAO) + 'px';
        elPi.style.width = '100%';
        elPi.style.height = ALTURA_CHAO + 'px';
        elPi.style.transform = `scaleX(${piso.invertido ? -1 : 1})`;
        elPi.style.backgroundImage = `url('${piso.imagem}')`;
        elPi.style.backgroundSize = 'auto 100%';
        elPi.style.backgroundRepeat = 'repeat-x';
        elPi.style.backgroundPosition = 'top left';
        ch.style.display = 'none';
    } else {
        elPi.style.display = 'none';
        elPi.style.backgroundImage = '';
        ch.style.display = 'block';
        ch.style.background = E.corChao;
        ch.style.borderTopColor = E.corLinhaChao;
    }

    const elPo = $('porta');
    if(c === 'sala' && !E.portaRemovida){
        elPo.style.display = 'flex';
        elPo.style.left = E.posicaoPorta.x + 'px';
        elPo.style.top = E.posicaoPorta.y + 'px';
        elPo.style.bottom = 'auto';
        elPo.style.transform = `scale(${E.tamanhoPorta}) scaleX(${E.portaInvertida ? -1 : 1})`;

        if(E.portaImagem){
            elPo.style.background = `url('${E.portaImagem}') center/contain no-repeat`;
            elPo.style.backgroundColor = 'transparent';
            elPo.style.border = 'none';
            elPo.style.paddingRight = '0';
        } else {
            elPo.style.background = E.corPorta;
            elPo.style.backgroundColor = E.corPorta;
            elPo.style.border = '3px solid #78350f';
            elPo.style.paddingRight = '8px';
        }
    } else {
        elPo.style.display = 'none';
    }

    const avisoPorta = $('avisoPortaRemovida');
    if(avisoPorta){
        avisoPorta.style.display = 'none';
    }

    const b = $('boneco');
    b.style.display = 'block';
    b.style.left = E.posicaoBoneco.x + 'px';
    b.style.top = E.posicaoBoneco.y + 'px';
    b.style.bottom = 'auto';
    b.style.transform = `scale(${E.tamanhoBoneco}) scaleX(${E.bonecoInvertido ? -1 : 1})`;
    $('bonecoCabeca').setAttribute('fill', E.corBoneco);
    $('bonecoCorpo').setAttribute('fill', E.corBoneco);

    $('corParede').value = E.corParedeComodo[c];
    $('corChao').value = E.corChao;
    $('corBoneco').value = E.corBoneco;
    $('corPorta').value = E.corPorta;
}

function renderMoveis(){
    const cont = $('container-moveis');
    cont.innerHTML = '';

    const lista = E.moveisComprados[E.comodoAtual] || [];
    lista.forEach((m,i) => {
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
        el.innerHTML = `<img src="${m.imagem}" alt="${m.nome}" onerror="this.style.opacity=0.2">`;
        cont.appendChild(el);
    });

    const portasComodo = E.portasPosicionadas[E.comodoAtual] || [];
    portasComodo.forEach((p, i) => {
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
        el.style.background = `url('${p.imagem}') center/contain no-repeat`;
        el.style.backgroundColor = 'transparent';
        el.style.border = 'none';
        el.innerHTML = '';
        cont.appendChild(el);
    });
}

function renderFiltros(){
    const n = {
        todos:'Todos', parede:'Paredes', chao:'Pisos',
        portas:'Portas',
        assentos:'Assentos', camas:'Camas', mesas:'Mesas',
        armarios:'Armários', decoracao:'Decoração',
        quadros:'Quadros', iluminacao:'Iluminação'
    };
    $('filtrosLoja').innerHTML = Object.keys(n).map(f =>
        `<button class="${filtro === f ? 'ativo' : ''}" onclick="filtrarLoja('${f}')">${n[f]}</button>`
    ).join('');
}

function renderLoja(){
    const g = $('gridLoja');
    g.innerHTML = '';

    let itens = aba === 'catalogo' ? cat.slice() : E.inventario.map(id => cat.find(i => i.id === id)).filter(Boolean);

    if(filtro === 'parede') itens = itens.filter(i => i.tipo === 'parede');
    else if(filtro === 'chao') itens = itens.filter(i => i.tipo === 'chao');
    else if(filtro === 'portas') itens = itens.filter(i => i.tipo === 'porta');
    else if(filtro === 'assentos') itens = itens.filter(i => i.categoria === 'assentos');
    else if(filtro === 'camas') itens = itens.filter(i => i.categoria === 'camas');
    else if(filtro === 'mesas') itens = itens.filter(i => i.categoria === 'mesas');
    else if(filtro === 'armarios') itens = itens.filter(i => i.categoria === 'armarios');
    else if(filtro === 'decoracao') itens = itens.filter(i => i.categoria === 'decoracao');
    else if(filtro === 'quadros') itens = itens.filter(i => i.categoria === 'quadros');
    else if(filtro === 'iluminacao') itens = itens.filter(i => i.categoria === 'iluminacao');

    if(aba === 'inventario' && !itens.length){
        g.innerHTML = `<div class="aviso-inventario-vazio">Seu inventário está vazio!<br>Compre itens na aba <strong>Loja</strong> para usá-los aqui.</div>`;
        return;
    }

    itens.forEach((it,i) => {
        const d = document.createElement('div');
        d.className = 'item-loja';
        d.style.animationDelay = (i*0.03) + 's';

        const jaComprado = E.inventario.includes(it.id);

        if(aba === 'catalogo'){
            if(jaComprado){
                d.innerHTML = `
                    <img src="${it.imagem}" onerror="this.style.opacity=0.2">
                    <div style="font-size:12px;color:#fff;text-align:center;">${it.nome}</div>
                    <div style="color:#10b981;font-weight:bold;">Comprado</div>
                    <button class="btn-comprar usar" onclick="event.stopPropagation();usar('${it.id}')">Usar</button>`;
            } else {
                d.innerHTML = `
                    <img src="${it.imagem}" onerror="this.style.opacity=0.2">
                    <div style="font-size:12px;color:#fff;text-align:center;">${it.nome}</div>
                    <div style="color:#facc15;font-weight:bold;">$${it.preco}</div>
                    <div style="color:#a78bfa;font-size:11px;font-weight:bold;">+${it.xp} XP</div>
                    <button class="btn-comprar" onclick="event.stopPropagation();comprar('${it.id}')">Comprar</button>`;
            }
        } else {
            d.innerHTML = `
                <img src="${it.imagem}" onerror="this.style.opacity=0.2">
                <div style="font-size:12px;color:#fff;text-align:center;">${it.nome}</div>
                <button class="btn-comprar usar" onclick="event.stopPropagation();usar('${it.id}')">Usar</button>`;
        }
        g.appendChild(d);
    });
}

function comprar(id){
    const it = cat.find(i => i.id === id);
    if(!it) return;
    if(E.dinheiro < it.preco) return notificar('Dinheiro insuficiente!', 'erro', 'banner-dinheiro.png');

    if(it.tipo === 'porta'){
        if(!E.inventario.includes(it.id)) E.inventario.push(it.id);
    } else {
        if(E.inventario.includes(it.id)) return notificar('Você já tem esse item!', 'aviso', 'banner-excluir.png');
        E.inventario.push(it.id);
    }

    E.dinheiro -= it.preco;
    alterado = true;

    notificar(`Você comprou: ${it.nome}`, 'sucesso', 'banner-dinheiro.png');
    render();
    abrirLoja();
}

function usar(id){
    const it = cat.find(i => i.id === id);
    if(!it) return;
    if(!E.inventario.includes(id)) return notificar('Você não tem esse item!', 'erro', 'banner-excluir.png');

    const c = E.comodoAtual;
    const cen = $('cenario');
    const larguraCen = cen.clientWidth;
    const alturaCen = cen.clientHeight;

    if(it.tipo === 'parede'){
        E.papelParede[c] = {imagem: it.imagem, x: 0, y: 0, w: larguraCen, h: alturaCen - ALTURA_CHAO, invertido: false};
    } else if(it.tipo === 'chao'){
        E.pisoChao[c] = {imagem: it.imagem, x: 0, y: alturaCen - ALTURA_CHAO, w: larguraCen, h: ALTURA_CHAO, invertido: false};
    } else if(it.tipo === 'porta'){
        E.portasPosicionadas[c].push({
            id: it.id,
            nome: it.nome,
            imagem: it.imagem,
            x: 200 + Math.floor(Math.random() * 100),
            y: 200 + Math.floor(Math.random() * 50),
            w: 70,
            h: 140,
            escala: 1,
            invertido: false,
            zIndex: 5
        });
    } else {
        const l = E.moveisComprados[c] || [];
        l.push({
            id: it.id, nome: it.nome, imagem: it.imagem,
            x: 200 + Math.floor(Math.random() * 100),
            y: 150 + Math.floor(Math.random() * 50),
            w: it.w || 80, h: it.h || 80,
            escala: 1, invertido: false, zIndex: 4
        });
        E.moveisComprados[c] = l;
    }

    E.xp += 5;
    somarXpNoSupabase(5);
    sincronizarXPComEntrada();

    notificar('+5 XP', 'xp', 'banner-xp.png', 2500);

    alterado = true;

    render();
    fecharLoja();
}

function abrirPainel(e, el){
    const p = $('painelFlutuante');
    const c = E.comodoAtual;
    let html = '';

    html += `<button class="btn-fechar-painel" onclick="fecharPainel();event.stopPropagation();">×</button>`;

    if(el.id === 'papelParede'){
        const d = E.papelParede[c];
        html += `<div class="titulo-flutuante">Papel de Parede</div>
            <div class="linha">Altura <input type="range" min="50" max="1500" value="${d.h}" oninput="redimensionar('papel','h',this.value)"></div>
            <div class="botoes">
                <button class="btn-flutuante" onclick="inverter('papel');fecharPainel();">
                    <img src="banner-inverter.png" alt="Inverter">
                </button>
                <button class="btn-flutuante remover" onclick="remover('papel');">
                    <img src="banner-excluir.png" alt="Remover">
                </button>
            </div>`;
    } else if(el.id === 'pisoChao'){
        const d = E.pisoChao[c];
        html += `<div class="titulo-flutuante">Piso</div>
            <div class="linha">Altura <input type="range" min="20" max="800" value="${d.h}" oninput="redimensionar('piso','h',this.value)"></div>
            <div class="botoes">
                <button class="btn-flutuante" onclick="inverter('piso');fecharPainel();">
                    <img src="banner-inverter.png" alt="Inverter">
                </button>
                <button class="btn-flutuante remover" onclick="remover('piso');">
                    <img src="banner-excluir.png" alt="Remover">
                </button>
            </div>`;
    } else if(el.id === 'boneco'){
        html += `<div class="titulo-flutuante">Boneco</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${E.tamanhoBoneco}" oninput="tamBoneco(this.value)"></div>
            <div class="botoes">
                <button class="btn-flutuante" onclick="inverter('boneco');fecharPainel();">
                    <img src="banner-inverter.png" alt="Inverter">
                </button>
            </div>`;
    } else if(el.id === 'porta'){
        html += `<div class="titulo-flutuante">Porta</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${E.tamanhoPorta}" oninput="tamPorta(this.value)"></div>
            <div class="botoes">
                <button class="btn-flutuante" onclick="inverter('porta');fecharPainel();">
                    <img src="banner-inverter.png" alt="Inverter">
                </button>
                <button class="btn-flutuante remover" onclick="removerPorta();">
                    <img src="banner-excluir.png" alt="Remover">
                </button>
            </div>`;
    } else if(el.dataset.tipo === 'porta_extra'){
        const idx = +el.dataset.index;
        const p2 = E.portasPosicionadas[c][idx];
        if(!p2) return;
        sel = idx;
        selTipo = 'porta_extra';
        html += `<div class="titulo-flutuante">${p2.nome || 'Porta'}</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${p2.escala || 1}" oninput="tamPortaExtra(this.value)"></div>
            <div class="botoes">
                <button class="btn-flutuante" onclick="sobreporPortaExtra();fecharPainel();" title="Sobrepor">
                    <img src="banner-sobreposto.png" alt="Sobrepor">
                </button>
                <button class="btn-flutuante" onclick="inverter('porta_extra');fecharPainel();" title="Inverter">
                    <img src="banner-inverter.png" alt="Inverter">
                </button>
                <button class="btn-flutuante remover" onclick="removerPortaExtra();" title="Remover">
                    <img src="banner-excluir.png" alt="Remover">
                </button>
            </div>`;
    } else if(el.dataset.index !== undefined){
        const idx = +el.dataset.index;
        const m = E.moveisComprados[c][idx];
        if(!m) return;
        sel = idx;
        selTipo = 'movel';
        html += `<div class="titulo-flutuante">${m.nome}</div>
            <div class="linha">Tamanho <input type="range" min="0.5" max="6" step="0.05" value="${m.escala || 1}" oninput="tamMovel(this.value)"></div>
            <div class="botoes">
                <button class="btn-flutuante" onclick="sobreporMovel();fecharPainel();" title="Sobrepor">
                    <img src="banner-sobreposto.png" alt="Sobrepor">
                </button>
                <button class="btn-flutuante" onclick="inverter('movel');fecharPainel();" title="Inverter">
                    <img src="banner-inverter.png" alt="Inverter">
                </button>
                <button class="btn-flutuante remover" onclick="removerMovel();" title="Remover">
                    <img src="banner-excluir.png" alt="Remover">
                </button>
            </div>`;
    }

    if(!html) return;
    p.innerHTML = html;
    p.classList.add('ativo');
    const pt = e.touches ? e.changedTouches[0] : e;
    let x = pt.clientX - 130;
    let y = pt.clientY - 220;
    if(y < 10) y = pt.clientY + 25;
    if(x < 10) x = 10;
    if(x + 300 > innerWidth - 10) x = innerWidth - 310;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
}

function fecharPainel(){
    $('painelFlutuante').classList.remove('ativo');
    sel = null;
    selTipo = null;
}

function deselecionarComCliqueFora(e){
    if(e.target.id === 'cenario' || e.target.id === 'chao') fecharPainel();
}

document.addEventListener('click', e => {
    const p = $('painelFlutuante');
    if(!p.classList.contains('ativo')) return;
    if(p.contains(e.target)) return;
    if(e.target.closest('.arrastavel')) return;
    fecharPainel();
});

function redimensionar(tipo, eixo, v){
    const c = E.comodoAtual;
    const d = tipo === 'papel' ? E.papelParede[c] : E.pisoChao[c];
    d[eixo] = +v;
    alterado = true;
    render();
}

function remover(tipo){
    const c = E.comodoAtual;
    if(tipo === 'papel') E.papelParede[c] = {imagem:null,x:0,y:0,w:0,h:0,invertido:false};
    if(tipo === 'piso') E.pisoChao[c] = {imagem:null,x:0,y:0,w:0,h:0,invertido:false};
    alterado = true;
    fecharPainel();
    render();
    notificar('Item removido!', 'aviso', null, 2500, true);
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
    render();
}

function sobreporMovel(){
    if(sel === null) return;
    const m = E.moveisComprados[E.comodoAtual][sel];
    if(!m) return;
    const zAtual = m.zIndex || 4;
    m.zIndex = Math.min(50, zAtual + 5);
    alterado = true;
    render();
    notificar('Sobreposto!', 'info', null, 1500, true);
}

function sobreporPortaExtra(){
    if(sel === null) return;
    const p2 = E.portasPosicionadas[E.comodoAtual][sel];
    if(!p2) return;
    const zAtual = p2.zIndex || 5;
    p2.zIndex = Math.min(50, zAtual + 5);
    alterado = true;
    render();
    notificar('Sobreposto!', 'info', null, 1500, true);
}

function tamBoneco(v){ E.tamanhoBoneco = +v; alterado = true; renderCenario(); }
function tamPorta(v){ E.tamanhoPorta = +v; alterado = true; renderCenario(); }

function tamMovel(v){
    if(sel === null) return;
    const m = E.moveisComprados[E.comodoAtual][sel];
    if(m){
        m.escala = +v;
        alterado = true;
        renderMoveis();
        arrasto();
    }
}

function tamPortaExtra(v){
    if(sel === null) return;
    const p2 = E.portasPosicionadas[E.comodoAtual][sel];
    if(p2){
        p2.escala = +v;
        alterado = true;
        renderMoveis();
        arrasto();
    }
}

function removerMovel(){
    if(sel === null) return;
    E.moveisComprados[E.comodoAtual].splice(sel,1);
    alterado = true;
    sel = null;
    fecharPainel();
    render();
    notificar('Móvel removido!', 'aviso', null, 2500, true);
}

function removerPortaExtra(){
    if(sel === null) return;
    E.portasPosicionadas[E.comodoAtual].splice(sel,1);
    alterado = true;
    sel = null;
    fecharPainel();
    render();
    notificar('Porta removida!', 'aviso', null, 2500, true);
}

function removerPorta(){
    E.portaRemovida = true;
    alterado = true;
    fecharPainel();
    render();
    notificar('Porta removida!', 'aviso', null, 2500, true);
}

function restaurarPorta(){
    E.portaRemovida = false;
    alterado = true;
    fecharPainel();
    render();
    notificar('Porta restaurada!', 'sucesso', null, 2500, true);
}

function alterarCor(t, cor){
    if(t === 'parede') E.corParedeComodo[E.comodoAtual] = cor;
    else if(t === 'chao') E.corChao = cor;
    else if(t === 'boneco') E.corBoneco = cor;
    else if(t === 'porta') E.corPorta = cor;
    alterado = true;
    render();
}

function andarPara(c){
    E.comodoAtual = c;
    sel = null;
    fecharPainel();
    render();
}

function abrirLoja(){
    $('modalLoja').style.display = 'flex';
    renderLoja();
}

function fecharLoja(){
    $('modalLoja').style.display = 'none';
}

function mudarAbaLoja(a){
    aba = a;
    renderStatus();
    renderLoja();
}

function filtrarLoja(f){
    filtro = f;
    renderFiltros();
    renderLoja();
}

function salvarCenario(){
    localStorage.setItem(chaveEstado, JSON.stringify(E));
    alterado = false;
    notificar('Cenário guardado!', 'sucesso', null, 2500, true);
}

function tentarSair(){
    if(alterado){
        $('modalSair').classList.add('ativo');
    } else {
        window.location.href = 'jogos.html';
    }
}

function fecharModalSair(){
    $('modalSair').classList.remove('ativo');
}

function salvarESair(){
    localStorage.setItem(chaveEstado, JSON.stringify(E));
    alterado = false;
    notificar('Cenário guardado!', 'sucesso', null, 1500, true);
    fecharModalSair();
    setTimeout(() => {
        window.location.href = 'jogos.html';
    }, 600);
}

function sairSemSalvar(){
    fecharModalSair();
    window.location.href = 'jogos.html';
}

document.addEventListener('keydown', e => {
    if(e.key === 'Escape') fecharModalSair();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'usuario_xp_atualizado' || e.key === chaveEstado) {
        try {
            const novoEstado = JSON.parse(localStorage.getItem(chaveEstado));
            if (novoEstado && novoEstado.xp !== E.xp) {
                E = { ...E, ...novoEstado };
                renderStatus();
            }
        } catch(err) { console.error(err); }
    }
});

function arrasto(){
    $$('.arrastavel').forEach(el => {
        if(el.id === 'papelParede' || el.id === 'pisoChao') {
            el.style.cursor = 'default';
            return;
        }

        let startX = 0, startY = 0;
        let startLeft = 0, startTop = 0;
        let ativo = false, moveu = false;

        el.addEventListener('mousedown', ini);
        el.addEventListener('touchstart', ini, {passive: false});

        function ini(e){
            const p = e.touches ? e.touches[0] : e;
            startX = p.clientX;
            startY = p.clientY;
            startLeft = el.offsetLeft;
            startTop = el.offsetTop;
            ativo = true;
            moveu = false;
            document.addEventListener('mouseup', fim);
            document.addEventListener('touchend', fim);
            document.addEventListener('mousemove', mov);
            document.addEventListener('touchmove', mov, {passive: false});
        }

        function mov(e){
            if(!ativo) return;
            const p = e.touches ? e.touches[0] : e;
            const dx = p.clientX - startX;
            const dy = p.clientY - startY;
            if(Math.abs(dx) + Math.abs(dy) > 5){
                moveu = true;
                alterado = true;
            }
            const lf = startLeft + dx;
            const tf = startTop + dy;
            el.style.left = lf + 'px';
            el.style.top = tf + 'px';

            const c = E.comodoAtual;
            if(el.id === 'boneco'){
                E.posicaoBoneco = { x: lf, y: tf };
            } else if(el.id === 'porta'){
                E.posicaoPorta = { x: lf, y: tf };
            } else if(el.dataset.tipo === 'porta_extra'){
                const p2 = E.portasPosicionadas[c][+el.dataset.index];
                if(p2){ p2.x = lf; p2.y = tf; }
            } else if(el.dataset.index !== undefined){
                const m = E.moveisComprados[c][+el.dataset.index];
                if(m){ m.x = lf; m.y = tf; }
            }
        }

        function fim(e){
            if(ativo && !moveu) abrirPainel(e, el);
            ativo = false;
            document.removeEventListener('mouseup', fim);
            document.removeEventListener('touchend', fim);
            document.removeEventListener('mousemove', mov);
            document.removeEventListener('touchmove', mov);
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    render();
    carregarXpDoBanco();
});