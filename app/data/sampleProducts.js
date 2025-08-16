export const sampleProducts = [
  {
    id: 1,
    name: "Gojo Satoru Domain Expansion",
    price: 29.99,
    originalPrice: 39.99,
    image: "/placeholder-gojo.jpg",
    hoverImage: "/placeholder-gojo-back.jpg",
    anime: "Jujutsu Kaisen",
    category: "Normal T-Shirt",
    sizes: ["M", "L", "XL"],
    isNew: true,
    discount: 25
  },
  {
    id: 2,
    name: "Naruto Uzumaki Hokage",
    price: 27.99,
    originalPrice: null,
    image: "/placeholder-naruto.jpg",
    hoverImage: "/placeholder-naruto-back.jpg",
    anime: "Naruto",
    category: "Drop Shoulder",
    sizes: ["M", "L", "XL"],
    isNew: false,
    discount: null
  },
  {
    id: 3,
    name: "Luffy Gear 5 Awakening",
    price: 32.99,
    originalPrice: 42.99,
    image: "/placeholder-luffy.jpg",
    hoverImage: "/placeholder-luffy-back.jpg",
    anime: "One Piece",
    category: "Normal T-Shirt",
    sizes: ["M", "L", "XL"],
    isNew: true,
    discount: 23
  },
  {
    id: 4,
    name: "Tanjiro Water Breathing",
    price: 26.99,
    originalPrice: null,
    image: "/placeholder-tanjiro.jpg",
    hoverImage: "/placeholder-tanjiro-back.jpg",
    anime: "Demon Slayer",
    category: "Normal T-Shirt",
    sizes: ["M", "L", "XL"],
    isNew: false,
    discount: null
  },
  {
    id: 5,
    name: "Sung Jin-Woo Shadow Army",
    price: 34.99,
    originalPrice: 44.99,
    image: "/placeholder-jinwoo.jpg",
    hoverImage: "/placeholder-jinwoo-back.jpg",
    anime: "Solo Leveling",
    category: "Drop Shoulder",
    sizes: ["M", "L", "XL"],
    isNew: true,
    discount: 22
  },
  {
    id: 6,
    name: "Sukuna King of Curses",
    price: 31.99,
    originalPrice: null,
    image: "/placeholder-sukuna.jpg",
    hoverImage: "/placeholder-sukuna-back.jpg",
    anime: "Jujutsu Kaisen",
    category: "Normal T-Shirt",
    sizes: ["M", "L", "XL"],
    isNew: false,
    discount: null
  },
  {
    id: 7,
    name: "Sasuke Uchiha Sharingan",
    price: 28.99,
    originalPrice: 36.99,
    image: "/placeholder-sasuke.jpg",
    hoverImage: "/placeholder-sasuke-back.jpg",
    anime: "Naruto",
    category: "Drop Shoulder",
    sizes: ["M", "L", "XL"],
    isNew: false,
    discount: 22
  },
  {
    id: 8,
    name: "Zoro Three Sword Style",
    price: 30.99,
    originalPrice: null,
    image: "/placeholder-zoro.jpg",
    hoverImage: "/placeholder-zoro-back.jpg",
    anime: "One Piece",
    category: "Normal T-Shirt",
    sizes: ["M", "L", "XL"],
    isNew: false,
    discount: null
  }
];

export const featuredProducts = sampleProducts.slice(0, 4);
export const newArrivals = sampleProducts.filter(product => product.isNew);
export const saleProducts = sampleProducts.filter(product => product.discount);
