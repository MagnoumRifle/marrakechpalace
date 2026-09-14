import pdfplumber
import os

def format_num(n):
    return f"{n:.2f}".rstrip('0').rstrip('.')

def curves_to_svg(curves, width, height, custom_fill=None, tight_bbox=False):
    if tight_bbox:
        min_x = min(c['x0'] for c in curves)
        min_y = min(c['y0'] for c in curves)
        max_x = max(c['x1'] for c in curves)
        max_y = max(c['y1'] for c in curves)
        # Add 2% padding
        pad_x = (max_x - min_x) * 0.02
        pad_y = (max_y - min_y) * 0.02
        vb_x = min_x - pad_x
        vb_y = min_y - pad_y
        vb_w = (max_x - min_x) + 2 * pad_x
        vb_h = (max_y - min_y) + 2 * pad_y
    else:
        vb_x, vb_y, vb_w, vb_h = 0, 0, width, height

    paths = []
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
        
        if custom_fill:
            fill_col = custom_fill
        else:
            fill = c.get('non_stroking_color')
            if fill:
                if isinstance(fill, (list, tuple)):
                    if len(fill) == 3:
                        fill_col = f"rgb({int(fill[0]*255)}, {int(fill[1]*255)}, {int(fill[2]*255)})"
                    elif len(fill) == 4:
                        c_k, m_k, y_k, k_k = fill
                        r = int(255 * (1-c_k) * (1-k_k))
                        g = int(255 * (1-m_k) * (1-k_k))
                        b = int(255 * (1-y_k) * (1-k_k))
                        fill_col = f"rgb({r}, {g}, {b})"
                elif fill == 1:
                    fill_col = "#ffffff"
                elif fill == 0:
                    fill_col = "#000000"
                else:
                    fill_col = "#7e4e24"
            else:
                fill_col = "currentColor"

        fill_rule = "evenodd" if c.get('evenodd') else "nonzero"
        paths.append(f'<path d="{d_str}" fill="{fill_col}" fill-rule="{fill_rule}"/>')

    svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{format_num(vb_x)} {format_num(vb_y)} {format_num(vb_w)} {format_num(vb_h)}" width="{format_num(vb_w)}" height="{format_num(vb_h)}">\n'
    svg += '\n'.join(paths)
    svg += '\n</svg>'
    return svg

