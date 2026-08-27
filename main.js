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
            document.getElementById("game-container").style.backgroundImage = "none";
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
        const gameContainer = document.getElementById("game-container");

        if (textElement && container && gameContainer) {
            container.innerHTML = "";
            textElement.style.opacity = 0;

            // Reseta as reações físicas anteriores para prepará-las para novos gatilhos
            gameContainer.classList.remove("shake-effect", "flicker-effect");

            setTimeout(() => {
                // Injeta a foto de fundo configurada no roteiro
                if (scene.bgImage) {
                    gameContainer.style.backgroundImage = `url('${scene.bgImage}')`;
                }

                // SISTEMA DINÂMICO DE REAÇÃO DA TELA
                if (scene.shake) {
                    gameContainer.classList.add("shake-effect");
                }
                if (scene.flicker) {
                    gameContainer.classList.add("flicker-effect");
                }

                textElement.innerHTML = scene.text(this.playerName);
                textElement.scrollTop = 0;
                textElement.style.opacity = 1;

                // Monta e renderiza as escolhas de botões na base
                scene.choices.forEach((choice, index) => {
                    const button = document.createElement("button");
                    button.className = "choice-btn";
                    button.innerText = choice.text;
                    button.style.animationDelay = `${0.15 + (index * 0.1)}s`;
                    
                    button.addEventListener("click", () => this.loadScene(choice.target));
                    container.appendChild(button);
                });
            }, 400);
        }
    }
};

// ACIONADORES DOS EVENTOS DA PÁGINA INICIAL
window.addEventListener("DOMContentLoaded", () => {
    
    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        Game.switchScreen("screen-warning", "screen-menu");
        if (Game.bgMusic) {
            Game.bgMusic.src = Game.menuMusicURL;
            Game.bgMusic.volume = 0.25;
            Game.bgMusic.play().catch(() => console.log("Áudio aguardando clique."));
        }
    });

    document.getElementById("btn-start").addEventListener("click", () => {
        Game.switchScreen("screen-menu", "screen-name");
    });

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

        Game.loadScene("prologue");
    });

    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 não permite que você saia tão facilmente... Fique.");
    });
});
