/* PATCH 1 – v2.4.1 Modal: Vorname & Nachname vor E‑Mail (idempotent) */
(function () {
  function run(root) {
    var email = (root ? root.querySelector('input[type="email"]') : null) || document.querySelector('input[type="email"]');
    if (!email) return false;
    var form = email.form || email.closest('form');
    if (!form) return false;
    if (form.querySelector('input[name="vorname"]') || form.querySelector('input[name="nachname"]')) return true; // schon vorhanden

    function makeNameInput(placeholder, name, ac) {
      var el = email.cloneNode(false);               // Stil/Klassen übernehmen
      el.type = 'text';
      el.name = name;
      el.id = (email.id ? email.id.replace(/email/i,'') : 'fsa-') + name;
      el.placeholder = placeholder;
      el.setAttribute('aria-label', placeholder);
      el.autocomplete = ac;
      el.required = true;
      el.value = '';
      el.removeAttribute('pattern');                 // evtl. E‑Mail‑Pattern entfernen
      el.removeAttribute('inputmode');
      return el;
    }
    var vor = makeNameInput('Vorname', 'vorname', 'given-name');
    var nach = makeNameInput('Nachname', 'nachname', 'family-name');
    email.parentNode.insertBefore(vor, email);
    email.parentNode.insertBefore(nach, email);
    return true;
  }

  var scopes = ['#welcome-overlay', '#fsa-welcome', '#welcome', '#modal-welcome', '.welcome-modal'];
  var chosen = null;
  for (var i=0;i<scopes.length;i++){ var r=document.createElement('div'); }
})();