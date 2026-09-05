// ---------------------------------------------------------------------------
// Site Manager (CRM) — edits content.json and commits it to GitHub.
// Plain JS, no build step. Credentials/token live in this browser only.
// ---------------------------------------------------------------------------

const USER = "beepiin";
const PASS = "@BeePiin@";
const SETTINGS_KEY = "bs_admin_gh";
const SESSION_KEY = "bs_admin_in";
const DRAFT_KEY = "bs_admin_draft";

let content = null;
let sha = null;

// --- tiny helpers ----------------------------------------------------------
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => Array.prototype.slice.call(document.querySelectorAll(sel));

function getPath(obj, path) {
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}
function setPath(obj, path, value) {
  const keys = path.split(".");
  const last = keys.pop();
  let cur = obj;
  keys.forEach((k) => {
    if (typeof cur[k] !== "object" || cur[k] === null) cur[k] = {};
    cur = cur[k];
  });
  cur[last] = value;
}
function slugify(str) {
  return String(str || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "post-" + Date.now();
}
function flash(el, msg, ok) {
  if (!el) return;
  el.textContent = msg;
  el.style.color = ok === false ? "#b91c1c" : "#1f7a4d";
  if (ok !== false) setTimeout(() => { if (el.textContent === msg) el.textContent = ""; }, 4000);
}
function b64encode(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
}
function b64decode(b64) {
  const bin = atob(String(b64).replace(/\s/g, ""));
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

// --- settings --------------------------------------------------------------
function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
  } catch (e) {
    return {};
  }
}
function fillSettings() {
  const s = loadSettings();
  $("#ghOwner").value = s.owner || "";
  $("#ghRepo").value = s.repo || "";
  $("#ghBranch").value = s.branch || "main";
  $("#ghToken").value = s.token || "";
  $("#ghPath").value = s.path || "content.json";
}
function saveSettings() {
  const s = {
    owner: $("#ghOwner").value.trim(),
    repo: $("#ghRepo").value.trim(),
    branch: $("#ghBranch").value.trim() || "main",
    token: $("#ghToken").value.trim(),
    path: $("#ghPath").value.trim() || "content.json",
  };
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
  return s;
}

