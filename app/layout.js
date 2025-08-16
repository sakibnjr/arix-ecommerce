import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import { Toaster } from 'react-hot-toast';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata = {
  title: "Arix - Premium Anime T-Shirts",
  description: "Discover premium anime t-shirts featuring Jujutsu Kaisen, Naruto, One Piece, Demon Slayer, and Solo Leveling. Shop normal and drop shoulder styles.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
          <body
      className={`${inter.variable} ${playfair.variable} font-inter antialiased`}
    >
        <CartProvider>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1f2937',
                color: '#ffffff',
                border: '1px solid #374151',
              },
              success: {
                style: {
                  background: '#065f46',
                  color: '#ffffff',
                },
              },
              error: {
                style: {
                  background: '#7f1d1d',
                  color: '#ffffff',
                },
              },
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}
