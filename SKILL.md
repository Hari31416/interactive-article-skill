---
name: interactive-article-skill
description: Create polished, single-page technical HTML articles that teach topics through fully functional interactive web components. Use this whenever the user asks for an HTML technical guide, explainer, tutorial, article, visual walkthrough, interactive documentation page, or any request to explain engineering topics via an interactive webpage. Apply this skill even if the user does not explicitly mention "HTML skill" but asks for a standalone educational web page.
---

# HTML Interactive Article Skill

## Goal
Produce a premium, distraction-free, single-page HTML article that explains technical topics with concise prose, strong structure, and real interactive learning elements.

## Bundled Resources
Before generating output, familiarize yourself with these bundled files in `./assets/`:
- `./assets/template.html` (base page structure boilerplate)
- `./assets/style.css` (centralized layout, typography system, and component styles)
- `./assets/script.js` (global enhancements like copy-button behavior for code blocks)

## Fast Bootstrap (Recommended)
Use this script to copy the base article files into a working directory:

```bash
python <skill-path>/scripts/bootstrap_article_files.py <target-dir> --article-file <topic>.html
```

Example:

```bash
python ./interactive-article-skill/scripts/bootstrap_article_files.py . --article-file kafka-rebalance.html
```

This copies:
- `style.css`
- `script.js`
- `template.html` -> `<topic>.html` (or `template.html` if `--article-file` is omitted)

> Note: Since there are more than one file getting copied, try to copy teh files inside a new directory to avoid confusion. For example, you can create a new directory called `kafka-rebalance-article` and copy the files there.

## Creating a Standalone Single-File HTML

If the user specifically asks to convert the article to a standalone HTML file with all styles and scripts embedded inline, use this script after generating the article HTML.

```bash
python <skill-path>/scripts/merge_standalone_html.py <input-html> --output <output-html>
```

Example:

```bash
python ./interactive-article-skill/scripts/merge_standalone_html.py kafka-rebalance.html --output standalone-kafka-rebalance.html
```

This will parse the input HTML, locate any referenced local stylesheets and scripts (like `./style.css` and `./script.js`), read their contents, and inline them into `<style>` and `<script>` blocks within the HTML output.

## Trigger Guidance
Use this skill when the user asks for:
- A technical article, guide, or tutorial as HTML
- A topic explained through interactive web UI
- A visual or simulation-based explanation of system behavior
- A polished standalone documentation page (not a full site)
- Developer education content with runnable UI interactions

## Article Specification & Design Philosophy

When requested to produce a single-page HTML article, the target deliverable is a **distraction-free, pure reading document** that feels premium, crisp, and beautifully typeset.

### 1. Architectural Philosophy & Layout
- **No Site Navigation Banners:** Do not wrap the article in fake blog/website headers, logo navigation bars, or top categories.
- **No Sidebars:** Avoid injecting right or left sidebars containing related links, tags, or platform ads.
- **Centered Reading Measure:** Wrap the entire content in a clean central layout container restricted to an optimal horizontal reading measure (e.g., `max-width: 760px`).
- **Minimal Header Metadata:** Begin directly with the core document `<header>` containing a single `<h1 class="article-title">`. Omit author profiles, read-time estimates, and published dates unless explicitly requested.

### 2. Typography & Styling Rules
- **Fonts:** Premium Google Fonts are imported via document `<head>`:
  - **Body Text:** `Inter` (Weights: 400, 500, 600, 700)
  - **Headings:** `Outfit` (Weights: 500, 600, 700, 800)
  - **Code/Monospace:** `Fira Code` (Weights: 400, 500)
- **Shared Centralized Stylesheet (`style.css`):** To ensure absolute design consistency and eliminate CSS duplication across files, all foundational variables, typography rules, responsive layout measures, and standard component modules (Table of Contents, callouts, code blocks) are centralized inside `./style.css`. Always reference this external stylesheet via `<link rel="stylesheet" href="./style.css" />` instead of writing full inline styles or duplicating base styles inline. Custom inline styles should only be added if an article introduces entirely novel data visualizations, custom component widgets, or bespoke interactive state elements.
- **Bold Text Rendering:** Ensure standard **HTML tags (`<strong>`)** are used consistently for bold inline highlights. **Never** leak literal markdown asterisks (`**bold**`) directly into the emitted HTML source paragraphs.

