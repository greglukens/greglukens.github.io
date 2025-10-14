(function () {
  // Create backdrop once
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

  const imgEl   = () => backdrop.querySelector('.lightbox-img');
  const capEl   = () => backdrop.querySelector('.lightbox-caption');

  function open(src, alt, caption) {
    imgEl().src = src;
    imgEl().alt = alt || '';
    capEl().textContent = caption || '';
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    // small cleanup
    imgEl().src = '';
  }

  backdrop.addEventListener('click', (e) => {
    // close when clicking outside the image
    if (!e.target.closest('.lightbox-img')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Delegate clicks from any .lb or .lightbox img/link
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('img.lb, a.lightbox, figure.lightbox img');
    if (!trigger) return;

    e.preventDefault();
    const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
    if (!img) return;

    const src = trigger.dataset.src || img.dataset.src || img.src;
    const alt = img.alt || '';
    const caption = trigger.dataset.caption || img.dataset.caption || img.alt || '';
    open(src, alt, caption);
  });
})();

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

  function open(src, alt, caption) {
    imgEl().src = src;
    imgEl().alt = alt || '';
    capEl().textContent = caption || '';
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    backdrop.classList.remove('is-open', 'is-zoomed'); // ensure zoom resets
    document.body.style.overflow = '';
    imgEl().src = '';
  }
  function toggleZoom() {
    backdrop.classList.toggle('is-zoomed');
    // center the scroll when entering zoom for a nice effect
    if (backdrop.classList.contains('is-zoomed')) {
      const wrap = backdrop.querySelector('.lightbox-wrap');
      wrap.scrollTo({ left: (wrap.scrollWidth - wrap.clientWidth) / 2,
                      top:  (wrap.scrollHeight - wrap.clientHeight) / 2,
                      behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }

  // Close when clicking outside the image
  backdrop.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('.lightbox-img');
    if (clickedImg) {
      // Click on the image toggles zoom
      toggleZoom();
      return;
    }
    // Click elsewhere closes
    close();
  });

  // Escape closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Delegate: open on any .lb or .lightbox
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('img.lb, a.lightbox, figure.lightbox img');
    if (!trigger) return;

    e.preventDefault();
    const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
    if (!img) return;

    const src = trigger.dataset.src || img.dataset.src || img.src;
    const alt = img.alt || '';
    const caption = trigger.dataset.caption || img.dataset.caption || img.alt || '';
    open(src, alt, caption);
  });
})();
