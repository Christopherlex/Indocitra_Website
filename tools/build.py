#!/usr/bin/env python3
"""
Indo Citra Jaya Sentosa — site build.

The 7 English pages in the repo root are the source of truth. Every translatable
element carries data-en / data-id attributes. This script:

  1. Normalises the <head> of each English page (title, description, canonical,
     hreflang, Open Graph, JSON-LD) from the META table below.
  2. Generates the Indonesian version of every page into /id/ with the Indonesian
     text written into the HTML itself (crawlers and AI bots do not run JavaScript).
  3. Regenerates sitemap.xml with hreflang alternates.
  4. Bumps the ?v= cache-buster on style.css / script.js / content-data.js.

Run after ANY change to a root .html file, style.css or the scripts:

    python3 tools/build.py

Requires: pip install beautifulsoup4
"""
import datetime
import html
import json
import re
import sys
import time
from pathlib import Path

from bs4 import BeautifulSoup

ROOT = Path(__file__).resolve().parent.parent
BASE = 'https://www.indocitratech.com'
PAGES = ['index', 'about', 'services', 'testimonial', 'news', 'catalog', 'contact']
VERSION = str(int(time.time()))
TODAY = datetime.date.today().isoformat()
BUSINESS_ID = BASE + '/#business'

META = {
    'index': {
        'en': {
            'title': 'Indo Citra Jaya Sentosa | Industrial Automation & HVAC — Pasuruan',
            'description': 'Indo Citra Jaya Sentosa provides industrial automation (PLC/SCADA) and HVAC services from Pasuruan, East Java, plus custom machinery, racking and forklift services. Trusted by 50+ companies since 2014.',
            'keywords': 'industrial automation Pasuruan, HVAC contractor East Java, PLC SCADA integrator Indonesia, chiller installation, custom machinery, racking system, Indo Citra Jaya Sentosa',
        },
        'id': {
            'title': 'Indo Citra Jaya Sentosa | Jasa Otomasi Industri & HVAC Pasuruan',
            'description': 'Indo Citra Jaya Sentosa adalah penyedia jasa otomasi industri (PLC/SCADA) dan HVAC di Pasuruan, Jawa Timur. Juga melayani mesin kustom, racking gudang, dan forklift. Dipercaya 50+ perusahaan sejak 2014.',
            'keywords': 'jasa otomasi industri Pasuruan, industrial automation Pasuruan, jasa HVAC industri Jawa Timur, instalasi PLC SCADA, vendor automation Jawa Timur, jasa chiller pabrik, Indo Citra Jaya Sentosa',
        },
    },
    'about': {
        'en': {
            'title': 'About Us | Indo Citra Jaya Sentosa — Pasuruan, East Java',
            'description': 'Established in 2014 in Pasuruan, East Java, Indo Citra Jaya Sentosa has grown from racking systems to full industrial solutions including automation, HVAC, and custom machinery.',
            'keywords': 'about Indo Citra Jaya Sentosa, industrial company Pasuruan, industrial solutions East Java',
        },
        'id': {
            'title': 'Tentang Kami | Indo Citra Jaya Sentosa — Pasuruan, Jawa Timur',
            'description': 'Berdiri sejak 2014 di Pasuruan, Jawa Timur, Indo Citra Jaya Sentosa berkembang dari sistem racking menjadi penyedia solusi industri lengkap: otomasi, HVAC, dan mesin kustom.',
            'keywords': 'tentang Indo Citra Jaya Sentosa, perusahaan industri Pasuruan, solusi industri Jawa Timur',
        },
    },
    'services': {
        'en': {
            'title': 'Industrial Automation, HVAC & Machinery Services | Indo Citra Jaya Sentosa',
            'description': 'Industrial automation (PLC/SCADA), HVAC installation and servicing, custom machinery, warehouse racking, forklifts, and industrial parts repair. Based in Pasuruan, serving all of Indonesia.',
            'keywords': 'industrial automation services, PLC programming, SCADA, HVAC installation, chiller overhaul, custom machinery, warehouse racking, forklift service, industrial parts repair',
        },
        'id': {
            'title': 'Jasa Otomasi Industri, HVAC & Mesin Kustom | Indo Citra Jaya Sentosa',
            'description': 'Jasa otomasi industri (PLC/SCADA), instalasi dan servis HVAC, pembuatan mesin kustom, racking gudang, forklift, serta perbaikan suku cadang industri. Berbasis di Pasuruan, melayani seluruh Indonesia.',
            'keywords': 'jasa otomasi industri, pemrograman PLC, SCADA, instalasi HVAC, overhaul chiller, mesin kustom, racking gudang, servis forklift, perbaikan suku cadang industri',
        },
    },
    'testimonial': {
        'en': {
            'title': 'Testimonials & Project Stories | Indo Citra Jaya Sentosa',
            'description': 'Read what clients like Autorun Inc (Korea) and PT Indolakto say about working with us, and browse recently completed projects including chiller overhauls, safety installations, and custom machinery.',
            'keywords': 'Indo Citra client testimonials, industrial project stories, automation company references Indonesia',
        },
        'id': {
            'title': 'Testimoni & Cerita Proyek | Indo Citra Jaya Sentosa',
            'description': 'Baca testimoni klien seperti Autorun Inc (Korea) dan PT Indolakto, serta proyek yang baru selesai: overhaul chiller, pemasangan perangkat keselamatan, dan mesin kustom.',
            'keywords': 'testimoni klien Indo Citra, cerita proyek industri, referensi perusahaan otomasi Indonesia',
        },
    },
    'news': {
        'en': {
            'title': 'News & Updates | Indo Citra Jaya Sentosa',
            'description': 'Company news, completed project updates, and industrial insights from Indo Citra Jaya Sentosa — covering automation, HVAC, safety systems, and machinery.',
            'keywords': 'Indo Citra news, industrial project updates, automation HVAC articles Indonesia',
        },
        'id': {
            'title': 'Berita & Update | Indo Citra Jaya Sentosa',
            'description': 'Berita perusahaan, update proyek yang selesai, dan wawasan industri dari Indo Citra Jaya Sentosa — seputar otomasi, HVAC, sistem keselamatan, dan mesin.',
            'keywords': 'berita Indo Citra, update proyek industri, artikel otomasi HVAC Indonesia',
        },
    },
    'catalog': {
        'en': {
            'title': 'Product Catalog | Industrial Equipment — Indo Citra Jaya Sentosa',
            'description': 'Browse our industrial product catalog including racking systems, PLC control panels, forklifts, chiller units, and more. Contact us to inquire about pricing and availability.',
            'keywords': 'industrial product catalog, pallet racking, PLC control panel, industrial chiller, electric forklift East Java',
        },
        'id': {
            'title': 'Katalog Produk | Peralatan Industri — Indo Citra Jaya Sentosa',
            'description': 'Lihat katalog produk industri kami: sistem racking, panel kontrol PLC, forklift, unit chiller, dan lainnya. Hubungi kami untuk harga dan ketersediaan.',
            'keywords': 'katalog produk industri, racking palet, panel kontrol PLC, chiller industri, forklift listrik Jawa Timur',
        },
    },
    'contact': {
        'en': {
            'title': 'Contact Us | Indo Citra Jaya Sentosa — Pasuruan, East Java',
            'description': 'Get in touch with our team in Pasuruan, East Java. Call or WhatsApp Fredy (+62 812-3546-4274) or Hilmy (+62 822-4522-5738), or send us a message online.',
            'keywords': 'contact Indo Citra Jaya Sentosa, industrial automation Pasuruan phone, HVAC consultation WhatsApp',
        },
        'id': {
            'title': 'Kontak | Indo Citra Jaya Sentosa — Pasuruan, Jawa Timur',
            'description': 'Hubungi tim kami di Pasuruan, Jawa Timur. Telepon atau WhatsApp Fredy (+62 812-3546-4274) atau Hilmy (+62 822-4522-5738), atau kirim pesan secara online.',
            'keywords': 'kontak Indo Citra Jaya Sentosa, telepon jasa otomasi Pasuruan, WhatsApp konsultasi HVAC',
        },
    },
}

