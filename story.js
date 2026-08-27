const storyData = {
    // ==========================================
    // PRÓLOGO
    // ==========================================
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, bem no centro da cidade, por um terço do preço padrão do mercado de aluguéis.\n\nO corretor de imóveis parecia estranhamente ansioso para assinar a papelada. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar com pressa e disse que o antigo inquilino mudou-se por 'motivos urgentes de saúde'.\n\nAgora, segurando as chaves frias diante da porta descascada do Apartamento 404, um calafrio na espinha me diz que eu devia ter feito mais perguntas...`,
        bg: "#020202",
        choices: [
            { text: "Girar a chave e entrar no apartamento", target: "noite1_inicio" }
        ]
    },

    // ==========================================
    // NOITE 1: O INÍCIO E A NOTIFICAÇÃO
    // ==========================================
    noite1_inicio: {
        text: (name) => `Finalmente terminei de empilhar as caixas da mudança no canto da sala. Minhas costas doem e o ar aqui dentro parece parado, pesado pelo cheiro de poeira antiga.\n\nMas não importa. O Apartamento 404 é oficialmente o meu espaço. Minha independência.\n\nO silêncio do prédio é absoluto. Quase desconfortável.\n\n${name}: "Já passa da meia-noite... Melhor eu deitar antes que eu desmaie de cansaço."`,
        bg: "#0d0d12", 
        choices: [
            { text: "Apagar o abajur do quarto e fechar os olhos", target: "noite1_bzzz" }
        ]
    },
    noite1_bzzz: {
        text: (name) => `Rolo de um lado para o outro na cama nova. O teto alto parece me encarar no escuro. Quando meus olhos finalmente começam a pesar...\n\n*Bzzzz, Bzzzz*\n\nAcordo com o coração batendo na garganta. O visor do relógio na parede brilha em um vermelho estático: 03:14 AM. O celular vibra na cômoda, iluminando o teto com uma luz azulada.\n\nHá uma mensagem de um número privado.\n\n<span class="monster-text">"Gostei das cortinas novas. Combinam com o seu cabelo, ${name}."</span>\n\n${name}: "But o quê...? Quem teria meu número? Como sabem das cortinas? Eu acabei de colocá-las..."`,
        bg: "#040406", 
        sfx: "bzzz",
        choices: [
            { text: "Responder a mensagem exigindo explicações", target: "noite1_responder" },
            { text: "Bloquear o número imediatamente e tentar ignorar", target: "noite1_bloquear" }
        ]
    },
    noite1_responder: {
        text: (name) => `Digito com os dedos trêmulos de raiva.\n\n${name}: "Quem é você? Isso não tem graça nenhuma. Vou chamar a polícia agora mesmo se não parar."\n\nTrês segundos longos se passam. O indicador de 'digitando...' pisca no topo da tela, torturando minha ansiedade. A resposta chega:\n\n<span class="monster-text">"A polícia demora 20 minutos para chegar aí embaixo, ${name}. Eu já estou aqui em cima."</span>`,
        bg: "#040406",
        choices: [
            { text: "Tentar trancar as portas no escuro (Fim do Capítulo 1)", target: "menu_principal" }
        ]
    },
    noite1_bloquear: {
        text: (name) => `Decido não dar atenção. Bloqueio o contato, viro o celular para baixo e puxo o cobertor até o pescoço, tentando controlar a respiracão.\n\nO silêncio agora parece uma armadilha. Cada estalo das paredes soa como um passo. Então, no canto mais escuro do quarto, o som real se manifesta.\n\n*ARRANHÃO METÁLICO SECO*\n\nAlgo longo e afiado arranha a madeira por dentro do meu guarda-roupa... a poucos centímetros de mim.`,
        bg: "#040406",
        choices: [
            { text: "Cobrir a cabeça e rezar pelo amanhecer (Fim do Capítulo 1)", target: "menu_principal" }
        ]
    }
};
