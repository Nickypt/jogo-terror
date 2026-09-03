// ==========================================================================
// CONTROLADOR DE EVENTOS DA PORTA, OLHO MÁGICO E ESCOLHAS NARRATIVAS
// ==========================================================================

// Visão ativa da lente do Olho Mágico
btnOlhoMagico.addEventListener('click', () => {
    transicionarTela(telaQuarto, telaOlho); // Função declarada em ambiente.js
    if (eventoEmAndamento) {
        somSusto.loop = true; somSusto.play().catch(() => {});
        loopAudioOlho = setInterval(() => {
            if (tipoVisitaAtual === "homem-alto") { elOlhoEscuta.textContent = "Fora: [Arranhões violentos na madeira]"; elOlhoPensamento.textContent = "Arthur: 'Ele quer quebrar tudo. Olhar isso destrói meus nervos.'"; }
            else if (tipoVisitaAtual === "vizinho") { elOlhoEscuta.textContent = "Sr. Clóvis: 'Me ajuda... ar... estou sem ar...'"; elOlhoPensamento.textContent = "Arthur: 'A silhueta confere... Mas eu preciso testar a mente dele pela madeira trancada.'"; }
            else if (tipoVisitaAtual === "entregador") { elOlhoEscuta.textContent = horaAtiva >= 3 ? "Mímico: 'Fi-lho... desce aqui... está frio...'" : "Entregador: 'Pizza quentinha no 404!'"; elOlhoPensamento.textContent = horaAtiva >= 3 ? "Arthur: 'Que monstro imundo, copiando a voz de quem amo!'" : "Arthur: 'Parece só o entregador atrasado.'"; }
            else if (tipoVisitaAtual === "garotinha") { elOlhoEscuta.textContent = "Voz Doce: 'Por que você me deixa aqui moço?...'"; elOlhoPensamento.textContent = "Arthur: 'O choro é convincente, mas ela não projeta sombra no chão da lente!'"; }
            else if (tipoVisitaAtual === "anomalia") { elOlhoEscuta.textContent = "Fora: [Zumbido ensurdecedor de fusível explodindo]"; elOlhoPensamento.textContent = "Arthur: 'O arco de plasma está derretendo o trinco por fora!'"; }
        }, 300);
    } else { elOlhoEscuta.textContent = "Fora: [Corredor deserto imerso em silêncio e mofo]"; elOlhoPensamento.textContent = "Arthur: 'Apenas paredes escuras.'"; }
});

btnVoltar.addEventListener('click', () => { 
    transicionarTela(telaOlho, telaQuarto); 
    elCaixaDialogo.className = "caixa-dialogo idled"; 
    clearInterval(loopAudioOlho); 
    somSusto.pause(); 
});

// Ação do Botão Abrir Porta (Conversa trancada ou Abertura de Risco)
btnAbrirPorta.addEventListener('click', () => {
    clearInterval(loopAudioOlho);
    if (!eventoEmAndamento) {
        oxigenioQuarto = 100; barraOxigenio.style.width = "100%";
        falarMensagemSimples("Arthur", "arthur", "Abri a porta... O ar gélido ventila o quarto. Nenhum monstro à vista.");
        return;
    }
    if (portaTrancada) { 
        acionarConversaPelaPortaTrancada(); 
        return; 
    }

    clearTimeout(timeoutAcao); 
    elMacaneta.className = "macaneta"; 
    document.getElementById('marcas-arranhao').classList.add('hidden');

    if (tipoVisitaAtual === "homem-alto") { iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: "Olá?..." }, { nome: "Efeito", tipo: "monstro", texto: "* A porta explode para dentro e uma silhueta esguia te engole de imediato! *" }], () => finalizarJogo("MORTE_MONSTRO")); } 
    else if (tipoVisitaAtual === "vizinho") { iniciarSequenciaDialogos(BANCO_DIALOGOS["vizinho_salvo"], () => { oxigenioQuarto = 100; recuarAmeaca("Você acolheu o Sr. Clóvis. Ele está trêmulo no canto do seu quarto."); }); } 
    else if (tipoVisitaAtual === "entregador") {
        if (horaAtiva >= 3) { iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: "Pronto..." }, { nome: "Voz Familiar", tipo: "monstro", texto: "* O couro do rosto do mímico se rasga revelando fileiras de dentes! *" }], () => finalizarJogo("MORTE_IMPOSTOR")); } 
        else { iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: "Obrigado." }, { nome: "Entregador", tipo: "neutro", texto: "Valeu chefe. Cuidado esta noite." }], () => { oxigenioQuarto = 100; recuarAmeaca("Você jantou. Esse entregador era real."); }); }
    } 
    else if (tipoVisitaAtual === "garotinha") { iniciarSequenciaDialogos([{ nome: "Arthur", tipo: "arthur", texto: "Entra pequ..." }, { nome: "Efeito", tipo: "monstro", texto: "* O espectro abre uma mandíbula de ferro que arranca sua consciência *" }], () => finalizarJogo("MORTE_GAROTINHA")); } 
    else if (tipoVisitaAtual === "anomalia") { iniciarSequenciaDialogos([{ nome: "Efeito", tipo: "monstro", texto: "* A descarga de plasma queima seu sistema nervoso instantaneamente *" }], () => finalizarJogo("MORTE_MONSTRO")); }
});

