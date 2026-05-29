(function () {
  // ── SolutionsRx® Supplement Advisor Embed ──────────────────────────────────
  // Drop this script + a trigger button anywhere on your website.
  // The advisor opens in a clean modal overlay. No dependencies required.

  var ADVISOR_URL = 'https://demo.solutionsrx.com';

  function buildModal() {
    if (document.getElementById('srx-modal-overlay')) return;

    // Inject styles
    var style = document.createElement('style');
    style.innerHTML = [
      '#srx-modal-overlay{display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,0.55);backdrop-filter:blur(3px);-webkit-backdrop-filter:blur(3px);align-items:center;justify-content:center;padding:16px;box-sizing:border-box;}',
      '#srx-modal-overlay.srx-open{display:flex;}',
      '#srx-modal-box{position:relative;width:100%;max-width:520px;height:90vh;max-height:820px;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 24px 64px rgba(0,0,0,0.3);display:flex;flex-direction:column;}',
      '#srx-modal-close{position:absolute;top:10px;right:12px;z-index:10;background:rgba(255,255,255,0.9);border:none;border-radius:50%;width:32px;height:32px;font-size:18px;line-height:32px;text-align:center;cursor:pointer;color:#002868;box-shadow:0 2px 8px rgba(0,0,0,0.15);}',
      '#srx-modal-close:hover{background:#f0f0f0;}',
      '#srx-modal-iframe{flex:1;width:100%;border:none;}'
    ].join('');
    document.head.appendChild(style);

    // Overlay
    var overlay = document.createElement('div');
    overlay.id = 'srx-modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'SolutionsRx Supplement Advisor');

    // Modal box
    var box = document.createElement('div');
    box.id = 'srx-modal-box';

    // Close button
    var closeBtn = document.createElement('button');
    closeBtn.id = 'srx-modal-close';
    closeBtn.innerHTML = '&#x2715;';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.onclick = closeModal;

    // iframe
    var iframe = document.createElement('iframe');
    iframe.id = 'srx-modal-iframe';
    iframe.title = 'SolutionsRx Supplement Advisor';
    iframe.setAttribute('loading', 'lazy');

    box.appendChild(closeBtn);
    box.appendChild(iframe);
    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Close on overlay click (outside modal box)
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeModal();
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeModal();
    });
  }

  function openModal() {
    buildModal();
    var overlay = document.getElementById('srx-modal-overlay');
    var iframe  = document.getElementById('srx-modal-iframe');
    // Load/reload the advisor fresh each time
    iframe.src = ADVISOR_URL;
    overlay.classList.add('srx-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    var overlay = document.getElementById('srx-modal-overlay');
    if (overlay) overlay.classList.remove('srx-open');
    document.body.style.overflow = '';
    // Reset iframe so next open starts fresh
    var iframe = document.getElementById('srx-modal-iframe');
    if (iframe) iframe.src = 'about:blank';
  }

  // Expose globally so any button can call it
  window.SRXAdvisor = { open: openModal, close: closeModal };

  // Auto-wire any element with data-srx-advisor attribute
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-srx-advisor]').forEach(function (el) {
      el.addEventListener('click', openModal);
    });
  });
})();
