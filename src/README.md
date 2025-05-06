# Project Structure

## Directory Structure

```
src/
├── assets/           # Static files (images, fonts, etc.)
├── components/       # Reusable UI components
│   ├── common/       # Truly reusable components (buttons, inputs)
│   └── features/     # Components specific to features
├── hooks/            # Custom React hooks
├── lib/              # Third-party library configurations
├── pages/            # Page components (for routing)
├── services/         # API calls and external services
├── styles/           # Global styles
├── types/            # TypeScript type definitions
├── utils/            # Helper functions and utilities
└── context/          # React context providers
```

## Import Conventions

For imports, you should:

1. Use relative imports for files in the same directory or subdirectories
2. Use barrel files (index.ts) for cleaner imports

Example:

```typescript
// Avoid
import Button from "../../components/common/Button/Button";

// Prefer
import { Button } from "../../components/common";
```

## Component Structure

Components follow this structure:

- Each component has its own directory
- Component file is named the same as the directory
- CSS modules are co-located with components
- Tests are co-located with components

Example:

```
Button/
├── Button.tsx
├── Button.module.css
└── Button.test.tsx
```

## Types

Share common types across the application using the `types` directory.