# Strings inside JSON-LD that differ per language.
LD_ID = {
    'Home': 'Beranda', 'About Us': 'Tentang Kami', 'Services': 'Layanan', 'Testimonials': 'Testimoni',
    'News': 'Berita', 'Catalog': 'Katalog', 'Contact': 'Kontak',
    'Industrial Services': 'Layanan Industri',
    'Industrial Automation': 'Otomasi Industri', 'HVAC Systems': 'Sistem HVAC', 'Custom Machinery': 'Mesin Kustom',
    'Racking Systems': 'Sistem Racking', 'Forklift Supply': 'Penyediaan Forklift',
    'Repair Industrial Parts': 'Perbaikan Suku Cadang Industri',
    'East Java': 'Jawa Timur',
}
BUSINESS_DESC = {
    'en': 'Indo Citra Jaya Sentosa is an industrial solutions provider based in Pasuruan, East Java, Indonesia. It delivers industrial automation (PLC, SCADA, control panels), HVAC systems (chillers, AHU, FCU, ducting), custom machinery, racking systems, forklift supply and servicing, and industrial parts repair. Operating since 2014 and trusted by more than 50 companies.',
    'id': 'Indo Citra Jaya Sentosa adalah penyedia solusi industri yang berbasis di Pasuruan, Jawa Timur, Indonesia. Layanannya meliputi otomasi industri (PLC, SCADA, panel kontrol), sistem HVAC (chiller, AHU, FCU, ducting), mesin kustom, sistem racking, penyediaan dan servis forklift, serta perbaikan suku cadang industri. Beroperasi sejak 2014 dan dipercaya lebih dari 50 perusahaan.',
}
KNOWS_ABOUT = ['Industrial automation', 'PLC programming', 'SCADA systems', 'Control panel fabrication',
               'HVAC systems', 'Chiller installation and overhaul', 'Custom machinery manufacturing',
               'Warehouse racking systems', 'Forklift supply and servicing', 'Industrial parts repair']


