// ==========================================================================
// CONTROLADOR DE AMBIENTE, LANTERNA E MECÂNICAS DO APARTAMENTO
// ==========================================================================

// Função auxiliar para transição visual entre telas
function transicionarTela(telaSair, telaEntrar) {
    gameContainer.classList.add('tremer-tela');
    setTimeout(() => {
        telaSair.classList.add('hidden');
        telaEntrar.classList.remove('hidden');
        gameContainer.classList.remove('tremer-tela');
    }, 100);
}

// Controle do foco da Lanterna que segue o ponteiro do mouse
gameContainer.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Mecânica de ligar/desligar e consumo da Lanterna Física
btnLanterna.addEventListener('click', () => {
    if (bateriaLanterna <= 0) { 
        falarMensagemSimples("Arthur", "pensamento", "A lanterna está completamente descarregada."); 
        return; 
    }
    lanternaLigada = !lanternaLigada;
    const foco = document.getElementById('lanterna-foco');
    if (lanternaLigada) {
        foco.className = "lanterna-ligada"; 
        btnLanterna.textContent = "DESLIGAR LANTERNA"; 
        iniciarConsumoBateria();
    } else {
        foco.className = "lanterna-desligada"; 
        btnLanterna.textContent = "LIGAR LANTERNA"; 
        clearInterval(loopBateria);
    }
});

function iniciarConsumoBateria() {
    clearInterval(loopBateria);
    loopBateria = setInterval(() => {
        if (lanternaLigada && bateriaLanterna > 0) {
            bateriaLanterna -= 1.5; 
            bateriaLanterna = Math.max(0, bateriaLanterna);
            barraBateria.style.width = `${bateriaLanterna}%`;
            
            // Efeito visual de falha na lâmpada se estiver abaixo de 25%
            if (bateriaLanterna < 25 && Math.random() > 0.6) {
                document.getElementById('lanterna-foco').style.opacity = 0.2;
                setTimeout(() => document.getElementById('lanterna-foco').style.opacity = 1, 80);
            }
            if (bateriaLanterna <= 0) {
                lanternaLigada = false; 
                document.getElementById('lanterna-foco').className = "lanterna-desligada";
                btnLanterna.textContent = "LIGAR LANTERNA"; 
                clearInterval(loopBateria);
                falarMensagemSimples("Arthur", "pensamento", "A lanterna queimou... Fiquei no breu total.");
            }
        }
    }, 1000);
}

// Altera o estado físico da tranca/ferrolho e envia resposta visual para a porta
btnTrancar.addEventListener('click', () => {
    portaTrancada = !portaTrancada;
    btnTrancar.textContent = portaTrancada ? "DESTRANCAR PORTA" : "TRANCAR PORTA";
    txtPorta.textContent = portaTrancada ? "PORTA: TRANCADA" : "PORTA: DESTRANCADA";
    txtPorta.style.color = portaTrancada ? "#a31c1c" : "#26b326";
    if (portaTrancada) document.querySelector('.porta-container').classList.add('porta-trancada-visual');
    else document.querySelector('.porta-container').classList.remove('porta-trancada-visual');
});

// Evento interativo do disjuntor de parede
document.getElementById('painel-eletrico-quarto').addEventListener('click', () => {
    falarMensagemSimples("Arthur", "pensamento", "O disfarce elétrico está instável. A fiação vibra com os barulhos de fora.");
});

// Controle do interruptor de luz do corredor
btnLuz.addEventListener('click', () => {
    luzCorredorLigada = !luzCorredorLigada; 
    somEletrico.play().catch(() => {});
    txtStatusLuz.textContent = luzCorredorLigada ? "LUZ: LIGADA" : "LUZ: DESLIGADA";
    btnLuz.style.backgroundColor = luzCorredorLigada ? "#070807" : "#4a1212";
    atualizarRenderLuz();
});

function atualizarRenderLuz() {
    const painelQuarto = document.getElementById('painel-eletrico-quarto');
    if (!luzCorredorLigada) { 
        elCorredor.className = "corredor-luz-desligada"; 
        if(painelQuarto) painelQuarto.classList.add('painel-apagado'); 
    } else {
        if(painelQuarto) painelQuarto.className = "led-energia";
        if (tipoVisitaAtual === "homem-alto") elCorredor.className = "corredor-luz-ligada corridor-luz-piscando";
        else if (tipoVisitaAtual === "anomalia") elCorredor.className = "corredor-luz-ligada corridor-luz-caotica";
        else elCorredor.className = "corredor-luz-ligada";
    }
}

// Gatilhos iniciais do Menu Principal
btnMenuJogar.addEventListener('click', () => { 
    somEletrico.play().catch(() => {}); 
    transicionarTela(telaMenu, telaIntro); 
});
btnIniciar.addEventListener('click', () => { 
    transicionarTela(telaIntro, telaQuarto); 
    txtUiTop.classList.remove('hidden'); 
    iniciarCiclosDoJogo(); // Função declarada em gameplay.js
});
