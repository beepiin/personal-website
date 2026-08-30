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
