### ⚙️ 5. `engine.js`
```javascript
const GameEngine = {
    playerName: "Letícia",
    bgMusic: document.getElementById("bg-music"),
    sfx: document.getElementById("sfx"),
    
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
        const existingBlood = document.getElementById("blood-screen");
        if (existingBlood) existingBlood.remove();

        if (sceneKey === "menu") {
            this.setTheme("menu");
            this.switchScreen("screen-game", "screen-menu");
            this.playMusic("menu");
            return;
        }

        const scene = storyData[sceneKey];
        if (!scene) return;

        const textElement = document.getElementById("story-text");
        const container = document.getElementById("choices-container");

        container.innerHTML = "";
        textElement.style.opacity = 0;

        setTimeout(() => {
            document.body.style.backgroundColor = scene.bg;

            if (scene.isEnding) {
                textElement.innerHTML = `
                    <div style="text-align: center; margin-top: 40px;">
                        <h1 style="font-size: 2.8rem; color: #8b0000; letter-spacing: 4px; margin-bottom: 20px; font-weight: bold;">${scene.title}</h1>
                        <p style="font-size: 1.1rem; color: #888; line-height: 1.6; max-width: 500px; margin: 0 auto;">${scene.subtitle}</p>
                    </div>
                `;

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
                    document.getElementById("game-container").appendChild(bloodContainer);
                }
            } else {
                textElement.innerHTML = scene.text(this.playerName);
            }
            
            textElement.scrollTop = 0;
            textElement.style.opacity = 1;

            scene.choices.forEach((choice, index) => {
                const button = document.createElement("button");
                button.className = "choice-btn";
                if(scene.isEnding) button.style.textAlign = "center";
                
                button.innerText = choice.text;
                button.style.animationDelay = `${0.2 + (index * 0.15)}s`;
                
                button.addEventListener("click", () => this.loadScene(choice.target));
                container.appendChild(button);
            });

        }, 400); 

        if (scene.sfx && this.AUDIO_LINKS[scene.sfx]) {
            this.sfx.src = this.AUDIO_LINKS[scene.sfx];
            this.sfx.volume = 0.5;
            this.sfx.play();
        }
    }
};
