// ==========================================================================
// CORE DE GAMEPLAY, DIÁLOGOS DE ESCOLHA, CRONÔMETROS E DESFECHOS
// ==========================================================================

// Visão ativa da lente do Olho Mágico
btnOlhoMagico.addEventListener('click', () => {
    transicionarTela(telaQuarto, telaOlho); // Chamada de ambiente.js
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

btnVoltar.addEventListener('click', () => { 
    transicionarTela(telaOlho, telaQuarto); 
    elCaixaDialogo.className = "caixa-dialogo idled"; 
    clearInterval(loopAudioOlho); 
    somSusto.pause(); 
});

// Ação do Botão Abrir Porta (Conversa ou Entrada Fatal)
btnAbrirPorta.addEventListener('click', () => {
    clearInterval(loopAudioOlho);
    if (!eventoEmAndamento) {
        falarMensagemSimples("Arthur", "arthur", "Abri a porta... O corredor está completamente vazio, escuro e gelado.");
        return;
    }
    if (portaTrancada) {
        acionarConversaPelaPortaTrancada();
        return;
    }

    clearTimeout(timeoutAcao);
    elMacaneta.className = "macaneta";
    document.getElementById('marcas-arranhao').classList.add('hidden');

    if (tipoVisitaAtual === "homem-alto") {
        iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Quem está..." }, { nome: "Efeito", tipo: "monstro", texto: "* A garra esmaga seu crânio no momento em que a porta abre *" }], () => finalizarJogo("MORTE_MONSTRO"));
    } 
    else if (tipoVisitaAtual === "vizinho") {
        iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_salvo"], () => recuarAmeaca("Você puxou o idoso para dentro e trancou tudo de volta. Ele está a salvo."));
    } 
    else if (tipoVisitaAtual === "entregador") {
        if (horaAtiva >= 3) {
            iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Pronto..." }, { nome: "Voz Familiar", tipo: "monstro", texto: "* O disfarce cai revelando o vácuo *" }], () => finalizarJogo("MORTE_IMPOSTOR"));
        } else {
            iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Obrigado." }, { nome: "Entregador", tipo: "neutro", texto: "Valeu chefe. Cuidado com este andar." }], () => recuarAmeaca("Você jantou e trancou a porta. O perigo passou."));
        }
    } 
    else if (tipoVisitaAtual === "garotinha") {
        iniciarSequenciaDialogos([{ nome: "Arthur", texto: "Entra..." }, { nome: "Efeito", tipo: "monstro", texto: "* A criatura abre dentes de ferro e devora sua alma *" }], () => finalizarJogo("MORTE_GAROTINHA"));
    } 
    else if (tipoVisitaAtual === "anomalia") {
        iniciarSequenciaDialogos([{ nome: "Efeito", tipo: "monstro", texto: "* A descarga de plasma frita seu peito instantaneamente *" }], () => finalizarJogo("MORTE_MONSTRO"));
    }
});

// Diálogos interativos ativos através da barreira trancada
function acionarConversaPelaPortaTrancada() {
    if (tipoVisitaAtual === "homem-alto") {
        falarMensagemSimples("Arthur", "arthur", "Ei! Quem está aí batendo feito um louco?! Pare com isso!");
    } 
    else if (tipoVisitaAtual === "vizinho") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", tipo: "arthur", texto: "Sr. Clóvis? É você mesmo? Responda uma coisa para eu ter certeza..." }
        ], {
            ehEscolha: true,
            opcoes: [
                { texto: "'Qual o nome da sua falecida esposa?'", acao: () => responderVizinho(true) },
                { texto: "'Me dá o seu relógio de ouro em troca de abrigo!'", acao: () => responderVizinho(false) }
            ]
        });
    }
    else if (tipoVisitaAtual === "garotinha") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", tipo: "arthur", texto: "Escuta aqui, garota. Quem te deixou aqui fora no corredor?" }
        ], {
            ehEscolha: true,
            opcoes: [
                { texto: "Tentar confortar: 'Fique calma, vou te ajudar...'", acao: () => responderGarotinha(true) },
                { texto: "Ameaçar: 'Vá embora! Eu sei o que você é de verdade!'", acao: () => responderGarotinha(false) }
            ]
        });
    }
    else {
        falarMensagemSimples("Arthur", "arthur", "Bata o quanto quiser! Essa porta não vai abrir por nada!");
    }
}

