"""Every internal href/src in the built site must point to a file that exists. Usage: check-links.py <outdir> <basepath>"""
import os, re, sys
from urllib.parse import urlsplit, unquote
out, base = sys.argv[1], sys.argv[2]  # base like /blog/
bad = {}
for root, _, files in os.walk(out):
    for f in files:
        if not f.endswith('.html'): continue
        page = os.path.join(root, f)
        html = open(page, encoding='utf-8', errors='ignore').read()
        for u in re.findall(r'(?:href|src|poster)=(?:"([^"]*)"|([^\s>]+))', html):
            u = u[0] or u[1]
            p = urlsplit(u)
            if p.scheme or p.netloc or not p.path.startswith(base): continue
            rel = unquote(p.path[len(base):])
            target = os.path.join(out, rel)
            if rel == '' or rel.endswith('/'): target = os.path.join(target, 'index.html')
            if not os.path.exists(target): bad.setdefault(p.path, os.path.relpath(page, out))
for k, v in list(bad.items())[:10]: print(f'broken {k} (from {v})')
print('links ok' if not bad else f'{len(bad)} broken internal links'); sys.exit(1 if bad else 0)
