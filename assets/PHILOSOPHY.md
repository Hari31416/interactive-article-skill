# Single-Page HTML Technical Article Specification

This guide documents the design constraints, formatting expectations, and structure required when generating standalone HTML technical articles for this workspace. Use these principles to quickly create highly polished, interactive developer guides without extra layout bloat or non-functional mockups.

## 1. Architectural Philosophy & Layout

When requested to produce a single-page HTML article, the target deliverable is a **distraction-free, pure reading document**.

- **No Site Navigation Banners:** Do not wrap the article in fake blog/website headers, logo navigation bars, or top categories.
- **No Sidebars:** Avoid injecting right or left sidebars containing related links, tags, or platform ads.
- **Centered Reading Measure:** Wrap the entire content in a clean central layout container restricted to an optimal horizontal reading measure (e.g., `max-width: 760px`).
- **Minimal Header Metadata:** Begin directly with the core document `<header>` containing a single `<h1 class="article-title">`. Omit author profiles, read-time estimates, and published dates unless explicitly requested.

## 2. Typography & Styling Rules

Articles must feel premium, crisp, and beautifully typeset without looking like over-styled corporate landing pages.

### Fonts

Import premium, highly legible Google Fonts via the document `<head>`:

- **Body Text:** `Inter` (Weights: 400, 500, 600, 700)
- **Headings:** `Outfit` (Weights: 500, 600, 700, 800)
- **Code/Monospace:** `Fira Code` (Weights: 400, 500)

### Shared Centralized Stylesheet (`style.css`)

To ensure absolute design consistency and eliminate CSS duplication across files, all foundational variables, typography rules, responsive layout measures, and standard component modules (Table of Contents, callouts, code blocks) are centralized inside an external shared stylesheet. Always reference this stylesheet via the document `<head>` instead of writing full inline styles:

```html
<link rel="stylesheet" href="./style.css" />
```

Custom inline styles should only be added if an article introduces entirely novel data visualizations, custom component widgets, or bespoke interactive state elements.

### Bold Text Rendering

Ensure standard **HTML tags (`<strong>`)** are used consistently for bold inline highlights. **Never** leak literal markdown asterisks (`**bold**`) directly into the emitted HTML source paragraphs.

## 3. Research & Editorial Voice Guidelines

To maintain an accessible, highly professional engineering tone, adhere strictly to the following editorial standards when authoring article content:

- **Research-First Approach:** Always prioritize conducting targeted web research and consulting active API reference documentation prior to authoring. Ensure absolute technical validity and avoid writing code based on outdated usage patterns.
- **Straightforward & Accessible Language:** Avoid academic density, excessive jargon, or overly complicated phrasing. Use clear, pragmatic language tailored to practical engineering workflows.
- **Brevity & Sentence Structure:** Keep sentences punchy, short, and highly scannable to minimize cognitive load. Avoid long, meandering, multi-clause explanatory blocks.
- **Affirmative Framing (Avoid 'Not X but Y'):** State concepts, definitions, and design decisions affirmatively rather than using verbose negative framing. Instead of stating _"Framework X is not a complete platform but rather a targeted runtime library"_, assert directly: _"Framework X provides a specialized runtime library"_.
- **Limit Emdashes:** Minimize the use of emdashes (`—`). Break complex contextual thoughts into clean independent sentences or standard parentheses instead.
- **Visual Explanations over Text Walls:** Prioritize rich visual storytelling and exercise full creative flexibility to design premium interactive demonstrations. Whenever introducing abstract system lifecycles, internal state topologies, client-server handshake protocols, or concurrent data pipelines, leverage custom, responsive inline SVG diagrams, animated state flows, or state-of-the-art interactive widgets (such as fully functional state simulators, live code/parameter playgrounds, and interactive visual comparisons) to demonstrate concepts visually instead of relying on long blocks of descriptive text. Ensure these elements feel dynamic, visually polished, and immediately engaging to the reader.

## 4. Structural Elements & Technical Depth

Articles should target highly actionable, complete engineering guides. Ensure content covers internal primitives, comparison matrixes, edge-case mitigation, and production lifecycle considerations.

- **Headings & Hierarchy:** Use a single `<h1>` for the primary title. Map modular topics to `<h2>` sections and nested details to `<h3>`. Maintain comfortable top/bottom margins (e.g., `margin: 3rem 0 1.25rem 0` for `<h2>`).
- **Table of Contents (ToC):** Include a collapsible, hierarchical Table of Contents directly below the primary header for comprehensive articles. Use native semantic HTML (`<details>` and `<summary>`) inside `<nav class="table-of-contents">`, containing nested lists (`<ul>`) mapped to the specific `id` attributes of both primary (`<h2>`) and secondary (`<h3>`) sections to provide an immediate, expandable navigation overview.
- **Figures & Embedded Diagrams:** Ensure images have responsive widths (`width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--border-color)`). Add descriptive, centered captions using `<figcaption>` tags directly below the asset.
- **Code Containers:** Wrap `<pre><code>` blocks in dedicated `.code-container` wrappers. Include a top bar (`<div class="code-header">`) containing the context label (`<div class="code-label">`) and an active `<button class="copy-btn">Copy</button>` wired via Vanilla JavaScript to copy the block's raw code contents to the system clipboard with smooth visual confirmation feedback.
- **Callouts:** Use visually distinct, single-border highlight boxes for critical production tips or operational warnings:

  ```html
  <div class="callout">
    <p>
      <strong>Design Tip:</strong> Abstract interfaces decouple implementation
      logic from consumer layers...
    </p>
  </div>
  ```

## 5. Interactive Simulation Widgets

Articles that feature embedded JavaScript widgets must adhere to strict functional rules:

- **Zero Mock Elements:** Do not inject generic placeholder icons, non-functional progress bars, decorative avatar circles, or fake dashboard side-panels.
- **100% Active Functional Scope:** Every interface action, status badge, data visualization panel, form input, or dynamic counter must be fully interactive and wired to robust Vanilla JavaScript event logic.
- **Direct DOM Manipulation:** Keep script logic self-contained at the bottom of the document body. Build intuitive interactive logic loops (e.g., dispatching user triggers -> updating localized in-memory state objects -> applying active visual feedback loops -> updating target DOM elements directly).

## 6. Complete Article HTML Boilerplate & Shared Scripts

Use the base skeleton template attached below to establish identical structure for future topics. The template automatically references the shared `style.css` and the central `script.js` utility script (which handles global enhancements like code-block copying):

[template.html](./template.html)

Future modular or shared JavaScript utilities should also be placed alongside `script.js` to keep the article body documents lightweight, focused, and distraction-free.