def main():
    ai_path = r"C:\Users\zakaria\Desktop\MAGDESIGNSTUDIO\Brochure Villa Marrakesh\Logo\logo.ai"
    out_dir = "public/images/logo"
    os.makedirs(out_dir, exist_ok=True)
    
    with pdfplumber.open(ai_path) as pdf:
        # Page 1: Emblem (8 curves)
        p1_curves = pdf.pages[1].objects['curve']
        # Page 5: Horizontal Lockup (30 curves)
        p5_curves = pdf.pages[5].objects['curve']
        # Page 7: Stacked Lockup (30 curves)
        p7_curves = pdf.pages[7].objects['curve']

        # 1. Horizontal variants
        # White
        svg_hw = curves_to_svg(p5_curves, pdf.pages[5].width, pdf.pages[5].height, custom_fill="#ffffff", tight_bbox=True)
        with open(f"{out_dir}/logo-horizontal-white.svg", "w", encoding="utf-8") as f:
            f.write(svg_hw)
        # Bronze
        svg_hb = curves_to_svg(p5_curves, pdf.pages[5].width, pdf.pages[5].height, custom_fill="#7e4e24", tight_bbox=True)
        with open(f"{out_dir}/logo-horizontal-bronze.svg", "w", encoding="utf-8") as f:
            f.write(svg_hb)
        # Dark
        svg_hd = curves_to_svg(p5_curves, pdf.pages[5].width, pdf.pages[5].height, custom_fill="#2c241e", tight_bbox=True)
        with open(f"{out_dir}/logo-horizontal-dark.svg", "w", encoding="utf-8") as f:
            f.write(svg_hd)

        # 2. Stacked / Centered variants
        # White
        svg_sw = curves_to_svg(p7_curves, pdf.pages[7].width, pdf.pages[7].height, custom_fill="#ffffff", tight_bbox=True)
        with open(f"{out_dir}/logo-stacked-white.svg", "w", encoding="utf-8") as f:
            f.write(svg_sw)
        # Bronze
        svg_sb = curves_to_svg(p7_curves, pdf.pages[7].width, pdf.pages[7].height, custom_fill="#7e4e24", tight_bbox=True)
        with open(f"{out_dir}/logo-stacked-bronze.svg", "w", encoding="utf-8") as f:
            f.write(svg_sb)
        # Dark
        svg_sd = curves_to_svg(p7_curves, pdf.pages[7].width, pdf.pages[7].height, custom_fill="#2c241e", tight_bbox=True)
        with open(f"{out_dir}/logo-stacked-dark.svg", "w", encoding="utf-8") as f:
            f.write(svg_sd)

        # 3. Emblem variants
        # Bronze
        svg_eb = curves_to_svg(p1_curves, pdf.pages[1].width, pdf.pages[1].height, custom_fill="#7e4e24", tight_bbox=True)
        with open(f"{out_dir}/logo-emblem-bronze.svg", "w", encoding="utf-8") as f:
            f.write(svg_eb)
        # White
        svg_ew = curves_to_svg(p1_curves, pdf.pages[1].width, pdf.pages[1].height, custom_fill="#ffffff", tight_bbox=True)
        with open(f"{out_dir}/logo-emblem-white.svg", "w", encoding="utf-8") as f:
            f.write(svg_ew)
        # Gold
        svg_eg = curves_to_svg(p1_curves, pdf.pages[1].width, pdf.pages[1].height, custom_fill="#e5ddcc", tight_bbox=True)
        with open(f"{out_dir}/logo-emblem-gold.svg", "w", encoding="utf-8") as f:
            f.write(svg_eg)
        # Dark
        svg_ed = curves_to_svg(p1_curves, pdf.pages[1].width, pdf.pages[1].height, custom_fill="#2c241e", tight_bbox=True)
        with open(f"{out_dir}/logo-emblem-dark.svg", "w", encoding="utf-8") as f:
            f.write(svg_ed)

        # 4. Favicon / App Icon:
        # A circular luxury dark background with the gold emblem inside
        min_x = min(c['x0'] for c in p1_curves)
        min_y = min(c['y0'] for c in p1_curves)
        max_x = max(c['x1'] for c in p1_curves)
        max_y = max(c['y1'] for c in p1_curves)
        ew = max_x - min_x
        eh = max_y - min_y
        size = max(ew, eh) * 1.5
        cx = (min_x + max_x) / 2
        cy = (min_y + max_y) / 2
        vx = cx - size/2
        vy = cy - size/2

        favicon_svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="{format_num(vx)} {format_num(vy)} {format_num(size)} {format_num(size)}" width="128" height="128">
  <rect x="{format_num(vx)}" y="{format_num(vy)}" width="{format_num(size)}" height="{format_num(size)}" rx="{format_num(size*0.22)}" fill="#2c241e"/>
  <rect x="{format_num(vx+1)}" y="{format_num(vy+1)}" width="{format_num(size-2)}" height="{format_num(size-2)}" rx="{format_num(size*0.22)}" fill="none" stroke="#7e4e24" stroke-width="1.5" stroke-opacity="0.4"/>
'''
        for c in p1_curves:
            path_cmds = c.get('path', [])
            d_tokens = []
            for cmd in path_cmds:
                op = cmd[0]
                if op == 'm':
                    d_tokens.append(f"M {format_num(cmd[1][0])} {format_num(cmd[1][1])}")
                elif op == 'l':
                    d_tokens.append(f"L {format_num(cmd[1][0])} {format_num(cmd[1][1])}")
                elif op == 'c':
                    d_tokens.append(f"C {format_num(cmd[1][0])} {format_num(cmd[1][1])}, {format_num(cmd[2][0])} {format_num(cmd[2][1])}, {format_num(cmd[3][0])} {format_num(cmd[3][1])}")
                elif op == 'h':
                    d_tokens.append("Z")
            favicon_svg += f'  <path d="{" ".join(d_tokens)}" fill="#f5f1e8" fill-rule="{"evenodd" if c.get("evenodd") else "nonzero"}"/>\n'
        favicon_svg += '</svg>'

        with open("public/icon.svg", "w", encoding="utf-8") as f:
            f.write(favicon_svg)
        with open("src/app/icon.svg", "w", encoding="utf-8") as f:
            f.write(favicon_svg)
        
        print("Generated all SVGs, favicon icon.svg, and src/app/icon.svg successfully!")

if __name__ == "__main__":
    main()
