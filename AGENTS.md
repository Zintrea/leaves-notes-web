# AGENTS.md - Developer Guide for Sawduang Notes

This document provides guidelines and commands for agents working on this codebase.

## Project Overview

- **Name:** Sawduang Notes (ซอด้วง โน้ต)
- **Type:** Full-stack web application
- **Stack:** React 19 + TypeScript + Vite (frontend), Express.js (backend), Tailwind CSS 4 + shadcn/ui
- **Package Manager:** pnpm

---

## Build & Development Commands

### Development
```bash
pnpm dev          # Start Vite dev server (with --host for network access)
pnpm preview      # Preview production build locally
```

### Building
```bash
pnpm build        # Build frontend (Vite) + backend (esbuild) to dist/
pnpm start        # Run production server (requires build first)
```

### Type Checking
```bash
pnpm check        # Run TypeScript compiler (tsc --noEmit)
```

### Formatting
```bash
pnpm format       # Format all files with Prettier
```

### Testing
```bash
pnpm vitest              # Run all tests
pnpm vitest run          # Run tests once (non-watch mode)
pnpm vitest run <file>   # Run single test file
pnpm vitest run --grep "<pattern>"  # Run tests matching pattern
```

---

## Code Style Guidelines

### General Principles
- Keep code concise and readable
- Prefer explicit over implicit
- Avoid unnecessary abstractions
- No comments unless explaining complex logic (per project convention)

### TypeScript

#### Strict Mode
- TypeScript strict mode is enabled (`strict: true` in tsconfig.json)
- Always define proper types for function parameters and return values
- Avoid `any` - use `unknown` when type is truly unknown
- Use type inference when obvious: `const x = 5` (not `const x: number = 5`)

#### Type Definitions
```typescript
// Interface for objects
interface User {
  id: string;
  name: string;
  email: string;
}

// Type for unions/literals
type Status = 'pending' | 'active' | 'completed';

// Use type for unions, interface for objects
```

### Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `SongCard.tsx`, `FilterBar.tsx` |
| Hooks | camelCase starting with `use` | `useMobile.tsx`, `usePersistFn.ts` |
| Functions | camelCase | `getUserData()`, `formatDate()` |
| Constants | UPPER_SNAKE_CASE | `MAX_ITEMS`, `API_BASE_URL` |
| Files (utils) | camelCase | `utils.ts`, `formatting.ts` |
| CSS classes | kebab-case | `text-center`, `flex-row` |

### Imports

#### Order (use automatic sorting via editor/Prettier)
1. External libraries (React, Radix UI, etc.)
2. Internal imports (`@/*`, `@shared/*`)
3. Relative imports (`./`, `../`)

#### Examples
```typescript
// Good
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { formatDate } from '../utils/date';
import type { Song } from '@shared/types';

// Avoid
import { Button } from './components/ui/button';  // Use @/ alias
import React from 'react';  // Not needed in React 17+ with JSX transform
```

#### Path Aliases
- `@/*` → `./client/src/*`
- `@shared/*` → `./shared/*`

### React Patterns

#### Components
```typescript
// Functional component with props interface
interface SongCardProps {
  title: string;
  artist: string;
  duration: number;
}

export function SongCard({ title, artist, duration }: SongCardProps) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{artist}</p>
    </div>
  );
}
```

#### Hooks
- Custom hooks must start with `use` prefix
- Use `useCallback` / `useMemo` sparingly - only when there's a measurable performance benefit

#### State
```typescript
// Simple state
const [count, setCount] = useState(0);

// With type inference
const [items, setItems] = useState<Item[]>([]);

// Complex state - consider useReducer or separate state
```

### Error Handling

#### Try/Catch
```typescript
async function fetchData() {
  try {
    const response = await api.get('/data');
    return response.data;
  } catch (error) {
    // Handle error appropriately
    if (error instanceof ApiError) {
      console.error('API Error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; // or return fallback value
  }
}
```

#### Error Boundaries
- Use `ErrorBoundary` component from `client/src/components/ErrorBoundary.tsx` to wrap components that may fail

### Tailwind CSS

#### Classes Ordering (Prettier handles this)
- Prettier with Tailwind plugin auto-sorts classes
- Run `pnpm format` to fix ordering

#### Best Practices
```html
<!-- Good -->
<div className="flex items-center justify-between p-4 space-y-4">

<!-- Avoid excessive nesting -->
<div className="custom-class">
  <style>{`.custom-class { ... }`}</style>
</div>
```

#### shadcn/ui Components
- All UI components are in `client/src/components/ui/`
- Use these as building blocks instead of raw HTML elements where appropriate

### File Organization

```
client/src/
├── components/
│   ├── ui/           # shadcn/ui components (DO NOT modify)
│   ├── *.tsx         # Custom components
├── pages/
│   ├── Home.tsx
│   └── NotFound.tsx
├── hooks/
│   ├── useMobile.tsx
│   └── usePersistFn.ts
├── contexts/
│   └── ThemeContext.tsx
├── lib/
│   └── utils.ts       # Utility functions (cn, formatting, etc.)
├── data/
│   └── *.ts          # Static data files
├── App.tsx           # Root component
└── main.tsx          # Entry point

server/
└── index.ts          # Express server entry

shared/
└── const.ts          # Shared constants
```

### Backend (Express)

- Server entry: `server/index.ts`
- Use async/await for route handlers
- Proper error handling with try/catch
- Return consistent response formats

---

## Testing Guidelines

### Writing Tests
- Test files should be named `*.test.ts` or `*.spec.ts`
- Place tests alongside the code they test
- Focus on testing behavior, not implementation

### Running Tests
```bash
# All tests
pnpm vitest

# Single file
pnpm vitest run src/utils/date.test.ts

# With grep pattern
pnpm vitest run --grep "SongCard"
```

---

## Additional Notes

### Prettier Configuration
- Config: `.prettierrc`
- Run `pnpm format` before committing

### Package Manager
- Always use `pnpm` (not npm or yarn)
- The `packageManager` field enforces pnpm version

### Browser Support
- Check `client/index.html` for any specific browser requirements

---

## Common Tasks

### Adding a New UI Component
1. Copy from shadcn/ui or modify existing component in `components/ui/`
2. Export from appropriate index if one exists

### Adding a New Page
1. Create file in `client/src/pages/`
2. Add route in `App.tsx` using wouter

### Adding a New API Route
1. Add route handler in `server/index.ts`

### Adding a New Shared Type/Constant
1. Add to appropriate file in `shared/` or create new file
2. Import using `@shared/*` alias
