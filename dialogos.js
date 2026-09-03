let filaDialogos = [];
let callbackAoTerminar = null;
let intervaloTexto = null;
let textoCompletoAtual = "";
let textoSendoExibido = false;
const VELOCIDADE_DIGITACAO = 25; 

function obterFilaPrologo() {
    return [
        { nome: "Inquilino", tipo: "pensamento", texto: "Que lugar maldito... O Bloco B fede a mofo, isolamento e fiação queimada." },
        { nome: "Inquilino", tipo: "pensamento", texto: "'Regras do Bloco B à noite: se ouvir batidas, olhe pelo olho mágico antes de abrir.' Que aviso bizarro do ex-inquilino." },
        { nome: "Inquilino", tipo: "pensamento", texto: "São quase 00:00 AM. Meu turno está começando agora. É melhor eu testar a tranca da porta e as gavetas." }
    ];
}

const DIARIO_LORE = [
    { nome: "Diário Velho", tipo: "neutro", texto: "(Página arrancada, datada de 14 de Novembro de 1997)" },
    { nome: "Diário Velho", tipo: "neutro", texto: "'Eles aprenderam a simular rostos de parentes. Ontem eu vi meu irmão pelo vidro... mas ele piscava na frequência da lâmpada.'" },
    { nome: "Diário Velho", tipo: "neutro", texto: "'Se as luzes do apartamento queimarem, troque o fusível imediatamente. Eles ganham força na ausência de fótons de luz... Eles entram de graça no escuro...'" }
];

const BANCO_DIALOGOS = {
    "homem-alto": [
        { nome: "Efeito", tipo: "monstro", texto: "* CRASH! Um estrondo violentíssimo de garras rasga a madeira externa da porta! *" },
        { nome: "Inquilino", tipo: "pensamento", texto: "Ele não está só batendo... ele está tentando cavar a fechadura por fora! Que agonia!" }
    ],
    "vizinho_pede_ajuda": [
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Por favor! Abre a porta rápido! Tem algo subindo o poço do elevador..." },
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Eu sei que você está assustado com as regras do prédio, mas você me conhece! Abre!" },
        { nome: "Inquilino", tipo: "pensamento", texto: "A silhueta confere... Mas o mimetismo consome memórias. Devo testar a mente dele pela porta." }
    ],
    "vizinho_salvo": [
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Deus te abençoe... Aquela coisa... ela repetiu a voz da minha falecida esposa para me atrair até o corredor." },
        { nome: "Sr. Clóvis", tipo: "neutro", texto: "Eles copiam memórias superficiais quando estão perto. Fique longe da lente se algo estiver lá fora." }
    ],
    "entregador_normal": [
        { nome: "Entregador", tipo: "neutro", texto: "Entrega noturna! Apartamento 404. Moço, assina rápido aqui, esse corredor tá bizarro hoje." }
    ],
    "entregador_impostor": [
        { nome: "Voz Familiar", tipo: "monstro", texto: "Sou eu... abre a porta... trouxe aquela janta que você tanto gosta..." },
        { nome: "Voz Familiar", tipo: "monstro", texto: "Abra a porta para mim... está escuro aqui fora... e meus braços estão crescendo..." },
        { nome: "Inquilino", tipo: "pensamento", texto: "A voz é perfeita... Mas minha família está longe daqui. Essa coisa revirou meu subconsciente!" }
    ],
    "garotinha_falsa": [
        { nome: "Garotinha", tipo: "neutro", texto: "Por favor... me ajuda... tem um homem muito alto sem rosto vindo da escadaria... ele quer me machucar..." },
        { nome: "Garotinha", tipo: "neutro", texto: "Abre moço! Eu sou só uma criança, por que você vai me deixar morrer aqui no escuro?!" },
        { nome: "Inquilino", tipo: "pensamento", texto: "O pânico e o choro parecem tão reais. Que manipulação psicológica maldita." }
    ],
    "anomalia_eletrica": [
        { nome: "Efeito", tipo: "monstro", texto: "* Um estalo de arco voltaico percorre a porta. Tomadas começam a pipocar com faíscas *" },
        { nome: "Inquilino", tipo: "pensamento", texto: "Essa massa plasmática se alimenta da rede elétrica! Se a luz continuar ligada, ela queima o trinco magnético!" }
    ]
};

