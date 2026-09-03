// ==========================================================================
// MOTOR NARRATIVO VISUAL NOVEL COM MÁQUINA DE ESCOLHAS E BALÕES DINÂMICOS
// ==========================================================================
let filaDialogos = [];
let callbackAoTerminar = null;
let intervaloTexto = null;
let textoCompletoAtual = "";
let textoSendoExibido = false;
const VELOCIDADE_DIGITACAO = 25; 

const BANCO_DIALOGOS = {
    "homem-alto": [
        { nome: "Efeito", tipo: "monstro", texto: "* CRASH! A porta treme violentamente sob um golpe brutal. Madeiras começam a estalar! *" },
        { nome: "Arthur", tipo: "pensamento", texto: "Ai minha cabeça! Esse som arranhando a fechadura por fora está perfurando meus tímpanos! Que agonia!" }
    ],
    "vizinho_pede_ajuda": [
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Arthur? Abre a porta rápido, por favor! Tem algo subindo o poço do elevador..." },
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Eu sei que você está assustado, mas olhe nos meus olhos pelo vidro... sou eu! Você me conhece desde criança!" },
        { nome: "Arthur", tipo: "pensamento", texto: "Ele sabe meu nome... sabe do problema de saúde dele... Mas e se isso for só mimetismo cognitivo?" }
    ],
    "vizinho_salvo": [
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Deus te abençoe... Aquela coisa... ela repetiu a voz da minha falecida esposa para me atrair até o corredor." },
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Eles copiam nossas memórias superficiais quando estão perto. Não confie em nada que saiba muito sobre você." }
    ],
    "entregador_normal": [
        { nome: "Entregador", tipo: "neutro", texto: "Entrega! Pizza do terminal 4! Rapaz, abre aí, esse corredor tá com um cheiro insuportável de carniça." },
        { nome: "Arthur", tipo: "pensamento", texto: "Ele reclama e bate o pé como qualquer pessoa normal faria." }
    ],
    "entregador_impostor": [
        { nome: "Voz Familiar", tipo: "monstro", texto: "Filho? É a mamãe... eu esqueci a chave e trouxe aquela janta que você tanto gosta..." },
        { nome: "Voz Familiar", tipo: "monstro", texto: "Abra a porta para a mamãe... está escuro... e meus braços estão... crescendo..." },
        { nome: "Arthur", tipo: "pensamento", texto: "Minha mãe não mora nesse estado! Esse demônio roubou minhas memórias para tentar me quebrar!" }
    ],
    "garotinha_falsa": [
        { nome: "Garotinha", tipo: "neutro", texto: "Por favor... me ajuda... tem um homem muito alto sem rosto no fim do corredor... ele quer me pegar..." },
        { nome: "Garotinha", tipo: "neutro", texto: "Ele está vindo! Abre moço! Eu sou só uma criança, por que você é tão cruel de me deixar morrer?!" },
        { nome: "Arthur", tipo: "pensamento", texto: "O pânico na voz dela é idêntico ao de um ser humano... Que armadilha psicológica maldita!" }
    ],
    "anomalia_eletrica": [
        { nome: "Efeito", tipo: "monstro", texto: "* Um estalo violento de arco voltaico percorre a porta. O quarto é iluminado por fagulhas elétricas e fumaça *" },
        { nome: "Arthur", tipo: "pensamento", texto: "A coisa está sugando a fiação! Se a luz continuar ativa, o curto vai derreter o trinco e abrir a porta por fora!" }
    ]
};

function iniciarSequenciaDialogos(lista, acaoFinal = null) {
    filaDialogos = [...lista];
    callbackAoTerminar = acaoFinal;
    elContainerEscolhas.classList.add('hidden');
    elContainerEscolhas.innerHTML = "";
    avancarDialogo();
}

function falarMensagemSimples(nome, tipo, texto) {
    iniciarSequenciaDialogos([{ nome: nome, tipo: tipo, texto: texto }]);
}

function avancarDialogo() {
    if (textoSendoExibido) {
        clearInterval(intervaloTexto);
        txtFalante.textContent = textoCompletoAtual;
        textoSendoExibido = false;
        if (filaDialogos.length === 0 && callbackAoTerminar && callbackAoTerminar.ehEscolha) {
            renderizarMenuEscolhas(callbackAoTerminar.opcoes);
        }
        return;
    }

    if (filaDialogos.length === 0) {
        if (!callbackAoTerminar || !callbackAoTerminar.ehEscolha) {
            elCaixaDialogo.className = "caixa-dialogo idled";
            if (callbackAoTerminar) {
                let acao = callbackAoTerminar;
                callbackAoTerminar = null;
                acao();
            }
        } else {
            renderizarMenuEscolhas(callbackAoTerminar.opcoes);
        }
        return;
    }

    const falaAtual = filaDialogos.shift();
    elCaixaDialogo.className = `caixa-dialogo balao-${falaAtual.tipo || 'arthur'}`;
    txtNomeFalante.textContent = falaAtual.nome + ":";
    
    textoCompletoAtual = falaAtual.texto;
    txtFalante.textContent = "";
    textoSendoExibido = true;
    
    let indiceLetra = 0;
    intervaloTexto = setInterval(() => {
        txtFalante.textContent += textoCompletoAtual[indiceLetra];
        indiceLetra++;
        if (indiceLetra >= textoCompletoAtual.length) {
            clearInterval(intervaloTexto);
            textoSendoExibido = false;
            if (filaDialogos.length === 0 && callbackAoTerminar && callbackAoTerminar.ehEscolha) {
                renderizarMenuEscolhas(callbackAoTerminar.opcoes);
            }
        }
    }, VELOCIDADE_DIGITACAO);
}

function renderizarMenuEscolhas(opcoes) {
    document.getElementById('indicador-clique').style.opacity = "0";
    elContainerEscolhas.innerHTML = "";
    elContainerEscolhas.classList.remove('hidden');

    opcoes.forEach(opcao => {
        const btn = document.createElement('button');
        btn.className = "btn-opcao";
        btn.textContent = opcao.texto;
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            elContainerEscolhas.classList.add('hidden');
            document.getElementById('indicador-clique').style.opacity = "1";
            opcao.acao();
        });
        elContainerEscolhas.appendChild(btn);
    });
}

elCaixaDialogo.addEventListener('click', (e) => {
    if (!elContainerEscolhas.classList.contains('hidden')) return;
    e.stopPropagation();
    avancarDialogo();
});
