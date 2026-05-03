/**
 * CareState Precision Lexicon
 * Self-contained: embeds lexicon data, injects sheet UI into any host page.
 * Usage: <script src="lexicon.js"></script>  then call openLexiconSheet('term')
 */
(function () {
  'use strict';

  // ─── Lexicon data (FERTILITY_LEXICON.json) ─────────────────────────
  const DATA = {
    medications: [
      {
        name: 'Menopur',
        type: 'Gonadotropin',
        purpose: 'Contains both FSH and LH to stimulate the ovaries to produce multiple eggs.',
        side_effects: ['Headache', 'Abdominal pain', 'Injection site reaction'],
        storage: 'Room temperature or refrigerated'
      },
      {
        name: 'Gonal-F',
        type: 'FSH (Follicle Stimulating Hormone)',
        purpose: 'Pure FSH used to stimulate the development of multiple follicles in the ovaries.',
        side_effects: ['Ovarian hyperstimulation', 'Headache', 'Nausea'],
        storage: 'Refrigerated (Follistim) or Room Temp (Gonal-F Redi-ject)'
      },
      {
        name: 'Follistim',
        type: 'FSH (Follicle Stimulating Hormone)',
        purpose: 'Pure FSH used to stimulate the development of multiple follicles in the ovaries.',
        side_effects: ['Ovarian hyperstimulation', 'Headache', 'Nausea'],
        storage: 'Refrigerated'
      },
      {
        name: 'Follistim AQ',
        type: 'FSH (Follicle Stimulating Hormone)',
        purpose: 'Pure FSH used to stimulate the development of multiple follicles in the ovaries.',
        side_effects: ['Ovarian hyperstimulation', 'Headache', 'Nausea'],
        storage: 'Refrigerated'
      },
      {
        name: 'Cetrotide',
        type: 'GnRH Antagonist',
        purpose: "Prevents premature ovulation (the 'Lead Egg' from releasing early) during stimulation.",
        side_effects: ['Skin irritation at injection site'],
        storage: 'Room temperature'
      },
      {
        name: 'Ganirelix',
        type: 'GnRH Antagonist',
        purpose: "Prevents premature ovulation during stimulation.",
        side_effects: ['Skin irritation at injection site'],
        storage: 'Room temperature'
      },
      {
        name: 'Lupron',
        type: 'GnRH Agonist',
        purpose: "Used for 'Down Regulation' to prevent premature ovulation, or as a 'Trigger Shot' to induce final maturation.",
        side_effects: ['Hot flashes', 'Headache'],
        storage: 'Room temperature'
      },
      {
        name: 'Ovidrel',
        type: 'hCG (Human Chorionic Gonadotropin)',
        purpose: "The 'Trigger Shot'. Induces final maturation of the eggs and prepares them for retrieval.",
        side_effects: ['Abdominal pain', 'Nausea'],
        storage: 'Refrigerated'
      },
      {
        name: 'Novarel',
        type: 'hCG (Human Chorionic Gonadotropin)',
        purpose: "The 'Trigger Shot'. Induces final maturation of the eggs and prepares them for retrieval.",
        side_effects: ['Abdominal pain', 'Nausea'],
        storage: 'Room temperature'
      },
      {
        name: 'Progesterone',
        type: 'Progestogen',
        purpose: 'Prepares and maintains the uterine lining for embryo implantation and early pregnancy.',
        side_effects: ['Bloating', 'Breast tenderness', 'Mood swings'],
        storage: 'Room temperature'
      }
    ],
    procedures: [
      { term: 'IVF', definition: 'A process where eggs are extracted, fertilized by sperm in a lab, and the resulting embryo is transferred to the uterus.', full: 'In Vitro Fertilization' },
      { term: 'IUI', definition: "A fertility treatment that involves placing sperm inside a woman's uterus to facilitate fertilization.", full: 'Intrauterine Insemination' },
      { term: 'ICSI', definition: 'A specialized form of IVF where a single sperm is injected directly into a mature egg.', full: 'Intracytoplasmic Sperm Injection' },
      { term: 'PGT-A', definition: 'Screening embryos for the correct number of chromosomes before transfer.', full: 'Preimplantation Genetic Testing for Aneuploidies' },
      { term: 'FET', definition: 'A cycle where a frozen embryo from a previous IVF cycle is thawed and transferred to the uterus.', full: 'Frozen Embryo Transfer' },
      { term: 'Egg Retrieval', definition: 'A minor surgical procedure to collect mature eggs from the follicles in the ovaries.', full: 'Egg Retrieval (ER)' }
    ],
    terms: [
      { term: 'Follicle', definition: 'A small, fluid-filled sac in the ovary that contains a developing egg.' },
      { term: 'AMH', definition: "A hormone marker used to estimate a woman's ovarian reserve (egg count).", full: 'Anti-Müllerian Hormone' },
      { term: 'Blastocyst', definition: 'An embryo that has developed for 5 to 6 days after fertilization and is ready for implantation.' },
      { term: 'Stimming', definition: 'The phase of an IVF cycle where injectable medications are used to grow multiple follicles.', full: 'Ovarian Stimulation' },
      { term: 'Endometrium', definition: 'The lining of the uterus that thickens during the menstrual cycle in preparation for a possible pregnancy.' }
    ]
  };

  // ─── Lookup map (lowercase key → enriched entry) ──────────────────
  const _map = new Map();

  DATA.medications.forEach(m => {
    const entry = { term: m.name, category: 'medication', type: m.type, definition: m.purpose, side_effects: m.side_effects, storage: m.storage };
    _map.set(m.name.toLowerCase(), entry);
  });
  DATA.procedures.forEach(p => {
    const entry = { term: p.term, category: 'procedure', definition: p.definition, full: p.full || p.term };
    _map.set(p.term.toLowerCase(), entry);
  });
  DATA.terms.forEach(t => {
    const entry = { term: t.term, category: 'term', definition: t.definition, full: t.full || '' };
    _map.set(t.term.toLowerCase(), entry);
  });

  // ─── Public API ───────────────────────────────────────────────────
  window.LEXICON = DATA;

  window.lexiconLookup = function (name) {
    if (!name) return null;
    const lower = name.toLowerCase();
    // exact match first
    if (_map.has(lower)) return _map.get(lower);
    // partial match
    for (const [key, entry] of _map) {
      if (lower.includes(key) || key.includes(lower)) return entry;
    }
    return null;
  };

  window.lexiconSearch = function (query) {
    if (!query || !query.trim()) return [];
    const q = query.toLowerCase().trim();
    const results = [];
    for (const [, entry] of _map) {
      if (entry.term.toLowerCase().includes(q) ||
          (entry.definition || '').toLowerCase().includes(q) ||
          (entry.type || '').toLowerCase().includes(q) ||
          (entry.full || '').toLowerCase().includes(q)) {
        if (!results.find(r => r.term === entry.term)) results.push(entry);
      }
    }
    return results;
  };

  window.getContextualTerms = function (text) {
    if (!text) return [];
    const found = [];
    for (const [, entry] of _map) {
      if (text.toLowerCase().includes(entry.term.toLowerCase())) {
        if (!found.find(e => e.term === entry.term)) found.push(entry);
      }
    }
    return found;
  };

  // ─── Sheet renderer ───────────────────────────────────────────────
  const CATEGORY_BADGE = {
    medication: { label: 'Medication', cls: 'bg-careblue/10 text-careblue border-careblue/20' },
    procedure:  { label: 'Procedure',  cls: 'bg-careyellow/40 text-dark border-careyellow/60' },
    term:       { label: 'Clinical Term', cls: 'bg-gray-100 text-muted border-gray-200' }
  };

  function _sheetInnerHTML(entry) {
    const badge = CATEGORY_BADGE[entry.category] || CATEGORY_BADGE.term;
    const sideEffects = (entry.side_effects || []).map(s =>
      `<span class="text-xs font-medium text-muted bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-full">${s}</span>`
    ).join('');
    const storageRow = entry.storage ? `
      <div class="flex items-start space-x-3 bg-careblue/5 border border-careblue/15 rounded-2xl px-4 py-3">
        <svg class="w-4 h-4 text-careblue flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
        </svg>
        <div>
          <div class="text-xs font-bold text-careblue mb-0.5">Storage</div>
          <div class="text-sm text-dark">${entry.storage}</div>
        </div>
      </div>` : '';
    const sideEffectsSection = entry.side_effects && entry.side_effects.length ? `
      <div>
        <div class="text-xs font-bold text-muted uppercase tracking-widest mb-2">Common Side Effects</div>
        <div class="flex flex-wrap gap-2">${sideEffects}</div>
      </div>` : '';
    const fullName = entry.full ? `<div class="text-xs text-muted mt-0.5">${entry.full}</div>` : '';
    const typeRow = entry.type ? `
      <div class="text-xs font-bold text-careblue bg-careblue/8 border border-careblue/15 rounded-xl px-3 py-1.5 inline-block" style="background:rgba(0,186,255,.06)">${entry.type}</div>` : '';

    return `
      <div class="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>
      <div class="flex items-center justify-between mb-4">
        <span class="text-xs font-bold px-3 py-1 rounded-full border ${badge.cls}">${badge.label}</span>
        <button onclick="closeLexiconSheet()" class="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="mb-5">
        <h2 class="font-heading text-2xl font-bold text-dark leading-tight">${entry.term}</h2>
        ${fullName}
        ${typeRow ? '<div class="mt-2">' + typeRow + '</div>' : ''}
      </div>
      <div class="space-y-4 mb-6">
        <div>
          <div class="text-xs font-bold text-muted uppercase tracking-widest mb-2">${entry.category === 'medication' ? 'Purpose' : 'Definition'}</div>
          <p class="text-sm text-dark leading-relaxed">${entry.definition}</p>
        </div>
        ${sideEffectsSection}
        ${storageRow}
      </div>
      <a href="lexicon.html" class="flex items-center justify-center space-x-2 w-full border-2 border-careblue/20 rounded-2xl py-3.5 text-sm font-bold text-careblue hover:bg-careblue/5 transition-colors">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
        <span>View Full Precision Lexicon</span>
      </a>`;
  }

  // ─── Sheet injection & lifecycle ──────────────────────────────────
  function _ensureSheet() {
    if (document.getElementById('_lex-sheet')) return;

    // Styles
    const style = document.createElement('style');
    style.textContent = `
      #_lex-overlay { position:fixed;inset:0;background:rgba(0,0,0,.45);opacity:0;pointer-events:none;transition:opacity .28s;z-index:1000; }
      #_lex-overlay.active { opacity:1;pointer-events:all; }
      #_lex-sheet { position:fixed;bottom:0;left:50%;transform:translateX(-50%) translateY(105%);width:100%;max-width:430px;background:#fff;border-radius:28px 28px 0 0;transition:transform .32s cubic-bezier(.32,.72,0,1);z-index:1001;box-shadow:0 -8px 40px rgba(0,0,0,.12);padding:24px 24px 40px;overflow-y:auto;max-height:88vh; }
      #_lex-sheet.open { transform:translateX(-50%) translateY(0); }
    `;
    document.head.appendChild(style);

    // Overlay
    const overlay = document.createElement('div');
    overlay.id = '_lex-overlay';
    overlay.onclick = window.closeLexiconSheet;
    document.body.appendChild(overlay);

    // Sheet
    const sheet = document.createElement('div');
    sheet.id = '_lex-sheet';
    document.body.appendChild(sheet);
  }

  window.openLexiconSheet = function (termName) {
    const entry = window.lexiconLookup(termName);
    if (!entry) return;
    _ensureSheet();
    document.getElementById('_lex-sheet').innerHTML = _sheetInnerHTML(entry);
    requestAnimationFrame(() => {
      document.getElementById('_lex-sheet').classList.add('open');
      document.getElementById('_lex-overlay').classList.add('active');
    });
  };

  window.closeLexiconSheet = function () {
    const sheet   = document.getElementById('_lex-sheet');
    const overlay = document.getElementById('_lex-overlay');
    if (sheet)   sheet.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  };

})();
