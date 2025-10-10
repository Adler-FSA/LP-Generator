/*
  🛡️ Compliance-Layer für die Poststelle
  - Rendert Registry-Übersicht
  - Prüft Änderungslisten gegen S-O-S TPS (protected_files)
  - Blockiert Deploy, wenn Kernbereiche betroffen sind
  - Stellt Hook bereit: window.poststelleHooks.beforeDeploy(patch)
*/

(function(){
  const $ = s => document.querySelector(s);

  // Mini-Renderer für die Registry
  function renderRegistry() {
    try{
      const reg = window.SOS_REGISTRY;
      if(!reg){ return; }

      const sumEl = $("#registry-summary");
      const listEl = $("#registry-list");
      sumEl.textContent = `Registry v${reg.version} · aktualisiert: ${new Date(reg.updated_at).toLocaleString()}`;

      const prot = reg.protected_files.map(f=>`<li><code>${f}</code></li>`).join("");
      const pages = reg.pages.map(p=>{
        const items = p.paragraphs.map(x=>`<li><code>${x.pid}</code> → <small>${p.base}${x.file}</small> – ${x.area}</li>`).join("");
        return `<details><summary><strong>${p.title}</strong> <small>(${p.id})</small></summary><ul>${items}</ul></details>`;
      }).join("");

      listEl.innerHTML = `
        <h3>Gesperrte Kernbereiche</h3>
        <ul>${prot || "<li>—</li>"}</ul>
        <h3 style="margin-top:12px;">Registrierte Seiten & Paragraphen</h3>
        ${pages || "<p class='muted'>Keine Einträge</p>"}
      `;
    }catch(e){
      console.error("Registry Render Fehler:", e);
    }
  }

  // Badge-Helfer
  function setComplianceBadge(kind, text){
    const el = $("#compliance-status");
    if(!el) return;
    el.textContent = text;
    el.style.borderColor = "var(--line)";
    if(kind==="ok"){ el.style.color = "var(--ok)"; el.style.background = "rgba(30,203,108,.12)"; }
    else if(kind==="warn"){ el.style.color = "var(--warn)"; el.style.background = "rgba(255,203,92,.12)"; }
    else { el.style.color = "var(--err)"; el.style.background = "rgba(255,92,92,.12)"; }
  }

  // Kernprüfung: darf ein Dateipfad geändert werden?
  function isAllowedPath(path){
    const reg = window.SOS_REGISTRY;
    if(!reg) return true; // wenn keine Registry, nicht blockieren
    return !reg.protected_files.some(p => path.replace(/^\//,"") === p.replace(/^\//,""));
  }

  // Öffentliche Validierung: patch = { files:[ {path, action} ] , message }
  // Rückgabe: { ok:boolean, errors:string[] }
  function validatePatch(patch){
    const errors = [];
    try{
      if(!patch || !Array.isArray(patch.files) || patch.files.length===0){
        errors.push("Leerer Patch oder keine Dateiliste.");
      } else {
        patch.files.forEach(f=>{
          const p = (f.path||"").trim();
          if(!p) return errors.push("Eintrag ohne Pfad.");
          if(!isAllowedPath(p)){
            errors.push(`Gesperrter Kernbereich: ${p}`);
          }
        });
      }
    }catch(e){
      errors.push("Interner Prüfungsfehler: "+e.message);
    }
    return { ok: errors.length===0, errors };
  }

  // Init: Registry darstellen & Hook setzen
  function initCompliance(){
    renderRegistry();
    setComplianceBadge("warn","Prüfung nötig");

    // Globaler Hook, von actions.js vor dem Commit aufgerufen (oder manuell nutzbar)
    window.poststelleHooks = window.poststelleHooks || {};
    window.poststelleHooks.beforeDeploy = async function(patch){
      // patch: { files:[{path,action}], message:string }
      const res = validatePatch(patch);
      if(res.ok){
        setComplianceBadge("ok","Gesetz konform");
        if(typeof fsaLog==="function") fsaLog("🛡️ Compliance-Check: OK (gesetzkonform)","ok");
        return true;
      } else {
        setComplianceBadge("err","Blockiert – Kernbereich betroffen");
        if(typeof fsaLog==="function"){
          fsaLog("❌ Compliance-Check: Blockiert (Kernbereich betroffen)","err");
          res.errors.forEach(e=>fsaLog("  • "+e,"err"));
        }
        alert("Deploy blockiert:\n"+res.errors.join("\n"));
        return false;
      }
    };
  }

  // Exporte
  window.initCompliance = initCompliance;
  window.SOS_validatePatch = validatePatch;
})();
