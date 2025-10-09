window.fsaLog = function (msg) {
  const el = document.getElementById("log");
  el.textContent += `\n${new Date().toLocaleTimeString()} ${msg}`;
  el.scrollTop = el.scrollHeight;
};
