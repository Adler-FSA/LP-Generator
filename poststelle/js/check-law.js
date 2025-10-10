(function(){
  const $ = s => document.querySelector(s);

  function renderRegistry() {
    const reg = window.SOS_REGISTRY;
    if(!reg) return;
    $("#registry-summary").textContent = `Registry v${reg.version} · aktualisiert: ${new Date(reg.updated_at).toLocaleString()}`;
    const prot = reg.protected_files.map(f=>`<li><code>${f}</code></li>`).join("");
    const pages = reg.pages.map(p=>{
      const items = p.paragraphs.map(x=>`<li><code>${x.pid}</code> → <small>${p.base}${x.file}</small> – ${x.area}</li>`).join("");
      return `<details><summary><strong>${p.title}</strong> <small>(${p.id})</small></summary><ul>${items}</ul></details>`;
    }).join("");

    $("#registry-list").innerHTML = `
      <h3>Gesperrte Kernbereiche</h3><ul>${prot}</ul>
      <h3 style="margin-top:12px;">Registrierte Seiten & Paragraphen</h3>${pages}
    `;
  }

  function setComplianceBadge(kind,text){
    const el=$("#compliance-status");
    if(!el)return;
    el.textContent=text;
    el.style.borderColor="var(--line)";
    el.style.background= kind==="ok" ? "rgba(30,203,108,.12)" :
                        kind==="warn" ? "rgba(255,203,92,.12)" :
                        "rgba(255,92,92,.12)";
    el.style.color= kind==="ok" ? "var(--ok)" :
                    kind==="warn" ? "var(--warn)" :
                    "var(--err)";
  }

  function isAllowedPath(path){
    const reg=window.SOS_REGISTRY;
    return !reg.protected_files.some(p => path.replace(/^\//,"")===p.replace(/^\//,""));
  }

  function validatePatch(patch){
    const errors=[];
    if(!patch||!Array.isArray(patch.files)||patch.files.length===0){
      errors.push("Leerer Patch oder keine Dateiliste.");
    }else{
      patch.files.forEach(f=>{
        const p=(f.path||"").
