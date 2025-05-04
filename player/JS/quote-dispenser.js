document.addEventListener('DOMContentLoaded', function () {
    const apiKey = 'geBlEDhhBdk77+3oT8OO5A==GQsTIWnrzG12yKuD';
  
    async function hashQuoteTo10Chars(quote) {
      const encoder = new TextEncoder();
      const data = encoder.encode(quote);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      const hash = hashHex.slice(0, 10).toUpperCase();
      return `ERR-${hash}`;
    }
  
    async function loadQuote() {
      const quoteHashedElement = document.getElementById('quoteHashed');
      const quoteOriginalElement = document.getElementById('quoteOriginal');
  
      if (quoteHashedElement) {
        quoteHashedElement.textContent = '[ SYS-ID: LOADING QUOTE... ]';
      }
      if (quoteOriginalElement) {
        quoteOriginalElement.textContent = '';                  // Vaciar contenido
        quoteOriginalElement.style.backgroundColor = 'transparent'; // Fondo transparente
        quoteOriginalElement.style.display = 'none'; // Asegurarse de que no se vea
      }
  
      let loadingDots = 0;
      let loadingInterval;
  
      if (quoteHashedElement) {
        // Animación de puntos suspensivos
        loadingInterval = setInterval(() => {
          loadingDots = (loadingDots + 1) % 4; // Crea la animación de puntos
          const dots = '.'.repeat(loadingDots);
          quoteHashedElement.textContent = `[ SYS-ID: LOADING QUOTE${dots} ]`;
        }, 400); // Actualiza cada 400ms
      }
  
      // Retraso de 1 segundo antes de empezar a cargar la cita
      setTimeout(async () => {
        try {
          const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            method: 'GET',
            headers: { 'X-Api-Key': apiKey }
          });
  
          const data = await response.json();
          const quote = data[0]?.quote;
  
          if (!quote) throw new Error("No quote returned");
  
          const hash = await hashQuoteTo10Chars(quote);
          console.log(`[ QUOTE LOG ] ${quote}`);
  
          clearInterval(loadingInterval); // Detener la animación de loading
  
          if (quoteHashedElement && quoteOriginalElement) {
            quoteHashedElement.textContent = `[ SYS-ID: ${hash} ]`;
            quoteOriginalElement.textContent = quote;
            quoteOriginalElement.style.backgroundColor = 'black';
            quoteOriginalElement.style.display = 'none'; // No mostrar aún la cita
  
            // Hover efecto
            quoteHashedElement.addEventListener('mouseenter', () => {
              quoteOriginalElement.style.display = 'block'; // Mostrar la cita al pasar el mouse
              quoteOriginalElement.classList.add('show');
            });
  
            quoteHashedElement.addEventListener('mouseleave', () => {
              quoteOriginalElement.classList.remove('show');
              setTimeout(() => {
                quoteOriginalElement.style.display = 'none'; // Ocultar la cita al quitar el mouse
              }, ); 
            });
          }
        } catch (error) {
          clearInterval(loadingInterval); // Detener la animación de loading
          console.error('[ SYSTEM ERROR ] No quotes found', error);
          if (quoteHashedElement) {
            quoteHashedElement.textContent = '[ SYS-ID: ERR-0000000000 ]';
          }
        }
      }, 1000); // Retraso de 1 segundo para mostrar la cita
  
    }
  
    // Cargar una frase al iniciar
    loadQuote();
  
    window.loadQuote = loadQuote;
  });
  