// Sistema de Grudar Perguntas e Investigação pela Barreira de Madeira
function acionarConversaPelaPortaTrancada() {
    if (tipoVisitaAtual === "homem-alto") {
        falarMensagemSimples("Arthur", "arthur", "Bata o quanto quiser, seu monstro imundo! Essa madeira não vai ceder!");
    } 
    else if (tipoVisitaAtual === "vizinho") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", tipo: "arthur", texto: "Sr. Clóvis? Responda rápido para eu saber se é você mesmo... qual o nome da sua falecida esposa?" }
        ], {
            ehEscolha: true,
            opcoes: [
                { texto: "'É Marta. Nós fomos casados por quarenta anos!'", acao: () => responderVizinho(true) },
                { texto: "'Eu... eu esqueci... minha cabeça está confusa aqui fora...'", acao: () => responderVizinho(false) }
            ]
        });
    }
    else if (tipoVisitaAtual === "entregador" && horaAtiva >= 3) {
        iniciarSequenciaDialogos([
            { nome: "Arthur", tipo: "arthur", texto: "Você não engana ninguém com essa imitação! Vá embora do meu andar!" }
        ], {
            ehEscolha: true,
            opcoes: [
                { texto: "Desafiar: 'Eu vou desligar o disjuntor e te deixar no breu total!'", acao: () => responderImpostor(true) },
                { texto: "Hesitar: 'Mãe... é você de verdade? Por que está aqui?'", acao: () => responderImpostor(false) }
            ]
        });
    }
    else if (tipoVisitaAtual === "garotinha") {
        iniciarSequenciaDialogos([
            { nome: "Arthur", tipo: "arthur", texto: "Quem deixou você andar sozinha pelo Bloco B a essa hora da noite, garota?" }
        ], {
            ehEscolha: true,
            opcoes: [
                { text: "Acolher: 'Fique calma na soleira, eu vou te proteger pela madeira.'", acao: () => responderGarotinha(true) },
                { text: "Investigar: 'Se você é humana, cante a música de ninar do Bloco B!'", acao: () => responderGarotinha(false) }
            ]
        });
    }
    else {
        falarMensagemSimples("Arthur", "arthur", "Afaste-se da minha entrada! Não há nada para você aqui!");
    }
}

function responderVizinho(acertouPergunta) {
    if (acertouPergunta) {
        iniciarSequenciaDialogos([
            { nome: "Sr. Clóvis", tipo: "neutro", texto: "Marta... Marta! Ela faleceu no quarto andar daquele hospital velho... Por favor Arthur, me deixa entrar!" },
            { nome: "Arthur", tipo: "pensamento", texto: "Ele lembrou perfeitamente da dor afetiva profunda. O mimetismo biológico do prédio falharia nessa checagem. É o Clóvis real! Posso abrir se eu quiser." }
        ]);
    } else {
        iniciarSequenciaDialogos([
            { nome: "Sr. Clóvis", tipo: "monstro", texto: "ESPOSA... MATÉRIA... MEMÓRIA... TUDO VAI... DERRETER... NO QUARTO ANDAR..." },
            { nome: "Arthur", tipo: "pensamento", texto: "CÉUS! A ganância fez o disfarce dele falhar! A voz dela distorceu de forma demoníaca! É um impostor perigoso!" }
        ]);
    }
}

function responderImpostor(desafiou) {
    if (desafiou) {
        clearTimeout(timeoutAcao);
        iniciarSequenciaDialogos([
            { nome: "Voz Familiar", tipo: "monstro", texto: "INQUILINO DESGRAÇADO... VOCÊ SUPORTA BEM A PARANOIA..." }
        ], () => recuarAmeaca("O mímico percebeu que seu disfarce psicológico foi quebrado e subiu as escadas de incêndio correndo em fúria."));
    } else {
        sanidade -= 30; 
        iniciarSequenciaDialogos([
            { nome: "Voz Familiar", tipo: "monstro", texto: "Sim... meu filho... abra para a mamãe... abra o ferrolho..." },
            { nome: "Arthur", tipo: "pensamento", texto: "Minha cabeça está queimando! A simulação afetiva está destruindo minha linha de raciocínio lógico! Preciso resistir!" }
        ]);
    }
}

function responderGarotinha(foiGentil) {
    if (foiGentil) {
        sanidade -= 25;
        iniciarSequenciaDialogos([
            { nome: "Garotinha", tipo: "monstro", texto: "OBRIGADA... SEU CORAÇÃO É TÃO... QUENTINHO... NÓS ADORAMOS ESCUTAR..." },
            { nome: "Arthur", tipo: "pensamento", texto: "Que tontura... sinto como se a voz dela estivesse invadindo meu crânio mesmo com a porta trancada! Ela está me hipnotizando!" }
        ]);
    } else {
        clearTimeout(timeoutAcao);
        iniciarSequenciaDialogos([
            { nome: "Garotinha", tipo: "monstro", texto: "A MÚSICA... AS NOTAS... ELAS QUEIMAM NOSSA MANDÍBULA!" }
        ], () => recuarAmeaca("O espectro infantil deu um grito agudo ensurdecedor e evaporou do corredor ao ter sua natureza mística exposta."));
    }
}
