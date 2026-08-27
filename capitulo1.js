// =============================================================
// APARTAMENTO 404 - CAPÍTULO 1: O PREÇO DO ISOLAMENTO
// =============================================================

const storyData = {
    // --- PRÓLOGO ---
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, bem no centro da cidade, por um terço do preço padrão do mercado de aluguéis.\n\nO corretor de imóveis parecia estranhamente ansioso para assinar a papelada. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar com pressa e disse que o antigo inquilino mudou-se por 'motivos urgentes de saúde'.\n\nAgora, segurando as chaves frias diante da porta descascada do Apartamento 404, um calafrio na espinha me diz que eu devia ter feito mais perguntas...`,
        bgImage: "https://squarespace-cdn.com", 
        choices: [
            { text: "Girar a chave e entrar no apartamento", target: "noite1_inicio" }
        ]
    },

    // --- NOITE 1 EXPANDIDA ---
    noite1_inicio: {
        text: (name) => `Finalmente terminei de empilhar as caixas de papelão no canto da sala. Minhas mãos estão sujas de poeira e fita adesiva, e minhas costas imploram por descanso.\n\nCaminho até a janela e encaro a avenida lá embaixo. A cidade grande parece um formigueiro de luzes distantes, mas aqui no quarto andar, o silêncio é tão denso que consigo ouvir o zumbido sutil da fiação elétrica nas paredes.\n\nNão importa o cansaço ou o cheiro estranho de mofo que exala dos dutos de ventilação. O Apartamento 404 é oficialmente o meu espaço. Minha tão sonhada independência.\n\n${name}: "Já passa da meia-noite... Melhor eu deitar antes que minha mente comece a pregar peças."`,
        bgImage: "https://artstation.com", 
        choices: [
            { text: "Apagar a lâmpada do teto e deitar na cama", target: "noite1_deitada" }
        ]
    },
    noite1_deitada: {
        text: (name) => `O colchão novo ainda está um pouco rígido. Puxo o cobertor até os ombros e encaro o teto alto. Com as luzes apagadas, as sombras dos móveis parecem se esticar pelas paredes, distorcidas pela luz fraca dos postes da rua que corta a janela.\n\nO prédio faz barulhos estranhos à noite. Canos de água ecoam nas paredes de gesso e o teto estala de vez em quando, como se o concreto estivesse se acomodando.\n\nTento focar no som da minha própria respiração para pegar no sono, mas sinto uma sensação desconfortável... como se o quarto estivesse menor. Mais apertado.`,
        bgImage: "https://artstation.com", 
        choices: [
            { text: "Fechar os olhos e forçar o sono", target: "noite1_bzzz" }
        ]
    },
    noite1_bzzz: {
        text: (name) => `Meus olhos finalmente começam a pesar. Estou naquele estado flutuante entre o sonho e a realidade quando...\n\n*Bzzzz, Bzzzz*\n\nO susto me faz abrir os olhos em um estalo. Meu coração dispara instantaneamente. O visor do relógio digital na parede brilha em um vermelho estático e agressivo: 03:14 AM. O celular vibra na cabeceira, iluminando o quarto com um brilho azulado fantasmagórico.\n\nHá uma nova notificação de um número privado.\n\n<span class="monster-text">"Gostei das cortinas novas. Combinam com o seu cabelo, ${name}."</span>\n\n${name}: "Mas que inferno é esse...? Quem teria meu número? Como sabem das cortinas? Eu acabei de colocá-las no escuro..."`,
        bgImage: "https://artstation.com", 
        sfx: "bzzz",
        flicker: true, // A tela pisca simulando o choque elétrico do celular acendendo
        choices: [
            { text: "Digitar uma resposta exigindo saber quem é", target: "noite1_responder" },
            { text: "Bloquear o número na hora e tentar ignorar", target: "noite1_bloquear" }
        ]
    },
    noite1_responder: {
        text: (name) => `Meus dedos tremem tanto que quase erro as letras no teclado virtual.\n\n${name}: "Quem é você? Isso não tem graça nenhuma. Eu vou chamar a polícia agora mesmo se você não parar de me vigiar."\n\nAperto enviar. Três segundos agonizantes se passam no escuro. De repente, os três pontinhos de 'digitando...' piscam na parte superior da tela, fazendo meu sangue congelar. A resposta chega:\n\n<span class="monster-text">"A polícia demora 20 minutos para subir até aqui, ${name}. Eu já estou aqui em cima."</span>\n\nUm calafrio violento percorre minha espinha. O texto não faz sentido... até que meus olhos se voltam lentamente para o teto escuro acima de mim.`,
        bgImage: "https://squarespace-cdn.com",
        choices: [
            { text: "Levantar da cama e checar as portas (Avançar para o Cap. 2)", target: "menu_principal" }
        ]
    },
    noite1_bloquear: {
        text: (name) => `Decido não dar corda para jogos mentais. Bloqueio o contato privado com força, viro a tela do aparelho para baixo e puxo o cobertor até o queixo, tentando controlar as batidas violentas do meu peito.\n\nO silêncio do apartamento agora parece uma presença física, sufocante. Cada estalo do prédio soa como um aviso. Passo longos minutos paralisada, encarando o breu. Até que, vindo do canto mais escuro do quarto, o som real se manifesta.\n\n*ARRANHÃO METÁLICO LONGO*\n\nAlgo pesado e com garras afiadas arranha a madeira por dentro do meu guarda-roupa... a poucos centímetros do meu travesseiro.`,
        bgImage: "https://squarespace-cdn.com",
        shake: true, // A tela dá um solavanco de susto com o barulho do armário
        choices: [
            { text: "Prender a respiração aterrorizada (Avançar para o Cap. 2)", target: "menu_principal" }
        ]
    }
};
