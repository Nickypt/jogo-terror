const storyData = {
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, no centro da cidade, por um terço do preço padrão do mercado.\n\nO corretor de imóveis parecia ansioso demais para assinar o contrato. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar e disse que o antigo inquilino mudou-se às pressas por 'motivos de saúde'.\n\nAgora, olhando para as chaves enferrujadas na minha mão diante da porta descascada do Apartamento 404, eu sinto que devia ter desconfiado...`,
        bg: "#030303",
        choices: [
            { text: "Girar a chave e entrar no apartamento", target: "noite1_inicio" }
        ]
    },
    noite1_inicio: {
        text: (name) => `Finalmente terminei de desempacotar a última caixa de livros. Minhas costas doem, a poeira do lugar está atacando minha alergia, mas o sentimento de independência compensa.\n\nO Apartamento 404 é oficialmente meu novo lar. O silêncio aqui é profundo. Quase pesado demais.\n\n${name}: "Amanhã começam as aulas na faculdade... É melhor eu ir deitar antes que eu desmaie de sono."`,
        bg: "#111116", 
        choices: [
            { text: "Apagar o abajur e fechar os olhos", target: "noite1_bzzz" }
        ]
    },
    noite1_bzzz: {
        text: (name) => `O silêncio do prédio novo é ensurdecedor. Demoro para pegar no sono, rolando de um lado para o outro na cama nova. Quando finalmente meus olhos pesam...\n\n...\n\n*Bzzzz, Bzzzz*\n\nAcordo em um salto. O relógio digital na parede brilha em um vermelho estático: 03:14 AM. Meu celular está iluminando o teto com a luz azul da tela. Há uma nova notificação de um número desconhecido.\n\n<div class="phone-message">Número Desconhecido:\n"Gostei das cortinas novas do quarto. Combinam com o seu cabelo, ${name}."</div>\n\n${name}: "O quê...? Quem seria idiota o suficiente para passar um trote a essa hora? E como sabem das cortinas? Eu acabei de colocá-las..."`,
        bg: "#050508", 
        sfx: "bzzz",
        choices: [
            { text: "Responder a mensagem irritada", target: "noite1_responder" },
            { text: "Bloquear o número imediatamente e ignorar", target: "noite1_bloquear" }
        ]
    },
    noite1_responder: {
        text: (name) => `Digito com os dedos trêmulos de raiva e aperto enviar.\n\n${name}: "Quem é você? Isso não tem graça nenhuma. Eu vou ligar para a polícia agora mesmo se não parar."\n\nTrês segundos se passam. O indicador de 'digitando...' aparece e some três vezes no topo da tela. Até que a resposta chega:\n\n<div class="phone-message">Número Desconhecido:\n"A polícia demora pelo menos 20 minutos para chegar neste bairro seco, ${name}. Eu já estou dentro."</div>`,
        bg: "#050508",
        choices: [
            { text: "Tentar trancar as portas no escuro (Avançar para Noite 2)", target: "noite2_inicio" }
        ]
    },
    noite1_bloquear: {
        text: (name) => `Decido não dar palco para maluco. Bloqueio o número com o coração acelerado, coloco o celular virado para baixo na cômoda e me cubro até o pescoço.\n\nTento fechar os olhos, mas cada estalo del apartamento parece amplificado. Então, no silêncio do quarto, eu escuto.\n\n*ARRANHÃO METÁLICO*\n\nUm som nítido de garras raspando por dentro do guarda-roupa... bem ao lado da minha cama.`,
        bg: "#050508",
        choices: [
            { text: "Encolher-se e rezar pelo amanhecer (Avançar para Noite 2)", target: "noite2_inicio" }
        ]
    },
    noite2_inicio: {
        text: (name) => `O dia seguinte passou como um borrão. Não consegui focar em nenhuma matéria na faculdade. Meus olhos ardiam de cansaço, mas a verdade é que eu estava apavorada de voltar para casa.\n\nAgora são 21:00. Estou na cozinha fazendo um chá de costas para o corredor escuro. A lâmpada fluorescente pisca, cansada.\n\n${name}: "É só um prédio velho. Prédios antigos fazem barulho. Tetos estalam. É só isso. Tem que ser só isso..."\n\n*ARRANHÃO LONGO E SECO*\n\nO som de algo pesado e com unhas afiadas raspando o concreto do teto ecoa exatamente acima da minha cabeça.`,
        bg: "#1a1510",
        choices: [
            { text: "Erguer os olhos lentamente para o teto", target: "noite2_olhar" },
            { text: "Largar tudo e correr em pânico para o quarto", target: "noite2_correr" }
        ]
    },
    noite2_olhar: {
        text: (name) => `Prendo a respiração e olho diretamente para cima.\n\nA iluminação pisca. No teto, acima da geladeira, uma silhueta preta e humanóide parece se contrair contra a gravidade e deslizar em velocidade desumana para dentro do duto de ventilação, deixando um rastro cinzento e viscoso na parede.\n\n*Bzzzz*\n\nMeu celular vibra no bolso.\n\n<div class="phone-message">Número Desconhecido:\n"Você esqueceu de limpar o teto, ${name}. Eu deixo marcas horríveis por onde passo."</div>`,
        bg: "#08080a",
        sfx: "bzzz",
        choices: [
            { text: "Trancar-se no quarto em prantos (Avançar para Noite 3)", target: "noite3_inicio" }
        ]
    },
    noite2_correr: {
        text: (name) => `O instinto de sobrevivência assume o controle. Deixo a xícara cair, ela se despedaça no chão e eu corro pelo corredor escuro, me jogando para dentro do quarto e trancando a porta com três voltas na chave.\n\nEncosto as costas na madeira, deslizando até o chão enquanto puxo o ar com dificuldade. Telefone não tem sinal. Então, o som recomeça do lado de fora da porta.\n\n*Arrasta... raspando... arrasta...*\n\nAlgo pesado está escalando verticalmente as paredes do corredor externo, subindo em direção ao teto do meu próprio quarto. Está logo acima de mim.`,
        bg: "#050508",
        choices: [
            { text: "Enfiar a cabeça embaixo do travesseiro (Avançar para Noite 3)", target: "noite3_inicio" }
        ]
    },
    noite3_inicio: {
        text: (name) => `Faltou energia elétrica no quarteirão inteiro. Uma tempestade violenta racha o céu lá fora, iluminando as paredes descascadas apenas com os flashes brancos dos raios através da janela.\n\n*Ploc... ploc... ploc...*\n\nUm líquido viscoso e frio pinga do teto rachado direto no meu cobertor. Não é água da chuva. Tem cheiro de ferro.\n\n*Bzzzz*\n\nA tela do celular acende no escuro total.\n\n<div class="phone-message">Número Desconhecido:\n"Olhe para cima agora. Quero ver o desespero nos seus olhos quando eu descer, ${name}."</div>`,
        bg: "#020202",
        sfx: "bzzz",
        choices: [
            { text: "Iluminar o teto com a lanterna do celular", target: "final_neutro" },
            { text: "Deslizar silenciosamente para baixo da cama", target: "final_bom" },
            { text: "Correr desesperadamente em direção à porta da rua", target: "final_ruim" }
        ]
    },
    final_neutro: {
        text: (name) => `Com as mãos congeladas, ligo a lanterna do celular e aponto o feixe de luz diretamente para cima.\n\nLá está. Uma criatura esguia, preta, com membros longos e articulados está grudada no teto como uma aranha humana. O rosto dela não tem feições claras, apenas fendas e olhos vazios que refletem a luz.\n\nA coisa solta um estalido gutural agudo, incomodada com a luz direta, e recua pela parede lateral. Aproveito o segundo de hesitação, abro a porta do quarto, corro pela sala escura e me jogo para fora do apartamento.\n\nEu sobrevivi. Mas mudei de cidade na manhã seguinte. Até hoje, nunca durmo sem uma luz acesa no teto.`,
        bg: "#0a0a12",
        choices: [
            { text: "Voltar para o Menu Principal", target: "menu" }
        ]
    },
    final_bom: {
        text: (name) => `Prendo o fôlego até meus pulmões arderem e me arrasto milímetro por milímetro para baixo da cama, cobrindo minha boca com as duas mãos.\n\n*FUMP.*\n\nO som de algo pesado e úmido atingindo o chão do quarto ecoa. A criatura desceu. Consigo ver, na fresta do chão, seus braços longos e cinzentos tateando os lençóis por cima da cama. Ela acha que eu ainda estou deitada ali.\n\nEnquanto recuo no chão gelado, minha mão bate em uma caixa de metal velha esquecida embaixo da cama. Dentro dela, há um diário velho do antigo inquilino e um amuleto de bronze maciço.\n\nAo segurar o amuleto, ele esquenta violentamente. A criatura no quarto solta um guincho de dor excruciante, como se estivesse queimando viva, e escala a parede em disparada, sumindo pelo duto. Eu descobri a fraqueza dela. O apartamento agora está limpo.`,
        bg: "#0d1a0d",
        choices: [
            { text: "Voltar para o Menu Principal", target: "menu" }
        ]
    },
    final_ruim: {
        text: (name) => `O pânico absoluto quebra minha capacidade de pensar. Me jogo para fora da cama no breu completo. Corro pelo corredor, mas no escuro, tropeço em uma das caixas de mudança pesadas e caio no chão, sentindo uma dor aguda estalar no meu tornozelo.\n\nAnestesiada pelo medo, tento me arrastar. ${name}: "Não, por favor, não..."\n\nUm sussurro gélido e podre sopra diretamente na minha nuca, vindo de cima. Em velocidade impressionante, a criatura desce verticalmente pela parede lisa, envolve meus ombros com seus braços frios e me puxa para cima, em direção à escuridão infinita do teto do corredor.\n\nMeu celular cai no chão batido, a tela trinca e brilha uma última vez com uma mensagem:\n\n<div class="phone-message">"Obrigado por dividir o aluguel comigo."</div>`,
        bg: "#1a0000",
        choices: [
            { text: "Tentar Novamente", target: "menu" }
        ]
    }
};
