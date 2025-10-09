const help = (() => {
  const container = document.getElementById("slot-help");

  function render() {
    container.innerHTML = `
      <h3>❔ Hilfe & Support</h3>
      <p>Wenn du Unterstützung brauchst, öffne den Chat.</p>
      <button onclick="window.open('https://chat.openai.com', '_blank')">
        💬 Chat öffnen
      </button>
    `;
  }

  return { render };
})();

document.addEventListener("DOMContentLoaded", help.render);
