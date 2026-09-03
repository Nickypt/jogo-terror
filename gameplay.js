// ==========================================================================
// CORE DE GAMEPLAY, DIFICULDADE ESCALONÁVEL, OXIGÊNIO E DESFECHOS
// ==========================================================================

btnOlhoMagico.addEventListener('click', () => {
    transicionarTela(telaQuarto, telaOlho); 
    if (eventoEmAndamento) {
        somSusto.loop = true; somSusto.play().catch(() => {});
        loopAudioOlho = setInterval(() => {
            if (tipoVisitaAtual === "homem-alto") { elOlhoEscuta.textContent = "Fora: [Arranhões violentos na madeira]"; elOlhoPensamento.textContent = "Arthur: 'Ele quer quebrar tudo. Olhar isso destrói meus nervos.'"; }
            else if (tipoVisitaAtual === "vizinho") { elOlhoEscuta.textContent = "Sr. Clóvis: 'Me ajuda... ar... estou sem ar...'"; elOlhoPensamento.textContent = "Arthur: 'Ele parece real... mas as regras dizem que eles imitam memórias.'"; }
            else if (tipoVisitaAtual === "entregador") { elOlhoEscuta.textContent = horaAtiva >= 3 ? "Mímico: 'Fi-lho... sou eu...'" : "Entregador: 'Assina aqui patrão!'"; elOlhoPensamento.textContent = horaAtiva >= 3 ? "Arthur: 'Que monstro imundo, copiando a voz de quem amo!'" : "Arthur: 'É só o entregador noturno.'"; }
            else if (tipoVisitaAtual === "garotinha") { elOlhoEscuta.textContent = "Voz Doce: 'Por que você me deixa aqui moço?...'"; elOlhoPensamento.textContent = "Arthur: 'A voz chora feito humana, mas ela não tem olhos na lente!'"; }
            else if (tipoVisitaAtual === "anomalia") { elOlhoEscuta.textContent = "Fora: [Zumbido de alta tensão]"; elOlhoPensamento.textContent = "Arthur: 'Se a luz continuar acesa, ela derrete a fechadura!'"; }
        }, 300);
    } else { elOlhoEscuta.textContent = "Fora: [Corredor silencioso e mofado]"; elOlhoPensamento.textContent = "Arthur: 'Apenas poeira.'"; }
});

btnVoltar.addEventListener('click', () => { transicionarTela(telaOlho, telaQuarto); elCaixaDialogo.className = "caixa-dialogo idled"; clearInterval(loopAudioOlho); somSusto.pause(); });

