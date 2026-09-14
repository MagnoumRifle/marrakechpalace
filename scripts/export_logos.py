import pdfplumber
import os

def format_num(n):
    return f"{n:.2f}".rstrip('0').rstrip('.')

def render_page_to_svg(page, transparent_bg=False):
    curves = page.objects.get('curve', [])
    rects = page.objects.get('rect', [])
    w = page.width
    h = page.height
    
    svg_elements = []
    
    if not transparent_bg:
        for r in rects:
            fill = r.get('non_stroking_color')
            if fill:
                if isinstance(fill, (list, tuple)):
                    if len(fill) == 3:
                        r_col = f"rgb({int(fill[0]*255)}, {int(fill[1]*255)}, {int(fill[2]*255)})"
                    elif len(fill) == 4:
                        c, m, y, k = fill
                        red = int(255 * (1-c) * (1-k))
                        green = int(255 * (1-m) * (1-k))
                        blue = int(255 * (1-y) * (1-k))
                        r_col = f"rgb({red}, {green}, {blue})"
                    else:
                        r_col = "#e5ddcc"
                elif fill == 0:
                    r_col = "#000000"
                elif fill == 1:
                    r_col = "#ffffff"
                else:
                    r_col = str(fill)
                svg_elements.append(f'<rect width="{w}" height="{h}" fill="{r_col}"/>')

    for c in curves:
        path_cmds = c.get('path', [])
        d_tokens = []
        for cmd in path_cmds:
            op = cmd[0]
            if op == 'm':
                pt = cmd[1]
                d_tokens.append(f"M {format_num(pt[0])} {format_num(pt[1])}")
            elif op == 'l':
                pt = cmd[1]
                d_tokens.append(f"L {format_num(pt[0])} {format_num(pt[1])}")
            elif op == 'c':
                p1, p2, p3 = cmd[1], cmd[2], cmd[3]
                d_tokens.append(f"C {format_num(p1[0])} {format_num(p1[1])}, {format_num(p2[0])} {format_num(p2[1])}, {format_num(p3[0])} {format_num(p3[1])}")
            elif op == 'h':
                d_tokens.append("Z")
        d_str = " ".join(d_tokens)
        fill = c.get('non_stroking_color')
        if fill:
            if isinstance(fill, (list, tuple)):
                if len(fill) == 3:
                    fill_col = f"rgb({int(fill[0]*255)}, {int(fill[1]*255)}, {int(fill[2]*255)})"
                elif len(fill) == 4:
                    c, m, y, k = fill
                    red = int(255 * (1-c) * (1-k))
                    green = int(255 * (1-m) * (1-k))
                    blue = int(255 * (1-y) * (1-k))
                    fill_col = f"rgb({red}, {green}, {blue})"
            elif fill == 1:
                fill_col = "#ffffff"
            elif fill == 0:
                fill_col = "#000000"
            else:
                fill_col = "#7e4e24"
        else:
            fill_col = "currentColor"
        fill_rule = "evenodd" if c.get('evenodd') else "nonzero"
        svg_elements.append(f'<path d="{d_str}" fill="{fill_col}" fill-rule="{fill_rule}"/>')
    
    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
    svg += '\n'.join(svg_elements)
    svg += '\n</svg>'
    return svg

def main():
    ai_path = r"C:\Users\zakaria\Desktop\MAGDESIGNSTUDIO\Brochure Villa Marrakesh\Logo\logo.ai"
    out_dir = "public/images/logo"
    os.makedirs(out_dir, exist_ok=True)
    
    with pdfplumber.open(ai_path) as pdf:
        for i, p in enumerate(pdf.pages):
            svg = render_page_to_svg(p)
            out_file = os.path.join(out_dir, f"artboard-{i}.svg")
            with open(out_file, "w", encoding="utf-8") as f:
                f.write(svg)
            print(f"Exported Page {i} to {out_file}")

if __name__ == "__main__":
    main()
