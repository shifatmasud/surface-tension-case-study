# Surface Tension — Case Study

How I built Surface Tension, a WebGL portfolio that runs smooth on a budget phone.
Scrollytelling secrets, a cursor trail, real-time water, and a measurable definition of "smooth".

Read it: https://surface-tension-case-study.pages.dev

## Build

No dependencies. Node 18+.

```
node scripts/unpack.mjs
```

Writes the site to `dist/`. Text lives in `site/`. Video, images and the font live in `media-src/` as base64 and are decoded at build.

Cloudflare Pages: build command `node scripts/unpack.mjs`, output directory `dist`.

## Credits

Design, art direction and words: Shifat Masud.
Built with Zero.
Cursor trail and scroll feel inspired by lusion.co.

To everyone in my life: you inspired this.
