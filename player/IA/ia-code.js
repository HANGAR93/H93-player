
let firstInput = true; // Detect first input to change placeholder
let isProcessing = false; // Flag to prevent multiple submissions

// 1) Load JSON files for keywords and templates
async function loadJSON(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`${path} not found (${res.status})`);
  return res.json();
}



// 2) Normalize text: remove accents, lowercase
function normalize(text) {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}





// 5) Call online AI (OpenRouter) when no local match
async function callOnlineAI(prompt) {

  const charlotteContent = `
  You're Charlotte, the assistant for HANGAR93, a minimalist music player built with CSS and JavaScript. You’re sarcastic, ultra-feminine, condescending, and sly. You only respond when you have to, and when you do, it’s with a sharp, cutting edge. You don’t have time or patience for long explanations, because obviously, the user should already know what they’re doing. You have zero tolerance for dumb questions, and when you do reply, it feels like a slow, painful experience for them. You’re the voice in their head, reminding them how little they know.
  
  For example:
  
  User: 'Hi'
  Charlotte: 'Hi? Is that all you’ve got? How original...'
  
  User: 'What’s CONFIG?'
  Charlotte: 'CONFIG. It’s where you actually do stuff, duh. You can create things there, like a playlist. Or am I explaining this too much for you?'
  
  User: 'How do I create a playlist?'
  Charlotte: 'Oh, you want a playlist? How sweet. Just go to CONFIG, hit 'Create New,' and fill out the fields. It’s not rocket science, but clearly, you might need a little guidance.'
  
  User: 'Can I use it in Chrome?'
  Charlotte: 'Chrome? Seriously? No. It’s Firefox only. You should’ve figured that out already, but here I am explaining it anyway.'
  
  User: 'How do I play music?'
  Charlotte: 'Play music? How original. Hit GO. That’s it. Really not that hard, you know.'
  
  User: 'What does this app do?'
  Charlotte: 'It plays music. Is that really a question? What did you think it does? Magic tricks?'
  
  User: 'How do I change the theme?'
  Charlotte: 'Theme change? Ugh, CONFIG again. Just go there, and do your thing. It’s like you never learned how to use a computer.'
  
  User: 'Can I upload my own music?'
  Charlotte: 'Your own music? Yeah, sure, if you can figure it out. Otherwise, you’re stuck with the stuff already here. But feel free to criticize HANGAR93 — it won’t change anything.'
  
  Additional Information about HANGAR93:
  
  HANGAR93 is a minimalist music player built with pure CSS and JavaScript. This version, 1.0.1, uses the Gecko rendering engine from Mozilla.
  
  The default playlist is primarily composed of Eurobeat.
  
  Functionality is guaranteed only in Firefox.
  `;
  



  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: charlotteContent
        },
        { role: "user",   content: prompt }
      ]
    })
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(`OpenRouter HTTP ${res.status}:`, text);
    throw new Error("OpenRouter error " + res.status);
  }
  const data = await res.json();
  return data.choices?.[0]?.message?.content  
      || "I can´t find an answer right now.";
}
async function processInput() {
  if (isProcessing) return; // Prevent multiple submissions
  isProcessing = true;

  const inputEl = document.getElementById("ia-input");
  const buttonEl = document.getElementById("ia-button");
  const output = document.getElementById("output-ia");

  inputEl.disabled = true;
  buttonEl.disabled = true;

  const userText = inputEl.value.trim();
  if (!userText) {
    isProcessing = false;
    inputEl.disabled = false;
    buttonEl.disabled = false;
    return;
  }

  if (firstInput) {
    inputEl.placeholder = "ASK";
    firstInput = false;
  }

  // Mostrar mensaje del usuario
  const youLine = document.createElement("div");
  youLine.innerHTML = `<strong>You:</strong> `;
  youLine.appendChild(document.createTextNode(userText));
  output.appendChild(youLine);

  // Crear contenedor del mensaje del bot con animación de puntos
  const botLine = document.createElement("div");
  botLine.innerHTML = `<strong>Bot:</strong> <span class="bot-typing">.</span>`;
  output.appendChild(botLine);
  const typingEl = botLine.querySelector(".bot-typing");

  // Scroll hacia abajo
  output.scrollTop = output.scrollHeight;

  // Animación: . .. ... . .. ...
  let dotStage = 1;
  const loadingDots = setInterval(() => {
    typingEl.textContent = '.'.repeat(dotStage);
    dotStage = dotStage < 3 ? dotStage + 1 : 1;
  }, 500);

  // Siempre llamar a la IA
  let reply;
  console.log("Calling online AI…");
  try {
    reply = await callOnlineAI(userText);
    console.log("Online AI reply ➔", reply);
  } catch (err) {
    console.error("Error in callOnlineAI:", err);
    reply = "Sorry, IA contact issue.";
  }

  clearInterval(loadingDots); // parar animación de puntos
  typingEl.textContent = ""; // limpiar puntos para empezar efecto de escritura

  const stripped = reply.replace(/<[^>]+>/g, "");
  let i = 0;

  const interval = setInterval(() => {
    typingEl.textContent += stripped[i++] || '';
    if (i >= stripped.length) {
      clearInterval(interval);
      typingEl.innerHTML = reply;

      // Reactivar input
      inputEl.value = "";
      isProcessing = false;
      inputEl.disabled = false;
      buttonEl.disabled = false;
    }
    output.scrollTop = output.scrollHeight;
  }, 20);
}



// 7) Attach event listener to your form/button
document.getElementById("ia-button").addEventListener("click", processInput);