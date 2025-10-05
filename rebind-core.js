(function(){
  var SELECTOR = 'button, [role="button"], .btn, .fsa-btn';
  function log(){ try{ console.log.apply(console, ['🧩[REBIND]'].concat([].slice.call(arguments))); }catch(_){} }

  function markAndBind(el){
    if(!el || (el.dataset && el.dataset.fsaBound === '1')) return;
    if(!el.dataset) el.dataset = {};
    el.dataset.fsaBound = '1';
    el.addEventListener('click', function(ev){
      var label = (el.innerText||'').trim() || el.id || '(unbenannt)';
      log('✅ Click erkannt:', label);
      try{
        var evt = new CustomEvent('fsa:button-click', { detail:{ element: el, label: label }, bubbles: true });
        el.dispatchEvent(evt);
      }catch(e){/* noop */}
    }, { passive: true });
  }

  function rebindAll(){
    try{
      var nodes = document.querySelectorAll(SELECTOR);
      nodes.forEach(markAndBind);
      log('🔄 Re-Bind durchgeführt:', nodes.length, 'Buttons');
    }catch(e){
      log('❌ Re-Bind Fehler:', e);
    }
  }

  function setupDelegation(){
    if(window.__fsaDelegation) return;
    window.__fsaDelegation = true;
    document.addEventListener('click', function(e){
      var el = e.target;
      while(el && el !== document){
        if(el.matches && el.matches(SELECTOR)){
          if(!(el.dataset && el.dataset.fsaBound === '1')){
            markAndBind(el);
          }
          break;
        }
        el = el.parentElement;
      }
    }, { passive: true, capture: true });
    log('🧭 Event-Delegation aktiv.');
  }

  function init(){
    rebindAll();
    setupDelegation();
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{ init(); }

  window.addEventListener('focus', rebindAll);
  document.addEventListener('readystatechange', function(){
    if(document.readyState === 'complete'){ rebindAll(); }
  });

  window.FSARebind = {
    rebind: rebindAll,
    version: '2.4.2',
    selector: SELECTOR
  };
})();