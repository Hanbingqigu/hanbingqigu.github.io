(function() {
  var cache = {};
  function updatePVs() {
    document.querySelectorAll('.post-meta-pv-card').forEach(function(el) {
      var path = el.getAttribute('data-post-url');
      if (!path || cache[path]) return;
      cache[path] = true;
      var cb = 'bsz_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
      window[cb] = function(data) {
        var count = data && data.page_pv;
        if (count !== undefined) {
          el.querySelector('span').textContent = count;
        }
        delete window[cb];
      };
      var s = document.createElement('script');
      s.src = 'https://busuanzi.ibruce.info/busuanzi?jsonpCallback=' + cb + '&path=' + encodeURIComponent(path);
      document.body.appendChild(s);
    });
  }
  document.addEventListener('DOMContentLoaded', updatePVs);
  document.addEventListener('pjax:complete', updatePVs);
})();
