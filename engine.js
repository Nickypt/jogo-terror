const GameEngine = {
    playerName: "Letícia",
    bgMusic: document.getElementById("bg-music"),
    sfx: document.getElementById("sfx"),
    
    // Links públicos e estáveis de áudio para teste imediato
    AUDIO_LINKS: {
        menu: "https://soundhelix.com", 
        ambient: "https://soundhelix.com", 
        bzzz: "https://google.com" 
    },

    setTheme(type) {
        const themeStyle = document.getElementById("theme-stylesheet");
        if (type === "menu") {
            themeStyle.href = "menu-style.css";
            document.body.className = "menu-active";
        } else if (type === "game") {
            themeStyle.href = "game-style.css";
            document.body.className = "game-active";
        }
    },

    switchScreen(hideId, showId) {
        document.getElementById(hideId).classList.add("hidden");
        document.getElementById(showId).classList.remove("hidden");
    },

    playMusic(trackName) {
        if (this.AUDIO_LINKS[trackName]) {
            this.bgMusic.src = this.AUDIO_LINKS[trackName];
            this.bgMusic.volume = trackName === "menu" ? 0.3 : 0.15;
            this.bgMusic.play().catch(() => console.log("Áudio aguardando clique do usuário."));
        }
    },

    loadScene(sceneKey) {
        if (sceneKey === "menu") {
            this.setTheme("menu");
            this.switchScreen("screen-game", "screen-menu");
            this.playMusic("menu");
            return;
        }

        const scene = storyData[sceneKey];
        if (!scene) return;

        // Injeta o texto e limpa o scroll para o topo
        const textElement = document.getElementById("story-text");
        textElement.innerHTML = scene.text(this.playerName);
        textElement.scrollTop = 0;
        
        document.body.style.backgroundColor = scene.bg;

        if (scene.sfx && this.AUDIO_LINKS[scene.sfx]) {
            this.sfx.src = this.AUDIO_LINKS[scene.sfx];
            this.sfx.volume = 0.5;
            this.sfx.play();
        }

        const container = document.getElementById("choices-container");
        container.innerHTML = "";

        scene.choices.forEach(choice => {
            const button = document.createElement("button");
            button.className = "choice-btn";
            button.innerText = choice.text;
            button.addEventListener("click", () => this.loadScene(choice.target));
            container.appendChild(button);
        });
    }
};
