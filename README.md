# Pakistan Railways Web App

A simple React + Vite web application for Pakistan Railways, built with Tailwind CSS and responsive UX design. This project demonstrates ticket booking, live status, schedule lookup, gallery, contact details, and user registration.

## Features

- Responsive user interface for desktop and mobile
- Ticket booking page with form inputs
- Live train status lookup
- Train schedule information
- Gallery and contact pages
- User registration page
- Navigation bar for easy access across pages

## Tech Stack

- React
- Vite
- Tailwind CSS
- JavaScript
- HTML / CSS

## Project Structure

```
New folder/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Images and other static resources
│   ├── components/         # React page and UI components
│   │   ├── BookingPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── LiveStatusPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Raabta-e-ticket.jsx
│   │   ├── RegisterPage.jsx
│   │   └── SchedulePage.jsx
│   ├── data/               # Mock data and sample datasets
│   │   └── mockData.js
│   ├── App.jsx             # Main application component
│   ├── index.css           # Global styles
│   ├── main.jsx            # React entry point
│   └── App.css             # App-specific styles
├── index.html              # Vite HTML template
├── package.json            # Project scripts and dependencies
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.js          # Vite configuration
└── README.md               # Project documentation
```

## Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the app in your browser at the URL shown in the terminal.

## Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production files
- `npm run preview` - preview the production build locally
