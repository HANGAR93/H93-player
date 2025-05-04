window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('appStartupOverlay');
  
    setTimeout(() => {
      overlay.classList.add('hidden');
  
      
      setTimeout(() => {
        overlay.remove();
      }, 1000);
    }, 4000); 
  });
  