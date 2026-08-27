window.addEventListener("DOMContentLoaded", () => {
    
    const bgMusic = document.getElementById("bg-music");
    // Link alternativo de áudio curto e leve para testes estáveis
    const menuMusicURL = "https://google.com"; 

    // Função interna e organizada para trocar telas de forma segura
    function switchScreen(hideId, showId) {
        const hideElement = document.getElementById(hideId);
        const showElement = document.getElementById(showId);
        
        if (hideElement && showElement) {
            hideElement.classList.add("hidden");
            document.getElementById(showId).classList.remove("hidden");
        }
    }

    // 1. Botão "Entendido" (Tela de Aviso -> Menu Principal)
    const btnWarning = document.getElementById("btn-warning-continue");
    if (btnWarning) {
        btnWarning.addEventListener("click", () => {
            switchScreen("screen-warning", "screen-menu");
            
            // Tenta tocar o áudio com segurança para não travar o navegador
            if (bgMusic) {
                bgMusic.src = menuMusicURL;
                bgMusic.volume = 0.20;
                bgMusic.play().catch(e => console.log("Áudio aguardando permissões adicionais."));
            }
        });
    }

    // 2. Botão "Entrar no Apartamento" (Menu Principal -> Tela de Nome)
    const btnStart = document.getElementById("btn-start");
    if (btnStart) {
        btnStart.addEventListener("click", () => {
            switchScreen("screen-menu", "screen-name");
        });
    }

    // 3. Botão "Confirmar Assinatura" 
    const btnSubmit = document.getElementById("btn-submit-name");
    if (btnSubmit) {
        btnSubmit.addEventListener("click", () => {
            const inputField = document.getElementById("player-name");
            const finalName = inputField ? inputField.value.trim() : "Letícia";
            
            console.log(`Nome registrado: ${finalName}. Pronto para a próxima página!`);
            alert(`Contrato assinado sob o nome de: ${finalName}.`);
        });
    }

    // 4. Botão "Sair" (Ajustado para não quebrar a página)
    const btnExit = document.getElementById("btn-exit");
    if (btnExit) {
        btnExit.addEventListener("click", () => {
            alert("O Apartamento 404 não permite que você saia tão facilmente...");
        });
    }
});
