---
name: interactive-article-skill
description: Create polished, single-page technical HTML articles that teach topics through fully functional interactive web components. Use this whenever the user asks for an HTML technical guide, explainer, tutorial, article, visual walkthrough, interactive documentation page, or any request to explain engineering topics via an interactive webpage. Apply this skill even if the user does not explicitly mention "HTML skill" but asks for a standalone educational web page.
---

# HTML Interactive Article Skill

## Goal
Produce a premium, distraction-free, single-page HTML article that explains technical topics with concise prose, strong structure, and real interactive learning elements.

This skill must follow repository conventions from:
- `./assets/PHILOSOPHY.md` guidance (captured in this skill)
- `./assets/template.html`
- `./assets/style.css`
- `./assets/script.js`

## Bundled Resources
Read these files before generating output:
- `./assets/template.html` (base page structure)
- `./assets/style.css` (layout and typography system)
- `./assets/script.js` (copy-button behavior for code blocks)
- `./scripts/bootstrap_article_files.py` (one-command file bootstrapper)
- `./scripts/merge_standalone_html.py` (merge referenced CSS/JS files inline for standalone output)

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

## Required Output Contract
Always deliver a single-page HTML document that:
1. Uses the `template.html` structure as the baseline.
2. References shared assets:
   - `<link rel="stylesheet" href="./style.css" />`
   - `<script src="./script.js"></script>`
3. Keeps a centered reading layout and avoids fake product chrome.
4. Includes one `<h1 class="article-title">` in the article header.
5. Includes a collapsible table of contents using semantic `<details>` + nested lists.
6. Uses clear heading hierarchy with mapped anchor IDs (`h2`/`h3`).
7. Uses `.code-container` blocks with `.code-header`, `.code-label`, and `.copy-btn`.
8. Uses `<strong>` tags for bold emphasis (never markdown `**bold**` in HTML text).
9. Includes meaningful interactive UI behavior for concept explanation when the topic benefits from simulation, lifecycle, or state visualization.
10. Ensures every UI control in the interactive section is fully wired and functional.
11. If extra JavaScript or styling is needed for the interactive elements, add it to the corresponding `script.js` or `style.css` instead of bloating the article HTML with inline styles or scripts.

## Hard Constraints
- No fake website nav bars, branding strips, sidebars, ads, or dashboard filler.
- No decorative placeholders, dummy controls, or non-functional "mock" widgets.
- Do not duplicate base typography/layout styles inline when `style.css` already defines them.
- Keep language clear, practical, and concise.
- Prefer affirmative wording. Avoid "not X but Y" framing.
- Minimize em dashes.

## Workflow
1. Read `PHILOSOPHY.md`, `template.html`, `style.css`, and `script.js` before writing.
   - In this skill package, use the bundled files in `./assets/`.
   - Prefer bootstrapping with `./scripts/bootstrap_article_files.py` so setup is consistent.
2. Build an article outline with teaching flow:
   - Core concept
   - Internal mechanics
   - Tradeoffs and edge cases
   - Production considerations
3. Implement the page from the template, preserving semantic HTML and class naming conventions.
4. Add high-signal visuals:
   - Inline SVG diagrams, state-flow visuals, or interactive panels where relevant
5. Add at least one practical code example in `.code-container`.
6. Implement interaction logic in vanilla JavaScript near the end of `<body>`, using direct DOM updates and explicit state transitions.
7. Keep all interactions responsive and deterministic (button/input -> state update -> UI update).
8. Ensure the article reads like a complete engineering guide, not a generic blog post.

## Interactive Component Rules
When adding simulations/widgets:
- Maintain a local state object.
- Bind explicit event listeners for each control.
- Re-render all dependent UI elements on state change.
- Keep controls labeled and understandable.
- Reflect state transitions visibly (status text, counters, highlighted steps, diagrams, etc.).

Every visible control must have an effect. If a control has no functional purpose, remove it.

## Quality Checklist (Run Before Final Output)
- Single-page HTML only
- Shared CSS/JS linked correctly
- TOC present and anchors working
- Heading IDs match TOC links
- Code blocks use copy-button structure
- Interactive elements are functional end-to-end
- No fake UI or placeholder artifacts
- Prose is concise and technically accurate

## Be Creative with Visuals

Even though there is a layout guide that you need to follow, you have a lot of freedom to be creative with the visuals and interactive elements. Use inline SVGs, CSS animations, and dynamic DOM updates to create engaging learning experiences that go beyond static text.

## Example Requests That Should Trigger This Skill
1. "Create an interactive HTML article that teaches Kafka consumer group rebalancing."
2. "Build a standalone webpage explaining OAuth token rotation with a simulation."
3. "I need a polished technical guide in HTML that visually demonstrates event loop phases."
