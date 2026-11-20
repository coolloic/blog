"""WCAG contrast check for data/tokens.yaml: every text/background pair the theme uses must be >= 4.5:1."""
import sys, yaml
PAIRS = [('text','bg'),('muted','bg'),('text','surface'),('muted','surface'),('text','surface2'),('muted','surface2'),
         ('accent','bg'),('accent','surface'),('accent2','bg'),('accent2','surface'),('accent3','bg'),('accent3','surface'),
         ('on-accent-fill','accent-fill')]
def lum(h):
    c = [int(h.lstrip('#')[i:i+2], 16) / 255 for i in (0, 2, 4)]
    c = [x / 12.92 if x <= 0.03928 else ((x + 0.055) / 1.055) ** 2.4 for x in c]
    return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]
def ratio(a, b):
    a, b = lum(a), lum(b); return (max(a, b) + 0.05) / (min(a, b) + 0.05)
C = yaml.safe_load(open(sys.argv[1] if len(sys.argv) > 1 else 'data/tokens.yaml'))['color']
assert all(set(v) == {'light', 'dark'} for v in C.values()), 'every color needs light and dark'
fails = 0
for fg, bg in PAIRS:
    for m in ('light', 'dark'):
        r = ratio(C[fg][m], C[bg][m])
        if r < 4.5: fails += 1; print(f'FAIL {fg}/{bg} {m} {r:.2f}')
print('contrast ok' if not fails else f'{fails} contrast failures'); sys.exit(1 if fails else 0)
