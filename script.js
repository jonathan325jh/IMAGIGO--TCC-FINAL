const partesDoCorpo = document.querySelectorAll('.cor-corpo');
const grupoBolinhas = document.getElementById('grupo-bolinhas');
const pickerC1 = document.getElementById('picker-c1');
const pickerC2 = document.getElementById('picker-c2');

const posicoesBolinhas = [
    { cx: 90, cy: 80 },
    { cx: 110, cy: 85 },
    { cx: 100, cy: 115 },
    { cx: 46, cy: 104 },
    { cx: 62, cy: 92 },
    { cx: 154, cy: 104 },
    { cx: 138, cy: 92 },
    { cx: 70, cy: 165 },
    { cx: 74, cy: 200 },
    { cx: 130, cy: 165 },
    { cx: 124, cy: 200 }
];

function desenharBolinhas(cor) {
    grupoBolinhas.innerHTML = '';
    posicoesBolinhas.forEach(pos => {
        const novaBolinha = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        novaBolinha.setAttribute("cx", pos.cx);
        novaBolinha.setAttribute("cy", pos.cy);
        novaBolinha.setAttribute("r", "5.5");
        novaBolinha.setAttribute("fill", cor);
        
        grupoBolinhas.appendChild(novaBolinha);
    });
}

pickerC1.addEventListener('input', (e) => {
    const novaCor = e.target.value;
    partesDoCorpo.forEach(parte => {
        parte.style.fill = novaCor;
    });
});

pickerC2.addEventListener('input', (e) => {
    const corDasBolinhas = e.target.value;
    desenharBolinhas(corDasBolinhas);
});

desenharBolinhas(pickerC2.value);