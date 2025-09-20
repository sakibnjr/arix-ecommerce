# ARIX - Premium Anime T-Shirts

A modern e-commerce platform for premium anime-themed t-shirts, built with Next.js and featuring a clean, responsive design.

## 🌟 Features

### Frontend

- **Modern UI/UX**: Responsive design with glass morphism effects and smooth animations
- **Hero Slider**: Dynamic homepage slider showcasing featured collections
- **Product Catalog**: Browse products by anime series, categories, and filters
- **Shopping Cart**: Full cart functionality with persistent state
- **Search**: Real-time product search with instant results
- **Categories**:
  - Anime Collections (Jujutsu Kaisen, Naruto, One Piece, Demon Slayer, Solo Leveling)
  - Product Types (Classic T-Shirts, Drop Shoulder)
- **Admin Panel**: Complete admin interface for managing products, orders, and sliders

### Backend

- **REST API**: Built with Express.js
- **Database**: MongoDB with Mongoose ODM
- **File Upload**: Image upload functionality for products and sliders
- **Image Hosting**: Cloudinary integration for optimized image storage and delivery
- **Order Management**: Complete order processing system
- **Admin Authentication**: Secure admin login system

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Fonts**: Inter & Playfair Display (Google Fonts)
- **State Management**: React Context API
- **Notifications**: React Hot Toast

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **File Upload**: Multer
- **Image Hosting**: Cloudinary
- **Authentication**: Custom JWT-based auth

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- Cloudinary account (for image hosting)
- npm or yarn package manager

### Frontend Setup

1. **Install dependencies**:

```bash
npm install
# or
yarn install
```

2. **Environment Variables**:
   Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

3. **Run the development server**:

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

### Backend Setup

1. **Navigate to server directory**:

```bash
cd server
```

2. **Install dependencies**:

```bash
npm install
```

3. **Environment Variables**:
   Create a `.env` file in the server directory:

```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ADMIN_USERNAME=set_admin_username
ADMIN_PASSWORD=set_admin_password
PORT=5000

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

4. **Cloudinary Setup**:

   - Create a free account at [Cloudinary](https://cloudinary.com/)
   - Get your Cloud Name, API Key, and API Secret from the dashboard
   - Add these credentials to your `.env` file as shown above

5. **Run the server**:

```bash
npm start
# or for development
npm run dev
```

## 📁 Project Structure

```
arix/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   │   ├── Header.js
│   │   ├── HeroSlider.js
│   │   ├── AnimeCategoriesSection.js
│   │   └── ...
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── utils/             # Utility functions
│   ├── admin/             # Admin panel pages
│   ├── api/               # API route handlers
│   └── ...
├── server/                # Express.js backend
│   ├── src/
│   │   ├── models/        # Mongoose models
│   │   ├── routes/        # API routes
│   │   └── utils/         # Server utilities
│   └── ...
├── public/                # Static assets
└── ...
```

## 🎨 Design Features

- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Modern Aesthetics**: Glass morphism, gradient overlays, and smooth transitions
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Optimized images, lazy loading, and efficient state management
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🔧 Key Components

### Frontend Components

- `HeroSlider`: Homepage hero section with product showcases
- `Header`: Navigation with search functionality and cart
- `AnimeCategoriesSection`: Anime series browsing section
- `ProductCard`: Reusable product display component
- `CheckoutForm`: Order processing form

### Backend Routes

- `/api/products`: Product CRUD operations
- `/api/orders`: Order management
- `/api/sliders`: Homepage slider management
- `/api/auth`: Admin authentication
- `/api/uploads`: File upload handling

## 🚀 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend (Railway/Heroku)

1. Create a new app on your preferred platform
2. Set environment variables
3. Deploy from GitHub repository

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Built with ❤️ by the ARIX team