def page_url(page, lang):
    tail = '' if page == 'index' else page + '.html'
    return f"{BASE}/{'id/' if lang == 'id' else ''}{tail}"


def esc(s):
    return html.escape(s, quote=True)


def clean(s):
    return re.sub(r'\s+', ' ', s).strip()


# ─────────────────────────────── JSON-LD ───────────────────────────────
def ld_dump(data):
    return '\n' + json.dumps(data, ensure_ascii=False, indent=2) + '\n'


def localise_urls(obj, lang):
    """Point page URLs at the right language; leave the business @id / logo alone."""
    if isinstance(obj, dict):
        return {k: (v if k in ('@id', 'logo', 'image', 'sameAs') else localise_urls(v, lang)) for k, v in obj.items()}
    if isinstance(obj, list):
        return [localise_urls(v, lang) for v in obj]
    if isinstance(obj, str):
        m = re.fullmatch(re.escape(BASE) + r'/(?:id/)?(\w+)\.html', obj)
        if m and m.group(1) in PAGES:
            return page_url(m.group(1), lang)
        if obj in (BASE + '/', BASE + '/id/'):
            return page_url('index', lang)
    return obj


def transform_ld(data, page, lang, soup):
    meta = META[page][lang]
    data = localise_urls(data, lang)
    graph = data.get('@graph', [])
    out = []
    for node in graph:
        t = node.get('@type')
        if t == 'Service':
            continue  # regenerated below from the visible section
        if t == 'BreadcrumbList':
            for item in node['itemListElement']:
                if lang == 'id':
                    item['name'] = LD_ID.get(item['name'], item['name'])
                else:
                    item['name'] = {v: k for k, v in LD_ID.items()}.get(item['name'], item['name'])
        elif t == 'LocalBusiness':
            node['description'] = BUSINESS_DESC[lang]
            node['knowsAbout'] = KNOWS_ABOUT
            node['address']['addressRegion'] = 'Jawa Timur' if lang == 'id' else 'East Java'
            cat = node.get('hasOfferCatalog')
            if cat:
                rev = {v: k for k, v in LD_ID.items()}
                table = LD_ID if lang == 'id' else rev
                cat['name'] = table.get(cat['name'], cat['name'])
                for offer in cat['itemListElement']:
                    n = offer['itemOffered']['name']
                    offer['itemOffered']['name'] = table.get(n, n)
        elif t == 'WebSite':
            node['inLanguage'] = ['en', 'id']
        elif t in ('AboutPage', 'ContactPage', 'CollectionPage', 'Blog', 'WebPage'):
            node['url'] = page_url(page, lang)
            node['name'] = meta['title']
            node['description'] = meta['description']
            node['inLanguage'] = lang
        out.append(node)

    if page == 'services':
        for art in soup.select('.svc-scope-item'):
            name = clean(art.find('h3').get_text())
            out.append({
                '@type': 'Service',
                '@id': page_url(page, lang) + '#' + art['id'],
                'name': name,
                'serviceType': name,
                'description': clean(art.find('p').get_text()),
                'provider': {'@id': BUSINESS_ID},
                'areaServed': {'@type': 'Country', 'name': 'Indonesia'},
                'url': page_url(page, lang) + '#' + art['id'],
                'inLanguage': lang,
            })
    data['@graph'] = out
    return data


def faq_ld(soup, lang):
    items = []
    for d in soup.select('details.faq-item'):
        items.append({
            '@type': 'Question',
            'name': clean(d.find('summary').get_text()),
            'acceptedAnswer': {'@type': 'Answer', 'text': clean(d.select_one('.faq-answer').get_text())},
        })
    return {'@context': 'https://schema.org', '@type': 'FAQPage', 'inLanguage': lang, 'mainEntity': items}


