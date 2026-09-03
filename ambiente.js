// ==========================================================================
// CONTROLADOR DE AMBIENTE, LANTERNA E MECÂNICAS DO APARTAMENTO
// ==========================================================================
function transicionarTela(telaSair, telaEntrar) {
    gameContainer.classList.add('tremer-tela');
    setTimeout(() => {
        telaSair.classList.add('hidden');
        telaEntrar.classList.remove('hidden');
        gameContainer.classList.remove('tremer-tela');
    }, 100);
}

gameContainer.addEventListener('mousemove', (e) => {
    const rect = gameContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${x}%`);
    document.documentElement.style.setProperty('--mouse-y', `${y}%`);
});

// Mecânica de ligar/desligar lanterna interativa
btnLanterna.addEventListener('click', () => {
    if (bateriaLanterna <= 0) { falarMensagemSimples("Arthur", "pensamento", "A lanterna está sem carga."); return; }
    lanternaLigada = !lanternaLigada;
    atualizarRenderLanterna();
});

function atualizarRenderLanterna() {
    const foco = document.getElementById('lanterna-foco');
    if (lanternaLigada) {
        foco.className = "lanterna-ligada";
        btnLanterna.textContent = "DESLIGAR LANTERNA";
        iniciarConsumoBateria();
    } else {
        // Se a energia do quarto caiu e a lanterna desligar, volta a escuridão analógica total
        foco.className = !energiaQuartoAtiva ? "lanterna-escuridao-total" : "lanterna-desligada";
        btnLanterna.textContent = "LIGAR LANTERNA";
        clearInterval(loopBateria);
    }
}

function iniciarConsumoBateria() {
    clearInterval(loopBateria);
    loopBateria = setInterval(() => {
        if (lanternaLigada && bateriaLanterna > 0) {
            bateriaLanterna -= 1.5;
            bateriaLanterna = Math.max(0, batteryLanterna = bateriaLanterna);
            barraBateria.style.width = `${bateriaLanterna}%`;
            if (bateriaLanterna < 25 && Math.random() > 0.6) {
                document.getElementById('lanterna-foco').style.opacity = 0.2;
                setTimeout(() => document.getElementById('lanterna-foco').style.opacity = 1, 80);
            }
            if (bateriaLanterna <= 0) {
                lanternaLigada = false;
                atualizarRenderLanterna();
                falarMensagemSimples("Arthur", "pensamento", "A lanterna descarregou totalmente!");
            }
        }
    }, 1000);
}

btnTrancar.addEventListener('click', () => {
    portaTrancada = !portaTrancada;
    btnTrancar.textContent = portaTrancada ? "DESTRANCAR PORTA" : "TRANCAR PORTA";
    txtPorta.textContent = portaTrancada ? "PORTA: TRANCADA" : "PORTA: DESTRANCADA";
    txtPorta.style.color = portaTrancada ? "#a31c1c" : "#26b326";
    if (portaTrancada) document.querySelector('.porta-container').classList.add('porta-trancada-visual');
    else document.querySelector('.porta-container').classList.remove('porta-trancada-visual');
});

// INTERAÇÃO CLICÁVEL COM O DISJUNTOR PARA REPARAR QUEDAS DE ENERGIA
document.getElementById('painel-eletrico-quarto').addEventListener('click', () => {
    if (energiaQuartoAtiva) {
        falarMensagemSimples("Arthur", "pensamento", "O disjuntor interno está operando normalmente.");
    } else {
        // Conserta o blackout
        energiaQuartoAtiva = true;
        somEletrico.play().catch(() => {});
        document.getElementById('painel-eletrico-quarto').classList.remove('painel-apagado');
        telaQuarto.classList.remove('energia-queda');
        atualizarRenderLanterna();
        falarMensagemSimples("Arthur", "arthur", "Pronto! Substituí o fusível queimado e rearmar a chave. A luz do quarto voltou!");
    }
});

btnLuz.addEventListener('click', () => {
    luzCorredorLigada = !luzCorredorLigada; somEletrico.play().catch(() => {});
    txtStatusLuz.textContent = luzCorredorLigada ? "LUZ: LIGADA" : "LUZ: DESLIGADA";
    btnLuz.style.backgroundColor = luzCorredorLigada ? "#070807" : "#4a1212";
    atualizarRenderLuz();
});

function atualizarRenderLuz() {
    if (!luzCorredorLigada) { elCorredor.className = "corredor-luz-desligada"; }
    else {
        if (tipoVisitaAtual === "homem-alto") elCorredor.className = "corredor-luz-ligada corridor-luz-piscando";
        else if (tipoVisitaAtual === "anomalia") elCorredor.className = "corredor-luz-ligada corridor-luz-caotica";
        else elCorredor.className = "corredor-luz-ligada";
    }
}

btnMenuJogar.addEventListener('click', () => { somEletrico.play().catch(() => {}); telaMenu.classList.add('hidden'); telaIntro.classList.remove('hidden'); });
btnIniciar.addEventListener('click', () => { somChiadoMenu.pause(); adicionarTentativaEstatistica(); telaIntro.classList.add('hidden'); telaQuarto.classList.remove('hidden'); txtUiTop.classList.remove('hidden'); iniciarCiclosDoJogo(); });
