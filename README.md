# 🚀 AI Portfolio | Interactive Web Experience

![Gemini API](https://img.shields.io/badge/Gemini%20API-powered%20by%20Google%20AI-yellow?logo=google)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-Latest-38bdf8?logo=tailwind-css)

![Portfolio Screenshot](src/assets/screenshot.png)

## 📋 Overview

This AI-powered portfolio is a cutting-edge web application that showcases my projects, skills, and experience in an interactive and engaging way. Leveraging the power of 3D visualization and artificial intelligence, this portfolio creates a memorable experience for visitors while effectively communicating my professional capabilities and creative vision.

## 👋 Introduction

Welcome to my AI-powered Portfolio! This project combines modern web development techniques with stunning 3D visualization to create an engaging, interactive showcase of my work. Whether you're a potential employer, collaborator, or fellow developer, I hope you enjoy exploring this digital representation of my skills and projects.

## 🤖🧠 Introducing Bikram.AI

The digital twin of myself. Bikram.AI is my personalized AI assistant integrated directly into this portfolio. It's designed to enhance your browsing experience by providing instant information about my projects, skills, and professional background. 

Using advanced natural language processing, Bikram.AI can answer questions, highlight relevant work experiences, and even explain the technical aspects of my projects. Feel free to interact with the chat widget to experience the power of AI-assisted portfolio navigation!

## ✨ Key Features

- **🔮 Interactive 3D Models**: Immerse yourself in a world of realistic 3D models, including drones and laptops with detailed textures and fluid animations.
- **📱 Responsive Design**: Enjoy a seamless experience across all devices - from smartphones to ultrawide monitors.
- **🤖 AI-Powered Chat Widget**: Get immediate responses to your questions through an intelligent chat assistant powered by Google's Gemini API.
- **⚡ Dynamic Content**: Experience smooth transitions and captivating visual effects throughout the portfolio.
- **🚀 Performance Optimized**: Fast loading times and efficient rendering even with complex 3D elements.
- **🌓 Dark Mode**: Eye-friendly interface with automatic theme detection.
- **🎭 Project Showcase**: Detailed display of projects with links, descriptions, and technologies used.
- **📊 Skill Visualization**: Interactive representation of technical skills with visually appealing elements.

## 🛠️ Technologies Used

- **⚛️ Frontend Framework**: React.js with Vite for lightning-fast development
- **🎨 Styling**: Tailwind CSS for utility-first styling
- **🌐 3D Visualization**: Three.js for immersive 3D experiences
- **🔄 Motion Graphics**: Framer Motion for smooth animations
- **🧠 AI Integration**: Google Gemini API for intelligent interactions
- **📨 Contact System**: EmailJS for hassle-free communication
- **📊 State Management**: React Context API for efficient state handling
- **🔄 Version Control**: Git for code versioning
- **☁️ Deployment**: Hosted on Vercel/Netlify for optimal performance
- **⚡ Optimization**: Lazy loading and code splitting for improved performance

## 📂 Project Structure

```
AI-portfolio/
│
├── index.html              # Main HTML entry point
├── package.json            # NPM dependencies and scripts
├── postcss.config.cjs      # PostCSS configuration
├── README.md               # Project documentation
├── tailwind.config.cjs     # Tailwind CSS configuration
├── vite.config.js          # Vite build tool configuration
│
├── public/                 # Public assets served as-is
│   └── buster_drone/       # 3D drone model
│       ├── license.txt
│       ├── scene.bin
│       ├── scene.gltf
│       └── textures/      # Drone model textures
│           ├── Boden_baseColor.png
│           ├── Boden_metallicRoughness.png
│           ├── Boden_normal.png
│           ├── body_baseColor.png
│           ├── body_emissive.png
│           ├── body_metallicRoughness.png
│           ├── body_normal.png
│           ├── material_baseColor.png
│           ├── material_metallicRoughness.png
│           └── material_normal.png
│
└── src/                    # Source code
    ├── App.jsx             # Main React component
    ├── index.css           # Global CSS
    ├── main.jsx            # React entry point
    ├── styles.js           # Shared style definitions
    │
    ├── assets/             # Static assets
    │   ├── backend.png
    │   ├── close.svg
    │   ├── creator.png
    │   ├── Edubyte.png
    │   ├── Github-readme-generator.png
    │   ├── github.png
    │   ├── grid1.png
    │   ├── grid2-.png
    │   ├── grid2.png
    │   ├── grid3.png
    │   ├── grid4.png
    │   ├── herobg.png
    │   ├── index.js        # Asset exports
    │   ├── jobit.png
    │   ├── KrishiMitra.png
    │   ├── logo.svg
    │   ├── MagicFill.png
    │   ├── menu.svg
    │   ├── mobile.png
    │   ├── screenshot.png
    │   ├── Trinoyon.png
    │   ├── tripguide.png
    │   ├── web.png
    │   ├── YouTube-Video-Summarizer.jpeg
    │   │
    │   └── tech/           # Technology icons
    │       ├── css.png
    │       ├── docker.png
    │       ├── figma.png
    │       ├── git.png
    │       ├── html.png
    │       ├── javascript.png
    │       ├── mongodb.png
    │       ├── nodejs.png
    │       ├── reactjs.png
    │       ├── redux.png
    │       ├── tailwind.png
    │       ├── threejs.svg
    │       └── typescript.png
    │
    ├── components/          # React components
    │   ├── About.jsx        # About section component
    │   ├── Button.jsx       # Reusable button component
    │   ├── Cards.jsx        # Card display component
    │   ├── ChatWidget.jsx   # AI chat assistant component
    │   ├── Contact.jsx      # Contact form component
    │   ├── Hero.jsx         # Hero section component
    │   ├── index.js         # Component exports
    │   ├── Loader.jsx       # Loading animation component
    │   ├── Navbar.jsx       # Navigation bar component
    │   ├── Tech.jsx         # Technologies section component
    │   ├── Works.jsx        # Projects section component
    │   │
    │   └── canvas/          # Three.js 3D components
    │       ├── Ball.jsx     # 3D ball component for tech icons
    │       ├── Computers.jsx # 3D computer model component
    │       ├── Earth.jsx    # 3D earth model component
    │       ├── index.js     # Canvas component exports
    │       └── Stars.jsx    # 3D stars background component
    │
    ├── constants/           # Application constants
    │   └── index.js         # Centralized constants
    │
    ├── hoc/                 # Higher-Order Components
    │   ├── index.js         # HOC exports
    │   └── SectionWrapper.jsx # Section wrapper HOC
    │
    └── utils/               # Utility functions
        ├── fontawesome.js   # FontAwesome icon configuration
        └── motion.js        # Framer Motion animations
```

The structure above shows the organization of the project, where:

- **`index.html`** is the main entry point of the application.
- **`package.json`** contains the project's metadata and dependencies.
- **`vite.config.js`** is the configuration file for Vite, the build tool.
- **`public/`** directory contains assets that are served directly, like 3D models and their textures.
- **`src/`** is where the source code lives, including React components, assets, and styles.
- **`components/`** folder inside `src/` contains all the React components used in the application.
- **`canvas/`** folder inside `components/` contains Three.js related components for 3D rendering.
- **`constants/`** holds application-wide constants.
- **`hoc/`** is for Higher-Order Components used in the project.
- **`utils/`** is for utility functions and helpers used across the application.

## 📬 Contact

Feel free to reach out to me through any of the following channels:

- **✉️ Email**: [codesnippets45@gmail.com](mailto:codesnippets45@gmail.com)
- **💼 LinkedIn**: [Bikram Mondal](https://www.linkedin.com/in/bikram-mondal-a2bb18343)
- **💻 GitHub**: [BikramMondal5](https://github.com/BikramMondal5)
- **🐦 Twitter**: [@CSnippets62428](https://x.com/CSnippets62428)

Or simply use the contact form on my portfolio website to send me a message directly. I'm always open to discussing new projects, opportunities, or just connecting with fellow developers!

---

*Built with ❤️ and a passion for creating exceptional web experiences.*
