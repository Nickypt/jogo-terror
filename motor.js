// ==========================================================================
// MOTOR PRINCIPAL, EVENTOS DE INPUT E MÁQUINA DE REGRAS DO JOGO
// ==========================================================================
function transicionarTela(telaSair, telaEntrar) {
    gameContainer.classList.add('tremer-tela');
    setTimeout(() => {
        telaSair.classList.add('hidden');
        telaEntrar.classList.remove('hidden');
        gameContainer.classList.remove('tremer-tela');
    }, 100);
}

// Vinculação de Eventos Clássicos de Interface
btnMenuJogar.addEventListener('click', () => { somEletrico.play().catch(() => {}); transicionarTela(telaMenu, telaIntro); });
btnIniciar.addEventListener('click', () => { transicionarTela(telaIntro, telaQuarto); txtUiTop.classList.remove('hidden'); iniciarCiclosDoJogo(); });

btnTrancar.addEventListener('click', () => {
    portaTrancada = !portaTrancada;
    btnTrancar.textContent = portaTrancada ? "DESTRANCAR PORTA" : "TRANCAR PORTA";
    txtPorta.textContent = portaTrancada ? "PORTA: TRANCADA" : "PORTA: DESTRANCADA";
    txtPorta.style.color = portaTrancada ? "#a31c1c" : "#26b326";
});

btnLuz.addEventListener('click', () => {
    luzCorredorLigada = !luzCorredorLigada;
    somEletrico.play().catch(() => {});
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

// Entrada na visão do Olho Mágico (Monitoramento em tempo real)
btnOlhoMagico.addEventListener('click', () => {
    transicionarTela(telaQuarto, telaOlho);
    
    if (eventoEmAndamento) {
        somSusto.loop = true; somSusto.play().catch(() => {});
        
        loopAudioOlho = setInterval(() => {
            if (tipoVisitaAtual === "homem-alto") {
                elOlhoEscuta.textContent = "Fora: [Ruído eletrostático pesado / Ondas de estática]";
                elOlhoPensamento.textContent = "Arthur: 'Essa silhueta esguia... Seus braços quase tocam o chão. Não posso abrir.'";
            } else if (tipoVisitaAtual === "vizinho") {
                elOlhoEscuta.textContent = "Sr. Clóvis: 'Arthur, me ajuda! Tem algo subindo as escadarias!'";
                elOlhoPensamento.textContent = "Arthur: 'Vejo o idoso do 403 pelo reflexo da lâmpada velha. Ele parece machucado.'";
            } else if (tipoVisitaAtual === "entregador") {
                elOlhoEscuta.textContent = horaAtiva >= 3 ? "Mímico: 'Sua... pizza... chegou...'" : "Entregador: 'Moço, por favor, assina rápido!'";
                elOlhoPensamento.textContent = horaAtiva >= 3 ? "Arthur: 'Céus, olhe os dedos dele no trinco... são longos e disformes!'" : "Arthur: 'Parece só o entregador noturno regular.'";
            } else if (tipoVisitaAtual === "garotinha") {
                elOlhoEscuta.textContent = "Voz Suave: 'Moço, me deixa entrar? Está muito frio aqui fora...'";
                elOlhoPensamento.textContent = "Arthur: 'QUE COMPORTAMENTO MACABRO! A voz é de criança, mas na lente ela tem órbitas escuras vazias!'";
            } else if (tipoVisitaAtual === "anomalia") {
                elOlhoEscuta.textContent = "Fora: [Zumbido ensurdecedor de alta tensão / Placas fritando]";
                elOlhoPensamento.textContent = "Arthur: 'A fiação do corredor está derretendo! Se eu não desligar a luz, ela vai arrombar!'";
            }
        }, 300);
    } else {
        elOlhoEscuta.textContent = "Fora: [Corredor deserto imerso em silêncio e mofo]";
        elOlhoPensamento.textContent = "Arthur: 'Apenas paredes velhas e poeira suspensa.'";
    }
});

btnVoltar.addEventListener('click', () => {
    transicionarTela(telaOlho, telaQuarto);
    elCaixaDialogo.classList.add('idled');
    clearInterval(loopAudioOlho);
    somSusto.pause(); 
});

// Resolução Ativa: Botão de Abrir Porta Clicado
btnAbrirPorta.addEventListener('click', () => {
    if (portaTrancada) {
        falarMensagemSimples("Arthur", "Droga! A porta está trancada por dentro. Preciso destrancar primeiro.");
        return;
    }
    
    clearTimeout(timeoutAcao);
    elMacaneta.className = "macaneta";
    clearInterval(loopAudioOlho);

    if (!eventoEmAndamento) {
        falarMensagemSimples("Arthur", "Abri a porta... O corredor está completamente deserto e gélido. Só há escuridão.");
        return;
    }

    if (tipoVisitaAtual === "homem-alto") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", texto: "Olá? Tem alguém..." },
            { nome: "Efeito", texto: "* Uma garra negra colossal surge do breu e envolve seu pescoço instantaneamente *" }
        ], () => finalizarJogo("MORTE_MONSTRO"));
    } 
    else if (tipoVisitaAtual === "vizinho") {
        iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_salvo"], () => {
            recuarAmeaca("Você trancou a porta de volta. O idoso sentou no canto do seu quarto, trêmulo, mas a salvo.");
        });
    } 
    else if (tipoVisitaAtual === "entregador") {
        if (horaAtiva >= 3) {
            iniciarSequenciaDialogos([
                { nome: "Arthur", texto: "Pronto, peguei a caix..." },
                { nome: "Voz Estranha", texto: "O DISFARCE DE CARNE DA NOSSA FACE NÃO É MAIS NECESSÁRIO!" }
            ], () => finalizarJogo("MORTE_IMPOSTOR"));
        } else {
            iniciarSequenciaDialogos([
                { nome: "Arthur", texto: "Obrigado, peguei a janta." },
                { nome: "Entregador", texto: "Valeu chefe. Cuidado com esse bloco à noite... esse lugar é amaldiçoado." }
            ], () => recuarAmeaca("Você jantou. Pelo menos esse entregador era real e legítimo. O perigo recuou."));
        }
    } 
    else if (tipoVisitaAtual === "garotinha") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", texto: "Calma pequena, entra aqui no..." },
            { nome: "Efeito", texto: "* O polígono desfigurado salta contra o seu peito expondo dentes mecânicos de ferro *" }
        ], () => finalizarJogo("MORTE_GAROTINHA"));
    } 
    else if (tipoVisitaAtual === "anomalia") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", texto: "O que está acontecendo com a rede elét..." },
            { nome: "Efeito", texto: "* Centenas de volts disparam contra suas mãos, fritando seu sistema nervoso *" }
        ], () => finalizarJogo("MORTE_MONSTRO"));
    }
});

