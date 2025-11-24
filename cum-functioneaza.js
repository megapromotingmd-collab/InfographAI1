const state = {
  typing: false,
  settings: false,
  upload: false,
  timeline: false,
  gallery: false,
  cta: false,
};

const scriptText = `SET 1: AVENTURA ÎN JUNGLĂ
Context Global: Stil explorator anii 1920,
lumină caldă, atmosferă misterioasă.

SCENA 1: Camera cu hărți. Un birou 
plin de hărți vechi și busole.

SCENA 2: Pregătirea jeep-ului. 
Echipa încarcă proviziile.

SCENA 3: Intrarea în junglă. 
Vegetație densă, lumină filtrată...`;

document.addEventListener('DOMContentLoaded', () => {
  injectIcons();
  setupSmoothScroll();
  setupSectionObserver();
  setupSideNav();
  document.getElementById('start-batch')?.addEventListener('click', startTimeline);
});

function injectIcons() {
  const templates = document.querySelectorAll('#icon-templates template');
  const map = {};
  templates.forEach(tpl => {
    const key = tpl.id.replace('icon-', '');
    map[key] = tpl;
  });

  document.querySelectorAll('[data-icon]').forEach(target => {
    const key = target.dataset.icon;
    const tpl = map[key];
    if (tpl) {
      target.innerHTML = '';
      target.appendChild(tpl.content.cloneNode(true));
    }
  });
}

function setupSmoothScroll() {
  document.querySelectorAll('[data-scroll]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function setupSideNav() {
  const dots = Array.from(document.querySelectorAll('.side-dot'));
  const sections = ['#hero', '#scenariu', '#setari', '#upload', '#generare', '#rezultat', '#cta-final'];

  dots.forEach((dot, idx) => {
    const target = sections[idx];
    dot.addEventListener('click', () => {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = `#${entry.target.id}`;
        dots.forEach((dot, idx) => {
          dot.classList.toggle('active', sections[idx] === id);
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(id => {
    const el = document.querySelector(id);
    if (el) observer.observe(el);
  });
}

function setupSectionObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        switch (entry.target.id) {
          case 'scenariu':
            startTypewriter();
            break;
          case 'setari':
            playSettingsSequence();
            break;
          case 'upload':
            playUploadSimulation();
            break;
          case 'generare':
            startTimeline();
            break;
          case 'rezultat':
            revealResults();
            break;
          case 'cta-final':
            playCtaMerge();
            break;
          default:
            break;
        }
      }
    });
  }, { threshold: 0.35 });

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
}

function renderTyping(value) {
  const target = document.getElementById('script-typing');
  if (!target) return;
  const escaped = value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  const highlighted = escaped.replace(/(SET|SCENA|Context)/g, '<span class="keyword">$1</span>');
  target.innerHTML = `${highlighted.replace(/\n/g, '<br>')}<span class="cursor"></span>`;
}

function startTypewriter() {
  if (state.typing) return;
  state.typing = true;
  let idx = 0;
  const speed = 50;
  const interval = setInterval(() => {
    idx += 1;
    renderTyping(scriptText.slice(0, idx));
    if (idx >= scriptText.length) {
      clearInterval(interval);
      setTimeout(revealParsingBlocks, 300);
    }
  }, speed);
}

function revealParsingBlocks() {
  const blocks = document.querySelectorAll('.parsed-block');
  blocks.forEach((block, idx) => {
    setTimeout(() => block.classList.add('visible'), 250 * idx);
  });
}

function playSettingsSequence() {
  if (state.settings) return;
  state.settings = true;
  const controls = Array.from(document.querySelectorAll('[data-setting-step]'));
  controls.forEach((control, idx) => {
    setTimeout(() => control.classList.add('active'), idx * 900);
  });
  const badges = document.getElementById('setting-badges');
  if (badges) {
    setTimeout(() => badges.classList.add('visible'), controls.length * 900 + 400);
  }
}

function playUploadSimulation() {
  if (state.upload) return;
  state.upload = true;
  const section = document.getElementById('upload');
  const dropzone = document.getElementById('dropzone');
  const detectLines = document.querySelectorAll('[data-detect-line]');
  if (section) section.classList.add('play');
  if (dropzone) {
    dropzone.classList.add('play');
    setTimeout(() => dropzone.classList.add('dropped'), 1600);
  }
  detectLines.forEach((line, idx) => {
    setTimeout(() => line.classList.add('visible'), 1200 + idx * 300);
  });
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimeline() {
  if (state.timeline) return;
  state.timeline = true;
  const slots = Array.from(document.querySelectorAll('.timeline-slot'));
  const progressFill = document.getElementById('progress-fill');
  const statusTimer = document.getElementById('status-timer');
  const statusText = document.getElementById('status-text');
  const statusOverall = document.getElementById('status-overall');
  const button = document.getElementById('start-batch');
  let idx = 0;
  let scenesDone = 0;
  let timerSeconds = 14 * 60 + 30;

  if (button) {
    button.textContent = 'GENERATING BATCH...';
    button.classList.add('loading');
  }

  const stepper = setInterval(() => {
    if (idx >= slots.length) {
      clearInterval(stepper);
      if (statusText) statusText.textContent = 'Batch finalizat';
      if (button) {
        button.textContent = 'BATCH COMPLETE ✓';
        button.classList.remove('loading');
        button.classList.add('complete');
      }
      showBadges();
      return;
    }

    const slot = slots[idx];
    slot.classList.add('active');
    setTimeout(() => slot.classList.add('done'), 200);

    const isAnchor = slot.dataset.anchor === 'true';
    if (isAnchor) {
      if (statusText) statusText.textContent = 'Creare Character Sheet 1.5...';
    } else {
      scenesDone += 1;
      if (statusText) statusText.textContent = `Generare Scena ${scenesDone}...`;
    }

    const percent = Math.min(100, Math.round((scenesDone / 15) * 100));
    if (progressFill) progressFill.style.width = `${percent}%`;
    if (statusOverall) statusOverall.textContent = `${percent}% completat`;

    timerSeconds = Math.max(0, timerSeconds - 45);
    if (statusTimer) statusTimer.textContent = formatTime(timerSeconds);

    idx += 1;
  }, 650);
}

function showBadges() {
  document.querySelectorAll('.status-badge').forEach((badge, idx) => {
    setTimeout(() => badge.classList.add('visible'), idx * 200);
  });
}

function revealResults() {
  if (state.gallery) return;
  state.gallery = true;
  const cards = document.querySelectorAll('#result-gallery .result-card');
  cards.forEach((card, idx) => {
    setTimeout(() => card.classList.add('visible'), idx * 90);
  });

  const nodes = document.querySelectorAll('#file-tree [data-node]');
  nodes.forEach((node, idx) => {
    setTimeout(() => node.classList.add('open'), 400 + idx * 180);
  });

  if (window.innerWidth <= 768) {
    const tree = document.getElementById('file-tree');
    if (tree) tree.classList.add('mobile-open');
  }
}

function playCtaMerge() {
  if (state.cta) return;
  state.cta = true;
  const icons = document.getElementById('cta-icons');
  if (!icons) return;
  icons.classList.add('pulse');
  setTimeout(() => icons.classList.add('merge'), 1400);
}
