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

// Blogs — pulled automatically from blogs.bipin-sharma.com.np (Blogger JSONP feed)
const blogGrid = document.getElementById("blogGrid");
if (blogGrid) {
  window.renderBlogs = function (data) {
    const entries = (data.feed && data.feed.entry) || [];
    if (!entries.length) {
      blogGrid.innerHTML =
        '<article class="card"><p class="post-date">No posts yet</p><h3>Check back soon</h3><p>New articles will appear here automatically once published on the blog.</p></article>';
      return;
    }
    blogGrid.innerHTML = entries
      .map(function (entry) {
        const title = entry.title.$t;
        const link = entry.link.find(function (l) { return l.rel === "alternate"; }).href;
        const date = new Date(entry.published.$t).toLocaleDateString("en-US", {
          year: "numeric", month: "long", day: "numeric",
        });
        const tmp = document.createElement("div");
        tmp.innerHTML = entry.content ? entry.content.$t : "";
        const excerpt = (tmp.textContent || "").trim().slice(0, 180);
        return (
          '<article class="card">' +
          '<p class="post-date">' + date + "</p>" +
          "<h3>" + title + "</h3>" +
          "<p>" + excerpt + (excerpt.length >= 180 ? "…" : "") + "</p>" +
          '<p><a href="' + link + '" target="_blank" rel="noopener">Read more &rarr;</a></p>' +
          "</article>"
        );
      })
      .join("");
  };

  const s = document.createElement("script");
  s.src =
    "https://blogs.bipin-sharma.com.np/feeds/posts/default?alt=json-in-script&max-results=9&callback=renderBlogs";
  s.onerror = function () {
    blogGrid.innerHTML =
      '<article class="card"><p class="post-date">Unavailable</p><h3>Could not load posts</h3><p>Visit <a href="https://blogs.bipin-sharma.com.np" target="_blank" rel="noopener">blogs.bipin-sharma.com.np</a> directly.</p></article>';
  };
  document.body.appendChild(s);
}

// Contact form — opens the visitor's email app with a prefilled message
const form = document.getElementById("contactForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.elements["name"].value.trim();
    const email = form.elements["email"].value.trim();
    const message = form.elements["message"].value.trim();

    const subject = encodeURIComponent("Website enquiry from " + name);
    const body = encodeURIComponent(message + "\n\n— " + name + " (" + email + ")");
    window.location.href =
      "mailto:mail@bipin-sharma.com.np?subject=" + subject + "&body=" + body;

    const status = document.getElementById("formStatus");
    if (status) status.hidden = false;
  });
}
