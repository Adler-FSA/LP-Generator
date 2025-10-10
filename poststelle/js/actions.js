/* actions.js – Deploy & Backup Aktionen */

const GITHUB = { owner: "Adler-FSA", repo: "Lp-Generator", branch: "main" };

function ghApi(path){ return `https://api.github.com/repos/${GITHUB.owner}/${GITHUB.repo}${path}`; }

async function deployPatch(patch){
  try {
    fsaLog("🚀 Deploy-Vorgang gestartet…");

    // 🛡️ Compliance Check
    if (window.poststelleHooks?.beforeDeploy) {
      const ok = await window.poststelleHooks.beforeDeploy(patch);
      if (!ok) {
        fsaLog("❌ Deploy abgebrochen (S-O-S Compliance verletzt)", "err");
        return;
      }
    }

    if (!token) {
      fsaLog("❌ Kein Token gesetzt!", "err");
      alert("Bitte zuerst Token unter 'Token & Repo' setzen.");
      return;
    }

    for (const file of patch.files) {
      await pushFileToGitHub(file.path, file.content, file.message || patch.message);
    }

    fsaLog(`✅ Deploy abgeschlossen (${patch.files.length} Dateien)`, "ok");

    // 🛰️ Nach Deploy sofort Build-Status prüfen
    if (typeof checkActionStatus === "function") checkActionStatus();

  } catch (err) {
    fsaLog(`❌ Deploy Fehler: ${err.message}`, "err");
    console.error(err);
  }
}

async function pushFileToGitHub(filePath, content, message){
  const url = ghApi(`/contents/${filePath}`);
  const headers = {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json",
    "Content-Type": "application/json"
  };

  let sha = null;
  const getRes = await fetch(url,{ headers });
  if (getRes.ok) {
    const data = await getRes.json();
    sha = data.sha;
  }

  const b64 = btoa(unescape(encodeURIComponent(content)));
  const body = JSON.stringify({ message, content:b64, branch:GITHUB.branch, sha:sha || undefined });

  const putRes = await fetch(url,{ method:"PUT", headers, body });
  if (!putRes.ok) {
    const errData = await putRes.json();
    throw new Error(`Fehler bei ${filePath}: ${putRes.status} – ${errData.message}`);
  }

  fsaLog(`📄 ${filePath} erfolgreich übertragen`, "ok");
}

async function deployBackup(){
  fsaLog("🧭 Backup-Deploy gestartet…","warn");
  const content = `
    <!-- 📦 Poststelle Backup Fallback -->
    <html><head><meta charset="utf-8"><title>📦 Backup</title></head>
    <body><h1>📦 FSA Poststelle – Fallback</h1></body>
    </html>
  `;
  await deployPatch({ message:"backup(poststelle): automatische Fallback-Version", files:[{ path:"poststelle/backup.html", content }]});
  fsaLog("✅ Backup erfolgreich erstellt.", "ok");
  alert("Backup erfolgreich deployed.");
}

window.deployPatch = deployPatch;
window.deployBackup = deployBackup;
