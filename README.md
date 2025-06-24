# Grow a Garden Calculator

The ultimate **grow a garden calculator** for Roblox players. Calculate crop values, mutations, and profits with our advanced grow a garden calculator tool using the official game formula.

## 🌟 Features

### 📊 Comprehensive Crop Database
- **100+ crops** across all rarity levels (Common to Event)
- Complete crop information including base values and weights
- Real-time search and filtering capabilities
- Auto-fill base weights for accurate calculations

### 🧮 Official Formula Implementation
- Uses the exact official Roblox Grow a Garden formula
- High-precision floating-point calculations
- Formula: `Total = round(P × V × M × clamp(W/B, 0.95, ∞)² × Qty × Friend)`
- Weight correction mechanism with proper clamping

### 🔥 Advanced Mutation System
- **Growth Mutations**: Default (×1), Golden (×20), Rainbow (×50)
- **Temperature Mutations**: Default, Wet (+1), Chilled (+1), Frozen (+9)
- **26+ Environmental Mutations**: From basic (+1) to legendary (+149)
- Mix and match mutations for maximum profit optimization

### 💎 High-Precision Revenue Analysis
- Detailed profit breakdown with exact calculations
- Weight correction analysis with 5-decimal precision
- Value per kilogram calculations
- Profit multiplier vs base price comparison
- Complete formula breakdown view

### 🎯 User Experience
- Responsive design for all devices
- Intuitive interface with tooltips
- Real-time calculations as you type
- One-click "Max Mutations" optimization
- Professional dark theme with emerald accents

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/grow-a-garden-calculator.git
cd grow-a-garden-calculator
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

### Step 1: Select Your Crop
- Browse through 100+ crops in our database
- Use the search bar to find specific crops
- Filter by rarity (Common, Rare, Legendary, etc.)
- Click on any crop to select it

### Step 2: Set Parameters
- **Weight**: Enter your crop's actual weight (auto-filled with base weight)
- **Quantity**: Set how many crops you have
- **Friend Boost**: Adjust the friend boost percentage (0-100%)

### Step 3: Apply Mutations
- **Growth Mutations**: Choose Default, Golden, or Rainbow
- **Temperature Mutations**: Select environmental temperature effects
- **Environmental Mutations**: Pick from 26+ different environmental bonuses

### Step 4: Analyze Results
- View total crop value in Sheckles
- Check high-precision revenue analysis
- Compare value per kilogram
- See profit multiplier vs base price
- Use formula breakdown for detailed understanding

## 🔧 Technical Stack

- **Framework**: Next.js 13.5.1 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📈 SEO Optimization

This grow a garden calculator is optimized for search engines with:

- **Primary Keyword**: "grow a garden calculator" (3% density)
- **Secondary Keywords**: Roblox calculator, crop value calculator, mutation calculator
- **Meta Tags**: Comprehensive title, description, and keywords
- **Open Graph**: Social media sharing optimization
- **JSON-LD**: Structured data for rich snippets
- **Semantic HTML**: Proper heading hierarchy and accessibility
- **Mobile-First**: Responsive design for all devices

## 🏗️ Project Structure

```
grow-a-garden-calculator/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with SEO metadata
│   └── page.tsx             # Main calculator page
├── components/
│   └── ui/                  # shadcn/ui components
├── public/                  # Static assets
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🎯 Formula Explanation

The grow a garden calculator uses the official Roblox formula:

```
Total = round(P × V × M × clamp(W/B, 0.95, ∞)² × Qty × Friend)
```

Where:
- **P** = Base Price (from crop data)
- **V** = Growth Mutation Multiplier (1, 20, or 50)
- **M** = Total Mutation Multiplier (1 + Temperature + Environmental bonuses)
- **W/B** = Weight/Base Weight ratio (minimum 0.95, then squared)
- **Qty** = Quantity of crops
- **Friend** = Friend Boost Multiplier (1 + percentage/100)

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Optimization

The grow a garden calculator is fully responsive and optimized for mobile devices:
- Touch-friendly interface
- Optimized layouts for small screens
- Fast loading times
- Offline-capable PWA features

## 🤝 Contributing

We welcome contributions to improve the grow a garden calculator:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 About Roblox Grow a Garden

Grow a Garden is a popular Roblox farming simulation game where players:
- Plant and harvest various crops
- Apply mutations to increase crop values
- Trade crops for in-game currency (Sheckles)
- Build and expand their virtual gardens
- Compete with other players for the highest profits

Our grow a garden calculator helps players optimize their farming strategies and maximize their profits in this engaging Roblox experience.

## 🔗 Links

- **Live Demo**: [https://your-domain.com](https://your-domain.com)
- **GitHub Repository**: [https://github.com/your-username/grow-a-garden-calculator](https://github.com/your-username/grow-a-garden-calculator)
- **Issues**: [Report bugs or request features](https://github.com/your-username/grow-a-garden-calculator/issues)

---

**Made with ❤️ for the Roblox Grow a Garden community** 