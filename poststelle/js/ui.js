<script>
// — Schnellzugriff-Panel neu aufbauen —
(function buildQuickLinks(){
  const box = document.querySelector('#quick-links'); // <div id="quick-links"> in index.html
  if(!box) return;

  const repoUrl   = 'https://github.com/Adler-FSA/Lp-Generator';
  const liveUrl   = 'https://adler-fsa.github.io/Lp-Generator/';
  const lawUrl    = 'https://adler-fsa.github.io/Lp-Generator/docs/sos-gesetz-v1.3.html';
  const actionsUrl= 'https://github.com/Adler-FSA/Lp-Generator/actions';

  box.innerHTML = `
    <h3>🔗 Schnellzugriff</h3>
    <ul style="list-style:none;padding-left:0;margin:0">
      <li style="margin:6px 0"><a href="${repoUrl}"   target="_blank">📁 Repo öffnen</a></li>
      <li style="margin:6px 0"><a href="${liveUrl}"   target="_blank">🌐 Live Seite</a></li>
      <li style="margin:6px 0"><a href="${lawUrl}"    target="_blank">📜 S-O-S Gesetz v1.3</a></li>
      <li style="margin:6px 0"><a href="${actionsUrl}"target="_blank">⚙️ GitHub Actions</a></li>
    </ul>
  `;
})();
</script>
