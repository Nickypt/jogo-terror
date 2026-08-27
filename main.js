// BANCO DE DADOS DA HISTÓRIA (Prólogo e Conexão com Noite 1)
const storyData = {
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, bem no centro da cidade, por um terço do preço padrão do mercado de aluguéis.\n\nO corretor de imóveis parecia estranhamente ansioso para assinar a papelada. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar com pressa e disse que o antigo inquilino mudou-se por 'motivos urgentes de saúde'.\n\nAgora, segurando as chaves frias diante da porta descascada do Apartamento 404, um calafrio na espinha me diz que eu devia ter feito mais perguntas...`,
        bg: "#020202",
        choices: [
            { text: "Girar a chave e entrar no apartamento", target: "noite1_inicio" }
        ]
    },
    noite1_inicio: {
        text: (name) => `Finalmente terminei de empilhar as caixas da mudança no canto da sala. Minhas costas doem e o ar aqui dentro parece parado, pesado pelo cheiro de poeira antiga.\n\nMas não importa. O Apartamento 404 é oficialmente o meu espaço. Minha independência.\n\nO silêncio do prédio é absoluto. Quase desconfortável.\n\n${name}: "Já passa da meia-noite... Melhor eu deitar antes que eu desmaie de cansaço."`,
        bg: "#0d0d12", 
        choices: [
            { text: "Apagar o abajur do quarto e fechar os olhos", target: "noite1_bzzz" }
        ]
    },
    noite1_bzzz: {
        text: (name) => `Rolo de um lado para o outro na cama nova. O teto alto parece me encarar no escuro. Quando meus olhos finalmente começam a pegar no sono...\n\n*Bzzzz, Bzzzz*\n\nAcordo com o coração batendo na garganta. O visor do relógio na parede brilha em um vermelho estático: 03:14 AM. O celular vibra na cômoda, iluminando o teto com uma luz azulada.\n\nHá uma mensagem de um número privado.\n\n<span class="monster-text">"Gostei das cortinas novas. Combinam com o seu cabelo, ${name}."</span>\n\n${name}: "Mas o quê...? Quem teria meu número? Como sabem das cortinas? Eu acabei de colocá-las..."`,
        bg: "#040406", 
        choices: [
            { text: "Responder a mensagem exigindo explicações", target: "noite1_responder" },
            { text: "Bloquear o número imediatamente e tentar ignorar", target: "noite1_bloquear" }
        ]
    },
    noite1_responder: {
        text: (name) => `Digito com os dedos trêmulos de raiva.\n\n${name}: "Quem é você? Isso não tem graça nenhuma. Vou chamar a polícia agora mesmo se não parar."\n\nTrês segundos longos se passam. O indicador de 'digitando...' pisca no topo da tela, torturando minha ansiedade. A resposta chega:\n\n<span class="monster-text">"A polícia demora 20 minutos para chegar aí embaixo, ${name}. Eu já estou aqui em cima."</span>`,
        bg: "#040406",
        choices: [
            { text: "Tentar trancar as portas no escuro (Voltar ao Menu)", target: "menu_principal" }
        ]
    },
    noite1_bloquear: {
        text: (name) => `Decido não dar atenção. Bloqueio o contato, viro o celular para baixo e puxo o cobertor até o pescoço, tentando controlar a respiração.\n\nO silêncio agora parece uma armadilha. Cada estalo das paredes soa como um passo. Então, no canto mais escuro do quarto, o som real se manifesta.\n\n*ARRANHÃO METÁLICO SECO*\n\nAlgo longo e afiado arranha a madeira por dentro do meu guarda-roupa... a poucos centímetros de mim.`,
        bg: "#040406",
        choices: [
            { text: "Encolher-se sob as cobertas (Voltar ao Menu)", target: "menu_principal" }
        ]
    }
};

// MOTOR CENTRAL DE RENDERIZAÇÃO
const Game = {
    playerName: "Letícia",
    bgMusic: document.getElementById("bg-music"),
    menuMusicURL: "https://soundhelix.com", 
    ambientMusicURL: "https://soundhelix.com",

    setTheme(type) {
        const themeStyle = document.getElementById("theme-stylesheet");
        if (!themeStyle) return;
        
        if (type === "menu") {
            themeStyle.href = "menu-style.css";
            document.body.className = ""; 
        } else if (type === "game") {
            themeStyle.href = "game-style.css";
            document.body.className = "game-active";
        }
    },

    switchScreen(hideId, showId) {
        const hideElement = document.getElementById(hideId);
        const showElement = document.getElementById(showId);
        if (hideElement && showElement) {
            hideElement.classList.add("hidden");
            showElement.classList.remove("hidden");
        }
    },

    loadScene(sceneKey) {
        if (sceneKey === "menu_principal") {
            this.setTheme("menu");
            this.switchScreen("screen-game", "screen-menu");
            if (this.bgMusic) {
                this.bgMusic.src = this.menuMusicURL;
                this.bgMusic.volume = 0.25;
                this.bgMusic.play();
            }
            return;
        }

        const scene = storyData[sceneKey];
        if (!scene) return;

        const textElement = document.getElementById("story-text");
        const container = document.getElementById("choices-container");

        if (textElement && container) {
            container.innerHTML = "";
            textElement.style.opacity = 0;

            setTimeout(() => {
                document.body.style.backgroundColor = scene.bg || "#020202";
                textElement.innerHTML = scene.text(this.playerName);
                textElement.scrollTop = 0;
                textElement.style.opacity = 1;

                scene.choices.forEach((choice, index) => {
                    const button = document.createElement("button");
                    button.className = "choice-btn";
                    button.innerText = choice.text;
                    button.style.animationDelay = `${0.2 + (index * 0.15)}s`;
                    
                    button.addEventListener("click", () => this.loadScene(choice.target));
                    container.appendChild(button);
                });
            }, 400);
        }
    }
};

// DISPARADOR DOS CLIQUES DOS BOTÕES FIXOS
window.addEventListener("DOMContentLoaded", () => {
    
    // 1. Tela de Aviso -> Menu Principal
    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        Game.switchScreen("screen-warning", "screen-menu");
        if (Game.bgMusic) {
            Game.bgMusic.src = Game.menuMusicURL;
            Game.bgMusic.volume = 0.25;
            Game.bgMusic.play().catch(() => console.log("Áudio aguardando clique."));
        }
    });

    // 2. Menu Principal -> Entrada de Nome
    document.getElementById("btn-start").addEventListener("click", () => {
        Game.switchScreen("screen-menu", "screen-name");
    });

    // 3. Entrada de Nome -> Inicialização do Jogo real
    document.getElementById("btn-submit-name").addEventListener("click", () => {
        const inputField = document.getElementById("player-name");
        if (inputField && inputField.value.trim() !== "") {
            Game.playerName = inputField.value.trim();
        }

        Game.setTheme("game");
        Game.switchScreen("screen-name", "screen-game");
        
        if (Game.bgMusic) {
            Game.bgMusic.src = Game.ambientMusicURL;
            Game.bgMusic.volume = 0.15;
            Game.bgMusic.play().catch(() => console.log("Áudio aguardando clique."));
        }

        // Executa a carga do prólogo de forma totalmente limpa e correta
        Game.loadScene("prologue");
    });

    // 4. Botão Sair
    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 não permite que você saia tão facilmente...");
    });
});
