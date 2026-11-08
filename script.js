  // ---------------- Datos de ejemplo ----------------
  const LANGS = {
    "JavaScript": "#f7df1e",
    "TypeScript": "#3178c6",
    "Python": "#3776ab",
    "Node.js": "#68a063",
    "Astro": "#ff5d01",
    "HTML/CSS": "#e34f26",
    "Rust": "#dea584",
    "Go": "#00add8"
  };

  const LABEL = {
    idea: "Idea",
    progress: "En progreso",
    paused: "Pausado",
    done: "Terminado"
  };

  const seed = () => ([
    {
      id: "flowmap",
      name: "FlowMap",
      desc: "Editor visual de mapas mentales con nodos, paletas y bloques para planear proyectos de código.",
      status: "progress",
      lang: "JavaScript",
      stack: ["Canvas API", "IndexedDB", "Vite"],
      palette: ["#0b1220", "#2563eb", "#38bdf8", "#a5f3fc", "#e2e8f0"],
      cover: ["#0b1d4d", "#0e7490"],
      links: ["Repo", "Demo"],
      tasks: [
        { t: "Modelo de datos con IDs únicos", d: true },
        { t: "Migrar imágenes a IndexedDB", d: true },
        { t: "Editor de nodos drag & drop", d: false },
        { t: "Exportar / importar JSON", d: false }
      ]
    },
    {
      id: "portfolio",
      name: "Portfolio Personal",
      desc: "Sitio personal con casos de estudio, blog y modo oscuro. Listo para deploy.",
      status: "done",
      lang: "Astro",
      stack: ["Markdown", "Tailwind", "Netlify"],
      palette: ["#0f0f10", "#f5f5f4", "#e7c9a9", "#a8a29e", "#fb7185"],
      cover: ["#3f2d20", "#b45309"],
      links: ["Repo", "Sitio"],
      tasks: [
        { t: "Diseñar home y hero", d: true },
        { t: "Casos de estudio", d: true },
        { t: "Blog con Markdown", d: true },
        { t: "Deploy y dominio", d: true }
      ]
    },
    {
      id: "api-tareas",
      name: "API de Tareas",
      desc: "API REST con autenticación JWT, roles y tests. La consume un front en React.",
      status: "progress",
      lang: "Node.js",
      stack: ["Express", "PostgreSQL", "JWT"],
      palette: ["#052e16", "#15803d", "#4ade80", "#bbf7d0", "#f0fdf4"],
      cover: ["#052e16", "#15803d"],
      links: ["Repo", "Docs"],
      tasks: [
        { t: "Modelo de usuarios y tareas", d: true },
        { t: "Login con JWT", d: true },
        { t: "Roles y permisos", d: false },
        { t: "Tests de integración", d: false },
        { t: "Documentación OpenAPI", d: false }
      ]
    },
    {
      id: "tienda",
      name: "Tienda Demo",
      desc: "E-commerce con carrito, Stripe y panel de admin. En pausa hasta definir el catálogo.",
      status: "paused",
      lang: "TypeScript",
      stack: ["Next.js", "Stripe", "Tailwind"],
      palette: ["#2e1065", "#7c3aed", "#c4b5fd", "#f5f3ff", "#f472b6"],
      cover: ["#2e1065", "#7c3aed"],
      links: ["Repo"],
      tasks: [
        { t: "Catálogo y filtros", d: true },
        { t: "Carrito persistente", d: true },
        { t: "Checkout con Stripe", d: false },
        { t: "Panel de administración", d: false }
      ]
    },
    {
      id: "bot-discord",
      name: "Bot de Discord",
      desc: "Bot con comandos slash, moderación y economía interna para un servidor de estudio.",
      status: "idea",
      lang: "Python",
      stack: ["discord.py", "SQLite"],
      palette: ["#1e1b4b", "#4338ca", "#818cf8", "#e0e7ff", "#22d3ee"],
      cover: ["#1e1b4b", "#4338ca"],
      links: [],
      tasks: [
        { t: "Definir comandos y alcance", d: false },
        { t: "Sistema de economía", d: false },
        { t: "Moderación automática", d: false }
      ]
    },
    {
      id: "cafeteria",
      name: "Landing Cafetería",
      desc: "Landing responsive con menú, galería y reservas. Entregada a un cliente local.",
      status: "done",
      lang: "HTML/CSS",
      stack: ["Flexbox", "Scroll FX", "Netlify"],
      palette: ["#1c1917", "#c2410c", "#fb923c", "#fed7aa", "#fafaf9"],
      cover: ["#431407", "#c2410c"],
      links: ["Sitio"],
      tasks: [
        { t: "Estructura y menú", d: true },
        { t: "Galería responsive", d: true },
        { t: "Formulario de reservas", d: true }
      ]
    }
  ]);

  // ---------------- Mapa: semilla de nubes ----------------
  const MAP_NOTES = {
    flowmap: "Antes de sumar features, cerrar el guardado de imágenes en IndexedDB.",
    portfolio: "Publicarlo y enlazarlo desde LinkedIn.",
    "api-tareas": "Definir el contrato de endpoints en OpenAPI.",
    tienda: "Elegir el catálogo antes de retomar el checkout.",
    "bot-discord": "Empezar por tres comandos slash básicos.",
    cafeteria: "Pedir fotos nuevas al cliente para la galería."
  };

  const MAP_STAGES = {
    flowmap: "Fase 1 · Base del editor",
    portfolio: "Publicación",
    "api-tareas": "Backend y seguridad",
    tienda: "Catálogo y carrito",
    "bot-discord": "Primeros comandos",
    cafeteria: "Entrega al cliente"
  };

  const SPOTS = [
    [400, 60], [660, 60], [920, 60],
    [400, 210], [660, 210], [920, 210],
    [400, 360], [660, 360], [920, 360],
    [400, 510], [660, 510], [920, 510],
    [400, 660], [660, 660], [920, 660]
  ];

  function withMap(p) {
    const { tasks, ...rest } = p;
    const nodes = [];
    const edges = [];
    const stageId = `${p.id}-stage`;

    nodes.push({
      id: stageId,
      type: "stage",
      text: MAP_STAGES[p.id] || "Primer avance",
      x: SPOTS[0][0],
      y: SPOTS[0][1]
    });
    edges.push({ a: "root", b: stageId });

    tasks.forEach((t, i) => {
      const spot = SPOTS[i + 1];
      const taskId = `${p.id}-task-${i}`;
      nodes.push({
        id: taskId,
        type: "task",
        text: t.t,
        done: t.d,
        x: spot[0],
        y: spot[1]
      });
      edges.push({ a: stageId, b: taskId });
    });

    let k = tasks.length + 1;
    const take = () => SPOTS[k++ % SPOTS.length];

    let spot = take();
    const noteId = `${p.id}-note`;
    nodes.push({ id: noteId, type: "note", text: MAP_NOTES[p.id] || "Nota del proyecto.", x: spot[0], y: spot[1] });
    edges.push({ a: "root", b: noteId });

    if (p.links && p.links.length) {
      spot = take();
      const linkId = `${p.id}-link`;
      nodes.push({ id: linkId, type: "link", text: p.links[0], url: "https://ejemplo.dev", x: spot[0], y: spot[1] });
      edges.push({ a: "root", b: linkId });
    }

    spot = take();
    const paletteId = `${p.id}-palette`;
    nodes.push({ id: paletteId, type: "palette", favorite: true, colors: p.palette.slice(), x: spot[0], y: spot[1] });
    edges.push({ a: "root", b: paletteId });

    return { ...rest, nodes, edges, favPaletteId: paletteId, root: { x: 50, y: 250 } };
  }

  // ---------------- Persistencia ----------------
  const STORAGE_KEY = "flowmap.v1";
  const IMAGE_DB = "flowmap-images";
  const IMAGE_STORE = "images";
  const DEFAULT_PALETTE = ["#0b1220", "#2563eb", "#38bdf8", "#a5f3fc", "#e2e8f0"];
  const imageCache = new Map();
  let imageDBPromise = null;
  let saveErrorShown = false;

  function openImageDB() {
    if (imageDBPromise) return imageDBPromise;
    imageDBPromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("IndexedDB no disponible"));
        return;
      }
      const req = indexedDB.open(IMAGE_DB, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(IMAGE_STORE)) db.createObjectStore(IMAGE_STORE);
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return imageDBPromise;
  }

  async function idbSet(key, value) {
    const db = await openImageDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, "readwrite");
      tx.objectStore(IMAGE_STORE).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function idbDelete(key) {
    const db = await openImageDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(IMAGE_STORE, "readwrite");
      tx.objectStore(IMAGE_STORE).delete(key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  }

  async function loadImages() {
    try {
      const db = await openImageDB();
      await new Promise((resolve, reject) => {
        const tx = db.transaction(IMAGE_STORE, "readonly");
        const req = tx.objectStore(IMAGE_STORE).openCursor();
        req.onsuccess = () => {
          const cursor = req.result;
          if (cursor) {
            imageCache.set(String(cursor.key), cursor.value);
            cursor.continue();
          }
        };
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch {
      /* Sin IndexedDB: las imágenes quedarán en memoria. */
    }
  }

  function normalizeProject(p) {
    const nodes = (Array.isArray(p.nodes) ? p.nodes : []).map((n) => {
      const node = { ...n };
      if (node.type === "palette" && !Array.isArray(node.colors)) node.colors = DEFAULT_PALETTE.slice();
      if (node.type === "task") node.done = !!node.done;
      return node;
    });

    let edges = Array.isArray(p.edges) ? p.edges.map((e) => ({ a: e.a, b: e.b })) : null;
    if (!edges) {
      edges = [];
      nodes.forEach((n) => {
        if (n.parent === "root") edges.push({ a: "root", b: n.id });
        else if (n.parent) edges.push({ a: n.parent, b: n.id });
        delete n.parent;
      });
    }

    const ids = new Set(nodes.map((n) => n.id));
    edges = edges.filter((e) => {
      const aOk = e.a === "root" || ids.has(e.a);
      const bOk = e.b === "root" || ids.has(e.b);
      return aOk && bOk && e.a !== e.b;
    });

    const paletteNodes = nodes.filter((n) => n.type === "palette" && Array.isArray(n.colors) && n.colors.length);
    let favPaletteId = paletteNodes.some((n) => n.id === p.favPaletteId) ? p.favPaletteId : null;
    if (!favPaletteId) {
      const flagged = paletteNodes.find((n) => n.favorite);
      if (flagged) favPaletteId = flagged.id;
    }
    paletteNodes.forEach((n) => {
      if (n.id === favPaletteId) n.favorite = true;
      else delete n.favorite;
    });
    const favorite = paletteNodes.find((n) => n.id === favPaletteId) || null;
    const palette = favorite
      ? favorite.colors.slice()
      : (Array.isArray(p.palette) && p.palette.length ? p.palette : DEFAULT_PALETTE.slice());

    return {
      ...p,
      stack: Array.isArray(p.stack) ? p.stack : [],
      links: Array.isArray(p.links) ? p.links : [],
      palette,
      favPaletteId,
      cover: Array.isArray(p.cover) && p.cover.length >= 2 ? p.cover : ["#0b1d4d", "#0e7490"],
      nodes,
      edges,
      root: p.root && Number.isFinite(p.root.x) && Number.isFinite(p.root.y) ? p.root : { x: 50, y: 250 }
    };
  }

  function loadSavedProjects() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !Array.isArray(data.projects)) return null;
      return data.projects.map(normalizeProject);
    } catch {
      return null;
    }
  }

  function serializableProjects() {
    return state.projects.map((p) => ({
      ...p,
      nodes: p.nodes.map((n) => {
        if (!n.imageId) return n;
        const { image, ...rest } = n;
        return rest;
      })
    }));
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        version: 1,
        savedAt: Date.now(),
        projects: serializableProjects()
      }));
      saveErrorShown = false;
    } catch {
      if (!saveErrorShown) {
        saveErrorShown = true;
        showToast("No se pudo guardar: almacenamiento lleno");
      }
    }
  }

  // ---------------- Estado ----------------
  const savedProjects = loadSavedProjects();
  const state = {
    projects: savedProjects || seed().map(withMap),
    filter: "all",
    query: "",
    mapProjectId: null
  };

  const NODE_TAG = {
    task: "✓ Tarea",
    stage: "◆ Etapa",
    note: "✎ Nota",
    link: "↗ Enlace",
    palette: "◐ Paleta",
    image: "▣ Imagen"
  };

  let currentProject = null;
  let toastTimer = null;
  let textSaveTimer = null;

  // ---------------- Referencias ----------------
  const grid = document.getElementById("grid");
  const summary = document.getElementById("summary");
  const filters = document.getElementById("filters");
  const search = document.getElementById("search");
  const overlay = document.getElementById("overlay");
  const drawer = document.getElementById("drawer");
  const toast = document.getElementById("toast");
  const newBtn = document.getElementById("newBtn");
  const resetDemo = document.getElementById("resetDemo");

  // ---------------- Helpers ----------------
  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[c]));
  }

  function langColor(lang) {
    return LANGS[lang] || "#94a3b8";
  }

  function taskNodes(p) {
    return p.nodes.filter((n) => n.type === "task");
  }

  function doneCount(p) {
    return taskNodes(p).filter((t) => t.done).length;
  }

  function progressOf(p) {
    const total = taskNodes(p).length;
    if (!total) return 0;
    return Math.round((doneCount(p) / total) * 100);
  }

  function findNode(id) {
    const p = state.projects.find((x) => x.id === state.mapProjectId);
    return p ? p.nodes.find((n) => n.id === id) : null;
  }

  function matches(p) {
    if (state.filter !== "all" && p.status !== state.filter) return false;
    if (!state.query) return true;
    const hay = [p.name, p.desc, p.lang, ...p.stack].join(" ").toLowerCase();
    return hay.includes(state.query);
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    showToast(`Copiado ${text}`);
  }

  // ---------------- Render del grid ----------------
  function cardHTML(p, i) {
    const prog = progressOf(p);
    const tasks = taskNodes(p);
    return `
      <article class="card" data-open="${esc(p.id)}" tabindex="0" role="button"
               aria-label="Abrir ${esc(p.name)}" style="animation-delay:${i * 45}ms">
        <div class="cover" style="background:linear-gradient(135deg,${esc(p.cover[0])},${esc(p.cover[1])})">
          <span class="status ${p.status}"><span class="dot"></span>${LABEL[p.status]}</span>
          <button class="card-map-btn" data-open-map="${esc(p.id)}" title="Abrir mapa visual">◈ Mapa</button>
          <span class="cover-initial">${esc(p.name.charAt(0).toUpperCase())}</span>
        </div>
        <div class="card-body">
          <div class="card-title-row">
            <h2 class="card-title">${esc(p.name)}</h2>
            <div class="card-actions">
              <button class="card-action" data-edit-card="${esc(p.id)}" title="Editar proyecto" aria-label="Editar ${esc(p.name)}">✎</button>
              <button class="card-action card-action-danger" data-del-card="${esc(p.id)}" title="Eliminar proyecto" aria-label="Eliminar ${esc(p.name)}">✕</button>
            </div>
          </div>
          <p class="card-desc">${esc(p.desc)}</p>
          <div class="chips">
            <span class="chip chip-lang"><span class="lang-dot" style="background:${langColor(p.lang)}"></span>${esc(p.lang)}</span>
            ${p.stack.slice(0, 2).map((s) => `<span class="chip">${esc(s)}</span>`).join("")}
          </div>
          <div class="palette"${p.favPaletteId ? ` title="Paleta favorita del mapa"` : ""}>
            ${p.favPaletteId ? `<span class="palette-fav" aria-label="Paleta favorita">★</span>` : ""}
            ${p.palette.map((c) => `<button class="swatch" data-copy="${esc(c)}" style="background:${esc(c)}" title="${esc(c)} · clic para copiar" aria-label="Copiar color ${esc(c)}"></button>`).join("")}
          </div>
          <div class="card-foot">
            <div class="task-progress"><span style="width:${prog}%"></span></div>
            <small>${doneCount(p)}/${tasks.length} tareas</small>
          </div>
        </div>
      </article>`;
  }

  function renderGrid() {
    const visible = state.projects.filter(matches);
    const total = state.projects.length;
    const inProgress = state.projects.filter((p) => p.status === "progress").length;

    summary.textContent = state.query || state.filter !== "all"
      ? `${visible.length} de ${total} proyectos`
      : `${total} proyectos · ${inProgress} en progreso`;

    grid.innerHTML = visible.length
      ? visible.map(cardHTML).join("")
      : `<div class="empty">${state.projects.length
        ? "No hay proyectos que coincidan con el filtro o la búsqueda."
        : "Todavía no tienes proyectos. Crea el primero con «+ Nuevo proyecto»."}</div>`;
  }

  // ---------------- Drawer ----------------
  function openDrawer(html) {
    drawer.innerHTML = html;
    drawer.classList.add("open");
    overlay.classList.add("show");
    document.body.classList.add("lock");
    drawer.scrollTop = 0;
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    overlay.classList.remove("show");
    document.body.classList.remove("lock");
    currentProject = null;
  }

  function detailHTML(p) {
    const tasks = taskNodes(p);
    const done = doneCount(p);
    const total = tasks.length;

    return `
      <div class="drawer-head" style="background:linear-gradient(135deg,${esc(p.cover[0])},${esc(p.cover[1])})">
        <button class="icon-btn" data-close aria-label="Cerrar">✕</button>
        <div class="drawer-initial">${esc(p.name.charAt(0).toUpperCase())}</div>
      </div>
      <div class="drawer-body">
        <div class="drawer-title-row">
          <h2>${esc(p.name)}</h2>
          <span class="status ${p.status}"><span class="dot"></span>${LABEL[p.status]}</span>
        </div>
        <p class="drawer-desc">${esc(p.desc)}</p>

        <button class="btn-primary map-cta" data-open-map="${esc(p.id)}">◈ Abrir mapa visual</button>

        <div class="detail-actions">
          <button class="btn-ghost btn-sm" data-edit-project="${esc(p.id)}">✎ Editar</button>
          <button class="btn-ghost btn-sm btn-danger" data-delete-project="${esc(p.id)}">✕ Eliminar</button>
        </div>

        <div class="section">
          <h3>Stack</h3>
          <div class="chips">
            <span class="chip chip-lang"><span class="lang-dot" style="background:${langColor(p.lang)}"></span>${esc(p.lang)}</span>
            ${p.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join("")}
          </div>
        </div>

        <div class="section">
          <h3>Paleta ${p.favPaletteId ? `<span class="palette-fav" title="Paleta favorita del mapa">★</span>` : ""}</h3>
          <div class="palette-big">
            ${p.palette.map((c) => `
              <button class="palette-item" data-copy="${esc(c)}" aria-label="Copiar ${esc(c)}">
                <span class="swatch-big" style="background:${esc(c)}"></span>
                <code>${esc(c)}</code>
              </button>`).join("")}
          </div>
        </div>

        ${p.links.length ? `
        <div class="section">
          <h3>Enlaces</h3>
          <div class="links">
            ${p.links.map((l) => `<button class="btn-ghost btn-sm" data-link="${esc(l)}">↗ ${esc(l)}</button>`).join("")}
          </div>
        </div>` : ""}

        <div class="section">
          <h3>Tareas <span class="section-count">${done}/${total}</span></h3>
          ${total ? `
          <ul class="tasks">
            ${tasks.map((t) => `
              <li>
                <label class="task ${t.done ? "is-done" : ""}">
                  <input type="checkbox" data-task="${esc(t.id)}" ${t.done ? "checked" : ""}>
                  <span>${esc(t.text)}</span>
                </label>
              </li>`).join("")}
          </ul>` : `<p class="hint">Sin tareas todavía. Añádelas desde el mapa.</p>`}
        </div>

        <p class="proto-note">Prototipo visual · se guarda automáticamente en este navegador.</p>
      </div>`;
  }

  function openDetail(id) {
    const p = state.projects.find((x) => x.id === id);
    if (!p) return;
    currentProject = p;
    openDrawer(detailHTML(p));
  }

  function projectFormHTML(project) {
    const isEdit = !!project;
    const p = project || {};
    const statuses = [["idea", "Idea"], ["progress", "En progreso"], ["paused", "Pausado"], ["done", "Terminado"]];
    const currentStatus = isEdit ? p.status : "progress";

    return `
      <div class="drawer-head form-head">
        <button class="icon-btn" data-close aria-label="Cerrar">✕</button>
        <h2>${isEdit ? "Editar proyecto" : "Nuevo proyecto"}</h2>
        <p>${isEdit ? "Actualiza la información que se muestra en el tablero." : "Crea un bloque con su stack, paleta y estado."}</p>
      </div>
      <form id="projectForm" class="drawer-body" autocomplete="off">
        <label class="field">
          <span>Nombre</span>
          <input name="name" required maxlength="40" placeholder="Ej: Portfolio personal" value="${esc(p.name || "")}">
        </label>

        <label class="field">
          <span>Descripción</span>
          <textarea name="desc" rows="${isEdit ? 4 : 2}" maxlength="140" placeholder="¿De qué trata el proyecto?">${esc(p.desc || "")}</textarea>
        </label>

        <div class="row2">
          <label class="field">
            <span>Lenguaje</span>
            <select name="lang">
              ${Object.keys(LANGS).map((l) => `<option value="${l}"${p.lang === l ? " selected" : ""}>${l}</option>`).join("")}
            </select>
          </label>
          <label class="field">
            <span>Estado</span>
            <select name="status">
              ${statuses.map(([value, label]) =>
                `<option value="${value}"${currentStatus === value ? " selected" : ""}>${label}</option>`).join("")}
            </select>
          </label>
        </div>

        <label class="field">
          <span>Stack (separado por comas)</span>
          <input name="stack" placeholder="React, Vite, Tailwind" value="${esc((p.stack || []).join(", "))}">
        </label>

        ${isEdit
          ? `<p class="hint form-hint">La paleta y las nubes se editan desde el mapa del proyecto.</p>`
          : `<div class="field">
              <span>Paleta</span>
              <div class="palette-form">
                ${DEFAULT_PALETTE.map((c, i) =>
                  `<input type="color" name="pal${i}" value="${esc(c)}" aria-label="Color ${i + 1}">`).join("")}
              </div>
              <small class="hint">La portada del bloque se genera con los colores 2 y 3.</small>
            </div>`}

        <div class="form-actions">
          <button type="button" class="btn-ghost" data-close>Cancelar</button>
          <button type="submit" class="btn-primary">${isEdit ? "Guardar cambios" : "Crear bloque"}</button>
        </div>
      </form>`;
  }

  function openProjectForm(project) {
    const isEdit = !!project;
    currentProject = project || null;
    openDrawer(projectFormHTML(project));

    const form = drawer.querySelector("#projectForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      if (!name) return;

      const desc = String(fd.get("desc") || "").trim() || "Sin descripción todavía.";
      const status = String(fd.get("status"));
      const lang = String(fd.get("lang"));
      const stack = String(fd.get("stack") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      if (isEdit) {
        project.name = name;
        project.desc = desc;
        project.status = status;
        project.lang = lang;
        project.stack = stack;

        saveState();
        renderGrid();
        closeDrawer();
        showToast(`Proyecto "${name}" actualizado`);
        return;
      }

      const palette = DEFAULT_PALETTE.map((_, i) => String(fd.get(`pal${i}`)));

      state.projects.unshift({
        id: `p${Date.now()}`,
        name,
        desc,
        status,
        lang,
        stack,
        palette,
        cover: [palette[1], palette[2]],
        links: [],
        nodes: [],
        edges: [],
        root: { x: 50, y: 250 }
      });

      saveState();
      state.filter = "all";
      state.query = "";
      search.value = "";
      document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b.dataset.filter === "all"));
      renderGrid();
      closeDrawer();
      showToast(`Proyecto "${name}" creado y guardado`);
    });
  }

  async function deleteProject(id) {
    const p = state.projects.find((x) => x.id === id);
    if (!p) return;
    if (!window.confirm(`¿Eliminar el proyecto "${p.name}"? Esta acción no se puede deshacer.`)) return;

    const imageIds = p.nodes.filter((n) => n.imageId).map((n) => String(n.imageId));
    imageIds.forEach((key) => {
      imageCache.delete(key);
      idbDelete(key).catch(() => { /* sin IndexedDB */ });
    });

    state.projects = state.projects.filter((x) => x.id !== id);

    if (state.mapProjectId === id) {
      state.mapProjectId = null;
      stopLinking();
      closeLineMenu();
      document.body.classList.remove("map-mode");
      mapView.hidden = true;
      dashboardView.hidden = false;
    }

    saveState();
    closeDrawer();
    renderGrid();
    showToast(`Proyecto "${p.name}" eliminado`);
  }

  // ---------------- Eventos ----------------
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    state.filter = btn.dataset.filter;
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));
    renderGrid();
  });

  search.addEventListener("input", () => {
    state.query = search.value.trim().toLowerCase();
    renderGrid();
  });

  newBtn.addEventListener("click", () => openProjectForm(null));
  overlay.addEventListener("click", closeDrawer);

  resetDemo.addEventListener("click", async () => {
    if (!window.confirm("¿Borrar los cambios guardados y volver a los datos de ejemplo?")) return;
    closeLineMenu();
    stopLinking();
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* almacenamiento no disponible */ }
    try {
      const db = await openImageDB();
      await new Promise((resolve) => {
        const tx = db.transaction(IMAGE_STORE, "readwrite");
        tx.objectStore(IMAGE_STORE).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => resolve();
      });
    } catch { /* sin IndexedDB */ }

    imageCache.clear();
    state.projects = seed().map(withMap);
    state.filter = "all";
    state.query = "";
    state.mapProjectId = null;
    search.value = "";
    document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b.dataset.filter === "all"));
    document.body.classList.remove("map-mode");
    mapView.hidden = true;
    dashboardView.hidden = false;
    closeDrawer();
    renderGrid();
    showToast("Datos de ejemplo restaurados");
  });

  grid.addEventListener("click", (e) => {
    const editBtn = e.target.closest("[data-edit-card]");
    if (editBtn) {
      e.stopPropagation();
      const p = state.projects.find((x) => x.id === editBtn.dataset.editCard);
      if (p) openProjectForm(p);
      return;
    }
    const delBtn = e.target.closest("[data-del-card]");
    if (delBtn) {
      e.stopPropagation();
      deleteProject(delBtn.dataset.delCard);
      return;
    }
    const mapBtn = e.target.closest("[data-open-map]");
    if (mapBtn) {
      e.stopPropagation();
      openMap(mapBtn.dataset.openMap);
      return;
    }
    const copy = e.target.closest("[data-copy]");
    if (copy) {
      e.stopPropagation();
      copyText(copy.dataset.copy);
      return;
    }
    const card = e.target.closest("[data-open]");
    if (card) openDetail(card.dataset.open);
  });

  grid.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    if (e.target.closest("button")) return;
    const card = e.target.closest("[data-open]");
    if (!card) return;
    e.preventDefault();
    openDetail(card.dataset.open);
  });

  drawer.addEventListener("click", (e) => {
    const editBtn = e.target.closest("[data-edit-project]");
    if (editBtn) {
      const p = state.projects.find((x) => x.id === editBtn.dataset.editProject);
      if (p) openProjectForm(p);
      return;
    }
    const delBtn = e.target.closest("[data-delete-project]");
    if (delBtn) {
      deleteProject(delBtn.dataset.deleteProject);
      return;
    }
    const mapBtn = e.target.closest("[data-open-map]");
    if (mapBtn) {
      openMap(mapBtn.dataset.openMap);
      return;
    }
    if (e.target.closest("[data-close]")) {
      closeDrawer();
      return;
    }
    const copy = e.target.closest("[data-copy]");
    if (copy) {
      copyText(copy.dataset.copy);
      return;
    }
    const link = e.target.closest("[data-link]");
    if (link) {
      showToast(`Enlace de ejemplo: ${link.dataset.link}`);
    }
  });

  drawer.addEventListener("change", (e) => {
    const cb = e.target.closest("[data-task]");
    if (!cb || !currentProject) return;

    const node = currentProject.nodes.find((n) => n.id === cb.dataset.task);
    if (!node) return;
    node.done = cb.checked;

    const label = cb.closest(".task");
    if (label) label.classList.toggle("is-done", cb.checked);

    const count = drawer.querySelector(".section-count");
    if (count) count.textContent = `${doneCount(currentProject)}/${taskNodes(currentProject).length}`;

    saveState();
    renderGrid();
  });

  // ---------------- Vista mapa ----------------
  const dashboardView = document.getElementById("dashboardView");
  const mapView = document.getElementById("mapView");
  const mapCanvas = document.getElementById("mapCanvas");
  const mapSurface = document.getElementById("mapSurface");
  const mapTitle = document.getElementById("mapTitle");
  const mapProgressText = document.getElementById("mapProgressText");
  const mapBack = document.getElementById("mapBack");
  const linkBanner = document.getElementById("linkBanner");
  const linkBannerText = document.getElementById("linkBannerText");
  const linkCancel = document.getElementById("linkCancel");

  function mapProject() {
    return state.projects.find((x) => x.id === state.mapProjectId) || null;
  }

  function edgePoint(el, toward) {
    const cx = el.offsetLeft + el.offsetWidth / 2;
    const cy = el.offsetTop + el.offsetHeight / 2;
    const tx = toward.offsetLeft + toward.offsetWidth / 2;
    const ty = toward.offsetTop + toward.offsetHeight / 2;
    const dx = tx - cx;
    const dy = ty - cy;
    if (!dx && !dy) return { x: cx, y: cy };

    const hw = el.offsetWidth / 2 + 2;
    const hh = el.offsetHeight / 2 + 2;
    const scale = Math.min(
      dx ? hw / Math.abs(dx) : Infinity,
      dy ? hh / Math.abs(dy) : Infinity
    );
    return { x: cx + dx * scale, y: cy + dy * scale };
  }

  let selectedEdge = null;
  const lineMenu = document.getElementById("lineMenu");
  const lineDelete = document.getElementById("lineDelete");

  function nodeById(p, id) {
    return p.nodes.find((n) => n.id === id) || null;
  }

  function elementOf(id, root) {
    if (id === "root") return root;
    return mapSurface.querySelector(`[data-node="${CSS.escape(id)}"]`);
  }

  function hasEdge(p, a, b) {
    return p.edges.some((e) => (e.a === a && e.b === b) || (e.a === b && e.b === a));
  }

  function isFloating(p, n) {
    return !p.edges.some((e) => e.a === n.id || e.b === n.id);
  }

  function isFavoritePalette(p, node) {
    return !!node && node.type === "palette" && (p.favPaletteId === node.id || !!node.favorite);
  }

  function syncProjectPalette(p, node) {
    if (!isFavoritePalette(p, node)) return false;
    p.palette = node.colors.slice();
    return true;
  }

  function makeFavoritePalette(p, node) {
    p.nodes.filter((n) => n.type === "palette").forEach((n) => {
      if (n === node) n.favorite = true;
      else delete n.favorite;
    });
    p.favPaletteId = node.id;
    p.palette = node.colors.slice();
  }

  function closeLineMenu() {
    selectedEdge = null;
    lineMenu.hidden = true;
    mapSurface.querySelectorAll(".map-line.is-selected").forEach((el) => el.classList.remove("is-selected"));
  }

  function selectEdge(index, x, y) {
    const p = mapProject();
    if (!p || !p.edges[index]) return;
    selectedEdge = p.edges[index];
    mapSurface.querySelectorAll(".map-line").forEach((el) => el.classList.remove("is-selected"));
    const line = mapSurface.querySelector(`[data-edge="${index}"] .map-line`);
    if (line) line.classList.add("is-selected");

    lineMenu.hidden = false;
    const w = lineMenu.offsetWidth || 170;
    const h = lineMenu.offsetHeight || 42;
    lineMenu.style.left = `${Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8)}px`;
    lineMenu.style.top = `${Math.min(Math.max(8, y + 14), window.innerHeight - h - 8)}px`;
  }

  function drawLines() {
    const svg = mapSurface.querySelector(".map-lines");
    const root = mapSurface.querySelector(".map-root");
    const p = mapProject();
    if (!svg || !root || !p) return;

    svg.setAttribute("viewBox", `0 0 ${mapSurface.clientWidth} ${mapSurface.clientHeight}`);
    svg.innerHTML = p.edges.map((edge, i) => {
      const fromEl = elementOf(edge.a, root);
      const toEl = elementOf(edge.b, root);
      if (!fromEl || !toEl) return "";
      const a = edgePoint(fromEl, toEl);
      const b = edgePoint(toEl, fromEl);
      const mx = (a.x + b.x) / 2 + (i % 2 === 0 ? 16 : -16);
      const my = (a.y + b.y) / 2 + (i % 3 === 0 ? 12 : -10);
      const d = `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
      const sel = edge === selectedEdge ? " is-selected" : "";
      return `<g class="map-edge" data-edge="${i}"><path class="map-line-hit" d="${d}"/><path class="map-line${sel}" d="${d}"/></g>`;
    }).join("");
  }

  function rootHTML(p) {
    return `
      <div class="map-root" id="mapRoot" style="left:${p.root.x}px;top:${p.root.y}px;background:linear-gradient(135deg,${esc(p.cover[0])},${esc(p.cover[1])})">
        <button class="node-link-btn root-link-btn" data-connect="root" title="Conectar el proyecto con varias nubes" aria-label="Conectar proyecto">↳</button>
        <span class="root-badge">Proyecto</span>
        <strong>${esc(p.name)}</strong>
        <span class="root-stats">${doneCount(p)}/${taskNodes(p).length} tareas</span>
      </div>`;
  }

  function nodeHTML(n, p) {
    const isFav = n.type === "palette" && (p.favPaletteId === n.id || n.favorite);
    const base = `class="node node-${n.type}${isFloating(p, n) ? " is-floating" : ""}${isFav ? " is-favorite" : ""}" data-node="${esc(n.id)}" style="left:${n.x}px;top:${n.y}px"`;
    const favBtn = n.type === "palette"
      ? `<button class="node-fav${isFav ? " is-on" : ""}" data-fav="${esc(n.id)}" title="${isFav ? "Es la paleta del tablero · clic para quitar" : "Usar esta paleta en el tablero"}" aria-label="${isFav ? "Quitar paleta favorita" : "Marcar como paleta favorita"}" aria-pressed="${isFav}">${isFav ? "★" : "☆"}</button>`
      : "";
    const editBtn = ["task", "stage", "note", "link"].includes(n.type)
      ? `<button class="node-edit" data-edit-text="${esc(n.id)}" title="Editar texto (o doble clic en la nube)" aria-label="Editar texto de la nube">✎</button>`
      : "";
    const head = `<div class="node-top"><span class="node-tag">${NODE_TAG[n.type] || n.type}</span><div class="node-actions">${favBtn}${editBtn}<button class="node-link-btn" data-connect="${esc(n.id)}" title="Conectar esta nube con otras" aria-label="Conectar nube">↳</button><button class="node-del" data-del="${esc(n.id)}" title="Eliminar nube" aria-label="Eliminar nube">×</button></div></div>`;

    if (n.type === "stage") {
      const kids = p.nodes.filter((x) => x.type === "task" && hasEdge(p, n.id, x.id));
      const meta = kids.length ? `${kids.filter((x) => x.done).length}/${kids.length} tareas` : "Sin tareas";
      return `<div ${base}>${head}<span class="node-text" data-text="${esc(n.id)}">${esc(n.text)}</span><span class="stage-meta">${meta}</span></div>`;
    }

    if (n.type === "task") {
      return `<div ${base}>${head}
        <div class="task-row">
          <input type="checkbox" data-check="${esc(n.id)}" ${n.done ? "checked" : ""}>
          <span class="node-text ${n.done ? "done" : ""}" data-text="${esc(n.id)}">${esc(n.text)}</span>
        </div>
      </div>`;
    }

    if (n.type === "note") {
      return `<div ${base}>${head}<span class="node-text" data-text="${esc(n.id)}">${esc(n.text)}</span></div>`;
    }

    if (n.type === "link") {
      return `<div ${base}>${head}
        <span class="node-text" data-text="${esc(n.id)}">${esc(n.text)}</span>
        <span class="node-url">🔗 ${esc(n.url)}</span>
      </div>`;
    }

    if (n.type === "palette") {
      return `<div ${base}>${head}
        <div class="swatch-row">
          ${n.colors.map((c, i) => `
            <span class="swatch-mini" style="background:${esc(c)}" title="${esc(c)} · clic para cambiarlo">
              <input type="color" data-color="${esc(n.id)}" data-color-index="${i}" value="${esc(c)}" aria-label="Cambiar color ${esc(c)}">
              <button class="swatch-del" data-remove-color="${esc(n.id)}" data-color-index="${i}" title="Quitar este color" aria-label="Quitar el color ${esc(c)}">×</button>
            </span>`).join("")}
          <button class="swatch-add" data-add-color="${esc(n.id)}" title="Añadir color" aria-label="Añadir color a la paleta">+</button>
        </div>
      </div>`;
    }

    if (n.type === "image") {
      const src = n.imageId ? imageCache.get(n.imageId) || "" : n.image || "";
      return `<div ${base}>${head}
        <div class="img-box ${src ? "has-image" : ""}">
          ${src ? `<img src="${esc(src)}" alt="Imagen de la nube">` : ""}
          <label>${src ? "Cambiar imagen" : "▣ Subir imagen"}
            <input type="file" accept="image/*" data-img="${esc(n.id)}" hidden>
          </label>
        </div>
      </div>`;
    }

    return "";
  }

  function refreshStageMeta() {
    const p = mapProject();
    if (!p) return;
    p.nodes.filter((n) => n.type === "stage").forEach((stage) => {
      const el = mapSurface.querySelector(`[data-node="${CSS.escape(stage.id)}"] .stage-meta`);
      if (!el) return;
      const kids = p.nodes.filter((x) => x.type === "task" && hasEdge(p, stage.id, x.id));
      el.textContent = kids.length ? `${kids.filter((x) => x.done).length}/${kids.length} tareas` : "Sin tareas";
    });
  }

  function updateMapStats() {
    const p = mapProject();
    if (!p) return;
    const text = `${doneCount(p)}/${taskNodes(p).length} tareas`;
    mapProgressText.textContent = text;
    const stats = mapSurface.querySelector(".root-stats");
    if (stats) stats.textContent = text;
    refreshStageMeta();
  }

  function renderMap() {
    const p = mapProject();
    if (!p) return;

    mapTitle.textContent = p.name;
    updateMapStats();

    mapSurface.innerHTML =
      `<svg class="map-lines" aria-hidden="true"></svg>` +
      rootHTML(p) +
      p.nodes.map((n) => nodeHTML(n, p)).join("") +
      (p.nodes.length ? "" : `<div class="map-empty">Añade tu primera nube con los botones de arriba.</div>`);

    if (linkSource) {
      const src = linkSource === "root"
        ? mapSurface.querySelector(".map-root")
        : mapSurface.querySelector(`[data-node="${CSS.escape(linkSource)}"]`);
      if (src) src.classList.add("link-source");
    }

    requestAnimationFrame(drawLines);
  }

  function openMap(id) {
    if (!state.projects.some((p) => p.id === id)) return;
    closeDrawer();
    closeLineMenu();
    state.mapProjectId = id;
    document.body.classList.add("map-mode");
    dashboardView.hidden = true;
    mapView.hidden = false;
    mapCanvas.scrollTop = 0;
    mapCanvas.scrollLeft = 0;
    renderMap();
  }

  function closeMap() {
    stopLinking();
    closeLineMenu();
    state.mapProjectId = null;
    document.body.classList.remove("map-mode");
    mapView.hidden = true;
    dashboardView.hidden = false;
    renderGrid();
  }

  let linkSource = null;
  let editingText = null;

  function stopLinking() {
    linkSource = null;
    document.body.classList.remove("linking");
    mapSurface.querySelectorAll(".link-source").forEach((el) => el.classList.remove("link-source"));
    mapSurface.querySelector(".link-preview")?.remove();
    linkBanner.hidden = true;
  }

  function startLinking(id) {
    if (linkSource === id) {
      stopLinking();
      return;
    }
    const p = mapProject();
    const node = p && (id === "root" ? { id: "root", text: p.name } : nodeById(p, id));
    if (!node) return;

    closeLineMenu();
    stopLinking();
    linkSource = id;
    document.body.classList.add("linking");
    const el = id === "root"
      ? mapSurface.querySelector(".map-root")
      : mapSurface.querySelector(`[data-node="${CSS.escape(id)}"]`);
    if (el) el.classList.add("link-source");
    linkBannerText.textContent = id === "root"
      ? "Conecta el proyecto con varias nubes · pulsa Listo al terminar"
      : `Conecta «${node.text}» con varias nubes o con el proyecto · pulsa Listo al terminar`;
    linkBanner.hidden = false;
  }

  function editText(id) {
    const p = mapProject();
    const node = p && nodeById(p, id);
    const el = mapSurface.querySelector(`[data-node="${CSS.escape(id)}"] [data-text]`);
    if (!node || !el || el.contentEditable === "true") return;

    editingText = { el, original: node.text };
    el.contentEditable = "true";
    el.focus({ preventScroll: true });
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }

  function centerSpot(p, type) {
    const w = 220;
    const h = type === "image" ? 190 : 120;
    const baseX = mapCanvas.scrollLeft + mapCanvas.clientWidth / 2 - w / 2;
    const baseY = mapCanvas.scrollTop + mapCanvas.clientHeight / 2 - h / 2;
    const maxX = mapSurface.clientWidth - w - 16;
    const maxY = mapSurface.clientHeight - h - 16;
    const clamp = (v, min, max) => Math.min(Math.max(min, v), max);

    const viewLeft = mapCanvas.scrollLeft + 16;
    const viewTop = mapCanvas.scrollTop + 16;
    const viewRight = mapCanvas.scrollLeft + mapCanvas.clientWidth - w - 16;
    const viewBottom = mapCanvas.scrollTop + mapCanvas.clientHeight - h - 16;

    const inView = [];
    const anywhere = [];
    for (let dy = -600; dy <= 600; dy += 30) {
      for (let dx = -600; dx <= 600; dx += 30) {
        const x = Math.round(baseX + dx);
        const y = Math.round(baseY + dy);
        if (x < 16 || y < 16 || x > maxX || y > maxY) continue;
        const spot = { x, y, d: dx * dx + dy * dy };
        anywhere.push(spot);
        if (x >= viewLeft && x <= viewRight && y >= viewTop && y <= viewBottom) inView.push(spot);
      }
    }

    const free = (spot) => {
      const rootClear = Math.abs(p.root.x - spot.x) >= 210 || Math.abs(p.root.y - spot.y) >= 110;
      if (!rootClear) return false;
      return p.nodes.every((n) => Math.abs(n.x - spot.x) >= 210 || Math.abs(n.y - spot.y) >= 110);
    };

    inView.sort((a, b) => a.d - b.d);
    for (const spot of inView) if (free(spot)) return { x: spot.x, y: spot.y };

    anywhere.sort((a, b) => a.d - b.d);
    for (const spot of anywhere) if (free(spot)) return { x: spot.x, y: spot.y };

    return { x: clamp(Math.round(baseX), 16, maxX), y: clamp(Math.round(baseY), 16, maxY) };
  }

  function addNode(type) {
    const p = mapProject();
    if (!p) return;

    stopLinking();
    const id = `n-${Date.now()}`;
    const spot = centerSpot(p, type);
    const base = { id, x: spot.x, y: spot.y };

    let node;
    if (type === "task") node = { ...base, type, text: "Nueva tarea", done: false };
    else if (type === "stage") node = { ...base, type, text: "Nueva etapa" };
    else if (type === "note") node = { ...base, type, text: "Escribe tu nota aquí…" };
    else if (type === "link") node = { ...base, type, text: "Nuevo enlace", url: "https://ejemplo.dev" };
    else if (type === "palette") node = { ...base, type, colors: ["#0b1220", "#2563eb", "#38bdf8", "#a5f3fc", "#e2e8f0"] };
    else node = { ...base, type: "image", image: "" };

    p.nodes.push(node);
    saveState();
    renderMap();

    const added = mapSurface.querySelector(`[data-node="${CSS.escape(id)}"]`);
    if (added) {
      const c = mapCanvas;
      const outLeft = added.offsetLeft < c.scrollLeft + 8;
      const outRight = added.offsetLeft + added.offsetWidth > c.scrollLeft + c.clientWidth - 8;
      const outTop = added.offsetTop < c.scrollTop + 8;
      const outBottom = added.offsetTop + added.offsetHeight > c.scrollTop + c.clientHeight - 8;
      if (outLeft || outRight || outTop || outBottom) {
        const maxL = Math.max(0, c.scrollWidth - c.clientWidth);
        const maxT = Math.max(0, c.scrollHeight - c.clientHeight);
        c.scrollTo({
          left: Math.min(Math.max(0, added.offsetLeft + added.offsetWidth / 2 - c.clientWidth / 2), maxL),
          top: Math.min(Math.max(0, added.offsetTop + added.offsetHeight / 2 - c.clientHeight / 2), maxT),
          behavior: "smooth"
        });
      }
    }

    if (type !== "image" && type !== "palette") editText(id);
    showToast(`Nube de ${(NODE_TAG[type] || type).replace(/^\S+\s/, "")} añadida · conéctala con ↳`);
  }

  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.addEventListener("click", () => addNode(btn.dataset.add));
  });

  mapBack.addEventListener("click", closeMap);
  linkCancel.addEventListener("click", stopLinking);

  lineDelete.addEventListener("click", () => {
    const p = mapProject();
    if (!p || !selectedEdge) return;
    p.edges = p.edges.filter((e) => e !== selectedEdge);
    saveState();
    closeLineMenu();
    renderMap();
    showToast("Línea eliminada");
  });

  document.addEventListener("pointerdown", (e) => {
    if (lineMenu.hidden) return;
    if (e.target.closest("#lineMenu") || e.target.closest("[data-edge]")) return;
    closeLineMenu();
  });

  mapCanvas.addEventListener("scroll", () => {
    if (!lineMenu.hidden) closeLineMenu();
  });

  let mapDrag = null;

  mapSurface.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    if (e.target.closest("button, input, label, [contenteditable='true']")) return;

    const nodeEl = e.target.closest(".node");
    const rootEl = e.target.closest(".map-root");
    const el = nodeEl || rootEl;
    if (!el) return;

    const p = mapProject();
    if (!p) return;

    const target = rootEl ? p.root : p.nodes.find((n) => n.id === nodeEl.dataset.node);
    if (!target) return;

    mapDrag = { el, target, px: e.clientX, py: e.clientY, ox: target.x, oy: target.y, moved: false, pointerId: e.pointerId };
  });

  window.addEventListener("pointermove", (e) => {
    if (!mapDrag) return;
    const dx = e.clientX - mapDrag.px;
    const dy = e.clientY - mapDrag.py;

    if (!mapDrag.moved) {
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      mapDrag.moved = true;
      mapDrag.el.classList.add("dragging");
      try { mapDrag.el.setPointerCapture(mapDrag.pointerId); } catch { /* puntero sintético */ }
    }

    const maxX = mapSurface.clientWidth - mapDrag.el.offsetWidth - 8;
    const maxY = mapSurface.clientHeight - mapDrag.el.offsetHeight - 8;

    mapDrag.target.x = Math.min(Math.max(8, mapDrag.ox + dx), maxX);
    mapDrag.target.y = Math.min(Math.max(8, mapDrag.oy + dy), maxY);
    mapDrag.el.style.left = `${mapDrag.target.x}px`;
    mapDrag.el.style.top = `${mapDrag.target.y}px`;
    drawLines();
  });

  window.addEventListener("pointermove", (e) => {
    if (!linkSource) return;
    const svg = mapSurface.querySelector(".map-lines");
    const source = elementOf(linkSource, mapSurface.querySelector(".map-root"));
    if (!svg || !source) return;

    const rect = mapSurface.getBoundingClientRect();
    const x1 = source.offsetLeft + source.offsetWidth / 2;
    const y1 = source.offsetTop + source.offsetHeight / 2;
    const x2 = e.clientX - rect.left;
    const y2 = e.clientY - rect.top;

    let preview = svg.querySelector(".link-preview");
    if (!preview) {
      preview = document.createElementNS("http://www.w3.org/2000/svg", "path");
      preview.setAttribute("class", "link-preview");
      svg.appendChild(preview);
    }
    preview.setAttribute("d", `M${x1},${y1} L${x2},${y2}`);
  });

  function endDrag() {
    if (!mapDrag) return;
    const moved = mapDrag.moved;
    mapDrag.el.classList.remove("dragging");
    mapDrag = null;
    if (moved) saveState();
  }

  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  mapSurface.addEventListener("dblclick", (e) => {
    if (e.target.closest("button, input, label")) return;
    const nodeEl = e.target.closest(".node[data-node]");
    if (!nodeEl || !nodeEl.querySelector("[data-text]")) return;
    editText(nodeEl.dataset.node);
  });

  mapSurface.addEventListener("input", (e) => {
    const color = e.target.closest("[data-color]");
    if (color) {
      const node = findNode(color.dataset.color);
      if (!node || !Array.isArray(node.colors)) return;
      node.colors[Number(color.dataset.colorIndex)] = color.value;
      const swatch = color.closest(".swatch-mini");
      if (swatch) swatch.style.background = color.value;
      return;
    }
    const el = e.target.closest("[data-text]");
    if (!el) return;
    const node = findNode(el.dataset.text);
    if (node) {
      node.text = el.textContent;
      clearTimeout(textSaveTimer);
      textSaveTimer = setTimeout(saveState, 400);
    }
  });

  mapSurface.addEventListener("focusout", (e) => {
    const el = e.target.closest("[data-text][contenteditable='true']");
    if (!el) return;
    el.contentEditable = "false";
    editingText = null;
    const node = findNode(el.dataset.text);
    if (node) {
      const text = el.textContent.trim();
      node.text = text || "Sin texto";
      el.textContent = node.text;
      saveState();
    }
  });

  mapSurface.addEventListener("keydown", (e) => {
    const el = e.target.closest("[data-text][contenteditable='true']");
    if (!el) return;
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      el.blur();
    } else if (e.key === "Escape") {
      e.stopPropagation();
      const node = findNode(el.dataset.text);
      if (node && editingText && editingText.el === el) {
        node.text = editingText.original;
        el.textContent = node.text;
      }
      el.blur();
    }
  });

  mapSurface.addEventListener("click", (e) => {
    const editBtn = e.target.closest("[data-edit-text]");
    if (editBtn) {
      e.stopPropagation();
      closeLineMenu();
      editText(editBtn.dataset.editText);
      return;
    }

    const edgeEl = e.target.closest("[data-edge]");
    if (edgeEl && !linkSource) {
      e.stopPropagation();
      selectEdge(Number(edgeEl.dataset.edge), e.clientX, e.clientY);
      return;
    }

    const favBtn = e.target.closest("[data-fav]");
    if (favBtn) {
      e.stopPropagation();
      const p = mapProject();
      const node = findNode(favBtn.dataset.fav);
      if (!p || !node || node.type !== "palette") return;
      if (isFavoritePalette(p, node)) {
        node.favorite = false;
        p.favPaletteId = null;
        saveState();
        renderMap();
        renderGrid();
        showToast("Paleta desmarcada · el tablero conserva sus colores");
      } else {
        makeFavoritePalette(p, node);
        saveState();
        renderMap();
        renderGrid();
        showToast("Paleta favorita · ya es la del tablero");
      }
      return;
    }

    const removeColor = e.target.closest("[data-remove-color]");
    if (removeColor) {
      e.stopPropagation();
      const p = mapProject();
      const node = findNode(removeColor.dataset.removeColor);
      if (!p || !node || !Array.isArray(node.colors)) return;
      if (node.colors.length <= 1) {
        showToast("La paleta necesita al menos un color");
        return;
      }
      node.colors.splice(Number(removeColor.dataset.colorIndex), 1);
      const synced = syncProjectPalette(p, node);
      saveState();
      renderMap();
      renderGrid();
      showToast(synced ? "Color quitado · tablero actualizado" : "Color quitado de la paleta");
      return;
    }

    const addColor = e.target.closest("[data-add-color]");
    if (addColor) {
      e.stopPropagation();
      const p = mapProject();
      const node = findNode(addColor.dataset.addColor);
      if (!p || !node || !Array.isArray(node.colors)) return;
      node.colors.push(DEFAULT_PALETTE[node.colors.length % DEFAULT_PALETTE.length]);
      const synced = syncProjectPalette(p, node);
      saveState();
      renderMap();
      renderGrid();
      showToast(synced ? "Color añadido · tablero actualizado" : "Color añadido · márcala con ★ para usarla en el tablero");
      return;
    }

    const connectBtn = e.target.closest("[data-connect]");
    if (connectBtn) {
      e.stopPropagation();
      startLinking(connectBtn.dataset.connect);
      return;
    }

    if (linkSource) {
      if (e.target.closest("button")) return;

      const nodeEl = e.target.closest(".node");
      const rootEl = e.target.closest(".map-root");
      const p = mapProject();
      if (!p) {
        stopLinking();
        return;
      }

      if (!nodeEl && !rootEl) {
        stopLinking();
        return;
      }

      const targetId = nodeEl ? nodeEl.dataset.node : "root";
      if (linkSource !== "root" && !nodeById(p, linkSource)) {
        stopLinking();
        return;
      }

      if (targetId === linkSource) {
        showToast("No puedes conectar una nube consigo misma");
        return;
      }

      if (hasEdge(p, linkSource, targetId)) {
        showToast("Esas nubes ya están conectadas · elige otra");
        return;
      }

      p.edges.push({ a: linkSource, b: targetId });
      saveState();
      const targetName = targetId === "root" ? p.name : nodeById(p, targetId)?.text;
      renderMap();
      showToast(`Conectada con «${targetName}» · sigue conectando o pulsa Listo`);
      return;
    }

    const del = e.target.closest("[data-del]");
    if (del) {
      e.stopPropagation();
      const p = mapProject();
      if (!p) return;
      closeLineMenu();
      const removed = p.nodes.find((n) => n.id === del.dataset.del);
      if (removed && removed.imageId) {
        imageCache.delete(removed.imageId);
        idbDelete(removed.imageId).catch(() => {});
      }
      if (removed && removed.type === "palette" && p.favPaletteId === removed.id) p.favPaletteId = null;
      p.edges = p.edges.filter((edge) => edge.a !== del.dataset.del && edge.b !== del.dataset.del);
      p.nodes = p.nodes.filter((n) => n.id !== del.dataset.del);
      if (linkSource === del.dataset.del) stopLinking();
      saveState();
      renderMap();
      renderGrid();
      showToast("Nube y sus líneas eliminadas");
      return;
    }

    const copy = e.target.closest("[data-copy]");
    if (copy) copyText(copy.dataset.copy);
  });

  mapSurface.addEventListener("change", (e) => {
    const color = e.target.closest("[data-color]");
    if (color) {
      const p = mapProject();
      const node = findNode(color.dataset.color);
      if (!p || !node || !Array.isArray(node.colors)) return;
      node.colors[Number(color.dataset.colorIndex)] = color.value;
      const synced = syncProjectPalette(p, node);
      saveState();
      renderGrid();
      showToast(synced ? `Color ${color.value} aplicado · tablero actualizado` : `Color ${color.value} aplicado`);
      return;
    }

    const check = e.target.closest("[data-check]");
    if (check) {
      const node = findNode(check.dataset.check);
      if (!node) return;
      node.done = check.checked;
      const span = check.closest(".node-task").querySelector(".node-text");
      if (span) span.classList.toggle("done", check.checked);
      updateMapStats();
      saveState();
      return;
    }

    const file = e.target.closest("[data-img]");
    if (!file || !file.files[0]) return;

    const node = findNode(file.dataset.img);
    if (!node) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const key = node.imageId || `img-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
      try {
        await idbSet(key, reader.result);
        node.imageId = key;
        imageCache.set(key, reader.result);
        delete node.image;
        showToast("Imagen guardada en la nube");
      } catch {
        delete node.imageId;
        node.image = reader.result;
        showToast("Imagen en memoria · IndexedDB no disponible");
      }
      saveState();
      renderMap();
    };
    reader.readAsDataURL(file.files[0]);
  });

  window.addEventListener("resize", () => {
    if (state.mapProjectId) drawLines();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (!lineMenu.hidden) {
      closeLineMenu();
      return;
    }
    if (linkSource) {
      stopLinking();
      return;
    }
    if (state.mapProjectId) {
      closeMap();
      return;
    }
    closeDrawer();
  });

  // ---------------- Init ----------------
  (async function init() {
    await loadImages();
    renderGrid();
  })();