// Relógios Cíclicos do Loop Principal
function iniciarCiclosDoJogo() {
    loopRelogio = setInterval(() => {
        horaAtiva++;
        txtRelogio.textContent = `0${horaAtiva}:00 AM`;
        if (horaAtiva >= 6) finalizarJogo("VITORIA");
    }, 45000);

    loopSorteio = setInterval(() => {
        if (!eventoEmAndamento && horaAtiva < 6) {
            if (Math.random() > 0.35) dispararVisitaAleatoria();
        }
    }, 18000);

    loopSanidade = setInterval(() => {
        if (eventoEmAndamento && !telaOlho.classList.contains('hidden')) {
            if (tipoVisitaAtual === "homem-alto" || tipoVisitaAtual === "garotinha") sanidade -= 7;
            if (tipoVisitaAtual === "anomalia" && luzCorredorLigada) sanidade -= 5;
        } else if (sanidade < 100 && !eventoEmAndamento) {
            sanidade += 1;
        }

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
    
    // Alimenta as filas de falas iniciais correspondentes
    if (tipoVisitaAtual === "garotinha") iniciarSequenciaDialogos(BANCO_DIALOGOS["garotinha_falsa"]);
    else if (tipoVisitaAtual === "vizinho") iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_pede_ajuda"]);
    else if (tipoVisitaAtual === "entregador") iniciarSequenciaDialogos(horaAtiva >= 3 ? BANCO_DIALOGOS["entregador_impostor"] : BANCO_DIALOGOS["entregador_normal"]);
    else if (tipoVisitaAtual === "anomalia") iniciarSequenciaDialogos(BANCO_DIALOGOS["anomalia_eletrica"]);
    else iniciarSequenciaDialogos([{ nome: "Efeito", texto: "* TOC, TOC! Alguém força violentamente a maçaneta da sua porta por fora... *" }]);
    
    atualizarRenderLuz();
    timeoutAcao = setTimeout(() => evaluarAcoesJogador(), 14000);
}

// Resolução se o cronômetro esgotar sem abertura da porta
function evaluarAcoesJogador() {
    elMacaneta.className = "macaneta";
    somSusto.pause();
    
    if (tipoVisitaAtual === "homem-alto") {
        if (!luzCorredorLigada || portaTrancada) recuarAmeaca("A silhueta se diluiu lentamente no breu do bloco.");
        else finalizarJogo("MORTE_MONSTRO");
    } 
    else if (tipoVisitaAtual === "vizinho") {
        if (portaTrancada) { recuarAmeaca("Um baque surdo ecoa... O Sr. Clóvis parou de gritar."); window.vizinhoMorto = true; }
Use o código com cuidado.else recuarAmeaca("O idoso cansou de esmurrar a porta e saiu mancando.");}else if (tipoVisitaAtual === "entregador") {if (horaAtiva >= 3) {if (portaTrancada || !luzCorredorLigada) recuarAmeaca("Os passos arrastados indicam que a criatura recuou frustrada.");else finalizarJogo("MORTE_IMPOSTOR");} else {recuarAmeaca("O entregador deixou a embalagem no chão do corredor e foi embora resmungando.");}}else if (tipoVisitaAtual === "garotinha") {if (portaTrancada || !luzCorredorLigada) recuarAmeaca("O choro infantil cessa, dando lugar a uma risada distorcida que sobe as escadas.");else finalizarJogo("MORTE_GAROTINHA");}else if (tipoVisitaAtual === "anomalia") {if (!luzCorredorLigada) recuarAmeaca("Sem eletricidade externa ativa na rede, a massa de plasma se dissipou.");else finalizarJogo("MORTE_MONSTRO");}}function recuarAmeaca(mensagemSucesso) {iniciarSequenciaDialogos([{ nome: "Arthur", texto: mensagemSucesso }]);eventoEmAndamento = false;tipoVisitaAtual = "";elEntidade.classList.add('hidden');elOlhoEscuta.textContent = ""; elOlhoPensamento.textContent = "";atualizarRenderLuz();}// Gatilhos Finais e Controle do Flash de Jumpscarefunction finalizarJogo(motivo) {clearInterval(loopRelogio); clearInterval(loopSorteio); clearInterval(loopSanidade);clearTimeout(timeoutAcao); clearInterval(loopAudioOlho);somSusto.pause();const ehMorte = motivo !== "VITORIA";if (ehMorte) {somSusto.currentTime = 0; somSusto.play().catch(() => {});elJumpscare.className = "animar-jumpscare";}setTimeout(() => {elJumpscare.className = "hidden";telaMensagem.classList.remove('hidden');telaQuarto.classList.add('hidden'); telaOlho.classList.add('hidden'); txtUiTop.classList.add('hidden');if (motivo === "VITORIA") {if (window.vizinhoMorto) {txtTituloFim.textContent = "FINAL 3: ISOLAMENTO PARANOICO";txtTextoFim.textContent = "Você sobreviveu trancado, mas os gritos de socorro do Sr. Clóvis ficarão gravados na sua mente. O preço da vida foi o seu egoísmo.";salvarFinal('F3');} else {txtTituloFim.textContent = "FINAL 1: O AMANHECER";txtTextoFim.textContent = "06:00 AM. O sol finalmente raia sobre o Bloco B. Você recolhe suas coisas e foge desse complexo decrépito para sempre.";salvarFinal('F1');}} else if (motivo === "MORTE_MONSTRO") {txtTituloFim.textContent = "FINAL 2: ERRO DE EXISTÊNCIA";txtTextoFim.textContent = "O Homem Alto distorceu a geometria euclidiana do quarto e deletou seus dados biológicos do universo tridimensional.";salvarFinal('F2');} else if (motivo === "MORTE_IMPOSTOR") {txtTituloFim.textContent = "FINAL 4: DISFARCE COGNITIVO";txtTextoFim.textContent = "Você aceitou a comida do mímico após as 03:00 AM. Sua mente colapsou instantaneamente ao contemplar o verdadeiro vácuo orgânico sob o boné.";salvarFinal('F4');} else if (motivo === "MORTE_SANIDADE") {txtTituloFim.textContent = "FINAL 5: COLAPSO PSICÓTICO";txtTextoFim.textContent = "Sua sanidade derreteu a zero por vigiar o abismo. Tomado por uma histeria delirante, suas mãos destrancaram a porta sozinhas e você correu para o corredor escuro.";salvarFinal('F5');} else if (motivo === "MORTE_GAROTINHA") {txtTituloFim.textContent = "FINAL 6: ALMA APRISIONADA";txtTextoFim.textContent = "Você cedeu à simpatia infantil. A garotinha dilacerou sua carne e agora sua alma faz parte do reboco bolorento deste edifício.";salvarFinal('F6');}atualizarMenuFinais();}, ehMorte ? 1600 : 0);}