(function () {
  const backdrop = document.createElement('div');
  backdrop.className = 'lightbox-backdrop';
  backdrop.innerHTML = `
    <div class="lightbox-wrap" role="dialog" aria-modal="true" aria-label="Image preview">
      <div>
        <img class="lightbox-img" alt="">
        <div class="lightbox-caption"></div>
      </div>
    </div>
  `;
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(backdrop));

  const imgEl = () => backdrop.querySelector('.lightbox-img');
  const capEl = () => backdrop.querySelector('.lightbox-caption');

  function open(src, alt, caption, zoomOnOpen = true) {
    imgEl().src = src;
    imgEl().alt = alt || '';
    capEl().textContent = caption || '';

    // open (pop)
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // then zoom (on the same click) – wait 2 RAFs so the open transition applies first
    if (zoomOnOpen) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          backdrop.classList.add('is-zoomed');
          centerScroll();
        });
      });
    }
  }

  function centerScroll() {
    const wrap = backdrop.querySelector('.lightbox-wrap');
    // center the image within the scroll area after zoom
    wrap.scrollTo({
      left: (wrap.scrollWidth - wrap.clientWidth) / 2,
      top:  (wrap.scrollHeight - wrap.clientHeight) / 2,
      behavior: 'auto'
    });
  }

  function close() {
    backdrop.classList.remove('is-open', 'is-zoomed');
    document.body.style.overflow = '';
    imgEl().src = '';
  }

  function toggleZoom() {
    backdrop.classList.toggle('is-zoomed');
    if (backdrop.classList.contains('is-zoomed')) centerScroll();
  }

  // Click outside the image closes; click ON the image toggles zoom
  backdrop.addEventListener('click', (e) => {
    if (e.target.closest('.lightbox-img')) {
      toggleZoom();
    } else {
      close();
    }
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Delegate opener
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('img.lb, a.lightbox, figure.lightbox img');
    if (!trigger) return;

    e.preventDefault();
    const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
    if (!img) return;

    const src = trigger.dataset.src || img.dataset.src || img.src;
    const alt = img.alt || '';
    const caption = trigger.dataset.caption || img.dataset.caption || img.alt || '';
    const noZoom = trigger.dataset.noZoomOnOpen === 'true' || img.dataset.noZoomOnOpen === 'true';

    open(src, alt, caption, !noZoom); // zoom on first open by default
  });
})();
