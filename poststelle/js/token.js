/*
  token.js — GitHub Token Verwaltung
  ✅ Speichern, löschen & validieren
  ✅ Fehlerhafte Tokens werden erkannt
*/

let token = localStorage.getItem("fsa_token") || "";

function initToken(){
  const slot = document.getElementById("slot-token");
  if(!slot) return;

  slot.innerHTML = `
    <h2>🔐 Token & Repo</h2>
    <input id="token-input" type="password" placeholder="GitHub Token eingeben..." value="${token}" style="width:100%;padding:8px;margin-bottom:8px;border-radius:6px;border:1px solid #1f2b44;background:#0f1a2e;color:#e6f2ff;">
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      <button onclick="saveToken()">💾 Speichern</button>
      <button onclick="resetToken()">🧽 Reset</button>
      <button onclick="validateToken()">🔍 Prüfen</button>
    </div>
    <p id="token-status" class="muted" style="margin-top:8px;">Token-Status: —</p>
  `;
  updateTokenStatus();
}

function saveToken(){
  token = document.getElementById("token-input").value.trim();
  localStorage.setItem("fsa_token", token);
  updateTokenStatus();
  fsaLog("🔐 Token gespeichert");
}

function resetToken(){
  token = "";
  localStorage.removeItem("fsa_token");
  document.getElementById("token-input").value = "";
  updateTokenStatus();
  fsaLog("🔐 Token entfernt");
}

async function validateToken(){
  if(!token){
    fsaLog("❌ Kein Token eingegeben","err");
    updateTokenStatus(false);
    return;
  }

  try{
    const res = await fetch("https://api.github.com/user",{
      headers:{ "Authorization":`Bearer ${token}` }
    });

    if(res.ok){
      const data = await res.json();
      fsaLog(`✅ Token gültig (GitHub User: ${data.login})`,"ok");
      updateTokenStatus(true);
    }else{
      fsaLog(`❌ Token ungültig (Status: ${res.status})`,"err");
      updateTokenStatus(false);
    }
  }catch(e){
    fsaLog(`❌ Token-Validierungsfehler: ${e.message}`,"err");
    updateTokenStatus(false);
  }
}

function updateTokenStatus(ok){
  const el = document.getElementById("token-status");
  if(!el) return;
  if(token === ""){
    el.textContent = "Token-Status: ❌ Kein Token";
    el.style.color = "var(--err)";
  }else if(ok === true){
    el.textContent = "Token-Status: 🟢 gültig";
    el.style.color = "var(--ok)";
  }else if(ok === false){
    el.textContent = "Token-Status: 🔴 ungültig";
    el.style.color = "var(--err)";
  }else{
    el.textContent = "Token-Status: 🟡 gespeichert – noch nicht geprüft";
    el.style.color = "var(--warn)";
  }
}