// --- GitHub API ------------------------------------------------------------
function ghUrl(s, path) {
  return (
    "https://api.github.com/repos/" +
    encodeURIComponent(s.owner) + "/" + encodeURIComponent(s.repo) +
    "/contents/" + path.split("/").map(encodeURIComponent).join("/")
  );
}
function ghHeaders(s) {
  return {
    Authorization: "Bearer " + s.token,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}
async function ghGet(s, path) {
  const res = await fetch(ghUrl(s, path) + "?ref=" + encodeURIComponent(s.branch), {
    headers: ghHeaders(s),
    cache: "no-store",
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("GitHub said " + res.status);
  return res.json();
}
async function ghPut(s, path, text, fileSha, message) {
  const res = await fetch(ghUrl(s, path), {
    method: "PUT",
    headers: Object.assign({ "Content-Type": "application/json" }, ghHeaders(s)),
    body: JSON.stringify({
      message: message,
      content: b64encode(text),
      branch: s.branch,
      sha: fileSha || undefined,
    }),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error("GitHub said " + res.status + " — " + detail.slice(0, 160));
  }
  return res.json();
}

// --- content load ----------------------------------------------------------
const DEFAULTS = {
  site: {}, home: { services: [] }, blogsPage: {}, contactPage: {}, posts: [],
};

async function loadContent() {
  const s = loadSettings();
  if (s.owner && s.repo && s.token) {
    try {
      const file = await ghGet(s, s.path || "content.json");
      if (file && file.content) {
        sha = file.sha;
        return JSON.parse(b64decode(file.content));
      }
    } catch (e) {
      flash($("#saveState"), "Could not read from GitHub: " + e.message, false);
    }
  }
  const res = await fetch("content.json", { cache: "no-store" });
  return res.json();
}

// --- rendering -------------------------------------------------------------
function bindFields() {
  $$("[data-f]").forEach((el) => {
    const path = el.getAttribute("data-f");
    const isBool = el.getAttribute("data-type") === "bool";
    const value = getPath(content, path);
    if (isBool) el.checked = value !== false;
    else el.value = value == null ? "" : value;

    el.addEventListener("input", () => {
      setPath(content, path, isBool ? el.checked : el.value);
      markDirty();
    });
    el.addEventListener("change", () => {
      setPath(content, path, isBool ? el.checked : el.value);
      markDirty();
    });
  });
}

function renderServices() {
  const wrap = $("#servicesEditor");
  const list = (content.home.services = content.home.services || []);
  wrap.innerHTML = "";
  list.forEach((svc, i) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML =
      '<div class="item-head"><strong>Service ' + (i + 1) + "</strong>" +
      '<button class="btn-danger" type="button" data-del="' + i + '">Delete</button></div>' +
      '<div class="grid2">' +
      "<label>Icon (emoji) <input data-k=\"icon\" /></label>" +
      "<label>Title <input data-k=\"title\" /></label>" +
      "</div>" +
      "<label>Text <textarea rows=\"4\" data-k=\"text\"></textarea></label>";
    card.querySelectorAll("[data-k]").forEach((input) => {
      const key = input.getAttribute("data-k");
      input.value = svc[key] || "";
      input.addEventListener("input", () => { svc[key] = input.value; markDirty(); });
    });
    card.querySelector("[data-del]").addEventListener("click", () => {
      list.splice(i, 1);
      renderServices();
      markDirty();
    });
    wrap.appendChild(card);
  });
}

function renderPosts() {
  const wrap = $("#postsEditor");
  const list = (content.posts = content.posts || []);
  wrap.innerHTML = "";
  list.forEach((post, i) => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML =
      '<div class="item-head"><strong>' + (post.title || "Untitled post") + "</strong>" +
      '<button class="btn-danger" type="button" data-del="1">Delete</button></div>' +
      '<div class="grid2">' +
      "<label>Title <input data-k=\"title\" /></label>" +
      "<label>Date <input type=\"date\" data-k=\"date\" /></label>" +
      "</div>" +
      '<div class="grid2">' +
      "<label>Web address (slug) <input data-k=\"slug\" /></label>" +
      "<label>Cover image link (optional) <input data-k=\"image\" /></label>" +
      "</div>" +
      "<label>Short summary <textarea rows=\"2\" data-k=\"excerpt\"></textarea></label>" +
      "<label>Full text (HTML allowed) <textarea rows=\"10\" data-k=\"content\"></textarea></label>";
    card.querySelectorAll("[data-k]").forEach((input) => {
      const key = input.getAttribute("data-k");
      input.value = post[key] || "";
      input.addEventListener("input", () => {
        post[key] = input.value;
        if (key === "title" && !post.slugLocked) post.slug = slugify(input.value);
        if (key === "slug") post.slugLocked = true;
        markDirty();
      });
    });
    card.querySelector("[data-del]").addEventListener("click", () => {
      if (!confirm("Delete this post?")) return;
      list.splice(i, 1);
      renderPosts();
      markDirty();
    });
    wrap.appendChild(card);
  });
  if (!list.length) {
    wrap.innerHTML = '<p class="muted">No posts written here yet.</p>';
  }
}

function markDirty() {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(content));
  flash($("#saveState"), "Unsaved changes — click Publish", false);
}

function serialize() {
  const copy = JSON.parse(JSON.stringify(content));
  (copy.posts || []).forEach((p) => { delete p.slugLocked; });
  return JSON.stringify(copy, null, 2) + "\n";
}

// --- publish ---------------------------------------------------------------
async function publish() {
  const s = loadSettings();
  if (!s.owner || !s.repo || !s.token) {
    flash($("#saveState"), "Add your GitHub details in Settings first.", false);
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.tab === "settings"));
    $$(".panel").forEach((p) => p.classList.toggle("active", p.dataset.panel === "settings"));
    return;
  }
  const btn = $("#publishBtn");
  btn.disabled = true;
  flash($("#saveState"), "Publishing…");
  const text = serialize();
  try {
    const main = s.path || "content.json";
    const current = await ghGet(s, main);
    const saved = await ghPut(s, main, text, current && current.sha, "Update site content via Site Manager");
    sha = saved.content.sha;

    // keep the preview copy in sync when it exists
    try {
      const mirror = await ghGet(s, "public/static/content.json");
      if (mirror) await ghPut(s, "public/static/content.json", text, mirror.sha, "Sync preview content");
    } catch (e) { /* mirror is optional */ }

    localStorage.removeItem(DRAFT_KEY);
    flash($("#saveState"), "Published. Your site updates in a minute or two.");
  } catch (e) {
    flash($("#saveState"), "Could not publish: " + e.message, false);
  } finally {
    btn.disabled = false;
  }
}

