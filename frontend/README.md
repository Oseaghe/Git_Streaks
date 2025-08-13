# GitStreak Frontend

A modern, professional React frontend for tracking GitHub contribution streaks. Built with React, Styled Components, and Framer Motion for smooth animations and a beautiful user experience.

## Features

- 🎨 **Modern Design**: Clean, professional UI with glass morphism effects
- 📱 **Responsive**: Fully responsive design that works on all devices
- ⚡ **Fast**: Optimized performance with smooth animations
- 🔄 **Real-time**: Live connection status indicator
- 📊 **Visual Feedback**: Beautiful streak cards with progress indicators
- 🎯 **Multi-user**: Track multiple GitHub usernames simultaneously
- ♿ **Accessible**: Built with accessibility in mind

## Tech Stack

- **React 18** - Modern React with hooks
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations and transitions
- **React Icons** - Beautiful icon library
- **Webpack** - Module bundler
- **Babel** - JavaScript compiler

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend server running on port 8080

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open your browser and navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # App icon
├── src/
│   ├── components/         # React components
│   │   ├── Header.js       # App header with connection status
│   │   ├── StreakForm.js   # Form for entering usernames
│   │   ├── StreakList.js   # Display streak results
│   │   └── LoadingSpinner.js # Loading animation
│   ├── styles/
│   │   └── App.css         # Global styles
│   ├── App.js              # Main app component
│   └── index.js            # App entry point
├── package.json            # Dependencies and scripts
└── webpack.config.js       # Webpack configuration
```

## API Integration

The frontend communicates with the backend API at `http://localhost:8080`:

- `GET /api/streaks/health` - Check API health
- `POST /api/streaks` - Get streak data for usernames

### Request Format
```json
{
  "usernames": ["username1", "username2", "username3"]
}
```

### Response Format
```json
[
  {
    "username": "username1",
    "currentstreak": 15,
    "lastCommitDate": "2024-01-15",
    "commitedToday": true
  }
]
```

## Components

### Header
- Displays app logo and connection status
- Shows real-time API connection indicator

### StreakForm
- Dynamic form for entering GitHub usernames
- Add/remove username fields
- Form validation and submission handling

### StreakList
- Beautiful card layout for displaying streak data
- Color-coded streak numbers based on duration
- Progress bars and status indicators
- Responsive grid layout

### LoadingSpinner
- Reusable loading animation component
- Customizable size and color

## Styling

The app uses a modern design system with:

- **Glass Morphism**: Translucent cards with backdrop blur
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper focus states and ARIA labels

## Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint

### Code Style

- Use functional components with hooks
- Follow React best practices
- Use Styled Components for styling
- Implement proper error handling
- Add loading states for better UX

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For support, please open an issue in the repository or contact the development team. 