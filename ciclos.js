// ==========================================================================
// CORE DE TIMERS, ESCALONAMENTO DE DIFICULDADE, BLACKOUTS E EPÍLOGOS
// ==========================================================================

// Engenharia de cálculo de dificuldade progressiva em tempo real por hora
function obterParametrosDificuldade() {
    return { 
        chanceSorteio: 0.35 + (horaAtiva * 0.08), 
        tempoReacaoMonstro: Math.max(7000, 14000 - (horaAtiva * 1200)) 
    };
}

// Inicializador de loops e batimentos cíclicos da partida
function iniciarCiclosDoJogo() {
    oxigenioQuarto = 100; segundosNestaPartida = 0; energiaQuartoAtiva = true;
    telaQuarto.classList.remove('energia-queda');
    document.getElementById('painel-eletrico-quarto').classList.remove('painel-apagado');
    document.getElementById('lanterna-foco').className = "lanterna-desligada";
    
    loopContadorTempo = setInterval(() => { segundosNestaPartida++; }, 1000);
    loopRelogio = setInterval(() => { horaAtiva++; txtRelogio.textContent = `0${horaAtiva}:00 AM`; if (horaAtiva >= 6) finalizarJogo("VITORIA"); }, 45000);
    loopSorteio = setInterval(() => { if (!eventoEmAndamento && horaAtiva < 6) { const configs = obterParametrosDificuldade(); if (Math.random() < configs.chanceSorteio) dispararVisitaAleatoria(); } }, 18000);

    // Sistema de sorteio cíclico de panes elétricas no disjuntor
    loopQuedaEnergia = setInterval(() => {
        if (energiaQuartoAtiva && !eventoEmAndamento && Math.random() > 0.65 && horaAtiva < 6) {
            energiaQuartoAtiva = false; somEletrico.play().catch(() => {});
            telaQuarto.classList.add('energia-queda');
            document.getElementById('painel-eletrico-quarto').classList.add('painel-apagado');
            if(!lanternaLigada) document.getElementById('lanterna-foco').className = "lanterna-escuridao-total";
            falarMensagemSimples("Arthur", "pensamento", "*ESTALOS* Droga, o fusível velho estourou! O quarto apagou. Preciso clicar no Disjuntor da parede antes de sofrer um surto!");
        }
    }, 22000);

    // Loop de validação de decaimento psicológico e oxigênio
    loopSanidade = setInterval(() => {
        if (eventoEmAndamento && tipoVisitaAtual === "homem-alto") sanidade -= 4;
        if (!energiaQuartoAtiva && !lanternaLigada) sanidade -= 5; // Blackout sem lanterna drena a mente

        if (eventoEmAndamento && !telaOlho.classList.contains('hidden')) {
            if (tipoVisitaAtual === "homem-alto" || tipoVisitaAtual === "garotinha") sanidade -= 5;
            if (tipoVisitaAtual === "anomalia" && luzCorredorLigada) sanidade -= 4;
        } else if (sanidade < 100 && !eventoEmAndamento && energiaQuartoAtiva) {
            sanidade += 1;
        }
        
        if (!telaQuarto.classList.contains('hidden') || !telaOlho.classList.contains('hidden')) {
            if (eventoEmAndamento) { oxigenioQuarto -= 2.5; } else { oxigenioQuarto -= 1.0; }
        }
        oxigenioQuarto = Math.max(0, Math.min(100, oxigenioQuarto));
        barraOxigenio.style.width = `${oxigenioQuarto}%`;

        if (oxigenioQuarto < 40) {
            sanidade -= 3; barraOxigenio.style.backgroundColor = "#9c2828"; gameContainer.classList.add('tremer-tela');
        } else { barraOxigenio.style.backgroundColor = "#1fa3b3"; }

        sanidade = Math.max(0, Math.min(100, sanidade)); barraSanidade.style.width = `${sanidade}%`;
        if (sanidade > 50 && oxigenioQuarto >= 40) { barraSanidade.style.backgroundColor = "#26b326"; gameContainer.classList.remove('tremer-tela'); }
        else if (sanidade <= 50 && sanidade > 20) { barraSanidade.style.backgroundColor = "orange"; }
        else if (sanidade <= 20) { barraSanidade.style.backgroundColor = "#a31c1c"; gameContainer.classList.add('tremer-tela'); }

        if (sanidade <= 0) finalizarJogo("MORTE_SANIDADE");
        if (oxigenioQuarto <= 0) finalizarJogo("MORTE_ASFIXIA");
    }, 1000);
}