### 3. Research & Editorial Voice Guidelines
To maintain an accessible, highly professional engineering tone, adhere strictly to the following editorial standards:
- **Research-First Approach:** Always prioritize conducting targeted web research and consulting active API reference documentation prior to authoring. Ensure absolute technical validity and avoid writing code based on outdated usage patterns.
  - In case the user wants to generate an article based on a codebase, make sure to ask for the codebase and read it before writing the article.
  - Otherwise, if the user wants to generate an article based on a topic, make sure to do web research to make sure you have the most up-to-date information on the topic before writing the article.
- **Straightforward & Accessible Language:** Avoid academic density, excessive jargon, or overly complicated phrasing. Use clear, pragmatic language tailored to practical engineering workflows. Keep language clear, practical, and concise.
- **Brevity & Sentence Structure:** Keep sentences punchy, short, and highly scannable to minimize cognitive load. Avoid long, meandering, multi-clause explanatory blocks.
- **Affirmative Framing (Avoid 'Not X but Y'):** State concepts, definitions, and design decisions affirmatively rather than using verbose negative framing. Instead of stating *"Framework X is not a complete platform but rather a targeted runtime library"*, assert directly: *"Framework X provides a specialized runtime library"*.
- **Limit Emdashes:** Minimize the use of emdashes (`—`). Break complex contextual thoughts into clean independent sentences or standard parentheses instead.
- **Visual Explanations over Text Walls:** Prioritize rich visual storytelling and exercise full creative flexibility to design premium interactive demonstrations. Whenever introducing abstract system lifecycles, internal state topologies, client-server handshake protocols, or concurrent data pipelines, leverage custom, responsive inline SVG diagrams, animated state flows, or state-of-the-art interactive widgets (such as fully functional state simulators, live code/parameter playgrounds, and interactive visual comparisons) to demonstrate concepts visually instead of relying on long blocks of descriptive text. Ensure these elements feel dynamic, visually polished, and immediately engaging to the reader.
- **Diagrams Must have Captions:** Every diagram, figure, or visual asset must include a descriptive caption directly below it using the `<figcaption>` tag to provide context and explanation.

### 4. Structural Elements & Technical Depth
Articles should target highly actionable, complete engineering guides covering internal primitives, comparison matrixes, edge-case mitigation, and production lifecycle considerations.
- **Headings & Hierarchy:** Use a single `<h1>` for the primary title. Map modular topics to `<h2>` sections and nested details to `<h3>`. Maintain comfortable top/bottom margins (e.g., `margin: 3rem 0 1.25rem 0` for `<h2>`). Use clear heading hierarchy with mapped anchor IDs (`h2`/`h3`).
- **Table of Contents (ToC):** Include a collapsible, hierarchical Table of Contents directly below the primary header for comprehensive articles. Use native semantic HTML (`<details>` and `<summary>`) inside `<nav class="table-of-contents">`, containing nested lists (`<ul>`) mapped to the specific `id` attributes of both primary (`<h2>`) and secondary (`<h3>`) sections to provide an immediate, expandable navigation overview.
- **Figures & Embedded Diagrams:** Ensure images have responsive widths (`width: 100%; height: auto; border-radius: 8px; border: 1px solid var(--border-color)`). Add descriptive, centered captions using `<figcaption>` tags directly below the asset.
- **Code Containers:** Wrap `<pre><code>` blocks in dedicated `.code-container` wrappers. Include a top bar (`<div class="code-header">`) containing the context label (`<div class="code-label">`) and an active `<button class="copy-btn">Copy</button>` wired via Vanilla JavaScript to copy the block's raw code contents to the system clipboard with smooth visual confirmation feedback.
- **Callouts:** Use visually distinct, single-border highlight boxes for critical production tips or operational warnings:
  ```html
  <div class="callout">
    <p>
      <strong>Design Tip:</strong> Abstract interfaces decouple implementation logic from consumer layers...
    </p>
  </div>
  ```

## Required Output Contract & Hard Constraints
Always deliver a single-page HTML document that adheres to these absolute constraints:
1. Uses the `template.html` structure as the baseline.
2. References shared assets via external links:
   - `<link rel="stylesheet" href="./style.css" />`
   - `<script src="./script.js"></script>`
