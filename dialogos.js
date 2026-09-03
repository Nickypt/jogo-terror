// ==========================================================================
// MOTOR NARRATIVO VISUAL NOVEL COM RENDERIZAÇÃO CARACTERE POR CARACTERE
// ==========================================================================
let filaDialogos = [];
let callbackAoTerminar = null;

// Parâmetros do Efeito Máquina de Escrever
let intervaloTexto = null;
let textoCompletoAtual = "";
let textoSendoExibido = false;
const VELOCIDADE_DIGITACAO = 25; // Milissegundos por letra

const BANCO_DIALOGOS = {
    "homem-alto": [
        { nome: "Arthur", texto: "A maçaneta parou de mexer repentinamente... mas sinto uma pressão absurda no peito." },
        { nome: "Arthur", texto: "Parece que o ar ficou mais denso... Como se a geometria desse quarto estivesse entortando." }
    ],
    "vizinho_pede_ajuda": [
        { nome: "Sr. Clóvis", texto: "Arthur? Abre a porta rápido, por favor! Tem algo subindo o poço do elevador..." },
        { nome: "Sr. Clóvis", texto: "As regras do Bloco B mudaram! Eles mimetizam as pessoas... Não confie em quem parecer dócil demais!" },
        { nome: "Arthur", texto: "(Pensamento) O Sr. Clóvis parece assustado... mas e se for um truque da própria entidade para me induzir a abrir?" }
    ],
    "vizinho_salvo": [
        { nome: "Sr. Clóvis", texto: "Obrigado, meu jovem! Eu achei que seria o meu fim. Esse prédio... ele se alimenta dos isolados." },
        { nome: "Sr. Clóvis", texto: "Não passe muito tempo encarando o olho mágico. Aquela lente... distorce quem passa muito tempo olhando o vazio." }
    ],
    "entregador_normal": [
        { nome: "Entregador", texto: "Serviço de entregas MATRIX! Apartamento 404. Desculpe o atraso, a fiação do corredor tá horrível hoje." },
        { nome: "Arthur", texto: "A caixa de papelão exala cheiro de pizza... O rapaz parece só um funcionário comum." }
    ],
    "entregador_impostor": [
        { nome: "Voz Estranha", texto: "Sua... en-tre-ga... chegou... senhor Arthur..." },
        { nome: "Voz Estranha", texto: "Abra a porta... ela vai esfriar... nós... nós queremos tanto entrar..." },
        { nome: "Arthur", texto: "(Pensamento) Que voz bizarra... Soa como se várias frequências estivessem tentando falar ao mesmo tempo." }
    ],
    "garotinha_falsa": [
        { nome: "Garotinha", texto: "Moço? Tem alguém aí? A minha mãe me deixou aqui fora e sumiu no fim do corredor..." },
        { nome: "Garotinha", texto: "Está escuro e estou com muito medo dos barulhos nas paredes. Deixa eu entrar só um pouquinho?" },
        { nome: "Arthur", texto: "(Pensamento) Ela soa muito dócil e indefesa. Mas o bilhete foi claro: nem tudo o que tem forma humana pertence a este mundo." }
    ],
    "anomalia_eletrica": [
        { nome: "Efeito", texto: "* Um estalo violento de alta tensão atravessa a folha da porta, soltando faíscas pelas tomadas do quarto *" },
        { nome: "Arthur", texto: "Essa massa plasmática está se alimentando do circuito elétrico lá fora! Se eu não desligar o interruptor, ela frita a fechadura!" }
    ]
};

function iniciarSequenciaDialogos(lista, acaoFinal = null) {
    filaDialogos = [...lista];
    callbackAoTerminar = acaoFinal;
    avancarDialogo();
}

function falarMensagemSimples(nome, texto) {
    iniciarSequenciaDialogos([{ nome: nome, texto: texto }]);
}

function avancarDialogo() {
    // Se o texto anterior ainda estiver sendo digitado, o clique força a exibição completa instantânea
    if (textoSendoExibido) {
        clearInterval(intervaloTexto);
        txtFalante.textContent = textoCompletoAtual;
        textoSendoExibido = false;
        return;
    }

    if (filaDialogos.length === 0) {
        elCaixaDialogo.classList.add('idled');
        if (callbackAoTerminar) {
            let acao = callbackAoTerminar;
            callbackAoTerminar = null;
            acao();
        }
        return;
    }

    const falaAtual = filaDialogos.shift();
    elCaixaDialogo.classList.remove('idled');
    txtNomeFalante.textContent = falaAtual.nome + ":";
    
    // Configura os parâmetros da digitação progressiva
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
        }
    }, VELOCIDADE_DIGITACAO);

    // Diferenciação Cromática Narrativa
    if (falaAtual.nome === "Arthur") {
        txtNomeFalante.style.color = "#26b326";
    } else if (falaAtual.nome === "Efeito" || falaAtual.nome === "Voz Estranha") {
        txtNomeFalante.style.color = "#a31c1c";
    } else {
        txtNomeFalante.style.color = "orange";
    }
}

// Ouvinte de clique unificado na caixa de diálogo
elCaixaDialogo.addEventListener('click', (e) => {
    e.stopPropagation();
    avancarDialogo();
});
