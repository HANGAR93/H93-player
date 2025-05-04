document.addEventListener('DOMContentLoaded', function () {
    // Función para apagar la pantalla CRT
    function closeWindow() {
        if (currentConfigAudio) {
            currentConfigAudio.pause();
            currentConfigAudio.currentTime = 0;
            currentConfigAudio = null;
          }
        // Agrega clase al body
        document.body.classList.add('crt-off');

      
      
        const audio = new Audio('assets/turning-off-tv-sound-fx_100bpm_D_minor.wav'); 
        audio.play(); 
    }

    // Para que puedas usar la función desde consola o desde otro botón
    window.closeWindow = closeWindow;
});
