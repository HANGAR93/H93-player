document.addEventListener('DOMContentLoaded', function () {
  const aboutContainer = document.getElementById("aboutCont");
  const hostnameElement = document.getElementById("hostname");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=";
  let interval = null;
  let iteration = 0;

  // Mensaje cifrado en inglés
  const phrase = "Thanks to Firefox, especially Gecko, for powering my app.";

  // Función para mostrar "DECRYPTING..." con puntos de manera secuencial
  function showLoading(callback) {
    let dotCount = 0;
    hostnameElement.innerText = "LOADING";
    const dotsInterval = setInterval(() => {
      dotCount = (dotCount % 3) + 1;
      hostnameElement.innerText = "LOADING" + ".".repeat(dotCount);
    }, 500);

    setTimeout(() => {
      clearInterval(dotsInterval);
      if (callback) callback();
    }, 2000);
  }

  // Efecto de descifrado sobre la frase
  function startHackEffect(text) {
    return new Promise((resolve) => {
      iteration = 0;
      clearInterval(interval);

      const hackDuration = text.length * 40;
      interval = setInterval(() => {
        hostnameElement.innerText = text
          .split("")
          .map((ch, idx) =>
            idx < iteration ? text[idx] :
            letters[Math.floor(Math.random() * letters.length)]
          )
          .join("");

        if (iteration >= text.length) {
          clearInterval(interval);
          resolve();
        }
        iteration += 1 / 3;
      }, hackDuration / text.length);
    });
  }

  // Mostrar mensaje cifrado tras entrar en vista
  function showEncryptedMessage() {
    showLoading(async () => {
      await startHackEffect(phrase);
      console.log("Encrypted message revealed.");
    });
  }

  // Observer para disparar la animación cuando el contenedor sea visible
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(showEncryptedMessage, 200);
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(aboutContainer);
});
