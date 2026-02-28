# 26-game-retro-vault

> **A nostalgic trip back to the golden age of the web** 🕹️

A comprehensive collection of mini games and utilities inspired by 90s web design, featuring authentic Windows 95 styling and classic gameplay mechanics.

---

## 🎮 Live Demos

| Platform | URL |
|----------|-----|
| **Vercel** | [26-game-retro-vault.vercel.app](https://26-game-retro-vault.vercel.app) |
| **Render** | [two6-game-retro-vault.onrender.com](https://two6-game-retro-vault.onrender.com) |

---

## 🌟 Theme: 90s Web (Nostalgic)

Immerse yourself in the nostalgic era of dial-up internet, Windows 95, and classic web design:
- **Windows 95 UI** with authentic title bars, window controls, and beveled buttons
- **Classic color palette** featuring the iconic #c0c0c0 gray
- **Marquee text** and spinning construction icons
- **Visitor counter** with digital display
- **Retro color schemes** (terminal green, vivid magenta, cyan)
- **Comic Sans headers** for that authentic feel

## 🎮 Games & Apps

| App | Description | Features |
|-----|-------------|----------|
| 🎨 **Color Changer** | Random color generator | HSL to Hex conversion, retro messages |
| 🔔 **Popup Notify** | Toast notification demo | 4 notification types |
| ⏱️ **Countdown** | Event timer | Start/Pause/Reset, LED display |
| 🌙 **Theme Toggle** | Dark/Light mode | Persistent preference |
| 🔢 **Calculator** | Retro math tool | Keyboard support, safe evaluation |
| ⭕ **Tic Tac Toe** | Classic vs AI | Smart opponent |
| 🧠 **Memory Match** | Card matching game | Move counter, 8 pairs |
| 🐍 **Snake** | Classic arcade game | Canvas rendering, high score |
| ⌨️ **Speed Typer** | Typing speed test | WPM & accuracy tracking |
| ⚡ **Reaction Test** | Reflex measurement | Best score persistence |

## ✨ Features

### Core Experience
- **Single-file architecture** - No build tools required
- **Offline capable** - Works without internet
- **Local storage** - Saves preferences and high scores
- **Keyboard shortcuts** - ESC to return to hub
- **Mobile responsive** - Works on all devices

### 90s Nostalgia Elements
- Windows 95 window chrome with minimize/maximize/close buttons
- Beveled 3D buttons (outset/inset states)
- Classic link colors (blue for unvisited, purple for visited)
- Courier New monospace font for displays
- Animated marquee text
- Spinning construction icons
- Digital LED counter display
- "Under Construction" banners

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 19, TypeScript 5 |
| **State Management** | Zustand 5.0.11 |
| **Routing** | React Router 7.13.0 |
| **Build Tool** | Vite 6.0.0 |
| **Backend** | Express 4.21.0, CORS 2.8.5 |
| **Graphics** | Canvas API (Snake) |
| **Storage** | localStorage, Zustand persistence |
| **Styling** | Custom CSS with CSS Variables |

---

## 🏗️ Architecture

### Hybrid Architecture Pattern

This project uses a **dual-layer architecture** - maintaining the nostalgic 90s single-file experience while leveraging modern React tooling for maintainability and scalability.

```
┌─────────────────────────────────────────────────────────┐
│                  Retro UI Layer (90s Style)             │
│  Windows 95 Chrome, Beveled Buttons, Marquee Text      │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Modern React Application Layer             │
│  React 19 + TypeScript + Zustand + React Router        │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    Express Backend Layer                │
│  API Endpoints, CORS, Server-Side Logic                 │
└─────────────────────────────────────────────────────────┘
```

### Project Structure

```
26-game-retro-vault/
├── src/
│   ├── main.tsx            # React entry point
│   ├── router/
│   │   └── index.tsx       # React Router configuration
│   ├── pages/              # Page components
│   │   ├── Game.tsx        # Main game hub
│   │   ├── Stats.tsx       # Statistics display
│   │   └── Achievements.tsx # Achievements view
│   ├── stores/
│   │   └── gameStore.ts    # Zustand global state
│   ├── scripts/
│   │   └── main.js         # Legacy game logic
│   └── styles/
│       ├── main.css        # Main stylesheet
│       └── index.css       # Global styles
├── server/
│   └── index.js            # Express server
├── design-system/          # Design system documentation
├── index.html              # HTML entry point (retro style)
├── .github/workflows/      # CI/CD pipelines
│   ├── ci.yml             # Lint and build
│   └── deploy.yml         # Deploy to Vercel & Render
├── package.json            # Dependencies
└── README.md               # This file
```

### Technology Stack Details

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend Framework** | React 19 | Modern reactive UI |
| **Language** | TypeScript 5 | Type safety |
| **State Management** | Zustand 5.0.11 | Lightweight state store |
| **Routing** | React Router 7.13.0 | SPA navigation |
| **Build Tool** | Vite 6.0.0 | Fast bundler & dev server |
| **Backend** | Express 4.21.0 | REST API server |
| **CORS** | CORS 2.8.5 | Cross-origin support |
| **Graphics** | Canvas API | 2D rendering (Snake game) |
| **Storage** | localStorage | Persistent data |

### Component Architecture

```typescript
{
  pages: {
    Game: "Main game hub with Windows 95 styling",
    Stats: "Statistics and high scores display",
    Achievements: "Achievements and badges view"
  },
  stores: {
    gameStore: "Global game state with Zustand"
  },
  router: {
    routes: [
      { path: "/", component: "Game" },
      { path: "/stats", component: "Stats" },
      { path: "/achievements", component: "Achievements" }
    ]
  }
}
```

### State Management (Zustand)

```
User Action → Zustand Store → Component Update → UI Render
     ↓             ↓               ↓              ↓
  Game Play  gameStore()    React 19       Retro UI Layer
  Score Save  Persistence   Auto-update     Windows 95 Chrome
```

- **gameStore**: Centralized game state
- **Persistence**: localStorage integration
- **Middleware**: DevTools for debugging

### Game Architecture

```
Retro Windows 95 UI Layer
    ↓
React Components (Game Hub, Stats, Achievements)
    ↓
Game Engines (Tic Tac Toe, Snake, Memory Match, etc.)
    ↓
Canvas API / DOM Manipulation
```

### Games & Apps Architecture

```typescript
{
  games: {
    tictactoe: {
      type: "AI Opponent",
      engine: "Minimax algorithm",
      features: ["Win detection", "Block strategy", "Random fallback"]
    },
    snake: {
      type: "Canvas rendering",
      engine: "Game loop with requestAnimationFrame",
      features: ["High score", "Keyboard controls", "Collision detection"]
    },
    memory: {
      type: "Card matching",
      engine: "DOM-based card flip",
      features: ["Move counter", "Pair tracking", "Best score"]
    },
    speedtyper: {
      type: "Typing test",
      engine: "Character comparison",
      features: ["WPM calculation", "Accuracy tracking", "Success notification"]
    },
    reaction: {
      type: "Reflex test",
      engine: "Timestamp measurement",
      features: ["Best time persistence", "Penalty for early click"]
    },
    colorchanger: {
      type: "Utility",
      engine: "HSL to Hex conversion",
      features: ["Random colors", "Retro messages"]
    },
    calculator: {
      type: "Math utility",
      engine: "eval with safe parsing",
      features: ["Keyboard support", "Retro styling"]
    },
    countdown: {
      type: "Timer",
      engine: "setInterval based",
      features: ["Start/Pause/Reset", "LED display"]
    },
    popupnotify: {
      type: "Demo",
      engine: "Toast notification system",
      features: ["4 notification types", "Auto-dismiss"]
    },
    themetoggle: {
      type: "Theme switcher",
      engine: "CSS class toggling",
      features: ["Persistent preference", "Smooth transition"]
    }
  }
}
```

### 90s Nostalgia Design System

```typescript
{
  windows95: {
    chrome: {
      titleBar: "Gradient blue with close button",
      controls: "Minimize, maximize, close buttons",
      borders: "Beveled 3D effect ( outset/inset )"
    },
    colors: {
      background: "#c0c0c0 (classic gray)",
      text: "#000000",
      links: "blue (unvisited), purple (visited)",
      accent: "terminal green, vivid magenta, cyan"
    },
    typography: {
      headings: "Comic Sans MS",
      body: "Arial/Tahoma",
      display: "Courier New (monospace)"
    },
    elements: {
      buttons: "Beveled 3D ( outset/inset states )",
      inputs: "Inset border with gray background",
      windows: "Title bar + content + status bar"
    },
    effects: {
      marquee: "Animated scrolling text",
      spinning: "Construction icons ( perpetual )",
      digital: "LED counter display"
    }
  }
}
```

### Retro UI Component Pattern

```typescript
// Windows 95 Window Component
interface RetroWindowProps {
  title: string;
  children: React.ReactNode;
  onClose?: () => void;
}

const RetroWindow: React.FC<RetroWindowProps> = ({
  title,
  children,
  onClose
}) => (
  <div className="win95-window">
    <div className="win95-title-bar">
      <span>{title}</span>
      {onClose && (
        <button className="win95-close-btn">×</button>
      )}
    </div>
    <div className="win95-content">
      {children}
    </div>
  </div>
);
```

### Data Flow Architecture

```
User Input → React Event Handlers → Zustand Store → localStorage
     ↓              ↓                     ↓              ↓
  Keyboard      Game Logic          State Update   Persistence
  Click         Validation          React Re-render   Load
  Form Submit   AI/Engine           Retro UI Update    Sync
```

### Persistence Strategy

```typescript
{
  localStorage: {
    highScores: "Snake, Memory Match",
    statistics: "Tic Tac Toe (wins/losses/draws)",
    preferences: "Theme (light/dark)",
    reactionTimes: "Best reaction time",
    visitorCount: "Page visit counter"
  },
  zustandPersistence: {
    gameStore: "Auto-sync with localStorage",
    middleware: "Zustand persist middleware"
  }
}
```

### Performance Optimizations

- **Zustand**: Minimal bundle (~1.5KB)
- **Canvas API**: GPU-accelerated rendering for Snake
- **Vite**: Fast HMR and optimized builds
- **Code Splitting**: Route-based lazy loading
- **Memoization**: React.memo for expensive components
- **Debouncing**: Input event optimization

### CI/CD Pipeline

```yaml
Push to main → CI Check → Build → Deploy
     ↓            ↓          ↓         ↓
  Trigger     Lint+Check   Production   Vercel/Render
              (Vite)       Build        Express API
```

- **CI**: Linting and build checks
- **Build**: Production-optimized bundle with Vite
- **Deploy**: Automatic to Vercel (frontend) and Render (backend)

### Multi-Platform Deployment

| Platform | URL | Type |
|----------|-----|------|
| Vercel | 26-game-retro-vault.vercel.app | Frontend |
| Render | two6-game-retro-vault.onrender.com | Full Stack |

### Design Philosophy

```typescript
{
  authenticity: {
    ui: "Genuine Windows 95 chrome",
    behavior: "90s web conventions",
    imperfections: "Mobile scrollbars, no responsive images"
  },
  modernity: {
    architecture: "React + TypeScript + Zustand",
    tooling: "Vite for fast development",
    deployment: "Modern CI/CD pipelines"
  },
  hybrid: {
    frontend: "Modern React for maintainability",
    design: "Retro 90s for nostalgia",
    backend: "Express API for extensibility"
  }
}
```

### Key Architectural Decisions

**Why React + TypeScript?**
- Modern tooling for maintainability
- Type safety for complex game logic
- Large ecosystem of libraries
- Easy to extend with new games

**Why Zustand?**
- Lightweight alternative to Redux
- Built-in localStorage persistence
- Simple API for game state
- Good TypeScript support

**Why Express Backend?**
- Enables future online features
- API endpoints for statistics
- CORS support for cross-origin
- Simple to deploy on Render

**Why Vite?**
- Fast HMR for game development
- Optimized production builds
- Native ESM support
- React + TypeScript support

### Retro vs Modern Tradeoffs

| Aspect | Retro Approach | Modern Implementation |
|--------|----------------|----------------------|
| UI Styling | HTML tables, frames | React components, flexbox |
| State Management | Global variables | Zustand store |
| Routing | Multiple HTML files | React Router SPA |
| Persistence | Cookies | localStorage |
| Build | None | Vite bundler |
| Type Safety | JSDoc comments | TypeScript |
| Testing | Manual | Vitest + React Testing Library |

### Extension Points

```typescript
{
  newGames: "Add new game components to /pages/",
  newFeatures: "Extend Zustand store with new state",
  newRoutes: "Add routes in /router/index.tsx",
  newAPIs: "Add Express endpoints in /server/",
  newThemes: "Extend CSS variables for new 90s themes"
}
```

### Future Enhancements

- Online leaderboards with Express API
- Multiplayer support (WebSocket)
- Game save/load to cloud
- More 90s-inspired games
- Achievement system integration
- Sound effects (retro-style audio)

---

*Last updated: 2026-03-01*

## 🚀 Usage

Simply open `index.html` in any modern web browser. No build process, no dependencies, no server required.

```bash
# Open directly in browser
open index.html

# Or serve with any static server
npx serve .
python -m http.server
```

## 📁 Project Structure

```
26-game-js-mini-games/
├── index.html    # Complete single-file application
├── README.md     # This file
├── LICENSE       # MIT License
└── .gitignore
```

## 🎯 Game Mechanics

### Tic Tac Toe
- Player (X) vs Computer (O)
- AI tries to win, blocks player threats, or picks randomly
- First to get 3 in a row wins

### Memory Match
- 16 cards (8 matching pairs)
- Click to flip, find matching pairs
- Tracks moves and pairs found

### Snake
- Arrow keys or WASD to move
- Eat red food to grow
- Avoid walls and self
- Score: 10 points per food

### Speed Typer
- Type the displayed text accurately
- WPM calculated as (characters / 5) / minutes
- Accuracy tracks correct keystrokes
- Success notification on completion

### Reaction Test
- Click when screen turns green
- Too early click = penalty
- Best time saved to localStorage


---

## 📝 Design Notes (V2)

### Intentional Quirk: The "Under Construction" GIF
V2 adds a permanent "Under Construction" animated GIF on the homepage. The site is complete, but the GIF stays. Why? Because every 90s site was perpetually under construction. It's a signal of authenticity—the project is never "done," just temporarily stable. The GIF loops forever, like the web itself.

### Tradeoff: Inline Styles Over CSS Files
All styles are inline or in `<style>` blocks. No external CSS. The tradeoff: caching vs. portability. External CSS caches better but requires another request. Inline styles load instantly and make the file truly self-contained. For a single-file retro site, self-containment matters more than performance.

### What I Chose NOT to Build
No responsive images or srcset. Images are fixed-size, often stretched or clipped on mobile. Modern practice would use responsive images. But retro sites didn't know about your phone. The design assumes 800x600. Mobile users get scrollbars. Intentional imperfection preserves the time capsule.

## 🎉 Additional Features (V3)

Three small quality-of-life improvements that add replayability without changing the retro feel:

### Game Statistics Tracking
**Why added**: Playing games in isolation gets boring. Without persistent records, every session feels like starting from zero.

**What changed**: Added local storage tracking for three games:
- **Snake**: Now saves your high score and displays it alongside your current score
- **Tic Tac Toe**: Tracks wins, losses, and draws across all sessions
- **Memory Match**: Records your best (fewest moves) completion

These stats persist between visits using localStorage, just like visitor counts and reaction times already did.

### Persistent Progress
**Why added**: Retro games were addictive because you could always see "your initials" on the high score screen. Modern web apps often forget this.

**What changed**: Your best Snake score, fewest Memory moves, and Tic Tac Toe record now survive browser closes. Clear your browser cache to reset.

### Intentionally Rejected: Leaderboards
I considered adding online leaderboards so you could compete with others. Rejected because it would require a backend, breaking the single-file, no-dependency philosophy. This is a personal time capsule, not a competitive platform. Your stats are yours alone—like writing your high score on an arcade cabinet with a Sharpie.

