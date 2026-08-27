window.addEventListener("DOMContentLoaded", () => {
    
    const bgMusic = document.getElementById("bg-music");
    const menuMusicURL = "https://soundhelix.com"; 

    // Função interna e organizada para trocar telas
    function switchScreen(hideId, showId) {
        document.getElementById(hideId).classList.add("hidden");
        document.getElementById(showId).classList.remove("hidden");
    }

    // 1. Botão "Entendido" (Tela de Aviso -> Menu Principal)
    document.getElementById("btn-warning-continue").addEventListener("click", () => {
        switchScreen("screen-warning", "screen-menu");
        
        // Ativa a trilha sonora ao registrar a primeira interação física do jogador
        bgMusic.src = menuMusicURL;
        bgMusic.volume = 0.25;
        bgMusic.play().catch(() => console.log("Áudio bloqueado pelas restrições do navegador."));
    });

    // 2. Botão "Entrar no Apartamento" (Menu Principal -> Tela de Nome)
    document.getElementById("btn-start").addEventListener("click", () => {
        switchScreen("screen-menu", "screen-name");
    });

    // 3. Botão "Confirmar Assinatura" 
    document.getElementById("btn-submit-name").addEventListener("click", () => {
        const inputField = document.getElementById("player-name");
        const finalName = inputField.value.trim() || "Letícia";

        // Um aviso temporário para confirmar o funcionamento completo antes de chamarmos o jogo
        alert(`Contrato do Apartamento 404 assinado por: ${finalName}.\n\nPronto para passarmos para a página de gameplay!`);
    });

    // 4. Botão "Sair"
    document.getElementById("btn-exit").addEventListener("click", () => {
        alert("O Apartamento 404 nunca esquece seus inquilinos.");
        window.close();
    });
});
