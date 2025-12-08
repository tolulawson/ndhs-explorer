# NDHS Explorer

Interactive data explorer for the **Nigeria Demographic and Health Survey (NDHS) 2024**. This application provides visual access to key health indicators from all 19 chapters of the official DHS report.

## Features

- **19 Chapters** of comprehensive health data covering:
  - Population & Housing
  - Fertility & Family Planning
  - Maternal & Child Health
  - Nutrition & Malaria
  - HIV/AIDS Knowledge
  - Women's Empowerment
  - WASH & more

- **Interactive Charts** - Bar, line, and pie charts powered by Recharts
- **Responsive Design** - Works on desktop and mobile devices
- **Fast Navigation** - Built with TanStack Router for client-side routing

## Tech Stack

- [TanStack Start](https://tanstack.com/start) - Full-stack React framework
- [TanStack Router](https://tanstack.com/router) - Type-safe routing
- [Recharts](https://recharts.org/) - Composable charting library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Bun](https://bun.sh/) - JavaScript runtime & package manager

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/tolulawson/ndhs-explorer.git
cd ndhs-explorer

# Install dependencies
bun install

# Start development server
bun run dev
```

The app will be available at `http://localhost:3000`.

### Build for Production

```bash
bun run build
bun run preview
```

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── ChartRenderer.tsx
│   ├── Icon.tsx
│   └── Sidebar.tsx
├── data/
│   └── chapters/     # JSON data files organized by chapter
│       ├── 1/
│       │   ├── metadata.json
│       │   └── survey-response-rates.json
│       ├── 2/
│       └── ...
├── lib/
│   └── chapters.ts   # Data loading utilities
├── routes/
│   ├── __root.tsx    # Root layout with sidebar
│   ├── index.tsx     # Landing page
│   └── chapter.$id.tsx  # Dynamic chapter route
└── styles.css
```

## Data Source

All data is sourced from the [Nigeria DHS 2024 Final Report](https://dhsprogram.com/methodology/survey/survey-display-609.cfm), published by the National Population Commission (NPC), Federal Ministry of Health (FMOH), with support from USAID and ICF.

## Contributing

Contributions are welcome! Here's how you can help:

### Reporting Issues

- Use the [GitHub Issues](https://github.com/tolulawson/ndhs-explorer/issues) page to report bugs
- Include steps to reproduce, expected behavior, and screenshots if applicable

### Submitting Changes

1. **Fork the repository** and create your branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** following the existing code style:
   - Use TypeScript for type safety
   - Follow the existing component patterns
   - Keep data files in the `src/data/chapters/` structure

3. **Test your changes**:
   ```bash
   bun run check   # Run linting
   bun run test    # Run tests
   ```

4. **Commit your changes** with a clear message:
   ```bash
   git commit -m "Add: description of your change"
   ```

5. **Push and open a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

### Adding New Data

To add or update chapter data:

1. Create/edit files in `src/data/chapters/{chapter_id}/`
2. Each chapter should have:
   - `metadata.json` - Chapter info, subsections, highlights
   - Individual chart JSON files (one per visualization)
3. Update `src/lib/chapters.ts` to import new chart files

### Code Style

This project uses [Biome](https://biomejs.dev/) for formatting and linting:

```bash
bun run format   # Format code
bun run lint     # Check for issues
bun run check    # Run both
```

## License

This project is for educational and informational purposes. The underlying survey data is publicly available from the DHS Program.
