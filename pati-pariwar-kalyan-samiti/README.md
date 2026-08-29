# Pati Pariwar Kalyan Samiti Website

A responsive, mobile-first website for Pati Pariwar Kalyan Samiti, a men's rights and family welfare support organization in Lucknow, India.

## Deploy to Vercel

### Option 1: Vercel CLI (Recommended for Development)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Navigate to project directory
cd pati-pariwar-kalyan-samiti

# Deploy
vercel

# For production deployment
vercel --prod
```

### Option 2: GitHub + Vercel (Recommended for Production)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect the static site configuration
6. Click "Deploy"

### Option 3: Drag & Drop (Quick Test)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Drag and drop the `pati-pariwar-kalyan-samiti` folder
3. Your site will be deployed instantly

## Project Structure

```
pati-pariwar-kalyan-samiti/
├── index.html              # Homepage
├── aims-objectives.html    # Mission & Objectives
├── activities.html         # Activities & Events
├── resources.html          # Resource Library
├── national-meet.html      # National Meet 2024
├── contact.html            # Contact Us
├── css/
│   └── style.css           # Design system & styles
├── js/
│   └── main.js             # Interactive functionality
├── images/                 # Image assets
├── vercel.json             # Vercel configuration
└── README.md               # This file
```

## Features

- ✅ Fully responsive (mobile-first, breakpoints: 375px, 768px, 1024px, 1440px)
- ✅ Accessible (WCAG AA compliant, keyboard navigation, ARIA labels)
- ✅ Performance optimized (lazy loading, minimal CSS/JS)
- ✅ SEO ready (meta tags, Open Graph, semantic HTML)
- ✅ PWA-ready structure
- ✅ Lightbox gallery
- ✅ Form validation
- ✅ Scroll animations
- ✅ Resource filtering

## Customization TODOs

Before going live, please update:

1. **Contact Form**: Connect to a backend service (Formspree, Netlify Forms, or custom API)
2. **Images**: Replace placeholder images with real photos (compress for web)
3. **Resources**: Upload actual PDFs and documents
4. **Testimonials**: Replace with real client testimonials
5. **Statistics**: Update with real organizational data
6. **Developer Credit**: Replace "[developer name]" in footer with your name
7. **Social Links**: Add real social media URLs when available
8. **Google Maps**: Replace placeholder with actual embed code for the address
9. **Favicon**: Add favicon.ico and apple-touch-icon.png
10. **Analytics**: Add Google Analytics or similar tracking code

## Local Development

Simply open `index.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is proprietary. All rights reserved to Pati Pariwar Kalyan Samiti.

## Contact

**Pati Pariwar Kalyan Samiti**  
9/215, Sector 9, Jankipuram, Lucknow  
Email: patipariwar@gmail.com  
Phone: +91 9793530430  
Helpline: 8882498498
