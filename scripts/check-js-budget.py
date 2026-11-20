"""Per-page JS budget: gzip size of local scripts each HTML page loads (search page excluded). Usage: <out> <base> <limit>"""
import gzip, os, re, sys
out, base, limit = sys.argv[1], sys.argv[2], int(sys.argv[3])
worst, bad = (0, ''), []
for root, _, files in os.walk(out):
    for f in files:
        if not f.endswith('.html'): continue
        page = os.path.join(root, f); rel = os.path.relpath(page, out)
        if rel.startswith('search' + os.sep): continue
        total = 0
        for src in set(re.findall(r'<script[^>]*src="?([^" >]+)', open(page, encoding='utf-8').read())):
            if not src.startswith(base): continue
            p = os.path.join(out, src[len(base):])
            if os.path.exists(p): total += len(gzip.compress(open(p, 'rb').read()))
        worst = max(worst, (total, rel))
        if total >= limit: bad.append(f'{rel}: {total} bytes')
print(f'largest: {worst[1]} {worst[0]} bytes gz')
for b in bad[:5]: print('over budget', b)
sys.exit(1 if bad else 0)
