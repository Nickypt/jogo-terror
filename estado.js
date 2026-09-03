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
const btnLimparDados = document.getElementById('btn-limpar-dados');
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

// --- SISTEMA DE GESTÃO DE JOGADOR E EXCLUSÃO DE FINAIS ---
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

    let possuiFinais = false;

    for (let chave in listaFinais) {
        const el = document.getElementById(listaFinais[chave].id);
        if (el) {
            if (finaisConquistados[chave]) {
                el.textContent = listaFinais[chave].texto;
                el.className = 'final-desbloqueado';
                possuiFinais = true;
            } else {
                el.textContent = "FINAL " + listaFinais[chave].id.replace('f', '') + ": ???";
                el.className = 'final-bloqueado';
            }
        }
    }

    // Exibe ou esconde o botão de apagar progresso dinamicamente
    btnLimparDados.style.display = possuiFinais ? "block" : "none";
}

function salvarFinal(chaveFinal) {
    let finaisConquistados = JSON.parse(localStorage.getItem('apto404_finais')) || {};
    finaisConquistados[chaveFinal] = true;
    localStorage.setItem('apto404_finais', JSON.stringify(finaisConquistados));
}

// Ouvinte do botão de limpar progresso no Menu
btnLimparDados.addEventListener('click', (e) => {
    e.stopPropagation();
    if(confirm("Deseja apagar todos os registros de sobrevivência arquivados neste terminal?")) {
        localStorage.removeItem('apto404_finais');
        atualizarMenuFinais();
    }
});

// Executa na inicialização
atualizarMenuFinais();
