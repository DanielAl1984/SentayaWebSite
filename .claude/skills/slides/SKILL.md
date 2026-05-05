---
name: ckm:slides
description: Strategic HTML presentations with Chart.js, design tokens, responsive layouts, copywriting formulas, and contextual slide strategies. Use for marketing decks, investor pitches, data-driven presentations. Actions: create. Formats: HTML, Chart.js data viz, multi-slide decks.
argument-hint: "create [topic] [slide-count]"
license: MIT
metadata:
  author: claudekit
  version: "1.0.0"
---

# Slides — Strategic HTML Presentation Design

Strategic HTML presentations combining Chart.js data visualization, design tokens, copywriting formulas, and contextual slide strategies. Built for marketing decks, pitch presentations, and data-driven content where visual strategy matters.

## When to Use

- Marketing and investor pitch decks
- Presentations heavy on data visualization
- Content requiring persuasive design patterns
- Multi-slide presentations needing cohesive strategy
- Brand-compliant HTML presentations

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `create` | Generate a full HTML presentation |

## Command

```
/ckm:slides create "[topic and slide count]"
```

**Example:**
```
/ckm:slides create "10-slide investor pitch for Sentaya AI"
```

## Workflow

1. **Parse input** — identify topic, slide count, audience, tone
2. **Select strategy** — choose deck structure and emotion arc from `data/slide-strategies.csv`
3. **For each slide:**
   - Determine layout from `data/slide-layouts.csv`
   - Apply typography scale from `data/slide-typography.csv`
   - Set color treatment from `data/slide-color-logic.csv`
   - Apply copywriting formula from `data/slide-copy.csv`
4. **Generate HTML** using design tokens and Chart.js
5. **Validate** — check token compliance, navigation, contrast

## Slide Requirements

**ALL slides MUST:**
1. Use CSS variables for all colors, fonts, spacing
2. Use Chart.js for charts (NOT CSS-only bars or static images)
3. Include keyboard navigation (arrow keys + click)
4. Include progress indicator
5. Be fully responsive
6. Focus on persuasion and conversion

## Chart.js Integration

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js"></script>

<canvas id="myChart" width="600" height="300"></canvas>
<script>
new Chart(document.getElementById('myChart'), {
    type: 'bar',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{ data: [30, 55, 80, 120], backgroundColor: 'var(--color-primary)' }]
    },
    options: { responsive: true, plugins: { legend: { display: false } } }
});
</script>
```

## Copywriting Formulas

| Formula | Best For | Structure |
|---------|----------|-----------|
| PAS | Problem slides | Problem → Agitation → Solution |
| AIDA | Hero/intro slides | Attention → Interest → Desire → Action |
| FAB | Feature slides | Feature → Advantage → Benefit |
| Before/After | Transformation | Current State → Future State |
| Social Proof | Validation slides | Quote + Logo + Result |

## Duarte Sparkline Pattern

Premium decks alternate between emotions for engagement:
```
"What Is" (frustration) ↔ "What Could Be" (hope)
```

Pattern breaks occur at ~1/3 and ~2/3 of the deck.

## Token Compliance

```css
/* CORRECT */
background: var(--slide-bg);
color: var(--color-primary);
font-family: var(--font-heading);

/* WRONG — hardcoded */
background: #0D0D0D;
color: #9FC90A;
```

## Integration

**Skill Dependencies:** design-system, brand, ui-ux-pro-max
