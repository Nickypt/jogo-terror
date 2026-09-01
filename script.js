// Gerenciamento de Estado do Sistema
let horaAtiva = 0;
let portaTrancada = false;
let luzCorredorLigada = true;
let eventoEmAndamento = false;
let tipoVisitaAtual = ""; 
let acaoTratada = false;
let loopRelogio, loopSorteio, timeoutAcao, loopSanidade;

// Mecânica de Sanidade (0 a 100)
let sanidade = 100; 

// --- SISTEMA DE ÁUDIO ---
const somBatida = new Audio("https://google.com");
const somSusto = new Audio("https://google.com"); 
const somEletrico = new Audio("https://google.com");

// Elementos do DOM
const gameContainer = document.getElementById('game-container');
const telaMenu = document.getElementById('tela-menu');
const telaIntro = document.getElementById('tela-intro');
const telaQuarto = document.getElementById('tela-quarto');
const telaOlho = document.getElementById('tela-olho');
const telaMensagem = document.getElementById('tela-mensagem');

const btnMenuJogar = document.getElementById('btn-menu-jogar');
const btnIniciar = document.getElementById('btn-iniciar');
const btnOlhoMagico = document.getElementById('btn-olho-magico');
const btnVoltar = document.getElementById('btn-voltar');
const btnTrancar = document.getElementById('btn-trancar');
const btnLuz = document.getElementById('btn-luz');

const txtRelogio = document.getElementById('relogio');
const txtPorta = document.getElementById('status-porta');
const barraSanidade = document.getElementById('barra-sanidade-nivel');
const txtUiTop = document.getElementById('ui-top');
const txtTituloFim = document.getElementById('titulo-fim');
const txtTextoFim = document.getElementById('texto-fim');
const txtSubtextoFim = document.getElementById('subtexto-fim');

const elCaixaDialogo = document.getElementById('caixa-dialogo-quarto');
const txtFalante = document.getElementById('texto-falante');
const txtNomeFalante = document.getElementById('nome-falante');
const elMacaneta = document.getElementById('macaneta-porta');
const elCorredor = document.getElementById('corredor-fundo');
const elEntidade = document.getElementById('entidade');

// --- FUNÇÃO AUXILIAR PARA TRANSIÇÃO COM ESTÁTICA ---
function transicionarTela(telaSair, telaEntrar, tipoEfeito = "fade") {
    gameContainer.classList.add('estatica-transicao');
    
    setTimeout(() => {
        telaSair.classList.add('hidden');
        telaEntrar.classList.remove('hidden');
        
        gameContainer.classList.remove('estatica-transicao');
        telaEntrar.classList.add('fade-in-efeito');
        
        if (tipoEfeito === "olho") {
            const lente = document.querySelector('.lente-circulo');
            lente.classList.add('piscar-olho-transicao');
            setTimeout(() => lente.classList.remove('piscar-olho-transicao'), 400);
        }

        setTimeout(() => {
            telaEntrar.classList.remove('fade-in-efeito');
        }, 600);
    }, 200);
}

// --- EVENTO 1: CLIQUE NO MENU PRINCIPAL ---
btnMenuJogar.addEventListener('click', () => {
    somEletrico.play().catch(() => {});
    transicionarTela(telaMenu, telaIntro, "fade");
});

// --- EVENTO 2: CLIQUE NO BILHETE DA INTRODUÇÃO ---
btnIniciar.addEventListener('click', () => {
    transicionarTela(telaIntro, telaQuarto, "fade");
    txtUiTop.classList.remove('hidden'); 
    exibirDialogo("Arthur", "Que bilhete bizarro... Isso deve ser um trote dos moradores antigos. Mas é melhor ficar atento.", false);
    iniciarCiclosDoJogo();
});

function exibirDialogo(nome, texto, erro = false) {
    elCaixaDialogo.classList.remove('idled');
    txtNomeFalante.textContent = nome + ":";
    txtFalante.textContent = texto;
    txtNomeFalante.style.color = erro ? "red" : "#33ff33";
    elCaixaDialogo.style.borderColor = erro ? "red" : "#33ff33";
}

