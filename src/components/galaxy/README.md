# Cosmic Galaxy Navigation Component

An interactive, GPU-accelerated 3D starlight particle galaxy for spatial portfolio navigation built with Three.js, React, and WebGL.

---

## 🚀 How to Add This Component to Any Project

### Step 1: Copy this folder
Simply copy this entire `galaxy/` folder into your React / Next.js / Vite project (e.g. inside `src/components/galaxy/` or `src/galaxy/`).

### Step 2: Install Dependencies
This component requires `three` and `lucide-react`:

```bash
npm install three lucide-react
npm install -D @types/three
```

*(If using Tailwind CSS, ensure Tailwind v3 or v4 is configured in your project for layout classes).*

### Step 3: Use the Component
Import and render `<Galaxy />` anywhere in your application:

```tsx
import { Galaxy } from './galaxy';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Galaxy />
    </div>
  );
}
```

---

## 🛠 Customizing Destinations

You can customize the destinations or handle selection callbacks:

```tsx
import { Galaxy, DestinationConfig } from './galaxy';

const myDestinations: DestinationConfig[] = [
  {
    id: 'projects',
    name: 'PROJECTS',
    subtitle: 'Production Applications & Systems',
    sectorCode: '01 / PRJ',
    route: '/projects',
    armIndex: 0,
    progress: 0.20,
    position: [-0.89, 0.05, 1.94],
    color: '#bae6fd',
    accentColor: '#0284c7',
    clusterRadius: 0.7,
    clusterParticleCount: 30,
    description: 'Scalable web systems, webGL interfaces, and full-stack architecture.',
    stats: [{ label: 'Completed', value: '12' }],
    tags: ['React', 'WebGL', 'TypeScript'],
  },
  // Add more destinations...
];

export default function Home() {
  return (
    <Galaxy
      destinations={myDestinations}
      onDestinationSelect={(dest) => console.log('Visited sector:', dest.name)}
      onReturnHome={() => console.log('Returned to home galaxy')}
      initialMuted={false}
    />
  );
}
```

---

## 📦 Exported API

From `./galaxy`:
- `Galaxy` (Default export & named export): Master component
- `GalaxyEngine`: Direct access to the Three.js particle simulation class
- `GALAXY_DESTINATIONS`: Default 6-sector configuration
- `cosmicAudio`: Synthesizer instance for ambient drone & chimes
- `types`: All TypeScript interfaces (`DestinationConfig`, `GalaxyProps`, etc.)

## Portfolio integration

The app opens the galaxy from **The atlas**. `portfolioDestinations.ts` maps the eight existing rooms to physical stars using their actual names and colors. The camera arrives before the host opens the room:

```tsx
<Galaxy
  destinations={PORTFOLIO_DESTINATIONS}
  manageHistory={false}
  onDestinationEnter={(destination) => travel(destination.id)}
  reducedMotion={still}
/>
```

`onDestinationSelect` fires at departure; `onDestinationEnter` fires at arrival and replaces the sample destination overlay. `manageHistory={false}` leaves routing to the host. Closing the atlas unmounts the renderer and mutes ambient sound.

Drag the canvas to orbit, scroll to zoom, or use the world directory. Star controls and directory entries are native keyboard-accessible buttons. Phone layouts fit the entire galaxy and expose a collapsible directory. Reduced motion freezes the starfield and skips the camera flight. If WebGL cannot initialize, the directory still opens pages.

The rendering uses sharp point stars plus a soft dust layer sharing the same geometry. Both follow the same rotating spiral; no image assets or extra dependencies are required.

## Universe home and travel (current app)

`App.tsx` now keeps the universe mounted at `/` / `#/`. The former arrival page remains available as `#arrival`, alongside all seven other rooms. Home controls return to `#/`; browser Back/Forward and room links use the same travel controller. Document anchors are handled separately.

The `journey` prop supplies `{ from, to, sequence }`. A page-to-page flight leaves the source system, follows an elevated arc through the galaxy, and arrives at the destination. Arrival waits for the requested room module before displaying it. The sequence protects against a previous request committing after a newer navigation. The engine pauses its animation frame while a room is visible and when the browser tab is hidden.

Zoom spans 12–180 scene units, with smooth scroll zoom, explicit buttons, touch pinch, orbit dragging, and reset. “Look closer” centers a planetary system (2–18 units); zooming out or resetting returns to the wider galaxy. Surrounding gas clouds, nearby stars, satellite galaxies, and orbiting planets are procedural. The orbiting planets illustrate a system and are not separate content routes.

`worldLoader.ts` shares module promises between React.lazy and preloading. Startup waits for the initial modules plus scene compilation and the first render. Remaining room and atmosphere modules load sequentially in the background; data-saving / 2G connections skip background preloading. This uses the browser module cache, not an offline service worker. `UniverseLoading.tsx` displays real readiness stages and a retry state.

`LivingPage` adds scroll reveals and page arrival animation. Shared `AnimatedPanel` gives changing projects, studies, tool inspectors, and probe outputs their own entrance animation. Motion controls and the system reduced-motion preference skip flights and decorative animation.
