(function(){
  function init(){
    try{
      var btns = document.querySelectorAll('button, [role="button"], .btn, .fsa-btn');
      var panel = document.createElement('div');
      panel.setAttribute('id','fsa-debug-overlay');
      Object.assign(panel.style,{
        position:'fixed',bottom:'12px',right:'12px',background:'rgba(15,23,42,.95)',
        color:'#fff',padding:'10px 14px',borderRadius:'8px',fontSize:'13px',
        zIndex:'2147483647',maxWidth:'260px',lineHeight:'1.4',boxShadow:'0 0 20px rgba(0,0,0,.5)'
      });
      panel.innerHTML = '<b>🧩 Button-Debug aktiv</b><br><small>Event-Binding Monitor</small>';
      document.body.appendChild(panel);

      if(!btns.length){
        console.log('🧩[DEBUG] Keine Buttons gefunden.');
        return;
      }
      btns.forEach(function(b,i){
        var id = b.id || '(kein ID)';
        var tag = (b.tagName||'').toLowerCase();
        var onclickInline = !!b.getAttribute('onclick');
        var text = (b.innerText||'').trim();
        console.log('🧩[DEBUG]', '#'+(i+1), tag, id, { onclickInline: onclickInline, text: text });
      });
      console.log('🧩[DEBUG] Scan abgeschlossen. Klick auf Buttons sollte Events zeigen.');
    }catch(e){
      console.warn('🧩[DEBUG] Overlay Fehler:', e);
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', init);
  }else{ init(); }
})();