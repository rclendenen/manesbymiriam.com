# Responsive Image Gallery Component

A lightweight, responsive image gallery component built with React and Tailwind CSS for the Manes by Miriam website.

## Features

- ✅ **Carousel/Slider Style**: Rotating gallery with smooth transitions
- ✅ **38 Images Support**: Handles your existing 8 photos + 30 new ones
- ✅ **Lightweight**: Minimal bundle size, optimized performance
- ✅ **Mobile Swipe Gestures**: Touch-friendly navigation on mobile devices
- ✅ **Navigation Arrows**: Click-to-navigate with Lucide React icons
- ✅ **Pagination Dots**: Visual indicators showing current position
- ✅ **Responsive Design**: Adapts perfectly to desktop, tablet, and mobile
- ✅ **Keyboard Navigation**: Arrow key support for accessibility
- ✅ **Smooth Transitions**: 300ms fade transitions between images
- ✅ **Image Counter**: Shows current position (e.g., "5 / 38")

## Installation

1. Install dependencies:
```bash
npm install react react-dom lucide-react
npm install -D tailwindcss postcss autoprefixer @vitejs/plugin-react vite
```

2. Set up Tailwind CSS:
```bash
npx tailwindcss init -p
```

3. Copy the provided `tailwind.config.js` configuration.

## Usage

### Basic Usage
```jsx
import ImageGallery from './ImageGallery';

const photos = [
  'https://i.imgur.com/photo1.jpg',
  'https://i.imgur.com/photo2.jpg',
  // ... your 38 photos
];

function App() {
  return <ImageGallery photos={photos} />;
}
```

### Integration with Existing Website
```jsx
import GalleryIntegration from './GalleryIntegration';

// This component matches your existing website styling
function Website() {
  return <GalleryIntegration />;
}
```

## Component Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `photos` | `string[]` | `[]` | Array of image URLs to display |

## Features Breakdown

### Navigation
- **Arrow Buttons**: Left/right navigation with hover effects
- **Swipe Gestures**: Mobile-friendly touch navigation
- **Keyboard Support**: Arrow keys for desktop users
- **Pagination Dots**: Click any dot to jump to that image

### Responsive Design
- **Desktop**: Full-width gallery with navigation arrows
- **Tablet**: Optimized spacing and touch targets
- **Mobile**: Swipe gestures, larger touch targets, mobile instructions

### Performance
- **Lazy Loading**: Images load as needed
- **Smooth Transitions**: 300ms fade effects
- **Touch Optimization**: Prevents accidental swipes
- **Memory Efficient**: Only renders current image

## Customization

### Styling
The component uses Tailwind CSS classes and can be easily customized:

```jsx
// Custom container styling
<div className="custom-gallery-container">
  <ImageGallery photos={photos} />
</div>
```

### Auto-play (Optional)
To enable auto-play, uncomment this line in `ImageGallery.jsx`:
```javascript
// goToNext(); // Uncomment this line
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 60+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## File Structure

```
├── ImageGallery.jsx          # Main gallery component
├── GalleryExample.jsx        # Basic usage example
├── GalleryIntegration.jsx    # Website integration example
├── package.json              # Dependencies
├── tailwind.config.js        # Tailwind configuration
└── README.md                 # This file
```

## Next Steps

1. **Add Your Photos**: Replace the placeholder URLs in `GalleryIntegration.jsx` with your 30 new photo URLs
2. **Test Responsiveness**: Check the gallery on different screen sizes
3. **Customize Styling**: Adjust colors and spacing to match your brand
4. **Deploy**: Integrate into your existing website

## Support

For questions or customization needs, refer to the component code or create an issue in your project repository.




