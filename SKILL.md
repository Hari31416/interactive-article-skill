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

> Note: Since there are more than one file getting copied, try to copy the files inside a new directory to avoid confusion. For example, you can create a new directory called `kafka-rebalance-article` and copy the files there.

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

### 3. Research & Technical Foundation
To maintain absolute technical validity and professional authority, adhere to these standards:
- **Research-First Approach:** Always conduct targeted web research and consult active API documentation prior to authoring. Avoid writing code or explanations based on outdated patterns or "general knowledge."
- **Codebase Auditing:** If generating an article based on a specific repository, you must read the codebase thoroughly to understand implementation details before writing.
- **Fact-Checking Primitives:** Ensure internal system mechanics (handshakes, state transitions, constraints) are described with 100% accuracy.

### 4. Language, Tone & Editorial Voice
The article's voice must be spartan, informative, and authoritative. Use clear, simple language and follow these strict editorial rules:
- **Spartan & Active Voice:** Use short, impactful sentences. Focus on practical, actionable insights. Use active voice and avoid passive constructions.
- **Direct Address:** Use "you" and "your" to directly address the reader. This creates a more engaging, instructional experience.
- **Support with Data:** Use data and concrete examples to support claims. Avoid generalizations, metaphors, and clichés.
- **Punctuation Constraints:** Use only commas, periods, or other standard punctuation. Never use em dashes (—) or semicolons. If you need to connect ideas, use a period.
- **Eliminate Complex Constructions:** Avoid "not just X, but also Y" patterns. State concepts affirmatively and directly.
- **Banned Words & Filler:** Avoid unnecessary adjectives and adverbs. Do not use: *comprehensive, robust, seamless, delve, unlock, leverage, landscape, empowers, or transformative.*
- **No Setup Language:** Do not use common setup language like "in conclusion" or "in closing."
- **Clean HTML Output:** Ensure no markdown, asterisks, or literal formatting symbols leak into the final HTML paragraphs. Use standard HTML tags (<strong>, <em>) for emphasis.
- **Brevity & Sentence Structure:** Keep sentences short and highly scannable. Minimize cognitive load by breaking long, meandering, multi-clause blocks into independent thoughts.
- **No Flowery Language:** Avoid flowery language, metaphors, and clichés.
- **No Fluff:** Remove any content that does not directly advance the reader's understanding of the technical subject matter.

### 5. Visual Storytelling & Interactivity
Prioritize rich visual demonstrations over "walls of text."
- **Visual Explanations over Text Walls:** Whenever introducing abstract system lifecycles, topologies, or protocols, leverage custom inline SVG diagrams, animated state flows, or interactive widgets. Demonstrate concepts visually instead of relying on long descriptive paragraphs.
- **Diagram Captions:** Every diagram, figure, or visual asset must include a descriptive, centered caption using the `<figcaption>` tag.
- **Emotional Engagement:** Ensure interactive elements feel dynamic, visually polished, and immediately engaging. Use micro-animations and transitions to provide "delight" during the learning process.

#### SVG Diagram Conventions
When building inline SVG diagrams, follow these conventions for consistency:
- **ViewBox:** Always set `viewBox="0 0 W H"` explicitly and `width="100%"` so diagrams are responsive.
- **Colors:** Map to CSS variables where possible via `style` attributes: e.g. `fill="#2563eb"` for accent, `fill="#1e293b"` for dark backgrounds, `fill="#94a3b8"` for muted labels.
- **Typography:** Use `font-family="Inter, sans-serif"` and `font-size` in px units. Keep label text short.
- **Arrows:** Draw arrows with `<line>` + `<polygon>` for arrowheads, or use `<marker>` with `markerUnits="strokeWidth"`.
- **Grouping:** Wrap each logical element in a `<g>` with a descriptive comment.
- **Border/container:** Wrap the SVG in a `<figure>` and always include a `<figcaption>`.

Minimal skeleton:
```html
<figure>
  <svg viewBox="0 0 600 200" width="100%" xmlns="http://www.w3.org/2000/svg">
    <!-- Producer node -->
    <g>
      <rect x="20" y="70" width="120" height="60" rx="8" fill="#eff6ff" stroke="#2563eb" stroke-width="2"/>
      <text x="80" y="105" text-anchor="middle" font-family="Inter, sans-serif" font-size="13" fill="#1e293b">Producer</text>
    </g>
    <!-- Arrow -->
    <line x1="140" y1="100" x2="200" y2="100" stroke="#64748b" stroke-width="2" marker-end="url(#arrow)"/>
    <defs>
      <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
        <path d="M0,0 L0,6 L8,3 z" fill="#64748b"/>
      </marker>
    </defs>
  </svg>
  <figcaption>Caption describing what the diagram shows.</figcaption>
</figure>
```

### 6. Mathematical Notation
For articles covering algorithms, formulas, or performance models, load MathJax via CDN in `<head>`:
```html
<script>
  window.MathJax = { tex: { inlineMath: [['\\(', '\\)']], displayMath: [['\\[', '\\]']] } };
</script>
<script src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js" async></script>
```
- Use `\(...\)` for inline math: e.g. `\(k_1\)` renders as *k₁*.
- Use `\[...\]` for block (display) math.
- Do not use MathJax for simple subscripts or superscripts that HTML `<sub>`/`<sup>` tags handle cleanly.