// Injeção de perigo e Jumpscare estético de entrada de assombração
function dispararVisitaAleatoria() {
    eventoEmAndamento = true;
    let pools = ["homem-alto", "vizinho", "entregador", "garotinha", "anomalia"];
    tipoVisitaAtual = pools[Math.floor(Math.random() * pools.length)];
    elEntidade.className = tipoVisitaAtual === "garotinha" ? "garotinha-bizarra" : (tipoVisitaAtual === "anomalia" ? "anomalia-eletrica" : tipoVisitaAtual);
    elEntidade.classList.remove('hidden');
    
    // Impacto mecânico inicial e tremor nervoso
    somBatida.play().catch(() => {});
    gameContainer.classList.add('tremer-tela');
    setTimeout(() => { if(sanidade > 20) gameContainer.classList.remove('tremer-tela'); }, 400);
    
    elMacaneta.classList.add('macaneta-mexendo');
    if (tipoVisitaAtual === "homem-alto") document.getElementById('marcas-arranhao').classList.remove('hidden');

    if (tipoVisitaAtual === "garotinha") iniciarSequenciaDialogos(BANCO_DIALOGOS["garotinha_falsa"]);
    else if (tipoVisitaAtual === "vizinho") iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_pede_ajuda"]);
    else if (tipoVisitaAtual === "entregador") iniciarSequenciaDialogos(horaAtiva >= 3 ? BANCO_DIALOGOS["entregador_impostor"] : BANCO_DIALOGOS["entregador_normal"]);
    else if (tipoVisitaAtual === "anomalia") iniciarSequenciaDialogos(BANCO_DIALOGOS["anomalia_eletrica"]);
    else iniciarSequenciaDialogos(BANCO_DIALOGOS["homem-alto"]);
    
    atualizarRenderLuz(); // Declarado em ambiente.js
    const configs = obterParametrosDificuldade();
    timeoutAcao = setTimeout(() => evaluarAcoesJogador(), configs.tempoReacaoMonstro);
}

function evaluarAcoesJogador() {
    elMacaneta.className = "macaneta"; somSusto.pause(); document.getElementById('marcas-arranhao').classList.add('hidden');
    if (tipoVisitaAtual === "homem-alto") { if (!luzCorredorLigada || portaTrancada) recuarAmeaca("Os arranhões violentos cessaram. A criatura se afastou."); else finalizarJogo("MORTE_MONSTRO"); } 
    else if (tipoVisitaAtual === "vizinho") { if (portaTrancada) { recuarAmeaca("Um silêncio sepulcral domina o corredor... O Sr. Clóvis sumiu."); window.vizinhoMorto = true; } else recuarAmeaca("O idoso saiu mancando de volta."); } 
    else if (tipoVisitaAtual === "entregador") { if (horaAtiva >= 3) { if (portaTrancada || !luzCorredorLigada) recuarAmeaca("O mímico recuou."); else finalizarJogo("MORTE_IMPOSTOR"); } else recuarAmeaca("O entregador deixou a embalagem e foi embora."); } 
    else if (tipoVisitaAtual === "garotinha") { if (portaTrancada || !luzCorredorLigada) recuarAmeaca("A voz sumiu escada acima."); else finalizarJogo("MORTE_GAROTINHA"); } 
    else if (tipoVisitaAtual === "anomalia") { if (!luzCorredorLigada) recuarAmeaca("A massa de plasma se dissipou."); else finalizarJogo("MORTE_MONSTRO"); }
}

