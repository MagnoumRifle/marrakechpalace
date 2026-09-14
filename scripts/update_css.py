import re

font_faces = """@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons/TheSeasons-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons/TheSeasons-LightItalic.woff2') format('woff2');
  font-weight: 300;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons/TheSeasons-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons/TheSeasons-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons/TheSeasons-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'The Seasons';
  src: url('/fonts/the-seasons/TheSeasons-BoldItalic.woff2') format('woff2');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}
"""

with open("src/app/globals.css", "r", encoding="utf-8") as f:
    css = f.read()

# 1. Add font_faces at the top if not present
if "The Seasons" not in css:
    css = font_faces + "\n" + css

# 2. Update --serif
css = css.replace(
    "--serif:'Cormorant Garamond',Georgia,serif",
    "--serif:'The Seasons',var(--font-the-seasons),'Cormorant Garamond',Georgia,serif"
)

# 3. Update brand CSS definitions
brand_css = """
.brand{display:inline-flex;align-items:center;text-decoration:none;line-height:1}
.brand-logo{display:block;height:42px;width:auto;max-width:260px;object-fit:contain;transition:opacity .25s ease}
.brand-stacked .brand-logo{height:58px}
.brand-emblem .brand-logo{height:44px}
.brand-auto .brand-logo-light{display:none}
.brand-auto .brand-logo-dark{display:block}
.header-overlay .brand-auto .brand-logo-light{display:block}
.header-overlay .brand-auto .brand-logo-dark{display:none}
"""

# Replace old brand classes in line 3:
old_brand_pattern = r"\.brand\{display:flex;align-items:center;gap:12px;line-height:1\.02;font-family:var\(--serif\);font-size:20px;letter-spacing:\.025em\}\.brand>span:last-child>span\{display:block;font-size:16px;letter-spacing:\.28em;margin-top:3px\}\.brand-monogram\{font-size:37px;font-style:italic;letter-spacing:-\.16em;border:1px solid currentColor;border-radius:50%;width:38px;height:51px;padding:0 4px 7px 0;display:flex;align-items:center;justify-content:center;margin-right:4px\}"
css = re.sub(old_brand_pattern, brand_css.strip(), css)

# Clean up footer brand / header brand font-size overrides that assumed text
css = css.replace(".footer .brand{font-size:16px}.footer .brand>span:last-child>span{font-size:12px}.footer .brand-monogram{font-size:28px;width:30px;height:42px}", ".footer .brand .brand-logo{height:38px}")
css = css.replace(".header .brand{font-size:15px;gap:7px}.header .brand>span:last-child>span{font-size:11px}.brand-monogram{width:28px;height:40px;font-size:29px}", ".header .brand-logo{height:34px}")
css = css.replace(".header .brand{font-size:13px}.header .brand-monogram{width:23px;height:34px;font-size:25px}", ".header .brand-logo{height:28px}")
css = css.replace(".brand{font-size:17px}", "")
css = css.replace(".header .brand{font-size:16px}", "")

with open("src/app/globals.css", "w", encoding="utf-8") as f:
    f.write(css)

print("Updated globals.css successfully!")
