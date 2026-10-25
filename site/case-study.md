# Surface Tension

## A portfolio about diving deeper, and finding new beginnings in endings

[![The hero: a lake you can touch, a stone that floats, and a cursor that leaves a wake.](https://surface-tension-case-study.sites.tab.bot/media/loop-hero-trail-poster.jpg)](https://surface-tension-case-study.sites.tab.bot/media/loop-hero-trail.mp4)
*The hero: a lake you can touch, a stone that floats, and a cursor that leaves a wake. (video loop)*

I'm Shifat Masud, a design engineer. For years I couldn't build my own portfolio. Every time I tried, I hit the same wall: technical limits and a knowledge gap between what I could imagine and what I could ship.

> “I was never able to build my portfolio because of technical limitations and a knowledge gap, so I wanted to express my inner self in this project. I wanted people to feel me, in my way: a person who dives deeper and finds new beginnings in endings.”
> — Shifat Masud

Surface Tension is that portfolio. It's a single scrolling page rendered in WebGL. You start on the surface of a still lake, sink through a deep-sea dive where my projects live, pass through my design systems, drift through space and a night forest, and come out at a footer that loops you back to the surface. The end is the beginning again.

I built it with Zero, my AI build partner. I set the vision, the rules and the taste. Zero wrote and measured the code, release after release, and I signed off on what shipped. My goal was simple to say and hard to do: it had to look like a top studio site and run without a stutter on my own phone, a budget Samsung Galaxy M02s.

This case study is the stuff I wish someone had told me before I started. Every section ends with something you can take into your own work.

## Process: make taste measurable

Most portfolio projects die in "almost done". To avoid that, we turned taste into a scorecard. Every release was graded on five pillars: **Usability, Aesthetics, Delight, Accessibility and Performance**. The composite score is just the average of the five.

The rule was that every release had to close about **20% of the remaining gap to 100**. Not 20 points: 20% of what's left. That keeps the bar honest. Going from 49 to 59 is easy, but going from 90 to 92 is the same 20%, and it's brutally hard.

Composite score per scored release: R2 49.2 → R4 58.9 → R6.5 67.9 → R6.6 73.3 → R6.11 75.3 → R6.14 82.1 → R6.18 82.9 → R6.21 83.3 → R6.27 85.9 → R6.30 86.68 → R6.34 87.76 → R6.59 89.78 → R6.75 91.37 → R6.77 91.66.

The first scored build was 49.2. The latest is 91.66. Late releases often fell short of the 20%: R6.77 closed only 3.4% of the gap, and the score says so. That honesty is the point. A scorecard that always goes up is a mood board, not a tool.

The second tool was a **rules file**. Every time I said "never do that again", it became a written rule, and some rules became **locks**. A lock is a file or a look that no one is allowed to change without my OK: the cursor trail, the header ink, the preloader look, every piece of text and every number. When you iterate fast, locks protect the things you already love from being "improved" by accident.

> **Steal this:** Score each release on a few fixed pillars and aim to close a share of the remaining gap, not a fixed number of points. Write your "never again" moments down as rules, and lock the things you love.

## Design: one camera, and the world moves past it

The biggest design decision was about the camera. Early versions flew it around, with dollies and orbits. It looked impressive in a reel and felt like a theme-park ride when you were actually scrolling. So we wrote the rule: **one fixed, front-facing camera for the whole site**, tilted down 6°, with only about ±1.5° of pointer parallax. Scroll doesn't move the camera. It moves **the world past the lens**. No cuts, no fades.

![Under the surface (1440 px): the same front-facing camera, now in the deep.](https://surface-tension-case-study.sites.tab.bot/media/still-1440-dive2.jpg)
*Under the surface (1440 px): the same front-facing camera, now in the deep.*

![One camera, many worlds (phone, 390 px): surface, dive, systems.](https://surface-tension-case-study.sites.tab.bot/media/still-390-hero.jpg) ![One camera, many worlds (phone, 390 px): surface, dive, systems.](https://surface-tension-case-study.sites.tab.bot/media/still-390-dive2.jpg) ![One camera, many worlds (phone, 390 px): surface, dive, systems.](https://surface-tension-case-study.sites.tab.bot/media/still-390-systems.jpg)
*One camera, many worlds (phone, 390 px): surface, dive, systems.*

The type follows the same Swiss discipline. Every text block is one row: headline left, subline right, aligned to the bottom, with a 40 px gap and no background boxes. On phones it simply stacks. Inter at 400, big, quiet, everywhere.

We also cut. One release removed two whole sections and made the page **35% shorter**. Nothing made the site better faster than deleting the parts that only existed because they were easy to build.

> **Steal this:** A locked camera makes a 3D site readable. Let scroll move the world, not the viewer. And the fastest quality gain is usually a cut.

## Scrollytelling secrets

> “Scrollytelling secrets. It's valuable for anyone.”
> — Shifat Masud

If you take one thing from this case study, take this section. The difference between a premium scroll site and a janky one is almost never the 3D. It's how scroll is read, smoothed and turned into story. The feel of my scroll was inspired by lusion.co, the best scroll I've ever touched. I studied how it behaves and rebuilt that feeling from scratch for this site.

[![The dive: projects float past a fixed camera while the text rolls in, all in sync.](https://surface-tension-case-study.sites.tab.bot/media/loop-dive-poster.jpg)](https://surface-tension-case-study.sites.tab.bot/media/loop-dive.mp4)
*The dive: projects float past a fixed camera while the text rolls in, all in sync. (video loop)*

**1. One clock, one number.** Everything runs from a single animation loop in a fixed order: input, then scroll, then the sections (DOM), then audio, then the 3D scene, then post-processing. The scroll position is computed **once per frame** and every system reads that same number. DOM text and WebGL can't drift apart, because they literally move in the same frame. If your HTML and your canvas each listen to their own scroll events, they'll be a frame apart, and people feel that as "floaty".

**2. Smooth toward a target, with an exponential curve.** On desktop, the wheel doesn't move the page. It moves a target, and each frame the current position closes part of the distance: `current += (target − current) × (1 − e^(−k·dt))`. Because it uses real frame time, it feels the same at 60 Hz and 120 Hz. A `k` around 10 to 14 feels expensive; much lower feels drunk, much higher feels like no smoothing at all. Clamp each wheel event too (we use ±200 px), so one violent trackpad flick can't throw you three chapters down.

**3. Fingers are 1:1, flings decay with friction.** While a finger is down, the page follows it exactly, and the axis is decided on the first move. On release, the speed is a time-weighted average of the last 0.1 s of movement, with newer samples counting more. Then that speed decays with a friction that eases off slightly as it slows. That's what makes a fling land softly instead of stopping dead.

**4. On phones, let the browser scroll.** This one surprised me. On touch devices we turned our own scroll engine off and let the browser's compositor scroll the page. That scroll keeps running even when the main thread is busy, and the iOS address bar collapses like people expect. We just read the position once per frame. Anchors and the header's jump buttons still glide, and any touch takes over instantly.

[![Systems: a chapter pinned with sticky positioning while its progress drives the 3D.](https://surface-tension-case-study.sites.tab.bot/media/loop-systems-poster.jpg)](https://surface-tension-case-study.sites.tab.bot/media/loop-systems.mp4)
*Systems: a chapter pinned with sticky positioning while its progress drives the 3D. (video loop)*

**5. Give every chapter its own 0→1.** Each section measures its position only on resize, never during scroll (that's how you avoid layout thrash). Then every frame it gets a progress from 0 to 1 and a ratio from −1 (entering) to +1 (leaving). The 3D scene, the text rolls and the sound all key off those numbers. Sections pin with `position: sticky`, so focus, find-in-page and screen readers keep working.

**6. Feed one "how hard am I scrolling" signal.** We smooth the scroll speed into a 0→1 strength value. Bends, ripples and the audio mix all listen to it, so the world reacts to how you scroll, not just where you are.

[![Space to the night forest: the camera never moves; the world does.](https://surface-tension-case-study.sites.tab.bot/media/loop-journey-poster.jpg)](https://surface-tension-case-study.sites.tab.bot/media/loop-journey.mp4)
*Space to the night forest: the camera never moves; the world does. (video loop)*

**7. Make the ending a beginning.** Past the footer, the page wraps back to the hero. The first version was a 3-second glide to the top, and any leftover trackpad inertia cancelled it halfway, dropping you in the middle of space. The fix: one instant jump, the outgoing frame frozen and dissolved over the hero, and the leftover inertia ignored for a moment (up to 1.8 s while it's still streaming). A fresh, deliberate flick is accepted immediately. That loop is the whole idea of the site: dive deep, and come back up to a new beginning.

![“Out of the screen”: the journey chapter at 1440 px.](https://surface-tension-case-study.sites.tab.bot/media/still-1440-meadow.jpg)
*“Out of the screen”: the journey chapter at 1440 px.*

![Chapters on a phone: space, the night forest, the call to action.](https://surface-tension-case-study.sites.tab.bot/media/still-390-space.jpg) ![Chapters on a phone: space, the night forest, the call to action.](https://surface-tension-case-study.sites.tab.bot/media/still-390-journey.jpg) ![Chapters on a phone: space, the night forest, the call to action.](https://surface-tension-case-study.sites.tab.bot/media/still-390-cta.jpg)
*Chapters on a phone: space, the night forest, the call to action.*

> **Steal this:** Read scroll once per frame and let everything use that one value. Smooth with frame-rate-independent exponential easing. Give each chapter a 0→1 progress measured on resize. On phones, trust native scrolling.

## Animation: the preloader is a work budget

[![Preloader to curtain: the counter rolls while the GPU does its warm-up behind it.](https://surface-tension-case-study.sites.tab.bot/media/loop-preloader-curtain-poster.jpg)](https://surface-tension-case-study.sites.tab.bot/media/loop-preloader-curtain.mp4)
*Preloader to curtain: the counter rolls while the GPU does its warm-up behind it. (video loop)*

Most preloaders are decoration. Mine is a **work budget**. The odometer counts only what the first screen needs: the code for the shell and the hero (weighted by bytes), the font, and the hero's GPU warm-up. Shaders compile in parallel where the browser supports it (`KHR_parallel_shader_compile`), so the counter keeps rolling instead of freezing while a shader links.

Then, behind the curtain, we also warm up the later chapters in small slices: build their geometry step by step, compile every shader against the exact lights and fog it will be drawn with (so nothing compiles again on first view), upload textures, allocate render targets. Nothing is drawn, so the picture doesn't change. You just never pay for it on the way down the page. The preloader is allowed to hold a bit longer to make this happen, up to a 12-second cap.

> **Steal this:** Shader compiles are the classic first-scroll hitch. Hide them behind your preloader, compile against the real scene so they don't compile again, and spread the work across frames so the counter never freezes.

## The cursor trail

The trail is my favorite detail and the one I fought hardest for. It's inspired by lusion.co, and I wanted the same feel: a trail that behaves like ink in water, not a sparkle following the mouse.

The idea is simple. The pointer doesn't draw a line. It paints **velocity** into a small texture, and that texture keeps moving and fading by itself:

- two channels store the direction and speed of movement, fading slowly;
- one channel is the long tail, fading at a medium rate;
- one channel is the short, bright head, fading fast.

The texture runs at a quarter of the screen size, with a blurred, even smaller copy that acts as a "push" field. Every frame it reads its previous state, adds the new stroke, and blurs. Then a post-processing pass uses it to displace and tint the image. Because the work happens on tiny textures, it's cheap enough for a phone.

The hard part was **parity**: matching the feel, not just the look. The test browser rendered that kind of site at less than one frame per second, so we slowed the page's clocks down 50 times and captured the trail frame by frame: slow strokes, fast flicks, circles and holds, side by side with the reference. That's how we tuned head length, tail length and fade until they matched. Then the trail got a lock.

![A fast stroke across the hero: the wake keeps moving after the cursor has gone.](https://surface-tension-case-study.sites.tab.bot/media/still-1440-trail.jpg)
*A fast stroke across the hero: the wake keeps moving after the cursor has gone.*

![Frame-by-frame trail captures (a fast flick, time slowed 50×), used to tune the fade rates.](https://surface-tension-case-study.sites.tab.bot/media/moment-trail-strip.jpg)
*Frame-by-frame trail captures (a fast flick, time slowed 50×), used to tune the fade rates.*

> **Steal this:** Paint velocity, not pixels, into a low-res texture with separate fade rates for the head and the tail. To tune motion, slow time down and compare frame by frame.

## The water

![The lake before and after the water work (phone).](https://surface-tension-case-study.sites.tab.bot/media/moment-water-before.jpg) ![The lake before and after the water work (phone).](https://surface-tension-case-study.sites.tab.bot/media/moment-water-after.jpg)
*The lake before and after the water work (phone).*

The lake is a real wave simulation on the GPU: a height field where your cursor or finger paints a small capsule-shaped push every tick. Three details made it feel right and stay fast:

- **Same waves on every device.** Desktop runs a 512² grid, phones 256². To make a ripple look and travel the same on both, the wave constant scales with the cell size. A phone gets a quarter of the work and the same ring.
- **Fixed 60 Hz ticks.** The sim steps at a fixed rate (with at most 3 catch-up steps per frame), so it behaves the same at any frame rate. It sleeps when the lake isn't on screen, and clears itself 8 seconds after the last touch.
- **Caustics are light, not texture.** Underwater, light lines come from how the wave surface bends sunlight: where the light folds together, it gets brighter. The shader computes that, adds it as glowing light (it never darkens), and splits it slightly per color channel for a fringe. Phones get a pre-baked tileable version of the same pattern: two texture reads, same look.

For phones, I also approved lower-resolution water and reflections. But I kept the sky exactly as it was. Some things you trade for speed; some things are the identity of the piece. Knowing which is which is a design decision, not an engineering one.

> **Steal this:** Scale simulation constants with resolution so the low tier looks the same, just cheaper. Step physics on a fixed clock. Decide as a designer which pixels are sacred and which can be cheaper on a phone.

## The hardest part: zero freezes on my own budget phone

People who know this project know the answer to "what was hardest". I built it to run smooth on my own **Samsung Galaxy M02s**, the budget phone I use every day: a Snapdragon 450, an Adreno 506 GPU and 3 GB of RAM. If it stutters in my hand, it isn't done.

The moment it turned around was when I stopped saying "make it faster" and wrote down what success means: **0 freezes and 0 frame drops**. In numbers: no task longer than 50 ms after the counter starts, and no frame longer than 33 ms through the preloader, a full scroll and a hard fling. You can't argue with that. Either the trace is clean or it isn't.

What got us there, release by release:

- **Resolution ladders.** The renderer adapts its pixel density, with a shared floor of 0.6 and phones capped at 1×. Text never drops below 1.5× density, so it stays sharp while the 3D gets cheaper.
- **A governor that measures the GPU.** At 60 Hz, a 6 ms frame and a 15 ms frame both look like 16.7 ms. Where the browser allows, we time the GPU's actual work and only raise quality when the measurement says the next step fits.
- **Spreading GPU work over frames.** A trace showed that most of the remaining startup freezes weren't JavaScript at all. They were the GPU being handed too much work at once. So the warm-up now has a budget per frame: how many new shaders, how many first-time render targets, and the reflection maps built one pass per frame. The longest startup freeze went from about 1.0 s to about 0.65 s on the test rig.

![On a phone: the counter keeps rolling while the GPU warms up, then the journey runs clean.](https://surface-tension-case-study.sites.tab.bot/media/still-390-preloader.jpg) ![On a phone: the counter keeps rolling while the GPU warms up, then the journey runs clean.](https://surface-tension-case-study.sites.tab.bot/media/still-390-meadow.jpg)
*On a phone: the counter keeps rolling while the GPU warms up, then the journey runs clean.*

Between my own checks on the phone, Zero used a stand-in: a phone-sized browser with the CPU slowed 6×, so every release could be measured the same way. On that rig scrolling is clean: 0 frames over 33 ms. About 52 startup tasks are still over 50 ms there, so "zero freeze" isn't finished, and much of what's left is the rig's software graphics, not a real GPU. That's why the rig is only a stand-in. The real judge is my M02s, in my hand, every time.

### Debugging on the devices that matter

The rig can't see a real GPU. So when the site failed on my PC, we stopped guessing and opened `chrome://gpu`: Edge 155 on Windows 10, an Intel UHD 600, 2 cores, 3 GB of RAM. It showed Chrome had switched WebGL off for the whole browser after repeated GPU resets. The ray-traced stone was more than that chip could hold.

My phone's report told the other half: an Adreno 506 with no parallel shader compile, so every new shader blocks the frame.

Those two pages became the spec. Weak GPUs now get a light path with the same layout and the same story, just cheaper light.

> **Steal this:** A guess about the cause always feels right (confirmation bias). A device report is evidence. Ask for `chrome://gpu` before you touch code.

> **Steal this:** Turn "feels smooth" into numbers you can trace: no task over 50 ms, no frame over 33 ms, on a real low-end phone you actually own. Then measure before you fix: our biggest freezes were GPU work, not code. Use a rig between checks, but let the real device have the last word.

## Sharp where the eye goes

The brief: “AAA, but fast on phone”. The judge: my Galaxy M02s. The bar: zero freezes, zero frame drops.

First try: brute force. Render the whole frame sharper, with more pixels, anti-aliasing and a sharpen pass. Everything got crisper, and heavier. My phone was paying for pixels nobody looks at, so I dropped the whole package.

Then I thought about how an eye, or a camera, sees: never everything in focus. So we split the frame in two.

- **The world renders soft.** About half resolution on phones (0.5–0.75×). Dreamy, like depth of field.
- **Heroes render sharp.** The stone, the crewmate, the tablet, every sticker, and my project images and videos get their own pass: 1.0× on phones, still twice as sharp as the world.
- **Type gets its own density.** The big GPU text renders at 1.5×, because letters show softness first. The cursor trail runs at 1.0×.
- **The governor only touches the world.** When the phone needs room, the background softens. Heroes never do.

![Before: the crewmate at one resolution for everything](https://surface-tension-case-study.sites.tab.bot/media/split-crew-before.jpg)
![After: a sharp crewmate on a soft sky](https://surface-tension-case-study.sites.tab.bot/media/split-crew-after.jpg)
*The crewmate, zoomed 3×. Before: one resolution for everything. After: a sharp hero on a soft sky.*

Making it real: the sharp stone first ignored depth and looked pasted on. Wired to the live scene, parts and particles now pass in front of it, so the stone sits inside the atom. Dissolves are GPU particles, one draw each, capped per phone. And the dive into the tablet’s sky is one camera move through the glass. No cut.

Sound got the same care: a limiter gives the mix headroom so nothing clips, and on phones the glass shatter drops the deep bass and harsh highs tiny speakers distort.

The trade-off: heroes lose some glow on a budget phone. Worth it. My idea, built with Zero.

> **Steal this:** Don’t pay for sharpness everywhere. Find where the eye lands, spend your pixels there, and let the rest go soft. Blur is a design choice, and it’s cheap.

## Key moments

**Release 3 — The card that blacked out the screen.** Closing a project card left the whole canvas black. The fix was small (a stalled video swapped for its poster, restored on close). The real win was a new end-to-end test: open a card, press Esc, scroll to the CTA, assert the screen isn’t black. Every bug became a test.

**Release 4 — The cut.** Two sections out, the page 35% shorter. The score jumped from 49.2 to 58.9, more than any visual effect gave us that day.

**R6 → R6.1 — The stone gets its material.** The floating stone went from a dark, muddy gem to clear, glowing blue glass. Same model, new light and material.

![The stone gets its material](https://surface-tension-case-study.sites.tab.bot/media/moment-stone.jpg)

**R6.47 — Trail parity, then a lock.** After frame-by-frame comparisons, the cursor trail matched the feel I wanted. From then on, its files were locked: no one could touch them without my OK.

![Trail parity, then a lock](https://surface-tension-case-study.sites.tab.bot/media/moment-trail-strip.jpg)

**R6.60 — “Riptide”: a golden build.** We froze a known-good release as a named baseline with its own branch. After that, a change had to be pixel-identical unless I said go, and there was always a build to roll back to.

**R6.62 – R6.64 — My own design calls.** An iPad Pro as a live 3D window in the journey, and a footer drawn inside the WebGL frame with a lime glowing overscroll bar. Each one shipped only after I said go on a mock.

![My own design calls](https://surface-tension-case-study.sites.tab.bot/media/moment-footer.jpg)

**R6.71 — The void.** A performance change made later chapters mount too late: scroll fast and you hit a white void where the dive should be. The automated key-frame check caught it before it shipped, and R6.73 fixed it properly.

![The void](https://surface-tension-case-study.sites.tab.bot/media/moment-void.jpg)

**R6.76 – R6.77 — Startup freezes cut.** A trace showed most startup freezes were the GPU being fed too much at once. Budgeting shaders, render targets and reflection maps per frame cut the longest freeze from ~1.0 s to ~0.65 s on the test rig.

## UI design: big text stays GPU text

[![The call to action: the words roll inside their mask, in the same frame as the 3D behind them.](https://surface-tension-case-study.sites.tab.bot/media/loop-cta-roll-poster.jpg)](https://surface-tension-case-study.sites.tab.bot/media/loop-cta-roll.mp4)
*The call to action: the words roll inside their mask, in the same frame as the 3D behind them. (video loop)*

The big type is rendered on the GPU, inside the same frame as the scene. At one point we tested moving it to regular HTML text for crispness. We built three versions, A, B and C. I looked at them and said no: "It looks bad. Not worth it." On the GPU, the letters can roll, bend and catch the water's light in sync with the scene. As HTML, they sat on top of the world instead of inside it.

The rest of the UI follows the same idea: the header ink, the rolling masked text, a cursor ring with a label (I removed the dot, it was noise), and a footer drawn inside the WebGL frame with a glowing lime overscroll bar that tells you the loop is coming.

![A project card opened over the dive (1440 px).](https://surface-tension-case-study.sites.tab.bot/media/moment-card-open.jpg)
*A project card opened over the dive (1440 px).*

> **Steal this:** If text has to move with the world, keep it in the world. Test the "safe" alternative anyway, and let your eye make the call, not the spec.

## Technologies & tools

**3D and rendering:** Three.js (r170), React Three Fiber, postprocessing, custom GLSL shaders (water, caustics, trail, god rays, footer).
**App:** React 18, TypeScript, Vite, GSAP (its ticker drives the one clock), Zustand.
**Testing:** Playwright with a remote browser for key frames, a low-end phone profile (360×800 at 2× density, CPU slowed 6×) for freeze and frame-drop replays, Chrome performance traces, axe for accessibility (0 violations at 390 and 1440 px), Lighthouse.
**Shipping:** Vercel, with a rollback build saved for every release.
**Build partner:** Zero, who wrote, measured and shipped every release with me.

One note on Lighthouse: under its test conditions the site shows a lighter, no-WebGL fallback, so its score says nothing about the 3D on a phone. We never used it as proof of phone speed. Know what your tools are actually measuring.

## How we work together

This chapter is written during R7.10, the release I'm in the middle of. The goal: zero pixelation on my two devices, at no extra cost. Here is how Zero, my AI assistant, and I actually run it. It's the method I'd use on any project now.

**The loop:** 1 Benchmark (riptide v2, the one restore point) → 2 One scene (one preview build at a time) → 3 Gates (locked diff 0 · cost ≤ 1.00×) → 4 Eyes (my phone + clean reviewer) → 5 Preview (checksums match) → 6 Next scene, or "ship" from me. A bug found at step 4 goes straight back into step 2.

1. **One benchmark, one restore point.** The version that's live, riptide v2, is the reference for every comparison and the only copy we keep. Everything else lives in git. Work happens in one preview build, improved in place.
2. **Hard locks.** A fixed list of files has to stay byte-identical to the benchmark: footer and CTA, the gift, the preloader, the cursor trail, viewport and scroll, styles. A build only moves on if the locked-file diff is 0. Only I lift a lock, one element at a time.
3. **Same cost, more quality.** A build can't publish if it's heavier than the benchmark on my two real devices: my Galaxy M02s and my PC with an Intel UHD 600. Any headroom goes into sharpness. Speed is reported against the benchmark (0.95×, 1.00×) and marked simulated until it's measured on the real hardware.
4. **Scene by scene.** Each preview release fixes one scene completely on both devices: the hero lake, then the footer asteroids, then the dive, then the rest. One scene at a time makes every bug easy to place.
5. **Real eyes, then clean eyes.** My phone catches what emulators miss. After every build, a fresh reviewer that isn't told what changed captures the scene frame by frame next to the benchmark and returns a ranked bug list.
6. **Many hands, one publisher.** A Builder, a Patcher that hands over patches, and the reviewer work at the same time. Only the builder can publish.
7. **Truth rules.** No speed claim until both devices are measured. "Live" only after the checksums match on every URL. Every claim is checked before it reaches me, and a mistake is corrected the moment it's found.
8. **A steady rhythm.** A short update every 10 minutes. I steer in a few words. A decision is written down once, then followed.

### What my phone caught

In build 5, my phone showed the stone sliced flat where it meets the lake. The test browser had missed it. A new lake layer never got told its screen size, so its underside covered the stone's lower half. Zero reproduced my screenshot, found the cause and fixed it in the next build. The clean reviewer, told nothing, found the same cut on its own.

![My Galaxy M02s on build 5: the stone is sliced flat at the lake surface.](https://surface-tension-case-study.sites.tab.bot/media/how-phone-real.jpg)
![The benchmark, riptide v2, at the same frame.](https://surface-tension-case-study.sites.tab.bot/media/how-bench-ref.jpg)
![The clean reviewer's capture of build 5: the same cut, found on its own.](https://surface-tension-case-study.sites.tab.bot/media/how-review-b5.jpg)
*Build 5, same frame. Left: my Galaxy M02s. Middle: the benchmark, riptide v2. Right: the clean reviewer's capture, made without being told what to look for. Fixed in build 6.*

**Who does what:** Me: steer, real devices, unlock, ship. Zero: runs the work, checks every claim. Under Zero: the Builder (the only one who publishes), the Patcher (hands patches to the Builder) and the Reviewer (never told what changed).

### How a lock gets lifted

![My phone screenshot of the footer: the asteroids look blocky.](https://surface-tension-case-study.sites.tab.bot/media/how-asteroids-real.jpg)

> **Shifat:** Pixelated, looks cheap
>
> **Zero:** Agreed, the asteroids are blocky. That's the footer, which you hard-locked. Unlock just the asteroids so I can make them sharp at the same speed? Footer timing and motion stay exactly as they are. Yes/No
>
> **Shifat:** Unlock

*One element unlocked. Everything else in the footer stays exactly riptide v2.*

> **The mind:** The curse of knowledge: once you know what changed, you can't look at it fresh. You check the thing you fixed and your eye slides past the rest. A reviewer who doesn't know the story looks at every pixel.

> **Steal this:** Keep one benchmark and measure every build against it. Lock what you love. Gate every build on "no heavier, no locked file touched". Then give a reviewer the screenshots, not the story.

## What I'd tell you to steal

1. **Scroll is the story.** One clock, one scroll value per frame, exponential easing, a 0→1 progress per chapter, and native scrolling on phones.
2. **Define the feel as numbers.** "0 freezes, 0 drops" on your own budget phone beats "make it smooth" every time, and it tells you when you're done.
3. **Make taste measurable, and protect what you love.** A five-pillar scorecard, a 20%-of-the-gap target, a rules file, and locks.

## Credits

**Design & development:** Shifat Masud, built with Zero.
**Inspiration:** lusion.co, for the cursor trail and the scroll feel.

To everyone in my life: you inspired this.

Visit the live site: https://shifatmasud.vercel.app/

---
Read it with all media: https://surface-tension-case-study.sites.tab.bot/
