const storyData = {
    // ==========================================
    // PRÓLOGO E NOITE 1
    // ==========================================
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, bem no centro da cidade, por um terço do preço padrão do mercado de aluguéis.\n\nO corretor de imóveis parecia estranhamente ansioso para assinar a papelada. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar com pressa e disse que o antigo inquilino mudou-se por 'motivos urgentes de saúde'.\n\nAgora, segurando as chaves frias diante da porta descascada do Apartamento 404, um calafrio na espinha me diz que eu devia ter feito mais perguntas...`,
        bg: "#020202",
        choices: [
            { text: "Girar a chave e entrar no apartamento", target: "noite1_inicio" }
        ]
    },
    noite1_inicio: {
        text: (name) => `Finalmente terminei de empilhar as caixas da mudança no canto da sala. Minhas costas doem e o ar aqui dentro parece parado, pesado pelo cheiro de poeira antiga.\n\nBut tanto faz. O Apartamento 404 é oficialmente o meu espaço. Minha independência.\n\nO silêncio do prédio é absoluto. Quase desconfortável.\n\n${name}: "Já passa da meia-noite... Melhor eu deitar antes que eu desmaie de cansaço."`,
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
            { text: "Trancar a porta do quarto no escuro (Avançar para Noite 2)", target: "noite2_inicio" }
        ]
    },
    noite1_bloquear: {
        text: (name) => `Decido não dar atenção. Bloqueio o contato, viro o celular para baixo e puxo o cobertor até o pescoço, tentando controlar a respiração.\n\nO silêncio agora parece uma armadilha. Cada estalo das paredes soa como um passo. Então, no canto mais escuro do quarto, o som real se manifesta.\n\n*ARRANHÃO METÁLICO SECO*\n\nAlgo longo e afiado arranha a madeira por dentro do meu guarda-roupa... a poucos centímetros de mim.`,
        bg: "#040406",
        choices: [
            { text: "Encolher-se sob as cobertas (Avançar para Noite 2)", target: "noite2_inicio" }
        ]
    },

    // ==========================================
    // NOITE 2: SILÊNCIO E PARANOIA
    // ==========================================
    noite2_inicio: {
        text: (name) => `O dia na faculdade foi um completo desastre. Não consegui focar em uma única palavra dos professores. Meus olhos ardiam de exaustão, mas o medo de voltar para este lugar era maior.\n\nAgora são 22:00. Estou na cozinha preparando um chá, encarando o corredor escuro. A lâmpada do teto pisca, ameaçando queimar.\n\n${name}: "É só a paranoia. Prédios antigos assentam. Vigas de madeira estalam. É só física..."\n\n*ARRANHÃO LONGO E PESADO*\n\nUm som violento de garras arrastando pelo concreto do teto ecoa diretamente acima de mi. Não há mensagens de texto. Apenas o som de algo massivo se movendo sobre a minha cabeça.`,
        bg: "#14100c",
        choices: [
            { text: "Olhar para cima para enfrentar o que está ali", target: "noite2_olhar" },
            { text: "Largar tudo e correr desesperadamente para o quarto", target: "noite2_correr" }
        ]
    },
    noite2_olhar: {
        text: (name) => `Prendo a respiração e ergo os olhos.\n\nA lâmpada falha por um segundo. No teto, acima da geladeira, vejo uma silhueta humanóide esguia e totalmente preta. Ela se contrai contra a gravidade e deslizar com uma velocidade impossível para dentro do duto de ventilação largo.\n\nEla não me mandou mensagens. Ela não fez ruídos vazios. Ela apenas me viu. Um rastro viscoso e acinzentado começa a pingar da parede em direção ao chão.`,
        bg: "#060608",
        choices: [
            { text: "Correr para o quarto e trancar as frestas (Avançar para Noite 3)", target: "noite3_inicio" }
        ]
    },
    noite2_correr: {
        text: (name) => `O puro terror assume o controle das minhas pernas. Deixo a xícara cair, o vidro se estilhaça no chão e eu corro pelo corredor escuro, batendo a porta do quarto e girando a chave três vezes.\n\nDeslizo com as costas na madeira até sentar no chão, puxando o ar com dificuldade. O celular está completamente sem sinal. Conforme os minutos passam, o som recomeça do outro lado da porta.\n\n*Arrasta... estala... arrasta...*\n\nAlgo pesado está escalando verticalmente as paredes do corredor externo. O som sobe pela parede e passa para o teto. Está bem acima de mim no teto do quarto, perambulando em círculos no escuro.`,
        bg: "#040406",
        choices: [
            { text: "Colocar as mãos nos ouvidos e fechar os olhos (Avançar para Noite 3)", target: "noite3_inicio" }
        ]
    },

    // ==========================================
    // NOITE 3: O CONFRONTO FINAL
    // ==========================================
    noite3_inicio: {
        text: (name) => `A tempestade lá fora cortou a energia do quarteirão inteiro. O apartamento virou um breu absoluto, iluminado apenas pelos clarões violentos dos raios que cruzam a janela.\n\n*Ploc... ploc... ploc...*\n\nUm líquido espesso e frio começa a pingar do gesso do teto direto no meu lençol. Tem cheiro de ferro. Cheiro de sangue.\n\n*Bzzzz*\n\nA tela do celular brilha no escuro, quase me cegando. Depois de um longo silêncio, a criatura envia sua última e definitiva mensagem:\n\n<span class="monster-text">"Olhe para cima. Quero ver o desespero nos seus olhos quando eu descer, ${name}."</span>`,
        bg: "#010101",
        sfx: "bzzz",
        choices: [
            { text: "Apontar a lanterna do celular para o teto", target: "final_neutro" },
            { text: "Deslizar em silêncio para baixo da cama", target: "final_bom" },
            { text: "Correr em pânico total em direção à porta da rua", target: "final_ruim" }
        ]
    },

    // ==========================================
    // DESFECHOS
    // ==========================================
    final_neutro: {
        text: (name) => `Com as mãos congeladas, ligo a lanterna do celular e aponto para cima.\n\nLá está. Uma criatura esguia com membros longos e articulados está grudada no teto como uma aranha humana. O rosto dela não tem feições claras, apenas fendas e olhos vazios que refletem a luz.\n\nA coisa solta um estalido gutural agudo, incomodada com a luz direta, e recua pela parede lateral. Aproveito o segundo de hesitação, abro a porta do quarto, corro pela sala escura e me jogo para fora do apartamento.\n\nEu sobrevivi. Mas mudei de cidade na manhã seguinte. Até hoje, nunca durmo sem uma luz acesa no teto.`,
        bg: "#0a0a12",
        choices: [
            { text: "Avançar", target: "conclusao_neutro" }
        ]
    },
    final_bom: {
        text: (name) => `Prendo o fôlego até meus pulmões arderem e me arrasto milímetro por milímetro para baixo da cama, cobrindo minha boca com as duas mãos.\n\n*FUMP.*\n\nO som de algo pesado e úmido atingindo o chão do quarto ecoa. A criatura desceu. Consigo ver, na fresta do chão, seus braços longos e cinzentos tateando os lençóis por cima da cama. Ela acha que eu ainda estou deitada ali.\n\nEnquanto recuo no chão gelado, minha mão bate em uma caixa de metal velha esquecida embaixo da cama. Dentro dela, há um diário velho do antigo inquilino e um amuleto de bronze maciço.\n\nAo segurar o amuleto, ele esquenta violentamente. A criatura no quarto solta um guincho de dor excruciante, como se estivesse queimando viva, e escala a parede em disparada, sumindo pelo duto. Eu descobri a fraqueza dela. O apartamento agora está limpo.`,
        bg: "#0d1a0d",
        choices: [
            { text: "Avançar", target: "conclusao_bom" }
        ]
    },
    final_ruim: {
Use o código com cuidado.text: (name) => O pânico absoluto quebra minha capacidade de pensar. Me jogo para fora da cama no breu completo. Corro pelo corredor, mas no escuro, tropeço em uma das caixas de mudança pesadas e caio no chão, sentindo uma dor aguda estalar no meu tornozelo.\n\nAnestesiada pelo medo, tento me arrastar. ${name}: "Não, por favor, não..."\n\nUm sussurro gélido e podre sopra diretamente na minha nuca, vindo de cima. Em velocidade impressionante, a criatura desce verticalmente pela parede lisa, envolve meus ombros com seus braços frios e me puxa para cima, em direção à escuridão infinita do teto do corredor.\n\nMeu celular cai no chão batido, a tela trinca e brilha uma última vez com uma mensagem:\n\n<div class="phone-message">"Obrigado por dividir o aluguel comigo."</div>,bg: "#1a0000",choices: [{ text: "Avançar", target: "conclusao_ruim" }]},// ==========================================// TELAS FINAIS// ==========================================conclusao_neutro: {isEnding: true,title: "SOBREVIVENTE?",subtitle: "Você escapou da carne, mas a mente continua presa no Apartamento 404.",bg: "#050510",choices: [ { text: "Voltar ao Menu Principal", target: "menu" } ]},conclusao_bom: {isEnding: true,title: "MISTÉRIO RESOLVIDO",subtitle: "Você baniu a presença e quebrou o ciclo de isolamento do prédio.",bg: "#051505",choices: [ { text: "Voltar ao Menu Principal", target: "menu" } ]},conclusao_ruim: {isEnding: true,hasBlood: true,title: "VOCÊ FOI PEGO(A)",subtitle: "O Apartamento 404 encontrou um novo inquilino permanente.",bg: "#080000",choices: [ { text: "Tentar Novamente", target: "menu" } ]}};
