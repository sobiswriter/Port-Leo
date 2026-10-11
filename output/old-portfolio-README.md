# Souradip (Sobi) Biswas | Portfolio

A high-performance, aesthetically driven portfolio website built to showcase **Applied AI Systems** and **Engineering Capabilities**.  
The design philosophy revolves around a **Cyber-Noir** aesthetic—blending dark, moody functionalism with fluid, generative visuals.

---

## 🎨 Design Philosophy & Aesthetic

This project is not just a list of links; it is a demonstration of **"AI + Interface"**.
- **Cyber-Noir Theme**: High contrast, deep blacks (`#0a0a0f`), and neon accents (Purple/Cyan).
- **Liquid Ether Background**: A custom WebGL/OGL implementation simulating fluid dynamics and viscous forces.
- **Faulty Terminal**: A shader-based text effect that mimics retro CRT degradation and digital noise.
- **Glassmorphism**: Frosted glass UI elements to maintain depth and hierarchy.

## 🛠 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: JavaScript / React
- **Styling**: Vanilla CSS (Custom Variables & Animations)
- **Graphics / WebGL**: 
  - [`ogl`](https://github.com/oframe/ogl) (Minimal WebGL library)
  - Custom GLSL Shaders (Fragment & Vertex)

## 🚀 Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

```
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── FaultyTerminal.js  # Glitch/CRT Text Component
│   │   │   ├── LiquidEther.js     # Fluid WebGL Background
│   │   │   ├── ThemeToggle.js     # Light/Dark Mode Logic
│   │   ├── globals.css            # Core Design System (Vars, Typography)
│   │   ├── page.js                # Main Portfolio Page
│   │   ├── layout.js              # Root Layout
```

## ✨ Features

- **Dynamic Interaction**: The "Liquid Ether" background distributes fluid simulations based on mouse movement.
- **Responsive Layouts**: Bento-grid style project showcases that adapt to mobile and desktop.
- **Performance Optimized**: Graphics computations are handled on the GPU via WebGL shaders.

---

© 2025 Souradip Biswas. Built with passion and code.
