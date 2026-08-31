import { createFileRoute, redirect } from "@tanstack/react-router";

// The website itself is plain HTML/CSS/JS — see the root index.html,
// blogs.html, contact.html, privacy-policy.html, styles.css, script.js and
// assets/ (a copy is served from public/static/ so the preview works).
// This single route exists only to send "/" to the static site.
export const Route = createFileRoute("/")({
  loader: () => {
    throw redirect({ href: "/static/index.html" });
  },
});