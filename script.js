// ---------------------------------------------------------------------------
// Bipin Sharma — site script (plain JS, no framework)
// Content comes from content.json, which the CRM at admin.html edits.
// ---------------------------------------------------------------------------

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {
  menuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuBtn.innerHTML = isOpen ? "&times;" : "&#9776;";
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuBtn.innerHTML = "&#9776;";
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// --- helpers ---------------------------------------------------------------
function getPath(obj, path) {
  return path.split(".").reduce(function (o, k) {
    return o == null ? undefined : o[k];
  }, obj);
}

function esc(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function fmtDate(value) {
  const d = new Date(value);
  if (isNaN(d.getTime())) return String(value || "");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

const WA_ICON =
  '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style="display:block;"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.35 5L2 22l5.11-1.34C8.6 21.4 10.26 21.8 12 21.8c5.52 0 10-4.48 10-10S17.52 2 12 2zm4.93 13.16c-.2.56-1.13 1.03-1.58 1.09-.42.06-.82.09-1.21-.03-.28-.09-.63-.22-1.08-.43-1.9-.85-3.14-2.82-3.23-2.95-.09-.14-.78-1.04-.78-1.98 0-.95.5-1.4.67-1.59.18-.19.39-.24.51-.24.13 0 .25 0 .36.01.12.01.28-.04.43.33.15.37.53 1.29.58 1.38.05.09.08.2.02.32-.07.13-.1.2-.2.31-.1.11-.21.23-.3.3-.1.08-.2.18-.14.35.06.18.29.95 1.31 1.53.9.5 1.62.54 1.89.47.28-.07.36-.17.52-.35.16-.18.28-.24.45-.14.17.09 1.07.51 1.26.6.19.09.31.14.35.23.05.08.05.49-.14 1.04z"/></svg>';

// --- apply content.json ----------------------------------------------------
function applyContent(c) {
  document.querySelectorAll("[data-c]").forEach(function (el) {
    const value = getPath(c, el.getAttribute("data-c"));
    if (typeof value === "string" && value.length) el.textContent = value;
  });

  const site = c.site || {};
  const tel = function (n) {
    return "tel:" + String(n || "").replace(/[^\d+]/g, "");
  };

  // CV button
  const cv = document.querySelector("a.btn-cv");
  if (cv && c.home && c.home.cvUrl) cv.href = c.home.cvUrl;

  // Services grid
  const services = document.getElementById("servicesGrid");
  if (services && c.home && Array.isArray(c.home.services)) {
    services.innerHTML = c.home.services
      .map(function (s) {
        return (
          '<article class="card">' +
          '<span class="icon">' + esc(s.icon) + "</span>" +
          "<h3>" + esc(s.title) + "</h3>" +
          "<p>" + esc(s.text) + "</p>" +
          '<a href="contact.html" class="link-more">Read More &rarr;</a>' +
          "</article>"
        );
      })
      .join("");
  }

  // Footer contact list
  const footerContact = document.getElementById("footerContact");
  if (footerContact) {
    let html = '<li><span class="ico">&#9906;</span> ' + esc(site.address) + "</li>";
    html +=
      '<li><span class="ico">&#9742;</span> <span>' +
      '<a href="' + tel(site.phone1) + '">' + esc(site.phone1) + "</a>" +
      (site.phone2 ? ' | <a href="' + tel(site.phone2) + '">' + esc(site.phone2) + "</a>" : "") +
      "</span></li>";
    if (site.whatsapp) {
      html +=
        '<li><span class="ico">' + WA_ICON + "</span> " +
        '<a href="https://wa.me/' + esc(site.whatsapp) + '" target="_blank" rel="noopener">WhatsApp ' +
        esc(site.phone2 || site.phone1) + "</a></li>";
    }
    html +=
      '<li><span class="ico">&#9993;</span> <a href="mailto:' + esc(site.email) + '">' +
      esc(site.email) + "</a></li>";
    html += '<li><span class="ico">&#128337;</span> ' + esc(site.hours) + "</li>";
    footerContact.innerHTML = html;
  }

  // Contact page info cards
  const contactInfo = document.getElementById("contactInfo");
  if (contactInfo) {
    const card = function (icon, label, value) {
      return (
        '<div class="info-card"><span class="icon">' + icon + "</span>" +
        '<div><p class="label">' + esc(label) + '</p><p class="value">' + value + "</p></div></div>"
      );
    };
    contactInfo.innerHTML =
      card("&#9906;", "Address", esc(site.address)) +
      card(
        "&#9742;",
        "Phone",
        '<a href="' + tel(site.phone1) + '">' + esc(site.phone1) + "</a>" +
          (site.phone2 ? ' | <a href="' + tel(site.phone2) + '">' + esc(site.phone2) + "</a>" : "") +
          (site.whatsapp
            ? ' | <a href="https://wa.me/' + esc(site.whatsapp) + '" target="_blank" rel="noopener">WhatsApp</a>'
            : ""),
      ) +
      card("&#9993;", "Email", '<a href="mailto:' + esc(site.email) + '">' + esc(site.email) + "</a>") +
      card("&#128337;", "Office Hours", esc(site.hours));
  }
}

// --- blogs list ------------------------------------------------------------
function blogCard(date, title, excerpt, link) {
  return (
    '<article class="card">' +
    '<p class="post-date">' + esc(date) + "</p>" +
    "<h3>" + esc(title) + "</h3>" +
    "<p>" + esc(excerpt) + "</p>" +
    '<p><a href="' + link + '">Read more &rarr;</a></p>' +
    "</article>"
  );
}

function initBlogs(content) {
  const blogGrid = document.getElementById("blogGrid");
  if (!blogGrid) return;

  const local = (content && Array.isArray(content.posts) ? content.posts : []).slice().sort(
    function (a, b) {
      return new Date(b.date || 0) - new Date(a.date || 0);
    },
  );

  const localHtml = local
    .map(function (p) {
      const tmp = document.createElement("div");
      tmp.innerHTML = p.content || "";
      const excerpt = (p.excerpt || tmp.textContent || "").trim().slice(0, 180);
      return blogCard(fmtDate(p.date), p.title, excerpt, "post.html?slug=" + encodeURIComponent(p.slug));
    })
    .join("");

  const showBlogger = !content || !content.blogsPage || content.blogsPage.showBlogger !== false;

  if (!showBlogger) {
    blogGrid.innerHTML =
      localHtml ||
      '<article class="card"><p class="post-date">No posts yet</p><h3>Check back soon</h3><p>New articles will appear here once published.</p></article>';
    return;
  }

  blogGrid.innerHTML = localHtml + '<article class="card"><p class="post-date">Loading more posts…</p></article>';

  window.renderBlogs = function (data) {
    const entries = (data.feed && data.feed.entry) || [];
    const remote = entries
      .map(function (entry) {
        const postId = entry.id.$t.split("post-").pop();
        const tmp = document.createElement("div");
        tmp.innerHTML = entry.content ? entry.content.$t : "";
        const excerpt = (tmp.textContent || "").trim().slice(0, 180);
        return blogCard(
          fmtDate(entry.published.$t),
          entry.title.$t,
          excerpt,
          "post.html?id=" + encodeURIComponent(postId),
        );
      })
      .join("");
    blogGrid.innerHTML =
      localHtml + remote ||
      '<article class="card"><p class="post-date">No posts yet</p><h3>Check back soon</h3><p>New articles will appear here once published.</p></article>';
  };

  const s = document.createElement("script");
  s.src =
    "https://blogs.bipin-sharma.com.np/feeds/posts/default?alt=json-in-script&max-results=9&callback=renderBlogs";
  s.onerror = function () {
    blogGrid.innerHTML =
      localHtml ||
      '<article class="card"><p class="post-date">Unavailable</p><h3>Could not load posts</h3><p>Please try again later.</p></article>';
  };
  document.body.appendChild(s);
}

// --- single post -----------------------------------------------------------
function initPost(content) {
  const postContent = document.getElementById("postContent");
  if (!postContent) return;

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const postId = params.get("id");

  if (slug) {
    const posts = content && Array.isArray(content.posts) ? content.posts : [];
    const post = posts.find(function (p) {
      return p.slug === slug;
    });
    if (!post) {
      postContent.innerHTML =
        '<p class="post-date">Not found</p><h1>Post not found</h1><p><a href="blogs.html">Back to all blogs</a>.</p>';
      return;
    }
    document.title = post.title + " — Bipin Sharma, Chartered Accountant";
    postContent.innerHTML =
      '<p class="post-date">' + esc(fmtDate(post.date)) + "</p>" +
      "<h1>" + esc(post.title) + "</h1>" +
      (post.image ? '<p><img src="' + esc(post.image) + '" alt="' + esc(post.title) + '" /></p>' : "") +
      '<div class="post-body">' + (post.content || "") + "</div>";
    return;
  }

  window.renderPost = function (data) {
    const entry = data.entry || (data.feed && data.feed.entry && data.feed.entry[0]);
    if (!entry) {
      postContent.innerHTML =
        '<p class="post-date">Not found</p><h1>Post not found</h1><p>This post could not be loaded. <a href="blogs.html">Back to all blogs</a>.</p>';
      return;
    }
    const title = entry.title.$t;
    const original = entry.link.find(function (l) {
      return l.rel === "alternate";
    }).href;
    document.title = title + " — Bipin Sharma, Chartered Accountant";
    postContent.innerHTML =
      '<p class="post-date">' + esc(fmtDate(entry.published.$t)) + "</p>" +
      "<h1>" + esc(title) + "</h1>" +
      '<div class="post-body">' + (entry.content ? entry.content.$t : "") + "</div>" +
      '<p class="post-original"><a href="' + original + '" target="_blank" rel="noopener">View original on blogs.bipin-sharma.com.np &rarr;</a></p>';
  };

  if (postId && /^[0-9]+$/.test(postId)) {
    const sp = document.createElement("script");
    sp.src =
      "https://blogs.bipin-sharma.com.np/feeds/posts/default/" +
      encodeURIComponent(postId) +
      "?alt=json-in-script&callback=renderPost";
    sp.onerror = function () {
      postContent.innerHTML =
        '<p class="post-date">Unavailable</p><h1>Could not load post</h1><p>Please try again later or <a href="blogs.html">browse all blogs</a>.</p>';
    };
    document.body.appendChild(sp);
  } else {
    postContent.innerHTML =
      '<p class="post-date">Not found</p><h1>Post not found</h1><p><a href="blogs.html">Back to all blogs</a>.</p>';
  }
}

// --- boot ------------------------------------------------------------------
fetch("content.json", { cache: "no-store" })
  .then(function (r) {
    if (!r.ok) throw new Error("HTTP " + r.status);
    return r.json();
  })
  .then(function (content) {
    window.SITE_CONTENT = content;
    applyContent(content);
    initBlogs(content);
    initPost(content);
  })
  .catch(function () {
    initBlogs(null);
    initPost(null);
  });

// Contact form — opens the visitor's email app with a prefilled message
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();
    const to =
      (window.SITE_CONTENT && window.SITE_CONTENT.site && window.SITE_CONTENT.site.email) ||
      "mail@bipin-sharma.com.np";

    const subject = encodeURIComponent("Website enquiry from " + name);
    const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
    window.location.href = "mailto:" + to + "?subject=" + subject + "&body=" + body;

    const status = document.getElementById("formStatus");
    if (status) status.hidden = false;
  });
}

// Download CV — fetch the PDF and open it inline in a new tab
// (the file host forces download via Content-Disposition, so we load it as a blob instead)
const cvBtn = document.querySelector("a.btn-cv");
if (cvBtn) {
  cvBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const win = window.open("", "_blank");
    fetch(cvBtn.href)
      .then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        return r.blob();
      })
      .then(function (blob) {
        const url = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
        if (win) {
          win.document.title = "Bipin Sharma — CV";
          win.document.body.style.margin = "0";
          const frame = win.document.createElement("iframe");
          frame.src = url;
          frame.style.cssText = "border:0;width:100%;height:100vh;display:block;";
          win.document.body.appendChild(frame);
        } else {
          window.open(url, "_blank");
        }
      })
      .catch(function () {
        if (win) win.location.href = cvBtn.href;
        else window.open(cvBtn.href, "_blank");
      });
  });
}
