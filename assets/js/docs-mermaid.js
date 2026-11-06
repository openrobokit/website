// Mermaid runs as a deferred module, so it loads after the classic page script
// and asks it to redraw whatever is already on screen.

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  fontFamily: "'Inter', system-ui, sans-serif",
  themeVariables: {
    background: '#F3F1E9',
    primaryColor: '#FFFFFF',
    primaryTextColor: '#151311',
    primaryBorderColor: 'rgba(28,18,7,0.28)',
    secondaryColor: '#EFEBE0',
    tertiaryColor: '#F7F5EF',
    clusterBkg: '#EFEDE4',
    clusterBorder: 'rgba(28,18,7,0.16)',
    lineColor: '#8A8478',
    edgeLabelBackground: '#F3F1E9',
    fontSize: '14px',
  },
});
window.rkMermaid = mermaid;
if (window.rkDrawDiagrams) window.rkDrawDiagrams();