3. Keeps a centered reading layout and avoids fake product chrome (no site navigation banners, sidebars, ads, branding strips, or dashboard filler).
4. Includes exactly one primary title `<h1 class="article-title">` inside the document `<header>`.
5. Includes a collapsible table of contents using semantic `<details>` + nested lists mapping heading anchor IDs.
6. Uses `.code-container` blocks with `.code-header`, `.code-label`, and `.copy-btn`.
7. Uses `<strong>` tags for bold emphasis (never markdown `**bold**` in HTML text).
8. **Zero Mock Elements:** No decorative placeholders, dummy controls, or non-functional "mock" widgets. Every UI control across all interactive widgets must be fully wired and functional end-to-end.
9. Do not duplicate base typography/layout styles inline when `style.css` already defines them. If extra JavaScript or styling is needed for custom interactive elements, add it to the corresponding `script.js` or `style.css` instead of bloating the article HTML with inline styles or scripts.

## Interactive Component Rules
Articles that feature embedded JavaScript widgets/simulations must adhere to strict functional rules:
- **Granular Contextual Placement:** Prefer multiple smaller, targeted interactive widgets placed contextually alongside the concepts they explain throughout the article, rather than one single large monolithic simulation at the end. Use them when topics benefit from simulation, lifecycle, or state visualization.
- **100% Active Functional Scope:** Every interface action, status badge, data visualization panel, form input, or dynamic counter must be fully interactive and wired to robust Vanilla JavaScript event logic.
- **State Management & Direct DOM Manipulation:** Keep script logic self-contained at the bottom of the document body. Maintain a local state object (or separate state objects per widget). Build intuitive interactive logic loops: dispatching user triggers -> updating localized in-memory state objects -> applying active visual feedback loops -> updating target DOM elements directly.
- **Event Binding & Reactivity:** Bind explicit event listeners for each control. Re-render all dependent UI elements on state change. Keep controls labeled and understandable.
- **Visible Transitions:** Reflect state transitions visibly (status text, counters, highlighted steps, diagrams, etc.).
- **Purposeful Interactivity:** Do not create interactive components for the sake of creating them. Only create them if they add value to the article by helping the reader understand complex concepts visually and interactively.

## Workflow
1. Read `template.html`, `style.css`, and `script.js` before writing.
   - In this skill package, use the bundled files in `./assets/`.
   - Prefer bootstrapping with `./scripts/bootstrap_article_files.py` so setup is consistent.
2. Build an article outline with teaching flow:
   - Core concept
   - Internal mechanics
   - Tradeoffs and edge cases
   - Production considerations
3. Implement the page from the template, preserving semantic HTML and class naming conventions.
4. Add high-signal visuals:
   - Inline SVG diagrams, state-flow visuals, or interactive panels where relevant. Ensure every diagram has a `<figcaption>`.
5. Add at least one practical code example in `.code-container`.
6. Implement interaction logic in vanilla JavaScript near the end of `<body>`, using direct DOM updates and explicit state transitions.
7. Keep all interactions responsive and deterministic (button/input -> state update -> UI update).
8. Ensure the article reads like a complete engineering guide, not a generic blog post.

## Quality Checklist (Run Before Final Output)
- Single-page HTML only
- Shared CSS/JS linked correctly
- TOC present and anchors working
- Heading IDs match TOC links
- Code blocks use copy-button structure
- Interactive elements are functional end-to-end (100% active functional scope)
- No fake UI, mock controls, or placeholder artifacts
- Prose is concise, affirmative, and technically accurate
- Every diagram/visual asset includes a descriptive `<figcaption>` caption

## Be Creative with Visuals
Even though there is a layout guide that you need to follow, you have a lot of freedom to be creative with the visuals and interactive elements. Use inline SVGs, CSS animations, and dynamic DOM updates to create engaging learning experiences that go beyond static text.

## Example Requests That Should Trigger This Skill
1. "Create an interactive HTML article that teaches Kafka consumer group rebalancing."
2. "Build a standalone webpage explaining OAuth token rotation with a simulation."
3. "I need a polished technical guide in HTML that visually demonstrates event loop phases."
