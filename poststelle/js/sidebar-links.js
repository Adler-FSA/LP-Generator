/*
=========================================
 🧭 sidebar-links.js
 Dynamische Link-Generierung für Schnellzugriff
 FSA Core — Poststelle | Werkstatt | LP
=========================================
*/

const FSA_CONFIG = {
  owner: "Adler-FSA",        // 🔹 GitHub Account / Organisation
  repo: "Lp-Generator"       // 🔹 Repository Name
};

document.addEventListener("DOMContentLoaded", () => {
  const { owner, repo } = FSA_CONFIG;

  // Dynamische URLs
  const repoLink = `https://github.com/${owner}/${repo}`;
  const liveLink = `https://${owner.toLowerCase()}.github.io/${repo}/`;
  const actionsLink = `https://github.com/${owner}/${repo}/actions`;

  const setLink = (id, href) => {
    const el = document.getElementById(id);
    if (el) el.href = href;
  };

  setLink("link-repo", repoLink);
  setLink("link-live", liveLink);
  setLink("link-actions", actionsLink);

  console.log("🔗 Sidebar-Links aktualisiert:", { repoLink, liveLink, actionsLink });
});