btnAbrirPorta.addEventListener('click', () => {
    clearInterval(loopAudioOlho);
    if (!eventoEmAndamento) {
        oxigenioQuarto = 100; barraOxigenio.style.width = "100%";
        falarMensagemSimples("Arthur", "arthur", "Abri a porta... O ar entra renovando meu oxigênio. Nenhum monstro no corredor.");
        return;
    }
    if (portaTrancada) { acionarConversaPelaPortaTrancada(); return; }

    clearTimeout(timeoutAcao); elMacaneta.className = "macaneta"; document.getElementById('marcas-arranhao').classList.add('hidden');

    if (tipoVisitaAtual === "homem-alto") { iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Quem está..." }, { nome: "Efeito", tipo: "monstro", texto: "* A garra esmaga seu crânio no momento em que a porta abre *" }], () => finalizarJogo("MORTE_MONSTRO")); } 
    else if (tipoVisitaAtual === "vizinho") { iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_salvo"], () => { oxigenioQuarto = 100; recuarAmeaca("Você puxou o idoso para dentro e trancou tudo de volta."); }); } 
    else if (tipoVisitaAtual === "entregador") {
        if (horaAtiva >= 3) { iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Pronto..." }, { nome: "Voz Familiar", tipo: "monstro", texto: "* O disfarce cai revelando o vácuo *" }], () => finalizarJogo("MORTE_IMPOSTOR")); } 
        else { iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Obrigado." }, { nome: "Entregador", tipo: "neutro", texto: "Valeu chefe." }], () => { oxigenioQuarto = 100; recuarAmeaca("Você jantou e fechou tudo."); }); }
    } 
    else if (tipoVisitaAtual === "garotinha") { iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Entra..." }, { nome: "Efeito", tipo: "monstro", texto: "* A criatura devora sua alma *" }], () => finalizarJogo("MORTE_GAROTINHA")); } 
    else if (tipoVisitaAtual === "anomalia") { iniciarSequenciaDialogos([{ nome: "Efeito", tipo: "monstro", texto: "* A descarga de plasma frita seu peito *" }], () => finalizarJogo("MORTE_MONSTRO")); }
});

function acionarConversaPelaPortaTrancada() {
    if (tipoVisitaAtual === "homem-alto") { falarMensagemSimples("Arthur", "arthur", "Ei! Pare de arranhar minha porta!"); } 
    else if (tipoVisitaAtual === "vizinho") {
        iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: "Sr. Clóvis? Responda uma coisa... qual o nome da sua falecida esposa?" }], {
            ehEscolha: true, opcoes: [{ texto: "'É Marta.'", acao: () => responderVizinho(true) }, { texto: "'Eu não lembro...'", acao: () => responderVizinho(false) }]
        });
    }
    else if (tipoVisitaAtual === "garotinha") {
        iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: "Quem te deixou aqui fora no corredor?" }], {
            ehEscolha: true, opcoes: [{ texto: "Acolher: 'Vou te ajudar...'", acao: () => responderGarotinha(true) }, { texto: "Ameaçar: 'Vá embora!'", acao: () => responderGarotinha(false) }]
        });
    }
    else { falarMensagemSimples("Arthur", "arthur", "Essa porta não vai abrir!"); }
}

function responderVizinho(acertouPergunta) {
    if (acertouPergunta) { iniciarSequenciaDialogos([{ nome: "Sr. Clóvis", tipo: "neutro", texto: "É Marta... Marta, meu filho... abra..." }, { nome: "Arthur", tipo: "pensamento", texto: "Ele acertou. É seguro abrir!" }]); } 
    else { iniciarSequenciaDialogos([{ nome: "Sr. Clóvis", tipo: "monstro", texto: "TUDO PERTENCE AO APARTAMENTO..." }, { nome: "Arthur", tipo: "pensamento", texto: "A voz distorceu! Não é o Clóvis de jeito nenhum!" }]); }
}

function responderGarotinha(foiGentil) {
    if (foiGentil) { sanidade -= 20; iniciarSequenciaDialogos([{ nome: "Garotinha", tipo: "monstro", texto: "OBRIGADA... SEU CORAÇÃO É DOCE..." }, { nome: "Arthur", tipo: "pensamento", texto: "Minha cabeça dói... essa voz está me hipnotizando!" }]); } 
    else { clearTimeout(timeoutAcao); iniciarSequenciaDialogos([{ nome: "Garotinha", tipo: "monstro", texto: "VOCÊ NÃO VAI DURAR!" }], () => recuarAmeaca("A garotinha deu um grito agudo de raiva e fugiu pelas escadas.")); }
}

function obterParametrosDificuldade() {
    return { chanceSorteio: 0.35 + (horaAtiva * 0.08), tempoReacaoMonstro: Math.max(7000, 14000 - (horaAtiva * 1200)) };
}

