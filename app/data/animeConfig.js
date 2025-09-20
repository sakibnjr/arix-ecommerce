export const animeConfig = {
  'jujutsu-kaisen': {
    name: 'Jujutsu Kaisen',
    displayName: 'Jujutsu Kaisen',
    description: 'Join Yuji Itadori and his fellow sorcerers as they battle cursed spirits and protect humanity. Experience the supernatural world of curses and jujutsu magic.',
    gradientColor: 'from-black to-gray-800',
    heroStats: {
      products: 8,
      series: '2 Seasons',
      status: 'Popular'
    }
  },
  'naruto': {
    name: 'Naruto',
    displayName: 'Naruto',
    description: 'Follow the ninja way with Naruto Uzumaki as he dreams of becoming Hokage. From Hidden Leaf Village to epic battles, experience the legendary shinobi adventure.',
    gradientColor: 'from-black to-gray-800',
    heroStats: {
      products: 12,
      series: '2 Parts + Movies',
      status: 'Classic'
    }
  },
  'one-piece': {
    name: 'One Piece',
    displayName: 'One Piece',
    description: 'Set sail with Monkey D. Luffy and the Straw Hat Pirates on their quest for the ultimate treasure. Adventure, friendship, and dreams await on the Grand Line.',
    gradientColor: 'from-black to-gray-800',
    heroStats: {
      products: 15,
      series: '1000+ Episodes',
      status: 'Ongoing'
    }
  },
  'demon-slayer': {
    name: 'Demon Slayer',
    displayName: 'Demon Slayer',
    description: 'Join Tanjiro Kamado in his quest to save his sister and defeat demons. Experience breathtaking sword techniques and emotional storytelling.',
    gradientColor: 'from-black to-gray-800',
    heroStats: {
      products: 10,
      series: '3 Seasons',
      status: 'Popular'
    }
  },
  'solo-leveling': {
    name: 'Solo Leveling',
    displayName: 'Solo Leveling',
    description: 'Rise from E-rank to S-rank hunter with Sung Jin-Woo and his Shadow Army in this epic journey of power and determination from the hit webtoon series.',
    gradientColor: 'from-black to-gray-800',
    heroStats: {
      products: 6,
      series: '1 Season',
      status: 'New'
    }
  },
  'attack-on-titan': {
    name: 'Attack on Titan',
    displayName: 'Attack on Titan',
    description: 'Fight for humanity against the titans in this epic tale of survival, freedom, and the price of peace. Experience the intensity of the Survey Corps.',
    gradientColor: 'from-black to-gray-800',
    heroStats: {
      products: 14,
      series: '4 Seasons',
      status: 'Completed'
    }
  }
};

export const getAnimeBySlug = (slug) => {
  return animeConfig[slug] || null;
};

export const getAllAnimeSlugs = () => {
  return Object.keys(animeConfig);
};