function responderVizinho(acertouPergunta) {
    if (acertouPergunta) {
        iniciarSequenciaDialogos([
            { nome: "Sr. Clóvis", tipo: "neutro", texto: "(Sussurro choroso) É... Marta... o nome dela era Marta, meu filho... Por favor, abra..." },
            { nome: "Arthur", tipo: "pensamento", texto: "Ele acertou na mosca. O mimetismo do prédio falharia em memórias afetivas profundas como essa. É seguro abrir!" }
        ]);
    } else {
        iniciarSequenciaDialogos([
            { nome: "Sr. Clóvis", tipo: "monstro", texto: "DINHEIRO... RELÓGIO... MATÉRIA... TUDO VAI... PERTENCER... AO BLOCO B..." },
            { nome: "Arthur", tipo: "pensamento", texto: "CÉUS! A ganância fez o disfarce dele falhar! A voz engrossou... Não é o Clóvis de jeito nenhum!" }
        ]);
    }
}

function responderGarotinha(foiGentil) {
    if (foiGentil) {
        sanidade -= 20;
        iniciarSequenciaDialogos([
            { nome: "Garotinha", tipo: "monstro", texto: "OBRIGADA... SEU CORAÇÃO É TÃO... DOCE... NÓS ADORAMOS CONVERSAR..." },
            { nome: "Arthur", tipo: "pensamento", texto: "Minha cabeça está girando... Essa voz infantil está me hipnotizando... Devo manter a porta fechada!" }
        ]);
    } else {
        clearTimeout(timeoutAcao);
        iniciarSequenciaDialogos([
            { nome: "Garotinha", tipo: "monstro", texto: "INQUILINO INSOLENTE! VOCÊ NÃO VAI DURAR ATÉ ÀS 06H AM!" }
        ], () => recuarAmeaca("O monstro infantil deu um grito agudo de ódio e saiu correndo escada acima. Você resistiu à manipulação."));
    }
}

// Cronômetros de fases, sorteio e decaimento psicológico
function iniciarCiclosDoJogo() {
    loopRelogio = setInterval(() => { horaAtiva++; txtRelogio.textContent = `0${horaAtiva}:00 AM`; if (horaAtiva >= 6) finalizarJogo("VITORIA"); }, 45000);
    loopSorteio = setInterval(() => { if (!eventoEmAndamento && horaAtiva < 6) { if (Math.random() > 0.35) dispararVisitaAleatoria(); } }, 18000);

    loopSanidade = setInterval(() => {
        if (eventoEmAndamento && tipoVisitaAtual === "homem-alto") sanidade -= 4;
        if (eventoEmAndamento && !telaOlho.classList.contains('hidden')) {
            if (tipoVisitaAtual === "homem-alto" || tipoVisitaAtual === "garotinha") sanidade -= 5;
            if (tipoVisitaAtual === "anomalia" && luzCorredorLigada) sanidade -= 4;
        } else if (sanidade < 100 && !eventoEmAndamento) {
            sanidade += 1;
        }
        sanidade = Math.max(0, Math.min(100, sanidade));
        barraSanidade.style.width = `${sanidade}%`;
        if (sanidade > 50) { barraSanidade.style.backgroundColor = "#26b326"; gameContainer.classList.remove('tremer-tela'); }
        else if (sanidade <= 50 && sanidade > 20) { barraSanidade.style.backgroundColor = "orange"; }
        else if (sanidade <= 20) { barraSanidade.style.backgroundColor = "#a31c1c"; gameContainer.classList.add('tremer-tela'); }

        if (sanidade <= 0) finalizarJogo("MORTE_SANIDADE");
    }, 1000);
}

function dispararVisitaAleatoria() {
    eventoEmAndamento = true;
    let pools = ["homem-alto", "vizinho", "entregador", "garotinha", "anomalia"];
    tipoVisitaAtual = pools[Math.floor(Math.random() * pools.length)];
    elEntidade.className = tipoVisitaAtual === "garotinha" ? "garotinha-bizarra" : (tipoVisitaAtual === "anomalia" ? "anomalia-eletrica" : tipoVisitaAtual);
    elEntidade.classList.remove('hidden');
    somBatida.play().catch(() => {});
    elMacaneta.classList.add('macaneta-mexendo');
    if (tipoVisitaAtual === "homem-alto") document.getElementById('marcas-arranhao').classList.remove('hidden');

    if (tipoVisitaAtual === "garotinha") iniciarSequenciaDialogos(BANCO_DIALOGOS["garotinha_falsa"]);
    else if (tipoVisitaAtual === "vizinho") iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_pede_ajuda"]);
    else if (tipoVisitaAtual === "entregador") iniciarSequenciaDialogos(horaAtiva >= 3 ? BANCO_DIALOGOS["entregador_impostor"] : BANCO_DIALOGOS["entregador_normal"]);
    else if (tipoVisitaAtual === "anomalia") iniciarSequenciaDialogos(BANCO_DIALOGOS["anomalia_eletrica"]);
    else iniciarSequenciaDialogos(BANCO_DIALOGOS["homem-alto"]);
    
    atualizarRenderLuz(); // Função de ambiente.js
    timeoutAcao = setTimeout(() => evaluarAcoesJogador(), 14000);
}