function iniciarCiclosDoJogo() {
    oxigenioQuarto = 100; segundosNestaPartida = 0; energiaQuartoAtiva = true;
    telaQuarto.classList.remove('energia-queda');
    document.getElementById('painel-eletrico-quarto').classList.remove('painel-apagado');
    document.getElementById('lanterna-foco').className = "lanterna-desligada";
    
    loopContadorTempo = setInterval(() => { segundosNestaPartida++; }, 1000);
    loopRelogio = setInterval(() => { horaAtiva++; txtRelogio.textContent = `0${horaAtiva}:00 AM`; if (horaAtiva >= 6) finalizarJogo("VITORIA"); }, 45000);
    loopSorteio = setInterval(() => { if (!eventoEmAndamento && horaAtiva < 6) { const configs = obterParametrosDificuldade(); if (Math.random() < configs.chanceSorteio) dispararVisitaAleatoria(); } }, 18000);

    // SISTEMA DE SORTEIO DE APAGÕES DE ENERGIA ALEATÓRIOS
    loopQuedaEnergia = setInterval(() => {
        if (energiaQuartoAtiva && !eventoEmAndamento && Math.random() > 0.65 && horaAtiva < 6) {
            energiaQuartoAtiva = false;
            somEletrico.play().catch(() => {});
            telaQuarto.classList.add('energia-queda');
            document.getElementById('painel-eletrico-quarto').classList.add('painel-apagado');
            
            // Força a escuridão se a lanterna estiver apagada
            if(!lanternaLigada) document.getElementById('lanterna-foco').className = "lanterna-escuridao-total";
            
            falarMensagemSimples("Arthur", "pensamento", "*ESTALOS* Droga! A fiação velha estourou o fusível de novo! O quarto apagou inteiro. Preciso clicar no Disjuntor da parede e consertar isso rápido!");
        }
    }, 22000);

    loopSanidade = setInterval(() => {
        if (eventoEmAndamento && tipoVisitaAtual === "homem-alto") sanidade -= 4;
        
        // NOVO: Se o quarto estiver no escuro total (sem energia e sem lanterna), a sanidade despenca!
        if (!energiaQuartoAtiva && !lanternaLigada) {
            sanidade -= 5;
        }

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

function dispararVisitaAleatoria() {
    eventoEmAndamento = true;
    let pools = ["homem-alto", "vizinho", "entregador", "garotinha", "anomalia"];
Use o código com cuidado.tipoVisitaAtual = pools[Math.floor(Math.random() * pools.length)];elEntidade.className = tipoVisitaAtual === "garotinha" ? "garotinha-bizarra" : (tipoVisitaAtual === "anomalia" ? "anomalia-eletrica" : tipoVisitaAtual);elEntidade.classList.remove('hidden');somBatida.play().catch(() => {});elMacaneta.classList.add('macaneta-mexendo');if (tipoVisitaAtual === "homem-alto") document.getElementById('marcas-arranhao').classList.remove('hidden');if (tipoVisitaAtual === "garotinha") iniciarSequenciaDialogos(BANCO_DIALOGOS["garotinha_falsa"]);else if (tipoVisitaAtual === "vizinho") iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_pede_ajuda"]);else if (tipoVisitaAtual === "entregador") iniciarSequenciaDialogos(horaAtiva >= 3 ? BANCO_DIALOGOS["entregador_impostor"] : BANCO_DIALOGOS["entregador_normal"]);else if (tipoVisitaAtual === "anomalia") iniciarSequenciaDialogos(BANCO_DIALOGOS["anomalia_eletrica"]);else iniciarSequenciaDialogos(BANCO_DIALOGOS["homem-alto"]);atualizarRenderLuz();const configs = obterParametrosDificuldade();timeoutAcao = setTimeout(() => evaluarAcoesJogador(), configs.tempoReacaoMonstro);}function evaluarAcoesJogador() {elMacaneta.className = "macaneta"; somSusto.pause(); document.getElementById('marcas-arranhao').classList.add('hidden');if (tipoVisitaAtual === "homem-alto") { if (!luzCorredorLigada || portaTrancada) recuarAmeaca("Os arranhões violentos cessaram. A criatura se afastou."); else finalizarJogo("MORTE_MONSTRO"); }else if (tipoVisitaAtual === "vizinho") { if (portaTrancada) { recuarAmeaca("Um silêncio sepulcral domina o corredor... O Sr. Clóvis sumiu."); window.vizinhoMorto = true; } else recuarAmeaca("O idoso saiu mancando de volta."); }else if (tipoVisitaAtual === "entregador") { if (horaAtiva >= 3) { if (portaTrancada || !luzCorredorLigada) recuarAmeaca("O mímico recuou."); else finalizarJogo("MORTE_IMPOSTOR"); } else recuarAmeaca("O entregador deixou a embalagem e foi embora."); }else if (tipoVisitaAtual === "garotinha") { if (portaTrancada || !luzCorredorLigada) recuarAmeaca("A voz sumiu escada acima."); else finalizarJogo("MORTE_GAROTINHA"); }else if (tipoVisitaAtual === "anomalia") { if (!luzCorredorLigada) recuarAmeaca("A massa de plasma se dissipou."); else finalizarJogo("MORTE_MONSTRO"); }}function recuarAmeaca(mensagemSucesso) {iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: mensagemSucesso }]);eventoEmAndamento = false; tipoVisitaAtual = ""; elEntidade.classList.add('hidden'); document.getElementById('marcas-arranhao').classList.add('hidden');elOlhoEscuta.textContent = ""; elOlhoPensamento.textContent = ""; atualizarRenderLuz();}function finalizarJogo(motivo) {clearInterval(loopRelogio); clearInterval(loopSorteio); clearInterval(loopSanidade); clearInterval(loopBateria); clearInterval(loopQuedaEnergia);clearInterval(loopContadorTempo); clearTimeout(timeoutAcao); clearInterval(loopAudioOlho); somSusto.pause(); document.getElementById('marcas-arranhao').classList.add('hidden');salvarTempoVividoEstatistica(segundosNestaPartida);const ehMorte = motivo !== "VITORIA";if (ehMorte) { somSusto.currentTime = 0; somSusto.play().catch(() => {}); elJumpscare.className = "animar-jumpscare"; }setTimeout(() => {elJumpscare.className = "hidden"; telaMensagem.classList.remove('hidden');telaQuarto.classList.add('hidden'); telaOlho.classList.add('hidden'); txtUiTop.classList.add('hidden');document.getElementById('lanterna-foco').className = "lanterna-desligada";somChiadoMenu.play().catch(() => {});if (motivo === "VITORIA") {if (window.vizinhoMorto) { txtTituloFim.textContent = "FINAL 3: ISOLAMENTO PARANOICO"; txtTextoFim.textContent = Sobrevivência concluída, inquilino ${nomeJogadorAtual.toUpperCase()}. Mas o Sr. Clóvis pagou o preço por seu egoísmo.; salvarFinal('F3'); }else { txtTituloFim.textContent = "FINAL 1: O AMANHECER"; txtTextoFim.textContent = Parabéns ${nomeJogadorAtual.toUpperCase()}! 06:00 AM. Contrato concluído. Você está livre.; salvarFinal('F1'); }} else if (motivo === "MORTE_MONSTRO") { txtTituloFim.textContent = "FINAL 2: ERRO DE EXISTÊNCIA"; txtTextoFim.textContent = "A criatura violou o perímetro geométrico e apagou sua existência."; salvarFinal('F2'); }else if (motivo === "MORTE_IMPOSTOR") { txtTituloFim.textContent = "FINAL 4: DISFARCE COGNITIVO"; txtTextoFim.textContent = "Você abriu com base nas memórias simuladas. O mímico se alimentou de você."; salvarFinal('F4'); }else if (motivo === "MORTE_SANIDADE") { txtTituloFim.textContent = "FINAL 5: COLAPSO PSICÓTICO"; txtTextoFim.textContent = "Seus nervos quebraram. O breu corroeu sua mente e você abriu a porta em surto."; salvarFinal('F5'); }else if (motivo === "MORTE_GAROTINHA") { txtTituloFim.textContent = "FINAL 6: ALMA APRISIONADA"; txtTextoFim.textContent = "Você cedeu à simpatia infantil no mimetismo biológico perverso do prédio."; salvarFinal('F6'); }else if (motivo === "MORTE_ASFIXIA") { txtTituloFim.textContent = "GAME OVER: CLAUSTROFOBIA ASFIXIANTE"; txtTextoFim.textContent = Você ficou trancado com medo por tanto tempo que o oxigênio zerou. O prédio consome os covardes.; }atualizarMenuFinais();}, ehMorte ? 1600 : 0);}