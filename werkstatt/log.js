const log = (() => {
  const container = document.getElementById("slot-log");

  function write(msg) {
    const time = new Date().toLocaleTimeString();
    container.innerHTML += `<div>[${time}] ${msg}</div>`;
  }

  function clear() {
    container.innerHTML = "";
  }

  return { write, clear };
})();
