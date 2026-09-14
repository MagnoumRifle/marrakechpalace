import os
import pypdfium2 as pdfium

def export_pdf(pdf_path, output_dir, scale=1.6, quality=85):
    os.makedirs(output_dir, exist_ok=True)
    pdf = pdfium.PdfDocument(pdf_path)
    total = len(pdf)
    print(f"Exporting {pdf_path}: {total} pages...")
    for i in range(total):
        page = pdf[i]
        image = page.render(scale=scale).to_pil()
        out_file = os.path.join(output_dir, f"page-{i+1}.webp")
        image.save(out_file, "WEBP", quality=quality)
        print(f"  Saved {out_file} ({image.size[0]}x{image.size[1]})")
    print(f"Finished {pdf_path}")

if __name__ == "__main__":
    export_pdf("public/documents/marrakech-palace-brochure.pdf", "public/documents/brochure", scale=1.8, quality=86)
    export_pdf("public/documents/marrakech-palace-cps.pdf", "public/documents/cps", scale=1.6, quality=85)
