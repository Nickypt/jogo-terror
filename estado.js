// ==========================================================================
// GERENCIADOR DE ESTADO GLOBAL E PERSISTÊNCIA DO SISTEMA
// ==========================================================================
let horaAtiva = 0;
let portaTrancada = false;
let luzCorredorLigada = true;
let eventoEmAndamento = false;
let tipoVisitaAtual = ""; 
let sanidade = 100;

// Loops, Timers e Escutas Ativas
let loopRelogio, loopSorteio, timeoutAcao, loopSanidade, loopAudioOlho;

// Instanciação e Manipulação de Áudio
const somBatida = new Audio("https://google.com");
const somSusto = new Audio("https://google.com"); 
const somEletrico = new Audio("https://google.com");

// Mapeamento dos Elementos Dom Ativos
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
const txtStatusLuz = document.getElementById('txt-status-luz');

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

const elOlhoEscuta = document.getElementById('olho-escuta');
const elOlhoPensamento = document.getElementById('olho-pensamento');

// Rastreio e Atualização LocalStorage de Finais
function atualizarMenuFinais() {
    const finaisConquistados = JSON.parse(localStorage.getItem('apto404_finais')) || {};
    const listaFinais = {
        'F1': { id: 'f1', texto: 'FINAL 1: O AMANHECER (Sobreviveu à Noite)' },
        'F2': { id: 'f2', texto: 'FINAL 2: ERRO DE EXISTÊNCIA (O Homem Alto te levou)' },
        'F3': { id: 'f3', texto: 'FINAL 3: ISOLAMENTO PARANOICO (Ignorou o Sr. Clóvis)' },
        'F4': { id: 'f4', texto: 'FINAL 4: DISFARCE COGNITIVO (Enganado pelo Impostor)' },
        'F5': { id: 'f5', texto: 'FINAL 5: COLAPSO PSICÓTICO (Sanidade Derretida)' },
        'F6': { id: 'f6', texto: 'FINAL 6: ALMA APRISIONADA (Abriu para a Garotinha)' }
    };
    for (let chave in listaFinais) {
        if (finaisConquistados[chave]) {
            const el = document.getElementById(listaFinais[chave].id);
            if (el) { el.textContent = listaFinais[chave].texto; el.className = 'final-desbloqueado'; }
        }
    }
}

function salvarFinal(chaveFinal) {
    let finaisConquistados = JSON.parse(localStorage.getItem('apto404_finais')) || {};
    finaisConquistados[chaveFinal] = true;
    localStorage.setItem('apto404_finais', JSON.stringify(finaisConquistados));
}

// Roda automaticamente para desenhar o menu inicial
atualizarMenuFinais();
