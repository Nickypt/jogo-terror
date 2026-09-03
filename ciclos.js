function obterParametrosDificuldade() {
    return { chanceSorteio: 0.35 + (horaAtiva * 0.08), tempoReacaoMonstro: Math.max(7000, 14000 - (horaAtiva * 1200)) };
}

function iniciarCiclosDoJogo() {
    oxigenioQuarto = 100; segundosNestaPartida = 0; energiaQuartoAtiva = true;
    pilhasInventario = 0; txtQtdPilhas.textContent = "0";
    gaveta1Vasculhada = false; gaveta2Vasculhada = false;
    
    telaQuarto.classList.remove('energia-queda');
    document.getElementById('painel-eletrico-quarto').classList.remove('painel-apagado');
    document.getElementById('lanterna-foco').className = "lanterna-desligada";
    
    const g1 = document.getElementById('gaveta-1');
    const g2 = document.getElementById('gaveta-2');
    if(g1) g1.classList.remove('gaveta-vasculhada');
    if(g2) g2.classList.remove('gaveta-vasculhada');

    loopContadorTempo = setInterval(() => { segundosNestaPartida++; }, 1000);
    loopRelogio = setInterval(() => { horaAtiva++; txtRelogio.textContent = `0${horaAtiva}:00 AM`; if (horaAtiva >= 6) finalizarJogo("VITORIA"); }, 45000);
    loopSorteio = setInterval(() => { if (!eventoEmAndamento && horaAtiva < 6) { const configs = obterParametrosDificuldade(); if (Math.random() < configs.chanceSorteio) dispararVisitaAleatoria(); } }, 18000);

    loopQuedaEnergia = setInterval(() => {
        if (energiaQuartoAtiva && !eventoEmAndamento && Math.random() > 0.65 && horaAtiva < 6) {
            energiaQuartoAtiva = false; somEletrico.play().catch(() => {});
            telaQuarto.classList.add('energia-queda');
            document.getElementById('painel-eletrico-quarto').classList.add('painel-apagado');
            if(!lanternaLigada) document.getElementById('lanterna-foco').className = "lanterna-escuridao-total";
            falarMensagemSimples(nomeJogadorAtual, "pensamento", "*ESTALOS* Droga, o fusível velho estourou! O quarto apagou. Preciso clicar no Disjuntor da parede antes de sofrer um surto!");
        }
    }, 22000);

    loopSanidade = setInterval(() => {
        if (eventoEmAndamento && tipoVisitaAtual === "homem-alto")