// --- ROTAS DE CÂMERA / TELAS ---
btnOlhoMagico.addEventListener('click', () => {
    transicionarTela(telaQuarto, telaOlho, "olho");
    
    if(eventoEmAndamento) {
        somSusto.loop = true;
        somSusto.play().catch(() => {});

        if(tipoVisitaAtual === "homem-alto") {
            exibirDialogo("Arthur", "O que diabos... Aquela silhueta longa não se move... Seus braços quase tocam o chão!", true);
        } else if (tipoVisitaAtual === "vizinho") {
            exibirDialogo("Sr. Clóvis (Apto 403)", "Arthur, meu filho? Por favor abra a porta... Ouvi passos pesados aqui fora.");
        } else if (tipoVisitaAtual === "entregador") {
            exibirDialogo("Entregador", "Entrega para o 404! Pizza quentinha, patrão!");
        }
    } else {
        exibirDialogo("Arthur", "O corredor está completamente deserto e gelado.", false);
    }
});

btnVoltar.addEventListener('click', () => {
    transicionarTela(telaOlho, telaQuarto, "fade");
    elCaixaDialogo.classList.add('idled');
    somSusto.pause(); 
});

// --- TRANCAR PORTA & INTERRUPTOR ---
btnTrancar.addEventListener('click', () => {
    portaTrancada = !portaTrancada;
    if (portaTrancada) {
        btnTrancar.textContent = "DESTRANCAR PORTA";
        txtPorta.textContent = "PORTA: TRANCADA";
        txtPorta.style.color = "#da4939";
    } else {
        btnTrancar.textContent = "TRANCAR PORTA";
        txtPorta.textContent = "PORTA: DESTRANCADA";
        txtPorta.style.color = "#33ff33";
    }
});

btnLuz.addEventListener('click', () => {
    luzCorredorLigada = !luzCorredorLigada;
    somEletrico.play().catch(() => {});
    atualizarRenderLuz();
});

function atualizarRenderLuz() {
    if (!luzCorredorLigada) {
        elCorredor.className = "corredor-luz-desligada";
    } else {
        elCorredor.className = (tipoVisitaAtual === "homem-alto") ? "corredor-luz-ligada corredor-luz-piscando" : "corredor-luz-ligada";
    }
}

// --- CICLOS DO CRONÔMETRO ---
function iniciarCiclosDoJogo() {
    loopRelogio = setInterval(() => {
        horaAtiva++;
        txtRelogio.textContent = `0${horaAtiva}:00 AM`;
        if (horaAtiva >= 6) finalizarJogo("VITORIA");
    }, 45000);

    loopSorteio = setInterval(() => {
        if (!eventoEmAndamento && horaAtiva < 6) {
            if (Math.random() > 0.4) dispararVisitaAleatoria();
        }
    }, 18000);

    // Loop de Controle da Sanidade
    loopSanidade = setInterval(() => {
        if (eventoEmAndamento && !telaOlho.classList.contains('hidden') && tipoVisitaAtual === "homem-alto") {
            sanidade -= 6; 
        } else if (sanidade < 100 && !eventoEmAndamento) {
            sanidade += 1; 
        }

        sanidade = Math.max(0, Math.min(100, sanidade));
        barraSanidade.style.width = `${sanidade}%`;

        if (sanidade > 50) {
            barraSanidade.style.backgroundColor = "#33ff33";
            gameContainer.classList.remove('tremer-tela');
        } else if (sanidade <= 50 && sanidade > 20) {
            barraSanidade.style.backgroundColor = "orange";
            gameContainer.classList.remove('tremer-tela');
        } else if (sanidade <= 20) {
            barraSanidade.style.backgroundColor = "red";
            gameContainer.classList.add('tremer-tela'); 
        }

        if (sanidade <= 0) {
            finalizarJogo("MORTE_SANIDADE");
        }
    }, 1000);
}

// --- MECÂNICA DE EVENTOS ---
function dispararVisitaAleatoria() {
    eventoEmAndamento = true;
    
    let pools = ["homem-alto", "vizinho", "entregador"];
    tipoVisitaAtual = pools[Math.floor(Math.random() * pools.length)];
    
    elEntidade.className = tipoVisitaAtual;
    elEntidade.classList.remove('hidden');
    
    somBatida.play().catch(() => {});
    elMacaneta.classList.add('macaneta-mexendo');
    exibirDialogo("Efeito", "* TOC, TOC, TOC! Alguém força a maçaneta da sua porta... *", true);
    atualizarRenderLuz();

    timeoutAcao = setTimeout(() => {
        evaluarAcoesJogador();
    }, 14000);
}

