// =============================================================
// APARTAMENTO 404 - ROTEIRO EXPANDIDO E COMPLETO (CAPÍTULO 1)
// =============================================================

const storyData = {
    // --- PRÓLOGO ---
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, bem no centro da cidade, por um terço do preço padrão do mercado de aluguéis.\n\nO corretor de imóveis parecia estranhamente ansioso para assinar a papelada. Ele suava frio, evitava fazer contato visual direto e batia a caneta no balcão de forma ritmada, irritante. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar com pressa e disse que o antigo inquilino mudou-se por 'motivos urgentes de saúde'.\n\nAgora, segurando as chaves frias e levemente oxidadas diante da porta de madeira maciça e descascada do Apartamento 404, um calafrio na espinha me diz que eu devia ter feito mais perguntas...`,
        // Imagem do corredor escuro com lanterna (Silent Hill)
        bgImage: "https://squarespace-cdn.com", 
        choices: [
            { text: "Girar a chave pesada e empurrar a porta", target: "noite1_inicio" }
        ]
    },

    // --- NOITE 1 ENRIQUECIDA EM DETALHES ---
    noite1_inicio: {
        text: (name) => `Finalmente terminei de empilhar as caixas de papelão no canto da sala. Minhas mãos estão cobertas por uma poeira cinzenta e o cheiro forte de cola de fita adesiva está atacando minha rinite.\n\nCaminho até a janela da sala e encaro a avenida lá embaixo. A cidade grande parece um formigueiro distante de luzes de carros e postes piscando, mas aqui no quarto andar, o silêncio é tão denso que chega a zumbir nos meus ouvidos. \n\nNão importa o cansaço acumulado ou o cheiro sutil de ferro e mofo que exala misteriosamente dos dutos de ventilação. O Apartamento 404 é oficialmente o meu espaço. Minha tão sonhada independência.\n\n${name}: "Já passa da meia-noite... Melhor eu ir para a cama antes que o cansaço comece a pregar peças na minha visão."`,
        // Imagem da sala integrada com a cozinha à noite
        bgImage: "https://artstation.com", 
        choices: [
            { text: "Apagar a lâmpada da sala e caminhar até o quarto", target: "noite1_corredor" }
        ]
    },
    noite1_corredor: {
        text: (name) => `O interruptor da sala desliga com um estalo alto. O apartamento é instantaneamente engolido pela escuridão. \n\nDou alguns passos pelo pequeno corredor em direção ao quarto. O chão de taco range sob o meu peso, ecoando de um jeito estranho, como se houvesse um segundo par de passos atrasado logo atrás de mim. \n\nParo por um segundo. O som cessa. Eu rio baixinho de mim mesma, tentando afastar a paranoia. É só o cansaço do dia de mudança pesada.`,
        bgImage: "https://artstation.com",
        choices: [
            { text: "Entrar no quarto e deitar na cama", target: "noite1_deitada" }
        ]
    },
    noite1_deitada: {
        text: (name) => `O colchão novo ainda cheira a plástico e está um pouco rígido. Puxo o cobertor até os ombros e fico encarando o teto alto. Com as luzes apagadas, as sombras das caixas de mudança parecem se esticar pelas paredes como silhuetas de pessoas de pé, distorcidas pela luz fraca dos postes da rua que corta a janela.\n\nO prédio faz barulhos estruturais bizarros. Canos de água vibram com força nas paredes de gesso e o teto estala de três em três minutos, como se o concreto estivesse sendo esmagado de cima para baixo.\n\nTento focar no ritmo calmo da minha própria respiração para pegar no sono, mas sinto uma pontada desconfortável na nuca. Uma sensação física angustiante... como se o ar do quarto estivesse ficando mais rarefeito e pesado. Como se eu não estivesse sozinha.`,
        bgImage: "https://artstation.com", 
        choices: [
            { text: "Fechar os olhos à força e se forçar a dormir", target: "noite1_bzzz" }
        ]
    },
    noite1_bzzz: {
        text: (name) => `Meus olhos finalmente começam a pesar. Estou afundando naquele estado sonolento, quase perdendo a consciência, quando...\n\n*Bzzzz, Bzzzz*\n\nO solavanco do susto me faz abrir os olhos em um estalo. Meu peito arde e o coração dispara de forma descontrolada. O visor do relógio digital na parede brilha em um vermelho estático e agressivo: **03:14 AM**.\n\nO celular vibra freneticamente na cabeceira de madeira, iluminando os cantos do teto com um brilho azulado e doentio. Há uma nova notificação de um número privado.\n\n<span class="monster-text">"Gostei das cortinas novas. Combinam com o seu cabelo, ${name}."</span>\n\n${name}: "Mas que porra é essa...? Quem teria meu número privado? Como sabem das cortinas? Eu acabei de colocá-las no escuro..."`,
        bgImage: "https://artstation.com", 
        sfx: "bzzz",
        flicker: true, // Reação: A tela pisca simulando o choque elétrico da luz do celular no escuro
        choices: [
            { text: "Digitar uma resposta irritada exigindo saber quem é", target: "noite1_responder" },
            { text: "Bloquear o número na hora e tentar ignorar", target: "noite1_bloquear" }
        ]
    },
    noite1_responder: {
        text: (name) => `Meus dedos tremem tanto que quase erro as letras no teclado virtual. Sinto o suor frio escorrer pelas minhas têmporas.\n\n${name}: "Quem é você? Isso não tem graça nenhuma. Eu vou chamar a polícia agora mesmo se você não parar de me vigiar."\n\nAperto enviar. Três segundos agonizantes se passam no breu absoluto do quarto. De repente, os três pontinhos de 'digitando...' surgem na parte superior do aplicativo de mensagens, torturando minha sanidade. A resposta chega instantaneamente:\n\n<span class="monster-text">"A polícia demora 20 minutos para subir até aqui, ${name}. Eu já estou aqui em cima."</span>\n\nUm calafrio violento e paralisante percorre toda a minha espinha. A frase não faz sentido lógico... até que meus olhos se voltam lentamente para o teto escuro e rachado diretamente acima da minha cabeça.`,
        bgImage: "https://squarespace-cdn.com",
        choices: [
            { text: "Levantar em pânico para checar as portas (Avançar para Noite 2)", target: "noite2_inicio" }
        ]
    },
    noite1_bloquear: {
        text: (name) => `Decido não dar palco para trotes doentios de madrugada. Bloqueio o contato privado com força, viro a tela do aparelho contra a cabeceira e enfio a cabeça embaixo do cobertor, tentando abafar o som das batidas violentas do meu próprio coração.\n\nO silêncio do apartamento agora parece uma presença física, sufocante e maligna. Cada pequeno estalo estrutural do prédio soa como um aviso de morte. Passo longos minutos completamente paralisada. \n\nAté que, vindo do canto mais escuro e inacessível do quarto, o som real e físico se manifesta.\n\n*ARRANHÃO METÁLICO LONGO E CORROSIVO*\n\nAlgo pesado, com unhas ou garras afiadas de osso, arranha a madeira por dentro do meu guarda-roupa trancado... a poucos centímetros do meu travesseiro.`,
        bgImage: "https://squarespace-cdn.com",
        shake: true, // Reação: A tela inteira dá um solavanco de susto com o barulho do armário raspando
        choices: [
            { text: "Prender a respiração, chorando em silêncio (Avançar para Noite 2)", target: "noite2_inicio" }
        ]
    },

    // --- ENTRADA DA NOITE 2 (PREPARADA E SEM ERROS) ---
    noite2_inicio: {
        text: (name) => `Capítulo 1 Concluído.\n\nA Noite 2 começará aqui... com os cenários da cozinha industrial cinzenta que você escolheu. O mistério do Apartamento 404 está apenas começando.`,
        bgImage: "none",
        choices: [
            { text: "Voltar ao Menu Principal", target: "menu_principal" }
        ]
    }
};
