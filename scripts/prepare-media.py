from pathlib import Path
from PIL import Image, ImageOps
import json, re, shutil

root = Path(__file__).resolve().parents[1]
output = root / 'public' / 'media'
output.mkdir(parents=True, exist_ok=True)
def convert(source, name, size=1920, quality=84):
    with Image.open(root/source) as img:
        img = ImageOps.exif_transpose(img).convert('RGB')
        img.thumbnail((size, size), Image.Resampling.LANCZOS)
        img.save(output/f'{name}.webp', 'WEBP', quality=quality, method=6)
        return {'src':f'/media/{name}.webp','width':img.width,'height':img.height}

entries = []
for path in sorted((root/'images').rglob('*')):
    if path.suffix.lower() not in ['.png','.jpeg','.jpg'] or 'up' in path.stem.lower(): continue
    rel=path.relative_to(root)
    category = 'plans' if '2D' in rel.parts else 'exterieurs' if 'exterior' in rel.parts else 'rdc' if 'RDC' in rel.parts else 'etage'
    name=category+'-'+re.sub(r'[^a-z0-9]+','-',path.stem.lower()).strip('-')
    info=convert(rel,name,1920,92 if category=='plans' else 84)
    entries.append({'id':name,'category':category,'original':path.name,**info})
for source,name in [('concept/references/cps-03.png','plan-domaine'),('concept/references/padel.png','padel'),('concept/references/brochure-cover.png','brochure-cover'),('concept/references/cps-cover.png','cps-cover')]:
    convert(source,name)
(root/'src/lib/media.json').write_text(json.dumps(entries,indent=2),encoding='utf-8')
docs=root/'public/documents'
docs.mkdir(parents=True,exist_ok=True)
shutil.copy2('C:/Users/zakaria/Desktop/MAGDESIGNSTUDIO/Brochure Villa Marrakesh/Brochure/Brochure Villa Marrakech R4.pdf',docs/'marrakech-palace-brochure.pdf')
shutil.copy2('C:/Users/zakaria/Desktop/MAGDESIGNSTUDIO/Brochure Villa Marrakesh/CPS/CPS VILLA OULED HASSOUN [new].pdf',docs/'marrakech-palace-cps.pdf')
shutil.copy2(root/'video/hero video.mp4',output/'hero.mp4')
print(f'Prepared {len(entries)} images, document covers, domain plan, PDF downloads and hero video.')