# ─────────────────────────────── <head> ───────────────────────────────
def set_meta(text, kind, key, content, page):
    pat = re.compile(r'(<meta ' + kind + r'="' + re.escape(key) + r'" content=")[^"]*(")')
    if not pat.search(text):
        print(f'  ! {page}: missing <meta {kind}="{key}">')
        return text
    return pat.sub(lambda m: m.group(1) + esc(content) + m.group(2), text)


def finalize(text, page, lang):
    meta = META[page][lang]
    other = 'id' if lang == 'en' else 'en'
    url = page_url(page, lang)
    soup = BeautifulSoup(text, 'html.parser')

    text = re.sub(r'<html lang="[^"]*">', f'<html lang="{lang}">', text, count=1)
    text = re.sub(r'<title>.*?</title>', '<title>' + html.escape(meta['title'], quote=False) + '</title>', text, count=1, flags=re.S)
    text = set_meta(text, 'name', 'description', meta['description'], page)
    text = set_meta(text, 'name', 'keywords', meta['keywords'], page)
    place = 'Pasuruan, Jawa Timur, Indonesia' if lang == 'id' else 'Pasuruan, East Java, Indonesia'
    text = set_meta(text, 'name', 'geo.placename', place, page)
    text = set_meta(text, 'property', 'og:url', url, page)
    text = set_meta(text, 'property', 'og:title', meta['title'], page)
    text = set_meta(text, 'property', 'og:description', meta['description'], page)
    text = set_meta(text, 'property', 'og:locale', 'id_ID' if lang == 'id' else 'en_US', page)
    text = set_meta(text, 'property', 'og:locale:alternate', 'en_US' if lang == 'id' else 'id_ID', page)
    text = set_meta(text, 'property', 'og:image:width', '400', page)
    text = set_meta(text, 'property', 'og:image:height', '400', page)
    text = set_meta(text, 'name', 'twitter:title', meta['title'], page)
    text = set_meta(text, 'name', 'twitter:description', meta['description'], page)

    # canonical + hreflang (self-referencing, reciprocal)
    text = re.sub(r'[ \t]*<link rel="alternate" hreflang="[^"]*" href="[^"]*"\s*/?>\n', '', text)
    links = (f'<link rel="canonical" href="{url}" />\n'
             f'  <link rel="alternate" hreflang="en" href="{page_url(page, "en")}" />\n'
             f'  <link rel="alternate" hreflang="id" href="{page_url(page, "id")}" />\n'
             f'  <link rel="alternate" hreflang="x-default" href="{page_url(page, "en")}" />')
    text, n = re.subn(r'<link rel="canonical" href="[^"]*"\s*/?>', links, text, count=1)
    if n != 1:
        sys.exit(f'{page}: canonical link not found')

    # cache-busting
    text = re.sub(r'((?:style\.css|script\.js|content-data\.js))(?:\?v=[\w.]+)?"', r'\1?v=' + VERSION + '"', text)

    # JSON-LD
    def ld_repl(m):
        attrs, body = m.group(1), m.group(2)
        if 'id="ld-faq"' in attrs:
            return f'<script{attrs}>' + ld_dump(faq_ld(soup, lang)) + '</script>'
        data = json.loads(body)
        return f'<script{attrs}>' + ld_dump(transform_ld(data, page, lang, soup)) + '</script>'

    text = re.sub(r'<script( type="application/ld\+json"[^>]*)>(.*?)</script>', ld_repl, text, flags=re.S)
    return text


# ─────────────────────────────── body → Indonesian ───────────────────────────────
# Done as text surgery (not a full re-serialise) so the generated file keeps the
# exact markup and formatting of the English source.
EL_RE = re.compile(r'''<(\w+)\b([^<>]*\bdata-en=(?:"[^"]*"|'[^']*')[^<>]*)>(.*?)</\1>''', re.S)
TAG_SPLIT = re.compile(r'(<[^>]+>)')


def swap_inner(inner, txt):
    """Same rule script.js uses: keep child icons, swap only the text."""
    safe = html.escape(txt, quote=False)
    if '<' not in inner:
        return safe
    parts, done = TAG_SPLIT.split(inner), False
    for i, part in enumerate(parts):
        if part.startswith('<') or not part.strip():
            continue
        lead, trail = part[:len(part) - len(part.lstrip())], part[len(part.rstrip()):]
        parts[i] = lead + ('' if done else safe) + trail
        done = True
    return ''.join(parts)