### 6. Structural Elements & Technical Depth
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
- Prose is spartan, active, and technically accurate
- No em dashes (—) or semicolons used in text
- Direct address ("you/your") used throughout
- No generalizations, metaphors, or cliches
- Every diagram/visual asset includes a descriptive `<figcaption>` caption

## Be Creative with Visuals
Even though there is a layout guide that you need to follow, you have a lot of freedom to be creative with the visuals and interactive elements. Use inline SVGs, CSS animations, and dynamic DOM updates to create engaging learning experiences that go beyond static text.

## Advanced Interactive Components
Use these specialized components to increase engagement and reinforce learning. The CSS and JS for these are already included in the shared `style.css` and `script.js`.

### 1. Interactive Flashcards
Best for terminology, constants, or key constraints. Wrap them in a `.flashcard-grid` for layout.
```html
<div class="flashcard-grid">
  <div class="flashcard">
    <div class="flashcard-inner">
      <div class="flashcard-front">
        <span class="flashcard-label">Concept</span>
        <p>What is the default retention period in Kafka?</p>
      </div>
      <div class="flashcard-back">
        <span class="flashcard-label">Answer</span>
        <p>7 days (168 hours)</p>
      </div>
    </div>
  </div>
</div>
```

### 2. Knowledge Checks (Quizzes)
Use these inline to verify understanding. Use `data-correct="true"` on the correct option. You can provide specific feedback for correct and incorrect answers using `data-feedback`.

To allow the reader to retry after a wrong answer, add `data-allow-retry="true"` to the `.quiz-container`. A **Try Again** button will appear automatically in the feedback area after an incorrect selection.
```html
<div class="quiz-container" data-allow-retry="true">
  <div class="quiz-question">Which Kafka component manages partition leadership?</div>
  <div class="quiz-options">
    <div class="quiz-option" data-correct="false">Producer</div>
    <div class="quiz-option" data-correct="true">The Controller</div>
    <div class="quiz-option" data-correct="false">Consumer Group</div>
  </div>
  <div class="quiz-feedback">
    <div data-feedback="correct">
      <strong>Correct!</strong> The Controller broker is responsible for managing partition leadership and replicas.
    </div>
    <div data-feedback="incorrect">
      <strong>Not quite.</strong> While Producers send data, the Controller manages the internal state of partition leadership.
    </div>
    <div data-feedback="general">
      <em>Tip: There is only one Controller in a Kafka cluster at any time.</em>
    </div>
  </div>
</div>
```

### 3. Process Steppers
Ideal for multi-stage walkthroughs (handshakes, algorithms). A **Step N of M** counter is automatically injected into the header by `script.js` — you do not need to add it manually.
```html
<div class="stepper">
  <div class="stepper-header">
    <div class="stepper-dot is-active"></div>
    <div class="stepper-dot"></div>
  </div>
  <div class="stepper-content-wrapper">
    <div class="stepper-step is-active">
      <h3>Step 1: Initiation</h3>
      <p>The client sends a SYN packet to the server...</p>
    </div>
    <div class="stepper-step">
      <h3>Step 2: Acknowledgment</h3>
      <p>The server responds with SYN-ACK...</p>
    </div>
  </div>
  <div class="stepper-controls">
    <button class="stepper-btn is-prev">Back</button>
    <button class="stepper-btn is-next">Next</button>
  </div>
</div>
```

### 4. Comparison Components
Two variants are available:

**Image slider** — drag a handle to reveal a before/after image pair. Use when comparing screenshots or architecture diagrams rendered as images.
```html
<div class="comparison-container">
  <div class="comparison-before">
    <img src="unoptimized.png" alt="Unoptimized Architecture">
    <span class="comparison-label">Before</span>
  </div>
  <div class="comparison-after">
    <img src="optimized.png" alt="Optimized Architecture">
    <span class="comparison-label">After</span>
  </div>
  <div class="comparison-handle"></div>
</div>
```

**Tab switcher** — toggle between two panels of text, code, or any HTML content. Use this for code comparisons, config diffs, or any non-image before/after.
```html
<div class="comparison-tabs">
  <div class="comparison-tab-headers">
    <button class="comparison-tab-btn is-active" data-tab="before">Before</button>
    <button class="comparison-tab-btn" data-tab="after">After</button>
  </div>
  <div class="comparison-tab-panel is-active" data-panel="before">
    <div class="code-container">
      <div class="code-header"><div class="code-label">naive.py</div><button class="copy-btn">Copy</button></div>
      <pre><code># Unoptimized code here</code></pre>
    </div>
  </div>
  <div class="comparison-tab-panel" data-panel="after">
    <div class="code-container">
      <div class="code-header"><div class="code-label">optimized.py</div><button class="copy-btn">Copy</button></div>
      <pre><code># Optimized code here</code></pre>
    </div>
  </div>
</div>
```

### 5. Interactive Primitives (Explorable Explanations)
Use range inputs and a linked value display to create simple parameter-tuning widgets.
```html
<div class="primitive-control-group">
  <div class="primitive-control">
    <label class="primitive-label">
      Batch Size (KB)
      <span class="primitive-value">16</span>
    </label>
    <input type="range" min="1" max="128" value="16" id="batch-size-slider">
  </div>
</div>
```

## Example Requests That Should Trigger This Skill
1. "Create an interactive HTML article that teaches Kafka consumer group rebalancing."
2. "Build a standalone webpage explaining OAuth token rotation with a simulation."
3. "I need a polished technical guide in HTML that visually demonstrates event loop phases."
