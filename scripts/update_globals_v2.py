import re

with open("src/app/globals.css", "r", encoding="utf-8") as f:
    css = f.read()

# Replace brand CSS
old_brand_chunk = """
.brand{display:inline-flex;align-items:center;text-decoration:none;line-height:1}
.brand-logo{display:block;height:42px;width:auto;max-width:260px;object-fit:contain;transition:opacity .25s ease}
.brand-stacked .brand-logo{height:58px}
.brand-emblem .brand-logo{height:44px}
.brand-auto .brand-logo-light{display:none}
.brand-auto .brand-logo-dark{display:block}
.header-overlay .brand-auto .brand-logo-light{display:block}
.header-overlay .brand-auto .brand-logo-dark{display:none}
"""

new_styles = """
.brand{display:inline-flex;align-items:center;text-decoration:none;line-height:1}
.brand-logo{display:block;height:42px;width:auto;max-width:260px;object-fit:contain;transition:filter .25s ease,opacity .25s ease}
.header-overlay .brand-logo,
.footer .brand-logo,
.brand-light .brand-logo{filter:none}
.header:not(.header-overlay) .brand-logo,
.mobile-menu .brand-logo,
.brand-dark .brand-logo,
.brand-bronze .brand-logo{filter:brightness(0) invert(17%) sepia(16%) saturate(1064%) hue-rotate(345deg) brightness(96%) contrast(90%)}

.the-seasons,
.brand-name {
  font-family: 'The Seasons', var(--font-the-seasons), var(--serif);
  font-style: normal;
}
.the-seasons-italic {
  font-family: 'The Seasons', var(--font-the-seasons), var(--serif);
  font-style: italic;
}

.section-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.lifestyle-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lang-switch {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  background: rgba(48,39,31,.06);
  border: 1px solid rgba(48,39,31,.12);
  border-radius: 20px;
  padding: 3px 5px;
  color: inherit;
  transition: background .2s, border-color .2s;
}
.header-overlay .lang-switch {
  background: rgba(255,255,255,.12);
  border-color: rgba(255,255,255,.25);
  color: white;
}
.lang-btn {
  background: none;
  border: 0;
  padding: 3px 7px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: .06em;
  cursor: pointer;
  color: inherit;
  opacity: 0.65;
  transition: opacity .2s, background .2s, color .2s;
}
.lang-btn.active {
  opacity: 1;
  background: var(--ink);
  color: var(--ivory);
}
.header-overlay .lang-btn.active {
  background: var(--ivory);
  color: var(--ink);
}
.lang-sep {
  opacity: 0.35;
  font-size: 10px;
}
"""

if old_brand_chunk.strip() in css:
    css = css.replace(old_brand_chunk.strip(), new_styles.strip())
else:
    # Append new_styles at end
    css += "\n" + new_styles.strip()

with open("src/app/globals.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated globals.css with v2 styles!")
