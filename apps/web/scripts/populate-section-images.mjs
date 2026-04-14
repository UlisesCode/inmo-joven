/**
 * Copies pool photos into every /images/section/* path referenced in the app.
 * Run from repo root: node apps/web/scripts/populate-section-images.mjs
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const webRoot = path.resolve(__dirname, "..");
const sectionDir = path.join(webRoot, "public/images/section");

const pools = {
  hero: path.join(sectionDir, "_pool-hero.jpg"),
  listing: path.join(sectionDir, "_pool-listing.jpg"),
  contact: path.join(sectionDir, "_pool-contact.jpg"),
};

function pickPoolJpg(name) {
  const n = name.toLowerCase();
  if (
    n.startsWith("page-title") ||
    n.startsWith("banner-") ||
    n.includes("banner-login") ||
    n.includes("banner-register")
  ) {
    return pools.hero;
  }
  if (
    n.startsWith("section-contact") ||
    n.includes("section-pre-approved") ||
    n.startsWith("location-") ||
    n.startsWith("box-help") ||
    n.includes("section-appraisal") ||
    n.includes("section-realty")
  ) {
    return pools.contact;
  }
  return pools.listing;
}

function collectReferencedBasenames() {
  const roots = [
    path.join(webRoot, "app"),
    path.join(webRoot, "components"),
    path.join(webRoot, "data"),
    path.join(webRoot, "public/scss"),
  ];
  const re = /(?:\.\.\/)?images\/section\/([a-zA-Z0-9_.-]+)/g;
  const set = new Set();
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(full);
      else if (/\.(jsx?|tsx?|scss|css)$/.test(ent.name)) {
        const txt = fs.readFileSync(full, "utf8");
        let m;
        while ((m = re.exec(txt)) !== null) set.add(m[1]);
      }
    }
  }
  for (const r of roots) walk(r);
  return [...set].filter((f) => !f.startsWith("_pool-"));
}

function main() {
  for (const p of Object.values(pools)) {
    if (!fs.existsSync(p)) {
      console.error("Missing pool file:", p);
      process.exit(1);
    }
  }
  const names = collectReferencedBasenames();
  for (const name of names) {
    const dest = path.join(sectionDir, name);
    const src = pickPoolJpg(name);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (name.endsWith(".png")) {
      execSync(`sips -s format png "${src}" --out "${dest}"`, { stdio: "inherit" });
    } else {
      fs.copyFileSync(src, dest);
    }
  }
  console.log("Section images:", names.length, "files →", sectionDir);
}

main();
