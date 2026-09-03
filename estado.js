// ==========================================================================
// GERENCIADOR DE ESTADO GLOBAL E PERSISTÊNCIA DO SISTEMA
// ==========================================================================
let horaAtiva = 0;
let portaTrancada = false;
let luzCorredorLigada = true;
let eventoEmAndamento = false;
let tipoVisitaAtual = ""; 
let sanidade = 100;

let lanternaLigada = false;
let bateriaLanterna = 100;
let nomeJogadorAtual = "CONVIDADO";

// NOVO: Controle das Quedas de Energia do Apartamento
let energiaQuartoAtiva = true; 

let segundosNestaPartida = 0;
let loopContadorTempo;

let loopRelogio, loopSorteio, timeoutAcao, loopSanidade, loopAudioOlho, loopBateria, loopQuedaEnergia;

let oxigenioQuarto = 100;
const barraOxigenio = document.getElementById('barra-oxigenio-nivel');

const somBatida = new Audio("https://google.com");
const somSusto = new Audio("https://google.com"); 
const somEletrico = new Audio("https://google.com");

const somChiadoMenu = new Audio("https://soundjay.com"); 
somChiadoMenu.loop = true;
somChiadoMenu.volume = 0.15; 

const gameContainer = document.getElementById('game-container');
const telaMenu = document.getElementById('tela-menu');
const telaIntro = document.getElementById('tela-intro');
const telaQuarto = document.getElementById('tela-quarto');
const telaOlho = document.getElementById('tela-olho');
const telaMensagem = document.getElementById('tela-mensagem');
const elJumpscare = document.getElementById('jumpscare-container');

const btnMenuJogar = document.getElementById('btn-menu-jogar');
const btnIniciar = document.getElementById('btn-iniciar');
const btnOlhoMagico = document.getElementById('btn-olho-magico');
const btnVoltar = document.getElementById('btn-voltar');
const btnTrancar = document.getElementById('btn-trancar');
const btnAbrirPorta = document.getElementById('btn-abrir-porta');
const btnLuz = document.getElementById('btn-luz');
const btnLanterna = document.getElementById('btn-lanterna');
const btnLimparDados = document.getElementById('btn-limpar-dados');
const inputNome = document.getElementById('input-nome');

const txtRelogio = document.getElementById('relogio');
const txtPorta = document.getElementById('status-porta');
const barraSanidade = document.getElementById('barra-sanidade-nivel');
const barraBateria = document.getElementById('barra-bateria-nivel');
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

const elOlhoEscuta = document.getElementById('olho-escuta');
const elOlhoPensamento = document.getElementById('olho-pensamento');
const elContainerEscolhas = document.getElementById('container-escolhas');

const txtStatTentativas = document.getElementById('stat-tentativas');
const txtStatTempo = document.getElementById('stat-tempo');

function obterChaveArmazenamento() { return `apto404_finais_${nomeJogadorAtual.toUpperCase().trim() || 'CONVIDADO'}`; }
function obterChaveEstatisticas() { return `apto404_stats_${nomeJogadorAtual.toUpperCase().trim() || 'CONVIDADO'}`; }

function atualizarMenuFinais() {
    const chave = obterChaveArmazenamento();
    const chaveStats = obterChaveEstatisticas();
    document.getElementById('titulo-finais-nome').textContent = `ARQUIVO DE: ${nomeJogadorAtual.toUpperCase()}`;
    
    const finaisConquistados = JSON.parse(localStorage.getItem(chave)) || {};
    const listaFinais = {
        'F1': { id: 'f1', texto: 'FINAL 1: O AMANHECER (Sobreviveu à Noite)' },
        'F2': { id: 'f2', texto: 'FINAL 2: ERRO DE EXISTÊNCIA (O Homem Alto te levou)' },
        'F3': { id: 'f3', texto: 'FINAL 3: ISOLAMENTO PARANOICO (Ignorou o Sr. Clóvis)' },
        'F4': { id: 'f4', texto: 'FINAL 4: DISFARCE COGNITIVO (Enganado pelo Impostor)' },
        'F5': { id: 'f5', texto: 'FINAL 5: COLAPSO PSICÓTICO (Sanidade Derretida)' },
        'F6': { id: 'f6', texto: 'FINAL 6: ALMA APRISIONADA (Abriu para a Garotinha)' }
    };
    
    let possuiDados = false;
    for (let chaveFinal in listaFinais) {
        const el = document.getElementById(listaFinais[chaveFinal].id);
        if (el) {
            if (finaisConquistados[chaveFinal]) { el.textContent = listaFinais[chaveFinal].texto; el.className = 'final-desbloqueado'; possuiDados = true; }
            else { el.textContent = "FINAL " + listaFinais[chaveFinal].id.replace('f', '') + ": ???"; el.className = 'final-bloqueado'; }
        }
    }

    const stats = JSON.parse(localStorage.getItem(chaveStats)) || { tentativas: 0, segundosVividos: 0 };
    txtStatTentativas.textContent = stats.tentativas;
    const totalMinutos = Math.floor(stats.segundosVividos / 60);
    const horas = Math.floor(totalMinutos / 60);
    const minutosRestantes = totalMinutos % 60;
    txtStatTempo.textContent = `${horas}h ${minutosRestantes < 10 ? '0' : ''}${minutosRestantes}m`;

    if (stats.tentativas > 0 || stats.segundosVividos > 0) possuiDados = true;
    btnLimparDados.style.display = possuiDados ? "block" : "none";
}

function salvarFinal(chaveFinal) {
    const chave = obterChaveArmazenamento();
    let finaisConquistados = JSON.parse(localStorage.getItem(chave)) || {};
    finaisConquistados[chaveFinal] = true;
    localStorage.setItem(chave, JSON.stringify(finaisConquistados));
}

function adicionarTentativaEstatistica() {
    const chave = obterChaveEstatisticas();
    let stats = JSON.parse(localStorage.getItem(chave)) || { tentativas: 0, segundosVividos: 0 };
    stats.tentativas += 1;
    localStorage.setItem(chave, JSON.stringify(stats));
}

function salvarTempoVividoEstatistica(segundosAdicionais) {
    const chave = obterChaveEstatisticas();
    let stats = JSON.parse(localStorage.getItem(chave)) || { tentativas: 0, segundosVividos: 0 };
    stats.segundosVividos += segundosAdicionais;
    localStorage.setItem(chave, JSON.stringify(stats));
}

window.addEventListener('mouseenter', () => {
    if (telaQuarto.classList.contains('hidden') && telaMensagem.classList.contains('hidden')) {
        somChiadoMenu.play().catch(() => {});
    }
}, { once: true });

inputNome.addEventListener('input', () => { nomeJogadorAtual = inputNome.value.trim() || "CONVIDADO"; atualizarMenuFinais(); });
btnLimparDados.addEventListener('click', (e) => { e.stopPropagation(); if(confirm(`Deseja apagar progressos de [${nomeJogadorAtual.toUpperCase()}]?`)) { localStorage.removeItem(obterChaveArmazenamento()); localStorage.removeItem(obterChaveEstatisticas()); atualizarMenuFinais(); } });

atualizarMenuFinais();