window.addEventListener("DOMContentLoaded", () => {
    GameEngine.setTheme("menu");

    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        GameEngine.switchScreen("screen-warning", "screen-menu");
        GameEngine.playMusic("menu");
    });

    document.getElementById("btn-start").addEventListener("click", () => {
        GameEngine.switchScreen("screen-menu", "screen-name");
    });

    document.getElementById("btn-submit-name").addEventListener("click", () => {
        const inputField = document.getElementById("player-name");
        const inputName = inputField.value.trim();
        
        if (inputName !== "") {
            GameEngine.playerName = inputName;
        }

        GameEngine.setTheme("game");
        GameEngine.switchScreen("screen-name", "screen-game");
        GameEngine.playMusic("ambient");
        GameEngine.loadScene("prologue");
    });

    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 nunca se esquece de seus inquilinos.");
        window.close();
    });
});
