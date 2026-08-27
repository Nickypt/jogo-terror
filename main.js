window.addEventListener("DOMContentLoaded", () => {
    // Configura o visual inicial do menu
    GameEngine.setTheme("menu");

    // Tela de Aviso -> Menu Principal
    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        GameEngine.switchScreen("screen-warning", "screen-menu");
        GameEngine.playMusic("menu");
    });

    // Menu Principal -> Tela de Nome
    document.getElementById("btn-start").addEventListener("click", () => {
        GameEngine.switchScreen("screen-menu", "screen-name");
    });

    // Tela de Nome -> Início do Jogo
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

    // Sair do Jogo
    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 nunca se esquece de seus inquilinos.");
        window.close();
    });
});
