# Emmy's Story - Interactive Web Experience

An immersive, interactive web experience built with Next.js, featuring smooth animations, 3D elements, and engaging storytelling.

## 🚀 Features

- **Interactive Storytelling**: Follow Emmy's journey through an engaging narrative
- **Smooth Page Transitions**: Beautiful gradient transitions between pages
- **3D Elements**: Integration with Three.js for immersive 3D experiences
- **Custom Animations**: GSAP and Framer Motion for fluid animations
- **Responsive Design**: Fully responsive layout for all devices
- **Custom Cursor**: Interactive custom cursor for enhanced user experience
- **Sound Effects**: Audio feedback using Howler.js
- **Data Visualization**: Interactive charts and progress tracking

## 📦 Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation Libraries**:
  - GSAP
  - Framer Motion
  - Anime.js
- **3D Rendering**: Three.js with React Three Fiber
- **Audio**: Howler.js
- **Charts**: Chart.js with React-Chartjs-2
- **Smooth Scrolling**: Lenis

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Home page
│   ├── strategy/          # Strategy section
│   ├── challenges/        # Challenges section
│   ├── ascent/           # Ascent section
│   ├── victory/          # Victory section
│   ├── final/            # Final section
│   └── leaderboard/      # Leaderboard section
├── components/            # React components
│   ├── PageTransition.tsx # Page transition animations
│   ├── CustomCursor.tsx   # Custom cursor implementation
│   ├── Hero.tsx          # Hero section
│   └── ...               # Other components
├── utils/                # Utility functions
└── fonts/               # Custom fonts
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd emmy-story
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Start production server**
   ```bash
   npm start
   ```

## 🎨 Design Features

- **Gradient Theme**: Consistent use of gradients throughout the application
- **Smooth Transitions**: Elegant page transitions with gradient overlays
- **Interactive Elements**: Engaging user interactions with visual feedback
- **Custom Typography**: Integration of custom fonts for enhanced readability
- **Responsive Layout**: Adaptive design for all screen sizes

## 🛠️ Development

- **TypeScript**: Strong typing for better development experience
- **ESLint**: Code quality and style enforcement
- **Tailwind CSS**: Utility-first CSS framework
- **Hot Reloading**: Fast development with Next.js hot reloading

### ESLint Configuration

The project uses ESLint with the following custom rules:
- Unused variables are treated as warnings
- Unescaped entities are allowed
- Image element warnings are treated as warnings
- React hooks dependency warnings are treated as warnings
- Explicit any types are treated as warnings

## 📝 Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- GSAP for powerful animations
- Three.js community for 3D capabilities
- All contributors who have helped shape this project
