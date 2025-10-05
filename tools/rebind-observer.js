(function(){
  function log(){ try{ console.log.apply(console, ['🧩[OBS]'].concat([].slice.call(arguments))); }catch(_){} }
  function onMutations(mutations){
    var needs = false;
    for(var i=0; i<mutations.length; i++){
      var m = mutations[i];
      if(m.addedNodes && m.addedNodes.length){
        needs = true; break;
      }
    }
    if(needs && window.FSARebind && typeof window.FSARebind.rebind === 'function'){
      window.FSARebind.rebind();
    }
  }
  try{
    var mo = new MutationObserver(onMutations);
    mo.observe(document.documentElement || document.body, { childList:true, subtree:true });
    log('👀 Mutation-Observer aktiv.');
  }catch(e){
    log('❌ Observer Fehler:', e);
  }
})();