function recuarAmeaca(mensagemSucesso) {
    iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: mensagemSucesso }]);
    eventoEmAndamento = false; tipoVisitaAtual = ""; elEntidade.classList.add('hidden'); document.getElementById('marcas-arranhao').classList.add('hidden');
    elOlhoEscuta.textContent = ""; elOlhoPensamento.textContent = ""; atualizarRenderLuz();
}

// Encerramento total e carregamento poético de Epílogo
function finalizarJogo(motivo) {
    clearInterval(loopRelogio); clearInterval(loopSorteio); clearInterval(loopSanidade); clearInterval(loopBateria); clearInterval(loopQuedaEnergia);
    clearInterval(loopContadorTempo); clearTimeout(timeoutAcao); clearInterval(loopAudioOlho); somSusto.pause(); document.getElementById('marcas-arranhao').classList.add('hidden');
    
    salvarTempoVividoEstatistica(segundosNestaPartida);
    const ehMorte = motivo !== "VITORIA";
    if (ehMorte) { somSusto.currentTime = 0; somSusto.play().catch(() => {}); elJumpscare.className = "animar-jumpscare"; }

    setTimeout(() => {
        elJumpscare.className = "hidden"; telaMensagem.classList.remove('hidden');
        telaQuarto.classList.add('hidden'); telaOlho.classList.add('hidden'); txtUiTop.classList.add('hidden');
        document.getElementById('lanterna-foco').className = "lanterna-desligada";
        somChiadoMenu.play().catch(() => {});

        let epilogoChave = "MORTE_MONSTRO";

        if (motivo === "VITORIA") {
            if (window.vizinhoMorto) { txtTituloFim.textContent = "FINAL 3: ISOLAMENTO PARANOICO"; txtTituloFim.style.color = "orange"; epilogoChave = "VITORIA_CULPA"; salvarFinal('F3'); }
            else { txtTituloFim.textContent = "FINAL 1: O AMANHECER"; txtTituloFim.style.color = "#26b326"; epilogoChave = "VITORIA_LIMPA"; salvarFinal('F1'); }
        } else if (motivo === "MORTE_MONSTRO") { txtTituloFim.textContent = "FINAL 2: ERRO DE EXISTÊNCIA"; txtTituloFim.style.color = "#a31c1c"; epilogoChave = "MORTE_MONSTRO"; salvarFinal('F2'); }
        else if (motivo === "MORTE_IMPOSTOR") { txtTituloFim.textContent = "FINAL 4: DISFARCE COGNITIVO"; txtTituloFim.style.color = "#a31c1c"; epilogoChave = "MORTE_IMPOSTOR"; salvarFinal('F4'); }
        else if (motivo === "MORTE_SANIDADE") { txtTituloFim.textContent = "FINAL 5: COLAPSO PSICÓTICO"; txtTituloFim.style.color = "purple"; epilogoChave = "MORTE_SANIDADE"; salvarFinal('F5'); }
        else if (motivo === "MORTE_GAROTINHA") { txtTituloFim.textContent = "FINAL 6: ALMA APRISIONADA"; txtTituloFim.style.color = "#a31c1c"; epilogoChave = "MORTE_GAROTINHA"; salvarFinal('F6'); }
        else if (motivo === "MORTE_ASFIXIA") { txtTituloFim.textContent = "GAME OVER: ASFIXIA CLAUSTROFÓBICA"; txtTituloFim.style.color = "#1fa3b3"; epilogoChave = "MORTE_ASFIXIA"; }
        
        txtTextoFim.textContent = ""; 
        iniciarSequenciaDialogos(EPILOGOS_FINAIS[epilogoChave], () => {
            txtSubtextoFim.textContent = `Registro arquivado no perfil de ${nomeJogadorAtual.toUpperCase()}.`;
        });

        atualizarMenuFinais();
    }, ehMorte ? 1600 : 0);
}
