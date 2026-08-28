// MOTOR CENTRAL DE RENDERIZAÇÃO E LOGICA DO JOGO
const Game = {
    playerName: "Letícia",
    bgMusic: document.getElementById("bg-music"),
    sfx: document.getElementById("sfx"),
    
    // Links públicos estáveis para testes imediatos de áudio
    AUDIO_LINKS: {
        menu: "https://soundhelix.com", 
        ambient: "https://soundhelix.com", 
        bzzz: "https://google.com" 
    },

    setTheme(type) {
        const themeStyle = document.getElementById("theme-stylesheet");
        if (!themeStyle) return;
        
        if (type === "menu") {
            themeStyle.href = "menu-style.css";
            document.body.className = "menu-active"; 
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

    playMusic(trackName) {
        if (this.bgMusic && this.AUDIO_LINKS[trackName]) {
            this.bgMusic.src = this.AUDIO_LINKS[trackName];
            this.bgMusic.volume = trackName === "menu" ? 0.25 : 0.15;
            this.bgMusic.play().catch(() => console.log("Áudio aguardando permissão."));
        }
    },

    loadScene(sceneKey) {
        // Limpa o efeito de sangue caso ele exista de uma tentativa anterior
        const existingBlood = document.getElementById("blood-screen");
        if (existingBlood) existingBlood.remove();

        if (sceneKey === "menu_principal" || sceneKey === "menu") {
            this.setTheme("menu");
            this.switchScreen("screen-game", "screen-menu");
            this.playMusic("menu");
            return;
        }

        const scene = storyData[sceneKey];
        if (!scene) {
            console.error(`Erro: A cena '${sceneKey}' não foi encontrada no story.js.`);
            return;
        }

        const textElement = document.getElementById("story-text");
        const container = document.getElementById("choices-container");
        const gameContainer = document.getElementById("game-container");

        if (textElement && container && gameContainer) {
            container.innerHTML = "";
            textElement.style.opacity = 0;

            // Reseta reações físicas anteriores para que possam reincorporar na nova cena
            gameContainer.classList.remove("shake-effect", "flicker-effect");

            setTimeout(() => {
                // 1. GERENCIAMENTO DE IMAGEM OU COR DE FUNDO
                if (scene.isEnding) {
                    // Telas finais usam cores sólidas configuradas em bgClass
                    gameContainer.style.backgroundImage = "none";
                    document.body.style.backgroundColor = scene.bgClass || "#020202";
                    
                    // Formata a estrutura visual para a tela final cinematográfica
                    textElement.innerHTML = `
                        <div style="text-align: center; margin-top: 40px; animation: screenFadeIn 1s ease-out;">
                            <h1 style="font-size: 2.8rem; color: #8b0000; letter-spacing: 4px; margin-bottom: 20px; font-weight: bold;">${scene.title}</h1>
                            <p style="font-size: 1.1rem; color: #888; line-height: 1.6; max-width: 500px; margin: 0 auto;">${scene.subtitle}</p>
                        </div>
                    `;

                    // 2. LOGICA DO EFEITO DE SANGUE ESCORRENDO (FINAL RUIM)
                    if (scene.hasBlood) {
                        const bloodContainer = document.createElement("div");
                        bloodContainer.id = "blood-screen";
                        bloodContainer.innerHTML = `
                            <div class="blood-drip drip-1"></div>
                            <div class="blood-drip drip-2"></div>
                            <div class="blood-drip drip-3"></div>
                            <div class="blood-drip drip-4"></div>
                            <div class="blood-drip drip-5"></div>
                        `;
                        gameContainer.appendChild(bloodContainer);
                    }
                } else {
                    // Cenas normais usam imagens de fundo da internet
                    if (scene.bgImage && scene.bgImage !== "none") {
                        gameContainer.style.backgroundImage = `url('${scene.bgImage}')`;
                    } else {
                        gameContainer.style.backgroundImage = "none";
                        document.body.style.backgroundColor = "#020202";
                    }
                    
                    // Injeta a narração/diálogo puxando a função do story.js
                    textElement.innerHTML = scene.text(this.playerName);
                }

                // 3. ATIVAÇÃO DAS REAÇÕES FÍSICAS DA TELA
                if (scene.shake) gameContainer.classList.add("shake-effect");
                if (scene.flicker) gameContainer.classList.add("flicker-effect");

                textElement.scrollTop = 0;
                textElement.style.opacity = 1;

                // 4. RENDERIZAÇÃO DOS BOTÕES COM ANIMAÇÃO DE DELAY
                scene.choices.forEach((choice, index) => {
                    const button = document.createElement("button");
                    button.className = "choice-btn";
                    if (scene.isEnding) button.style.textAlign = "center";
                    
                    button.innerText = choice.text;
                    button.style.animationDelay = `${0.2 + (index * 0.15)}s`;
                    
                    button.addEventListener("click", () => this.loadScene(choice.target));
                    container.appendChild(button);
                });
            }, 400);
        }

        // 5. TRATAMENTO DE EFEITOS SONOROS (SFX)
        if (scene.sfx && this.AUDIO_LINKS[scene.sfx] && this.sfx) {
            this.sfx.src = this.AUDIO_LINKS[scene.sfx];
            this.sfx.volume = 0.5;
            this.sfx.play().catch(() => console.log("SFX aguardando permissão."));
        }
    }
};

// ACIONADORES DOS CLIQUES DOS BOTÕES FIXOS DO HTML
window.addEventListener("DOMContentLoaded", () => {
    Game.setTheme("menu");

    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        Game.switchScreen("screen-warning", "screen-menu");
        Game.playMusic("menu");
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
        Game.playMusic("ambient");

        // Dá partida oficial no jogo chamando o Prólogo do story.js
        Game.loadScene("prologue");
    });

    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 não permite que você saia tão facilmente...");
    });
});