// --- boot ------------------------------------------------------------------
async function startApp() {
  $("#loginView").hidden = true;
  $("#appView").hidden = false;
  fillSettings();
  try {
    content = await loadContent();
  } catch (e) {
    content = JSON.parse(JSON.stringify(DEFAULTS));
    flash($("#saveState"), "Could not load content — starting from blank.", false);
  }
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft && confirm("You have unpublished changes from last time. Continue editing them?")) {
    try { content = JSON.parse(draft); } catch (e) { /* ignore */ }
  } else {
    localStorage.removeItem(DRAFT_KEY);
  }
  content = Object.assign({}, DEFAULTS, content);
  content.home = content.home || {};
  bindFields();
  renderServices();
  renderPosts();
}

$("#loginForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const u = e.currentTarget.elements["username"].value.trim();
  const p = e.currentTarget.elements["password"].value;
  if (u === USER && p === PASS) {
    sessionStorage.setItem(SESSION_KEY, "1");
    startApp();
  } else {
    $("#loginError").hidden = false;
  }
});

$("#logoutBtn").addEventListener("click", () => {
  sessionStorage.removeItem(SESSION_KEY);
  location.reload();
});

$("#tabs").addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab) return;
  $$(".tab").forEach((t) => t.classList.toggle("active", t === tab));
  $$(".panel").forEach((p) => p.classList.toggle("active", p.dataset.panel === tab.dataset.tab));
});

$("#addService").addEventListener("click", () => {
  content.home.services = content.home.services || [];
  content.home.services.push({ icon: "⭐", title: "New service", text: "" });
  renderServices();
  markDirty();
});

$("#addPost").addEventListener("click", () => {
  content.posts = content.posts || [];
  const today = new Date().toISOString().slice(0, 10);
  content.posts.unshift({ title: "New post", slug: "new-post-" + Date.now(), date: today, excerpt: "", content: "" });
  renderPosts();
  markDirty();
});

$("#publishBtn").addEventListener("click", publish);
$("#saveSettings").addEventListener("click", () => {
  saveSettings();
  flash($("#settingsState"), "Settings saved on this device.");
});
$("#testSettings").addEventListener("click", async () => {
  const s = saveSettings();
  flash($("#settingsState"), "Checking…");
  try {
    const file = await ghGet(s, s.path);
    flash($("#settingsState"), file ? "Connected — content file found." : "Connected, but that file does not exist yet.", !!file);
  } catch (e) {
    flash($("#settingsState"), "Failed: " + e.message, false);
  }
});

$("#downloadJson").addEventListener("click", () => {
  const url = URL.createObjectURL(new Blob([serialize()], { type: "application/json" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = "content.json";
  a.click();
  URL.revokeObjectURL(url);
});

$("#uploadJson").addEventListener("change", (e) => {
  const file = e.target.files && e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      content = JSON.parse(String(reader.result));
      bindFields();
      renderServices();
      renderPosts();
      markDirty();
    } catch (err) {
      alert("That file is not a valid content file.");
    }
  };
  reader.readAsText(file);
});

if (sessionStorage.getItem(SESSION_KEY) === "1") startApp();
