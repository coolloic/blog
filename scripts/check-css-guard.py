"""Progressive-enhancement guard for the built CSS: animation-timeline and opacity:0 may only appear
inside an @supports (animation-timeline...) block or @starting-style, so browsers without
scroll-driven animations never hide content. Usage: check-css-guard.py <css files...>"""
import re, sys
bad = []
for path in sys.argv[1:]:
    css = re.sub(r'/\*.*?\*/', '', open(path).read(), flags=re.S)
    stack, buf = [], ''
    def check(decl):
        decl = decl.strip().replace(' ', '')
        guarded = any(s.replace(' ', '').startswith(('@supports(animation-timeline', '@starting-style')) for s in stack)
        if decl.startswith('animation-timeline') and not guarded: bad.append(f'{path}: unguarded {decl}')
        if decl in ('opacity:0', 'opacity:0!important') and not guarded: bad.append(f'{path}: unguarded {decl} in {stack[-1] if stack else "?"}')
    for ch in css:
        if ch == '{':
            stack.append(buf.strip()); buf = ''
        elif ch in ';}':
            check(buf); buf = ''   # minified CSS drops the last ';' before '}'
            if ch == '}' and stack: stack.pop()
        else:
            buf += ch
for b in bad[:10]: print(b)
print('css guard ok' if not bad else f'{len(bad)} unguarded declarations'); sys.exit(1 if bad else 0)
