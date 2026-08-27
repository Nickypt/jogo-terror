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
            const container = document.getElementById("game-container");
            if (container) container.style.backgroundImage = "none";
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

            gameContainer.classList.remove("shake-effect", "flicker-effect");

            setTimeout(() => {
                // Trava de segurança: só tenta aplicar a imagem se ela realmente existir no script
                if (scene && scene.bgImage) {
                    gameContainer.style.backgroundImage = `url('${scene.bgImage}')`;
                } else {
                    gameContainer.style.backgroundImage = "none";
                }

                if (scene.shake) gameContainer.classList.add("shake-effect");
                if (scene.flicker) gameContainer.classList.add("flicker-effect");

                textElement.innerHTML = scene.text(this.playerName);
                textElement.scrollTop = 0;
                textElement.style.opacity = 1;

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

window.addEventListener("DOMContentLoaded", () => {
    // Garante que o jogo inicia apontando para o CSS do menu
    Game.setTheme("menu");

    const btnWarning = document.getElementById("btn-warning-continue");
    if (btnWarning) {
        btnWarning.addEventListener("click", () => {
            Game.switchScreen("screen-warning", "screen-menu");
            if (Game.bgMusic) {
                Game.bgMusic.src = Game.menuMusicURL;
                Game.bgMusic.volume = 0.25;
                Game.bgMusic.play().catch(() => console.log("Áudio aguardando clique."));
            }
        });
    }

    const btnStart = document.getElementById("btn-start");
    if (btnStart) {
        btnStart.addEventListener("click", () => {
            Game.switchScreen("screen-menu", "screen-name");
        });
    }

    const btnSubmit = document.getElementById("btn-submit-name");
    if (btnSubmit) {
        btnSubmit.addEventListener("click", () => {
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
    }

    const btnExit = document.getElementById("btn-exit");
    if (btnExit) {
        btnExit.addEventListener("click", () => {
            alert("O Apartamento 404 não permite que você saia tão facilmente...");
        });
    }
});