def is_local_asset(v):
    if not v or re.match(r'^(?:[a-z][a-z0-9+.-]*:|//|/|#|\.\./)', v, re.I):
        return False
    return not v.split('?')[0].split('#')[0].endswith('.html')


def to_id(text, page):
    expected = len(BeautifulSoup(text, 'html.parser').select('[data-en][data-id]'))
    count = 0

    def el_repl(m):
        nonlocal count
        tag, attrs, inner = m.group(1), m.group(2), m.group(3)
        mid = re.search(r'''\bdata-id=(?:"([^"]*)"|'([^']*)')''', attrs)
        if not mid:
            return m.group(0)
        count += 1
        idv = mid.group(1) if mid.group(1) is not None else mid.group(2)
        return f'<{tag}{attrs}>{swap_inner(inner, html.unescape(idv))}</{tag}>'

    text = EL_RE.sub(el_repl, text)
    if count != expected:
        sys.exit(f'{page}: translated {count} of {expected} elements — check the markup')

    def ph_repl(m):
        tag = m.group(0)
        idv = re.search(r'data-id-placeholder="([^"]*)"', tag).group(1)
        return re.sub(r'(?<![\w-])placeholder="[^"]*"', f'placeholder="{idv}"', tag, count=1)

    text = re.sub(r'<[^<>]*data-id-placeholder="[^"]*"[^<>]*>', ph_repl, text)

    text, n = re.subn(r'<a class="lang-toggle" id="langToggle"[^>]*>.*?</a>',
                      f'<a class="lang-toggle" id="langToggle" href="../{page}.html" hreflang="en" '
                      f'aria-label="English version">🌐 EN</a>', text, count=1, flags=re.S)
    if n != 1:
        sys.exit(f'{page}: language toggle not found')

    def asset_repl(m):
        return m.group(1) + ('../' if is_local_asset(m.group(2)) else '') + m.group(2) + m.group(3)

    return re.sub(r'(<(?:link|script|img|source)\b[^<>]*?\b(?:href|src)=")([^"]*)(")', asset_repl, text)


def check_en(text, page):
    """Warn when the visible English text drifted from data-en (crawlers only see the static text)."""
    soup = BeautifulSoup(text, 'html.parser')
    for el in soup.select('[data-en]'):
        if not el.has_attr('data-id'):
            print(f'  ! {page}: data-en without data-id: {el["data-en"][:50]!r}')
        if el.find(['i', 'svg']):
            continue
        if clean(el.get_text()) != clean(el['data-en']):
            print(f'  ! {page}: static text differs from data-en: {el["data-en"][:60]!r}')


# ─────────────────────────────── sitemap ───────────────────────────────
PRIORITY = {'index': ('1.0', 'weekly'), 'services': ('0.9', 'monthly'), 'about': ('0.8', 'monthly'),
            'contact': ('0.8', 'monthly'), 'testimonial': ('0.7', 'monthly'), 'catalog': ('0.7', 'weekly'),
            'news': ('0.7', 'weekly')}


def sitemap():
    rows = ['<?xml version="1.0" encoding="UTF-8"?>',
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
            '        xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for page in PAGES:
        prio, freq = PRIORITY[page]
        for lang in ('en', 'id'):
            rows += ['  <url>',
                     f'    <loc>{page_url(page, lang)}</loc>',
                     f'    <lastmod>{TODAY}</lastmod>',
                     f'    <changefreq>{freq}</changefreq>',
                     f'    <priority>{prio}</priority>',
                     f'    <xhtml:link rel="alternate" hreflang="en" href="{page_url(page, "en")}"/>',
                     f'    <xhtml:link rel="alternate" hreflang="id" href="{page_url(page, "id")}"/>',
                     f'    <xhtml:link rel="alternate" hreflang="x-default" href="{page_url(page, "en")}"/>',
                     '  </url>']
    rows.append('</urlset>')
    (ROOT / 'sitemap.xml').write_text('\n'.join(rows) + '\n', encoding='utf-8')


def main():
    (ROOT / 'id').mkdir(exist_ok=True)
    for page in PAGES:
        src = ROOT / f'{page}.html'
        en = finalize(src.read_text(encoding='utf-8'), page, 'en')
        check_en(en, page)
        src.write_text(en, encoding='utf-8')
        idn = finalize(to_id(en, page), page, 'id')
        (ROOT / 'id' / f'{page}.html').write_text(idn, encoding='utf-8')
        print(f'✓ {page}.html  +  id/{page}.html')
    sitemap()
    print(f'✓ sitemap.xml ({len(PAGES) * 2} URLs)   cache version {VERSION}')


if __name__ == '__main__':
    main()