const EPILOGOS_FINAIS = {
    "VITORIA_LIMPA": [
        { nome: "Inquilino", tipo: "arthur", texto: "06:00 AM. O sol finalmente bate no vidro trincado da janela." },
        { nome: "Inquilino", tipo: "arthur", texto: "O Bloco B silenciou. Eu pego minha pasta de relatórios, coloco a chave na bancada e saio." }
    ],
    "VITORIA_CULPA": [
        { nome: "Inquilino", tipo: "pensamento", texto: "O sol nasceu... mas os gritos de agonia do Sr. Clóvis ainda ecoam na minha mente." },
        { nome: "O Prédio", tipo: "monstro", texto: "Você guardou sua carne... mas sua mente agora pertence a este complexo paranoico." }
    ],
    "MORTE_MONSTRO": [
        { nome: "Inquilino", tipo: "monstro", texto: "Eu vejo... o vácuo geométrico. Não há dor, apenas a dissolução dos meus ossos." }
    ],
    "MORTE_IMPOSTOR": [
        { nome: "Inquilino", tipo: "monstro", texto: "O disfarce caiu... Não havia rosto, apenas uma massa de dentes pretos mastigando minhas memórias." }
    ],
    "MORTE_SANIDADE": [
        { nome: "Inquilino", tipo: "pensamento", texto: "O quarto está derretendo em estática verde. Minha percepção quebrou." }
    ],
    "MORTE_GAROTINHA": [
        { nome: "Inquilino", tipo: "monstro", texto: "Eu tentei salvar ela... eu estendi a mão..." },
        { nome: "O Espectro", tipo: "monstro", texto: "A empatia é um erro em ambientes portuários. Suas cordas vocais agora choram junto com as minhas nas paredes." }
    ],
    "MORTE_ASFIXIA": [
        { nome: "Inquilino", tipo: "pensamento", texto: "*Sufocando* Meus pulmões... queimando... sem ar..." }
    ]
};

function iniciarSequenciaDialogos(lista, acaoFinal = null, containerAlternativo = null) {
    filaDialogos = [...lista];
    callbackAoTerminar = acaoFinal;
    
    filaDialogos.forEach(f => {
        if(f.nome === "Inquilino" || f.nome === "Jogador") f.nome = nomeJogadorAtual;
    });

    elContainerEscolhas.classList.add('hidden');
    elContainerEscolhas.innerHTML = "";
    avancarDialogo(containerAlternativo);
}

function falarMensagemSimples(nome, tipo, texto) {
    iniciarSequenciaDialogos([{ nome: nome, tipo: tipo, texto: texto }]);
}

function avancarDialogo(containerAlternativo = null) {
    const caixaAtiva = containerAlternativo || elCaixaDialogo;
    const txtFalanteAtivo = containerAlternativo ? document.getElementById('prologo-texto-falante') : txtFalante;
    const txtNomeAtivo = containerAlternativo ? document.getElementById('prologo-nome-falante') : txtNomeFalante;

    if (textoSendoExibido) {
        clearInterval(intervaloTexto);
        txtFalanteAtivo.textContent = textoCompletoAtual;
        textoSendoExibido = false;
        if (filaDialogos.length === 0 && callbackAoTerminar && callbackAoTerminar.ehEscolha) {
            renderMenuEscolhas(callbackAoTerminar.opcoes);
        }
        return;
    }

    if (filaDialogos.length === 0) {
        caixaAtiva.classList.add('idled');
        if (!callbackAoTerminar || !callbackAoTerminar.ehEscolha) {
            if (!containerAlternativo) caixaAtiva.className = "caixa-dialogo idled";
            if (callbackAoTerminar) {
                let acao = callbackAoTerminar;
                callbackAoTerminar = null;
                acao();
            }
        } else {
            renderMenuEscolhas(callbackAoTerminar.opcoes);
        }
        return;
    }

    const falaAtual = filaDialogos.shift();
    if (!containerAlternativo) caixaAtiva.className = `caixa-dialogo balao-${falaAtual.tipo || 'arthur'}`;
    txtNomeAtivo.textContent = falaAtual.nome + ":";
    
    textoCompletoAtual = falaAtual.texto;
    txtFalanteAtivo.textContent = "";
    textoSendoExibido = true;
    
    let indiceLetra = 0;
    intervaloTexto = setInterval(() => {
        txtFalanteAtivo.textContent += textoCompletoAtual[indiceLetra];
        indiceLetra++;
        if (indiceLetra >= textoCompletoAtual.length) {
            clearInterval(intervaloTexto);
            textoSendoExibido = false;
            if (filaDialogos.length === 0 && callbackAoTerminar && callbackAoTerminar.ehEscolha) {
                renderMenuEscolhas(callbackAoTerminar.opcoes);
            }
        }
    }, VELOCIDADE_DIGITACAO);
}

function renderMenuEscolhas(opcoes) {
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

document.getElementById('caixa-dialogo-prologo').addEventListener('click', (e) => {
    e.stopPropagation();
    avancarDialogo(document.getElementById('caixa-dialogo-prologo'));
});
