// 🦅 FSA Auto-Redirect Handler (universal for GitHub Pages)
(function(){
  const path = window.location.pathname.replace(/\/+$/, "");
  const base = "https://adler-fsa.github.io/Lp-Generator";

  const redirects = {
    "/Lp-Generator": base + "/tools/index.html",
    "/Lp-Generator/tools": base + "/tools/index.html",
    "/Lp-Generator/poststelle": base + "/poststelle/index.html",
    "/Lp-Generator/tool": base + "/tools/index.html",
    "/Lp-Generator/werkstatt": base + "/tools/index.html"
  };

  if(redirects[path]){
    window.location.replace(redirects[path]);
  } else if(!path.endsWith(".html")){
    window.location.replace(base + path + "/index.html");
  }
})();