function evaluarAcoesJogador() {
    elMacaneta.classList.remove('macaneta-mexendo');
    elEntidade.classList.add('hidden');
    somSusto.pause(); 
    
    if(tipoVisitaAtual === "homem-alto") {
        if(!luzCorredorLigada || portaTrancada) {
            recuarAmeaca("A silhueta sumiu na escuridão do corredor.");
        } else {
            finalizarJogo("MORTE_MONSTRO");
        }
    } 
    else if(tipoVisitaAtual === "vizinho") {
        if(portaTrancada) {
            recuarAmeaca("Você ouve um grito abafado no corredor. O Sr. Clóvis desapareceu.");
            window.vizinhoMorto = true;
        } else {
            exibirDialogo("Arthur", "Era apenas o idoso do 403 procurando ajuda. Você o acalmou.");
            eventoEmAndamento = false;
        }
    } 
    else if(tipoVisitaAtual === "entregador") {
        if(horaAtiva >= 3) {
            if(portaTrancada || !luzCorredorLigada) {
                recuarAmeaca("O disfarce falhou. A voz distorceu até sumir.");
            } else {
                finalizarJogo("MORTE_IMPOSTOR");
            }
        } else {
            if(!portaTrancada && luzCorredorLigada) {
                exibirDialogo("Arthur", "Peguei a comida. O entregador foi embora.");
                eventoEmAndamento = false;
            } else {
                recuarAmeaca("O entregador desistiu e foi embora.");
            }
        }
    }
}

function recuarAmeaca(mensagemSucesso) {
    exibirDialogo("Arthur", mensagemSucesso, false);
    eventoEmAndamento = false;
    tipoVisitaAtual = "";
    atualizarRenderLuz();
}

// --- GERENCIADOR DE FINAIS ---
function finalizarJogo(motivo) {
    clearInterval(loopRelogio);
    clearInterval(loopSorteio);
    clearInterval(loopSanidade);
    clearTimeout(timeoutAcao);
    somSusto.pause();

    telaMensagem.classList.remove('hidden');
    telaQuarto.classList.add('hidden');
    telaOlho.classList.add('hidden');

    if (motivo === "VITORIA") {
        if(window.vizinhoMorto) {
            txtTituloFim.textContent = "FINAL 3: ISOLAMENTO PARANOICO";
            txtTituloFim.style.color = "orange";
Use o código com cuidado.txtTextoFim.textContent = "Você sobreviveu trancando tudo, mas o Sr. Clóvis foi pego por sua causa. Ao escolher o egoísmo por medo, você quebrou sua própria mente.";} else {txtTituloFim.textContent = "FINAL 1: O AMANHECER";txtTituloFim.style.color = "#33ff33";txtTextoFim.textContent = "06:00 AM. O sol raiou e limpou o corredor. Você recolhe suas malas e deixa o Apartamento 404 para sempre!";}}else if (motivo === "MORTE_MONSTRO") {txtTituloFim.textContent = "FINAL 2: ERRO DE EXISTÊNCIA";txtTituloFim.style.color = "#da4939";txtTextoFim.textContent = "Você olhou demais sem se proteger. A silhueta quebrou a tranca e te arrastou para o vazio do 4º andar.";}else if (motivo === "MORTE_IMPOSTOR") {txtTituloFim.textContent = "FINAL 4: DISFARCE COGNITIVO";txtTituloFim.style.color = "#da4939";txtTextoFim.textContent = "Você abriu a porta para o falso entregador após as 03h. Sua mente colapsou ao ver a verdadeira face dele.";}else if (motivo === "MORTE_SANIDADE") {txtTituloFim.textContent = "FINAL 5: COLAPSO PSICÓTICO";txtTituloFim.style.color = "purple";txtTextoFim.textContent = "Sua sanidade chegou a 0%. Ficar encarando o Homem Alto pelo olho mágico derreteu sua percepção da realidade. Você perdeu o controle e abriu a porta por conta própria.";}}