Use o código com cuidado.function evaluarAcoesJogador() {elMacaneta.className = "macaneta"; somSusto.pause(); document.getElementById('marcas-arranhao').classList.add('hidden');if (tipoVisitaAtual === "homem-alto") { if (!luzCorredorLigada || portaTrancada) recuarAmeaca("Os arranhões violentos cessaram. A criatura se afastou."); else finalizarJogo("MORTE_MONSTRO"); }else if (tipoVisitaAtual === "vizinho") { if (portaTrancada) { recuarAmeaca("Um silêncio sepulcral domina o corredor... O Sr. Clóvis sumiu."); window.vizinhoMorto = true; } else recuarAmeaca("O idoso saiu mancando de volta."); }else if (tipoVisitaAtual === "entregador") { if (horaAtiva >= 3) { if (portaTrancada || !luzCorredorLigada) recuarAmeaca("O mímico recuou."); else finalizarJogo("MORTE_IMPOSTOR"); } else recuarAmeaca("O entregador deixou a embalagem e foi embora."); }else if (tipoVisitaAtual === "garotinha") { if (portaTrancada || !luzCorredorLigada) recuarAmeaca("A voz sumiu escada acima."); else finalizarJogo("MORTE_GAROTINHA"); }else if (tipoVisitaAtual === "anomalia") { if (!luzCorredorLigada) recuarAmeaca("A massa de plasma se dissipou."); else finalizarJogo("MORTE_MONSTRO"); }}function recuarAmeaca(mensagemSucesso) {iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: mensagemSucesso }]);eventoEmAndamento = false; tipoVisitaAtual = ""; elEntidade.classList.add('hidden'); document.getElementById('marcas-arranhao').classList.add('hidden');elOlhoEscuta.textContent = ""; elOlhoPensamento.textContent = ""; atualizarRenderLuz();}// Conclusão e Jumpscare de Encerramentofunction finalizarJogo(motivo) {clearInterval(loopRelogio); clearInterval(loopSorteio); clearInterval(loopSanidade); clearInterval(loopBateria);clearTimeout(timeoutAcao); clearInterval(loopAudioOlho); somSusto.pause(); document.getElementById('marcas-arranhao').classList.add('hidden');const ehMorte = motivo !== "VITORIA";if (ehMorte) { somSusto.currentTime = 0; somSusto.play().catch(() => {}); elJumpscare.className = "animar-jumpscare"; }setTimeout(() => {elJumpscare.className = "hidden"; telaMensagem.classList.remove('hidden');telaQuarto.classList.add('hidden'); telaOlho.classList.add('hidden'); txtUiTop.classList.add('hidden');document.getElementById('lanterna-foco').className = "lanterna-desligada";if (motivo === "VITORIA") {if (window.vizinhoMorto) { txtTituloFim.textContent = "FINAL 3: ISOLAMENTO PARANOICO"; txtTextoFim.textContent = Sobrevivência concluída, inquilino ${nomeJogadorAtual.toUpperCase()}. Mas o Sr. Clóvis pagou o preço por seu egoísmo.; salvarFinal('F3'); }else { txtTituloFim.textContent = "FINAL 1: O AMANHECER"; txtTextoFim.textContent = Parabéns ${nomeJogadorAtual.toUpperCase()}! 06:00 AM. Contrato concluído. Você está livre.; salvarFinal('F1'); }} else if (motivo === "MORTE_MONSTRO") { txtTituloFim.textContent = "FINAL 2: ERRO DE EXISTÊNCIA"; txtTextoFim.textContent = "A criatura violou o perímetro geométrico e apagou sua existência."; salvarFinal('F2'); }else if (motivo === "MORTE_IMPOSTOR") { txtTituloFim.textContent = "FINAL 4: DISFARCE COGNITIVO"; txtTextoFim.textContent = "Você abriu com base nas memórias simuladas. O mímico se alimentou de você."; salvarFinal('F4'); }else if (motivo === "MORTE_SANIDADE") { txtTituloFim.textContent = "FINAL 5: COLAPSO PSICÓTICO"; txtTextoFim.textContent = "Seus nervos quebraram. Em surto, você destrancou e correu para o corredor escuro."; salvarFinal('F5'); }else if (motivo === "MORTE_GAROTINHA") { txtTituloFim.textContent = "FINAL 6: ALMA APRISIONADA"; txtTextoFim.textContent = "Você cedeu à simpatia infantil no mimetismo biológico perverso do prédio."; salvarFinal('F6'); }atualizarMenuFinais();}, ehMorte ? 1600 : 0);}