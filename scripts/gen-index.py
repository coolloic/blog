"""Regenerate the Concepts/Sources sections of content/wiki/_index.md from page front matter."""
import re, sys, pathlib
wiki = pathlib.Path(sys.argv[1])
AREAS = [("fde","Forward deployed engineering"),("models","Models"),("prompting","Prompting"),("retrieval","Retrieval and data"),
         ("training","Training and fine-tuning"),("inference","Inference and serving"),("evaluation","Evaluation and observability"),
         ("agents","Agents"),("frameworks","Frameworks and SDKs"),("protocols","Protocols"),("security","Security and safety"),("platforms","Platforms")]
def fm(p):
    t = p.read_text()
    m = re.match(r"^---\n(.*?)\n---", t, re.S); f = m.group(1) if m else ""
    def g(k):
        mm = re.search(rf"^{k}:\s*(.*)$", f, re.M); v = mm.group(1).strip() if mm else ""
        return v.strip('"').strip("'")
    tags = re.findall(r'"([^"]+)"', g("tags")) or re.findall(r"[\w-]+", g("tags"))
    return g("title") or p.stem, g("summary"), (tags[0] if tags else "agents")
def line(rel, title, summ):
    s = summ
    return f"- [{title}]({rel}): {s}"
groups = {}
for p in sorted((wiki/"concepts").glob("*.md")):
    title, summ, area = fm(p)
    if area not in dict(AREAS): area = "agents"
    groups.setdefault(area, []).append((title.lower(), line(f"concepts/{p.name}", title, summ)))
out = ["## Concepts", ""]
for key, name in AREAS:
    if key in groups:
        out += [f"### {name}", ""] + [l for _, l in sorted(groups[key])] + [""]
srcs = sorted((fm(p)[0].lower(), line(f"sources/{p.name}", *fm(p)[:2])) for p in (wiki/"sources").glob("*.md"))
out += ["## Sources", ""] + [l for _, l in srcs]
idx = wiki/"_index.md"; t = idx.read_text()
head = t.split("## Concepts")[0]
idx.write_text(head + "\n".join(out) + "\n")
print(sum(len(v) for v in groups.values()), "concepts,", len(srcs), "sources")
