// BANCO DE DADOS DA HISTÓRIA (Prólogo Inicial)
const storyData = {
    prologue: {
        text: (name) => `O anúncio na internet parecia bom demais para ser verdade.\n\nUm apartamento de dois quartos, bem no centro da cidade, por um terço do preço padrão do mercado de aluguéis.\n\nO corretor de imóveis parecia estranhamente ansioso para assinar a papelada. Quando perguntei o motivo de estar tão barato, ele apenas sorriu amarelo, desviou o olhar com pressa e disse que o antigo inquilino mudou-se por 'motivos urgentes de saúde'.\n\nAgora, segurando as chaves frias diante da porta descascada do Apartamento 404, um calafrio na espinha me diz que eu devia ter feito mais perguntas...`,
        choices: [
            { text: "Girar a chave e entrar no apartamento", target: "fim_etapa" }
        ]
    },
    fim_etapa: {
        text: (name) => `Você cruzou o portal do Apartamento 404 sob o nome de ${name}.\n\nParabéns! A primeira página, o sistema de nomes e o motor de transições estão funcionando 100%!`,
        choices: [
            { text: "Voltar ao Menu Principal", target: "menu_principal" }
        ]
    }
};

window.addEventListener("DOMContentLoaded", () => {
    
    let playerName = "Letícia";
    const bgMusic = document.getElementById("bg-music");
    const menuMusicURL = "https://soundhelix.com"; 

    function switchScreen(hideId, showId) {
        const hideElement = document.getElementById(hideId);
        const showElement = document.getElementById(showId);
        if (hideElement && showElement) {
            hideElement.classList.add("hidden");
            showElement.classList.remove("hidden");
        }
    }

    // Carrega os blocos de texto da história dinamicamente
    function loadScene(sceneKey) {
        if (sceneKey === "menu_principal") {
            // Se o jogo pedir para voltar ao menu, restaura o estilo do menu
            document.getElementById("theme-stylesheet").href = "menu-style.css";
            switchScreen("screen-game", "screen-menu");
            return;
        }

        const scene = storyData[sceneKey];
        if (!scene) return;

        const textElement = document.getElementById("story-text");
        const container = document.getElementById("choices-container");

        // Injeta a história na tela
        textElement.innerHTML = scene.text(playerName);
        container.innerHTML = "";

        // Cria os botões de escolha
        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            // Estilização rápida para os botões do jogo enquanto não colamos o game-style completo
            button.style.background = "#111";
            button.style.color = "#aaa";
            button.style.border = "1px solid #333";
            button.style.padding = "14px";
            button.style.cursor = "pointer";
            button.style.fontFamily = "inherit";
            button.style.textAlign = "left";
            button.innerText = choice.text;
            
            button.addEventListener("click", () => loadScene(choice.target));
            container.appendChild(button);
        });
    }

    // 1. Tela de Aviso -> Menu Principal
    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        switchScreen("screen-warning", "screen-menu");
        if (bgMusic) {
            bgMusic.src = menuMusicURL;
            bgMusic.volume = 0.20;
            bgMusic.play().catch(() => console.log("Áudio aguardando permissão."));
        }
    });

    // 2. Menu Principal -> Tela de Nome
    document.getElementById("btn-start").addEventListener("click", () => {
        switchScreen("screen-menu", "screen-name");
    });

    // 3. Tela de Nome -> Avançar para o Jogo de verdade!
    document.getElementById("btn-submit-name").addEventListener("click", () => {
        const inputField = document.getElementById("player-name");
        if (inputField && inputField.value.trim() !== "") {
            playerName = inputField.value.trim();
        }

        // Troca a folha de estilos para o jogo em andamento
        document.getElementById("theme-stylesheet").href = "game-style.css";
        switchScreen("screen-name", "screen-game");
        
        // Inicia a história carregando o prólogo!
        loadScene("prologue");
    });

    // 4. Botão Sair
    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 não permite que você saia tão facilmente...");
    });
});
