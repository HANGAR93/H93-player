window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('appStartupOverlay');

  setTimeout(() => {
    overlay.classList.add('hidden');

    setTimeout(() => {
      overlay.remove();

     
      isCounting = true;
      startTimer();

    }, 1000); 
  }, 4000);
});
